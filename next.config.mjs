/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: import.meta.dirname,
  // Static HTML export for GitHub Pages
  output: "export",
  trailingSlash: true,
  // Set BASE_PATH="/repo-name" when served from username.github.io/repo-name (empty for a custom domain)
  basePath: process.env.BASE_PATH || "",
  // Plain <video src> isn't prefixed automatically, so expose basePath to the client
  env: { NEXT_PUBLIC_BASE_PATH: process.env.BASE_PATH || "" },
};

export default nextConfig;
