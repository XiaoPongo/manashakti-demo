import type { NextConfig } from "next";

/**
 * GitHub Pages static export configuration.
 *
 * - `output: "export"` produces a fully static site in `out/`.
 * - `images.unoptimized` is required because the image optimization server
 *   is not available in a static export.
 * - `basePath` / `assetPrefix` are set from `NEXT_PUBLIC_BASE_PATH` so that
 *   project-page repos (e.g. `username.github.io/my-repo`) work correctly.
 *   For a user/org page (`username.github.io`), leave it empty.
 *
 * Local dev (`bun run dev`) ignores `output: "export"` and runs normally
 * with basePath unset — so localhost:3000 works as expected.
 *
 * To build for GitHub Pages (project site), run:
 *   NEXT_PUBLIC_BASE_PATH=/your-repo-name bun run build
 * Then deploy the `out/` folder.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  reactStrictMode: false,
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
