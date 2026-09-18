import type { MetadataRoute } from "next";
import { CAPABILITIES } from "@/data/capabilities";

const base = "https://muni.com.pg";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = [
    "",
    "/capabilities",
    "/products",
    "/projects",
    "/contact",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const capabilityRoutes = CAPABILITIES.map((c) => ({
    url: `${base}/capabilities/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...capabilityRoutes];
}
