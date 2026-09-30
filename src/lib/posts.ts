import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "src/content/posts");

export type Post = {
  slug: string;
  title: string;
  date: string;
  updated: string;
  author: string;
  categories: string[];
  tags: string[];
  cover: string | null;
  excerpt: string;
  body: string;
  readingMinutes: number;
};

export const CATEGORIES = [
  { slug: "press_release", label: "Press Release" },
  { slug: "media-coverage", label: "Media Coverage" },
  { slug: "focus-trees", label: "Focus Trees" },
] as const;

// Wix usernames shown on some posts, mapped to real names
const AUTHOR_NAMES: Record<string, string> = {
  anitahaddock: "Anita Haddock",
  "Tremap Admin": "Tremap",
};

export function tagSlug(tag: string) {
  return tag.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

let cache: Post[] | null = null;

export function getAllPosts(): Post[] {
  if (cache) return cache;
  const posts = fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const { data, content } = matter(fs.readFileSync(path.join(POSTS_DIR, file), "utf8"));
      const words = content.split(/\s+/).filter(Boolean).length;
      return {
        slug: file.replace(/\.md$/, ""),
        title: data.title,
        date: data.date,
        updated: data.updated ?? data.date,
        author: AUTHOR_NAMES[data.author] ?? data.author,
        categories: data.categories ?? [],
        tags: data.tags ?? [],
        cover: data.cover ?? null,
        excerpt: String(data.excerpt ?? "").replace(/\s+/g, " ").trim(),
        body: content.trim(),
        readingMinutes: Math.max(1, Math.round(words / 220)),
      } satisfies Post;
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
  cache = posts;
  return posts;
}

export function getPost(slug: string) {
  return getAllPosts().find((p) => p.slug === slug);
}

export function formatDate(date: string) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}
