import type { Metadata } from "next";
import wixSeo from "@/content/seo.json";

/**
 * Titles and descriptions as Google indexed them on the old Wix site, keyed by
 * path. Pages reuse them word for word so search listings do not change with
 * the move. Edit `src/content/seo.json` to change what a page shows in Google.
 */
const INDEXED = wixSeo as Record<string, { title: string | null; description: string | null }>;

// Wix descriptions that were copied from another page by mistake; ours are used instead
const WRONG_ON_WIX = new Set(["/ghl-cork-oak", "/news"]);

const OPEN_GRAPH_BASE = { siteName: "Tremap", locale: "en_GB" } as const;

type PageMetaInput = {
  /** Used when the old site had no title for this path. The "| Tremap" suffix is added. */
  title: string;
  /** Used when the old site had no description for this path. */
  description?: string;
  type?: "website" | "article";
  images?: string[];
  article?: { publishedTime?: string; modifiedTime?: string; authors?: string[] };
};

/**
 * Metadata for one page: title, description, canonical URL and social tags.
 * Every indexable page should export `metadata = pageMeta("/its-path", {...})`.
 */
export function pageMeta(path: string, input: PageMetaInput): Metadata {
  const indexed = INDEXED[path];
  const indexedTitle = indexed?.title ?? null;
  const fullTitle = indexedTitle ?? `${input.title} | Tremap`;
  const description =
    (!WRONG_ON_WIX.has(path) && indexed?.description) || input.description || undefined;

  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: path },
    openGraph: {
      ...OPEN_GRAPH_BASE,
      type: input.type ?? "website",
      url: path,
      title: fullTitle,
      description,
      ...(input.images?.length ? { images: input.images } : {}),
      ...(input.article ?? {}),
    },
  };
}

/** Structured data for search engines; see https://schema.org */
export function jsonLdScript(data: Record<string, unknown>) {
  // "<" is escaped so content can never close the script tag
  return { __html: JSON.stringify(data).replace(/</g, "\\u003c") };
}
