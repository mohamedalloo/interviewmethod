import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date("2026-07-06"),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/interview`,
      lastModified: new Date("2026-07-06"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];
}
