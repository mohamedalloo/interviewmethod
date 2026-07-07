import type { NextConfig } from "next";

// STATIC_EXPORT=1 builds a fully static site (GitHub Pages) — the interview
// runs client-side (demo data or BYOK live AI) and app/api is removed by the
// deploy workflow. BASE_PATH is only needed when serving under a subpath
// (github.io/<repo>); the custom domain serves at the root.
const isStatic = process.env.STATIC_EXPORT === "1";
const basePath = process.env.BASE_PATH || "";

const nextConfig: NextConfig = {
  ...(isStatic
    ? {
        output: "export" as const,
        ...(basePath ? { basePath } : {}),
        images: { unoptimized: true },
      }
    : {}),
};

export default nextConfig;
