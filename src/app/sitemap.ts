import type { MetadataRoute } from "next";
import { CATEGORIES, getAllPosts } from "@/lib/posts";
import { SITE_URL } from "@/lib/site";

const PAGES = [
  "",
  "/solutions",
  "/greenspaces",
  "/pricing",
  "/labelling",
  "/traceabilityaddedvalue",
  "/creativeconnect",
  "/speciessponsors",
  "/the-global-tea-forest",
  "/heathrow-black-poplars",
  "/ghl-cork-oak",
  "/the-nare-magnolia-campbellii",
  "/gopzaragoza",
  "/about",
  "/partners",
  "/news",
  "/blog",
  "/contact",
  "/privacy-policy",
  "/terms-and-conditions",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  return [
    ...PAGES.map((p) => ({ url: `${SITE_URL}${p}`, changeFrequency: "monthly" as const, priority: p === "" ? 1 : 0.7 })),
    ...CATEGORIES.map((c) => ({ url: `${SITE_URL}/blog/categories/${c.slug}`, changeFrequency: "weekly" as const, priority: 0.4 })),
    ...posts.map((p) => ({ url: `${SITE_URL}/post/${p.slug}`, lastModified: p.updated, priority: 0.5 })),
  ];
}
