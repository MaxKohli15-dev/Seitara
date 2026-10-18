// In-browser AI backgrounds with SD-Turbo via onnxruntime-web (WebGPU).
// Pipeline follows Microsoft's onnxruntime-inference-examples/js/sd-turbo sample.
import * as ort from "https://cdn.jsdelivr.net/npm/onnxruntime-web@1.22.0/dist/ort.webgpu.min.mjs";
import { AutoTokenizer, env } from "https://cdn.jsdelivr.net/npm/@xenova/transformers@2.17.2";

const MODEL_BASE = "https://huggingface.co/schmuell/sd-turbo-ort-web/resolve/main";
const DAILY_LIMIT = 10;
const SIGMA = 14.6146;
const VAE_SCALING = 0.18215;
// Extra safety on top of the model: many users are kids.
const BLOCKED = /(nackt|nude|naked|nsfw|sex|porn|blut|blood|gore|töten|kill|waffe|gun|weapon|drogen|drugs|nazi|hitler)/i;

ort.env.wasm.wasmPaths = "https://cdn.jsdelivr.net/npm/onnxruntime-web@1.22.0/dist/";
ort.env.wasm.numThreads = 1;
env.allowLocalModels = false;

const MODELS = {
  text_encoder: { url: "text_encoder/model.onnx", opt: { freeDimensionOverrides: { batch_size: 1 } } },
  unet: { url: "unet/model.onnx", opt: { freeDimensionOverrides: { batch_size: 1, num_channels: 4, height: 64, width: 64, sequence_length: 77 } } },
  vae_decoder: { url: "vae_decoder/model.onnx", opt: { freeDimensionOverrides: { batch_size: 1, num_channels_latent: 4, height_latent: 64, width_latent: 64 } } },
};
const SESSION_OPT = {
  executionProviders: ["webgpu"],
  enableMemPattern: false,
  enableCpuMemArena: false,
  preferredOutputLocation: { last_hidden_state: "gpu-buffer" },
  extra: { session: { disable_prepacking: "1", use_device_allocator_for_initializers: "1", use_ort_model_bytes_directly: "1", use_ort_model_bytes_for_initializers: "1" } },
};

const $ = (id) => document.getElementById(id);
let sessions = null;
let tokenizer = null;
let busy = false;

// ---------- daily limit (browser only, can be bypassed – accepted) ----------
const today = () => new Date().toISOString().slice(0, 10);
function usage() {
  try { const u = JSON.parse(localStorage.getItem("aiUsage") || "{}"); return u.date === today() ? u.count : 0; } catch { return 0; }
}
function addUsage() { try { localStorage.setItem("aiUsage", JSON.stringify({ date: today(), count: usage() + 1 })); } catch {} }

function setStatus(msg, err = false) { const el = $("aiStatus"); el.textContent = msg; el.classList.toggle("err", err); }
function showLeft() {
  const left = Math.max(DAILY_LIMIT - usage(), 0);
  $("aiLeft").textContent = `Heute noch ${left} von ${DAILY_LIMIT}`;
  if (left === 0) { $("aiGo").disabled = true; setStatus("Tageslimit erreicht – morgen kannst du wieder neue Hintergründe erstellen.", true); }
}
function setBusy(on, label) {
  busy = on;
  $("aiGo").disabled = on || usage() >= DAILY_LIMIT;
  $("aiGo").classList.toggle("loading", on);
  $("aiGoLabel").textContent = label || "Mit KI erstellen";
  document.querySelector(".stage").classList.toggle("loading", on);
}

// ---------- download with progress + Cache API, so models load only once ----------
async function fetchModel(path, onProgress) {
  const url = `${MODEL_BASE}/${path}`;
  let cache = null;
  try { cache = await caches.open("seitara-sd-turbo"); const hit = await cache.match(url); if (hit) { onProgress(1, 1); return await hit.arrayBuffer(); } } catch {}
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Download fehlgeschlagen (${res.status})`);
  const total = +res.headers.get("content-length") || 0;
  const reader = res.body.getReader();
  const buf = total ? new Uint8Array(total) : null;
  const parts = [];
  let got = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    if (buf) buf.set(value, got); else parts.push(value);
    got += value.length;
    onProgress(got, total || got);
  }
  const bytes = buf || new Uint8Array(await new Blob(parts).arrayBuffer());
  try { if (cache) await cache.put(url, new Response(bytes)); } catch {} // quota may be too small – then it just downloads again next time
  return bytes.buffer;
}

async function loadModels() {
  if (sessions) return sessions;
  const sizes = { text_encoder: 681, unet: 1733, vae_decoder: 99 }; // MB, for the overall progress bar
  const totalMb = Object.values(sizes).reduce((a, b) => a + b, 0);
  let doneMb = 0;
  const s = {};
  for (const [name, m] of Object.entries(MODELS)) {
    const bytes = await fetchModel(m.url, (got, total) => {
      const pct = Math.min(99, Math.round(((doneMb + (got / total) * sizes[name]) / totalMb) * 100));
      setBusy(true, `KI wird geladen … ${pct} %`);
    });
    doneMb += sizes[name];
    setBusy(true, "KI wird vorbereitet …");
    s[name] = await ort.InferenceSession.create(bytes, { ...SESSION_OPT, ...m.opt });
  }
  tokenizer = await AutoTokenizer.from_pretrained("Xenova/clip-vit-base-patch16");
  tokenizer.pad_token_id = 0;
  sessions = s;
  return s;
}

// ---------- SD-Turbo single step ----------
function randn(n, scale) {
  const d = new Float32Array(n);
  for (let i = 0; i < n; i++) { const u = Math.random() || 1e-9, v = Math.random(); d[i] = Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v) * scale; }
  return d;
}

async function generate(prompt) {
  const s = await loadModels();
  setBusy(true, "Bild wird erstellt …");
  const { input_ids } = await tokenizer(prompt, { padding: true, max_length: 77, truncation: true, return_tensor: false });
  const { last_hidden_state } = await s.text_encoder.run({ input_ids: new ort.Tensor("int32", input_ids, [1, input_ids.length]) });

  const shape = [1, 4, 64, 64];
  const latent = randn(4 * 64 * 64, SIGMA);
  const div = Math.sqrt(SIGMA ** 2 + 1);
  const scaled = latent.map((x) => x / div);
  const { out_sample } = await s.unet.run({
    sample: new ort.Tensor(scaled, shape),
    timestep: new ort.Tensor("int64", [999n], [1]),
    encoder_hidden_states: last_hidden_state,
  });
  last_hidden_state.dispose();

  // Euler step to sigma 0 (same as the sample's "poor man's EulerA")
  const out = out_sample.data;
  const next = new Float32Array(out.length);
  for (let i = 0; i < out.length; i++) {
    const pred = latent[i] - SIGMA * out[i];
    const deriv = (latent[i] - pred) / SIGMA;
    next[i] = (latent[i] + deriv * -SIGMA) / VAE_SCALING;
  }
  const { sample } = await s.vae_decoder.run({ latent_sample: new ort.Tensor(next, shape) });

  const px = sample.data;
  for (let i = 0; i < px.length; i++) px[i] = Math.min(1, Math.max(0, px[i] / 2 + 0.5));
  const imageData = sample.toImageData({ tensorLayout: "NCWH", format: "RGB" });
  const cv = document.createElement("canvas");
  cv.width = imageData.width; cv.height = imageData.height;
  cv.getContext("2d").putImageData(imageData, 0, 0);
  return cv;
}

// ---------- UI ----------
async function supported() {
  try { const a = await navigator.gpu?.requestAdapter(); return !!a && a.features.has("shader-f16"); } catch { return false; }
}

async function onGenerate() {
  if (busy) return;
  const text = $("aiPrompt").value.trim();
  if (text.length < 3) return setStatus("Beschreibe kurz, was im Hintergrund zu sehen sein soll.", true);
  if (BLOCKED.test(text)) return setStatus("Diese Beschreibung ist nicht erlaubt. Bitte wähle etwas Kinderfreundliches.", true);
  if (usage() >= DAILY_LIMIT) return showLeft();
  if (!sessions && !confirm("Beim ersten Mal lädt die KI ca. 2,5 GB herunter (danach im Browser gespeichert). Das kann je nach Internet einige Minuten dauern. Fortfahren?")) return;

  const prompt = `${text}, ${$("aiStyle").value}, video game thumbnail background, vibrant colors, dramatic lighting, no text`;
  setBusy(true, "KI wird geladen …");
  setStatus(sessions ? "Einen Moment …" : "Die KI wird geladen. Lass das Fenster offen.");
  try {
    const t0 = performance.now();
    const img = await generate(prompt);
    addUsage();
    window.thumbSetBackground(img);
    setStatus(`Fertig in ${((performance.now() - t0) / 1000).toFixed(0)} s! Du kannst jetzt Titel und Sticker anpassen.`);
  } catch (e) {
    console.error(e);
    setStatus("Das hat nicht geklappt – vermutlich reicht der Grafikspeicher nicht. Versuch es an einem PC mit stärkerer Grafikkarte.", true);
  } finally {
    setBusy(false);
    showLeft();
  }
}

(async () => {
  if (!(await supported())) {
    $("aiGo").disabled = true;
    setStatus("Dein Browser oder Gerät unterstützt die KI leider nicht (WebGPU nötig, z. B. aktueller Chrome oder Edge am PC).", true);
    $("aiLeft").textContent = "";
    return;
  }
  $("aiGo").addEventListener("click", onGenerate);
  showLeft();
})();
