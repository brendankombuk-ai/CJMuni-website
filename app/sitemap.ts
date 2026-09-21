import type { MetadataRoute } from "next";
import { CAPABILITIES } from "@/data/capabilities";
import { SITE_URL } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = [
    "",
    "/capabilities",
    "/products",
    "/projects",
    "/contact",
    "/privacy",
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const capabilityRoutes = CAPABILITIES.map((c) => ({
    url: `${SITE_URL}/capabilities/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...capabilityRoutes];
}
