import type { MetadataRoute } from "next";
import { ROLES } from "@/lib/questions";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/questions`,
      lastModified: new Date("2026-07-07"),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    ...ROLES.map((r) => ({
      url: `${SITE_URL}/questions/${r.slug}`,
      lastModified: new Date("2026-07-07"),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
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
