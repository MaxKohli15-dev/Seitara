// Blocky R6-style avatar rendered with three.js into a transparent canvas.
// window.renderAvatar(opts) returns a 1024x1024 canvas (re-rendered only when opts change).
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";

const SIZE = 1024;
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
renderer.setSize(SIZE, SIZE, false);
renderer.setPixelRatio(1);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.1;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 100);

// Lights: soft fill, warm key from the front-left, coloured rim from behind (typical icon lighting)
scene.add(new THREE.HemisphereLight(0xffffff, 0x8a8aa0, 1.4));
const key = new THREE.DirectionalLight(0xffffff, 2.4); key.position.set(-4, 6, 8); scene.add(key);
const rim = new THREE.DirectionalLight(0xffffff, 3.2); rim.position.set(5, 4, -6); scene.add(rim);
const rim2 = new THREE.DirectionalLight(0xffffff, 1.6); rim2.position.set(-6, 2, -4); scene.add(rim2);

const plastic = (hex) => new THREE.MeshStandardMaterial({ color: hex, roughness: 0.42, metalness: 0.02 });
const box = (w, h, d, r = 0.08) => new RoundedBoxGeometry(w, h, d, 4, r);

// ---------- face texture ----------
function faceTexture(kind) {
  const cv = document.createElement("canvas"); cv.width = cv.height = 512;
  const g = cv.getContext("2d");
  g.fillStyle = "#111"; g.strokeStyle = "#111"; g.lineCap = "round"; g.lineJoin = "round";
  const eye = (x, y, w, h) => { g.beginPath(); g.ellipse(x, y, w, h, 0, 0, Math.PI * 2); g.fill(); };
  const shine = (x, y, r) => { g.save(); g.fillStyle = "#fff"; g.beginPath(); g.arc(x, y, r, 0, Math.PI * 2); g.fill(); g.restore(); };
  if (kind === "smile") {
    eye(190, 210, 26, 44); eye(322, 210, 26, 44); shine(198, 192, 8); shine(330, 192, 8);
    g.lineWidth = 26; g.beginPath(); g.arc(256, 270, 110, 0.15 * Math.PI, 0.85 * Math.PI); g.stroke();
  } else if (kind === "shocked") {
    g.save(); g.fillStyle = "#fff"; eye(185, 205, 58, 66); eye(327, 205, 58, 66); g.restore();
    g.lineWidth = 10; g.beginPath(); g.ellipse(185, 205, 58, 66, 0, 0, Math.PI * 2); g.stroke(); g.beginPath(); g.ellipse(327, 205, 58, 66, 0, 0, Math.PI * 2); g.stroke();
    eye(190, 215, 20, 24); eye(322, 215, 20, 24);
    g.beginPath(); g.ellipse(256, 375, 52, 66, 0, 0, Math.PI * 2); g.fill();
    g.save(); g.fillStyle = "#e0566b"; g.beginPath(); g.ellipse(256, 405, 30, 22, 0, 0, Math.PI * 2); g.fill(); g.restore();
  } else if (kind === "angry") {
    eye(190, 230, 26, 34); eye(322, 230, 26, 34);
    g.lineWidth = 22; g.beginPath(); g.moveTo(140, 150); g.lineTo(235, 190); g.moveTo(372, 150); g.lineTo(277, 190); g.stroke();
    g.lineWidth = 22; g.beginPath(); g.arc(256, 410, 80, 1.15 * Math.PI, 1.85 * Math.PI); g.stroke();
  } else if (kind === "evil") {
    g.lineWidth = 20; g.beginPath(); g.moveTo(150, 180); g.lineTo(230, 215); g.moveTo(362, 180); g.lineTo(282, 215); g.stroke();
    eye(195, 245, 20, 18); eye(317, 245, 20, 18);
    g.beginPath(); g.moveTo(130, 310); g.quadraticCurveTo(256, 470, 382, 310); g.quadraticCurveTo(256, 380, 130, 310); g.fill();
    g.save(); g.fillStyle = "#fff"; for (let i = 0; i < 6; i++) { const x = 170 + i * 34; g.beginPath(); g.moveTo(x, 335 + Math.abs(2.5 - i) * 6); g.lineTo(x + 16, 360); g.lineTo(x + 32, 335 + Math.abs(2.5 - i) * 6); g.fill(); } g.restore();
  } else { // cool
    g.save(); g.fillStyle = "#111"; g.beginPath(); g.roundRect(120, 175, 130, 70, 22); g.roundRect(262, 175, 130, 70, 22); g.fill(); g.fillRect(240, 190, 32, 14); g.restore();
    shine(160, 195, 10);
    g.lineWidth = 22; g.beginPath(); g.moveTo(190, 345); g.quadraticCurveTo(280, 385, 340, 320); g.stroke();
  }
  const t = new THREE.CanvasTexture(cv); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8;
  return t;
}

// ---------- accessories ----------
function crown() {
  const gold = new THREE.MeshStandardMaterial({ color: 0xffc83d, roughness: 0.25, metalness: 0.85 });
  const g = new THREE.Group();
  const band = new THREE.Mesh(new THREE.CylinderGeometry(0.62, 0.62, 0.3, 32, 1, true), gold); band.material.side = THREE.DoubleSide; g.add(band);
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2;
    const spike = new THREE.Mesh(new THREE.ConeGeometry(0.13, 0.36, 4), gold);
    spike.position.set(Math.cos(a) * 0.58, 0.32, Math.sin(a) * 0.58); g.add(spike);
    const gem = new THREE.Mesh(new THREE.SphereGeometry(0.07, 12, 12), new THREE.MeshStandardMaterial({ color: i % 2 ? 0xe11d48 : 0x2563eb, roughness: 0.1, metalness: 0.3 }));
    gem.position.set(Math.cos(a) * 0.63, 0, Math.sin(a) * 0.63); g.add(gem);
  }
  g.position.y = 0.72; return g;
}
function cap(color) {
  const m = plastic(color);
  const g = new THREE.Group();
  const top = new THREE.Mesh(new THREE.SphereGeometry(0.66, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2), m); top.scale.y = 0.75; top.position.y = 0.42; g.add(top);
  const brim = new THREE.Mesh(box(1.1, 0.08, 0.7, 0.03), m); brim.position.set(0, 0.44, 0.6); g.add(brim);
  return g;
}
function sword() {
  const g = new THREE.Group();
  const blade = new THREE.Mesh(box(0.18, 2.6, 0.06, 0.02), new THREE.MeshStandardMaterial({ color: 0xbfe9ff, roughness: 0.15, metalness: 0.9, emissive: 0x2a7fff, emissiveIntensity: 0.35 }));
  blade.position.y = 1.55; g.add(blade);
  const guard = new THREE.Mesh(box(0.8, 0.14, 0.18, 0.04), new THREE.MeshStandardMaterial({ color: 0xffc83d, metalness: 0.8, roughness: 0.3 })); guard.position.y = 0.25; g.add(guard);
  const grip = new THREE.Mesh(box(0.14, 0.5, 0.14, 0.04), plastic(0x3b2416)); grip.position.y = 0; g.add(grip);
  return g;
}

// ---------- poses (radians) ----------
const POSES = {
  idle:    { la: [0, 0, 0.08],   ra: [0, 0, -0.08], ll: [0, 0, 0],    rl: [0, 0, 0],    body: [0, 0, 0] },
  wave:    { la: [0, 0, 0.12],   ra: [0, 0, -2.75], ll: [0, 0, 0],    rl: [0, 0, 0],    body: [0, 0, 0.04] },
  jump:    { la: [0, 0, 2.6],    ra: [0, 0, -2.6],  ll: [0.5, 0, 0],  rl: [-0.3, 0, 0], body: [-0.05, 0, 0] },
  run:     { la: [-1.0, 0, 0.1], ra: [1.0, 0, -0.1], ll: [0.8, 0, 0], rl: [-0.8, 0, 0], body: [0.12, 0, 0] },
  point:   { la: [0, 0, 0.1],    ra: [-1.55, 0, 0.15], ll: [0, 0, 0], rl: [0, 0, 0],    body: [0, 0, 0] },
  shocked: { la: [-0.15, 0, 2.55], ra: [-0.15, 0, -2.55], ll: [0, 0, 0.05], rl: [0, 0, -0.05], body: [-0.08, 0, 0] },
  hero:    { la: [0, 0, 0.35],   ra: [-0.35, 0, -2.1], ll: [0, 0, 0.12], rl: [0, 0, -0.12], body: [0, 0, 0] },
};

// ---------- build ----------
let root = null;
function build(o) {
  if (root) { scene.remove(root); root.traverse((n) => { n.geometry?.dispose(); if (n.material) [].concat(n.material).forEach((m) => { m.map?.dispose(); m.dispose(); }); }); }
  root = new THREE.Group();
  const body = new THREE.Group(); root.add(body);
  const skin = plastic(o.skin), shirt = plastic(o.shirt), pants = plastic(o.pants);
  const pose = POSES[o.pose] || POSES.idle;

  const torso = new THREE.Mesh(box(2, 2, 1), shirt); torso.position.y = 3; body.add(torso);

  // head: slightly rounded block + face decal
  const headG = new THREE.Group(); headG.position.y = 4.62; body.add(headG);
  headG.add(new THREE.Mesh(box(1.25, 1.18, 1.18, 0.32), skin));
  const face = new THREE.Mesh(new THREE.PlaneGeometry(1.05, 1.05), new THREE.MeshStandardMaterial({ map: faceTexture(o.face), transparent: true, roughness: 0.6 }));
  face.position.z = 0.6; headG.add(face);
  if (o.acc === "crown") headG.add(crown());
  if (o.acc === "cap") headG.add(cap(o.shirt));

  const limb = (mat, x, y, rot) => {
    const pivot = new THREE.Group(); pivot.position.set(x, y, 0); pivot.rotation.set(...rot);
    const m = new THREE.Mesh(box(1, 2, 1), mat); m.position.y = -1; pivot.add(m); body.add(pivot); return pivot;
  };
  limb(skin, -1.5, 4, pose.la);
  const ra = limb(skin, 1.5, 4, pose.ra);
  limb(pants, -0.5, 2, pose.ll);
  limb(pants, 0.5, 2, pose.rl);
  if (o.acc === "sword") { const s = sword(); s.position.set(0, -2.05, 0.1); s.rotation.set(Math.PI - 0.35, 0, 0); s.scale.setScalar(1.15); ra.add(s); } // blade continues past the hand, angled slightly towards the camera

  body.rotation.set(...pose.body);
  root.rotation.y = (o.yaw * Math.PI) / 180;
  scene.add(root);

  // framing: full body vs. close-up of upper body
  if (o.framing === "close") { camera.position.set(0, 4.2, 10.5); camera.lookAt(0, 3.7, 0); }
  else { camera.position.set(0, 3.2, 17); camera.lookAt(0, 2.7, 0); }
  // rim colour follows the shirt for a cohesive look
  rim.color.set(o.rim || 0xffffff);
}

let lastKey = "";
const out = document.createElement("canvas"); out.width = out.height = SIZE;
window.renderAvatar = (o) => {
  const k = JSON.stringify(o);
  if (k !== lastKey) {
    build(o);
    renderer.render(scene, camera);
    const g = out.getContext("2d"); g.clearRect(0, 0, SIZE, SIZE); g.drawImage(renderer.domElement, 0, 0);
    lastKey = k;
  }
  return out;
};
window.dispatchEvent(new Event("avatar-ready"));
