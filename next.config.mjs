/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: import.meta.dirname,
  // Static HTML export for GitHub Pages
  output: "export",
  trailingSlash: true,
  // Set BASE_PATH="/repo-name" when served from username.github.io/repo-name (empty for a custom domain)
  basePath: process.env.BASE_PATH || "",
};

export default nextConfig;
