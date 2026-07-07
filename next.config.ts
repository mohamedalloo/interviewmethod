import type { NextConfig } from "next";

// STATIC_EXPORT=1 builds a fully static demo (GitHub Pages) — the interview
// runs client-side on demo data and app/api is removed by the deploy workflow.
const isStatic = process.env.STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
  ...(isStatic
    ? {
        output: "export" as const,
        basePath: "/interviewmethod",
        images: { unoptimized: true },
      }
    : {}),
};

export default nextConfig;
