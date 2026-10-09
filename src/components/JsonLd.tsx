import { jsonLdScript } from "@/lib/seo";

/** Renders one block of schema.org structured data. */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(data)} />;
}
