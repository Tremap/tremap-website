import fs from "node:fs";
import path from "node:path";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Container, PlainHero } from "./ui";

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function textOf(children: React.ReactNode): string {
  if (typeof children === "string") return children;
  if (Array.isArray(children)) return children.map(textOf).join("");
  return "";
}

export function LegalPage({ file, title }: { file: string; title: string }) {
  const md = fs.readFileSync(path.join(process.cwd(), "src/content/legal", file), "utf8");
  const headings = [...md.matchAll(/^## (.+)$/gm)].map((h) => h[1]);
  const updated = md.match(/last updated on (.+)$/m)?.[1];

  return (
    <>
      <PlainHero eyebrow="Legal" title={title} intro={updated ? `Last updated ${updated}.` : undefined} />
      <Container className="pb-28">
        <div className="grid gap-12 lg:grid-cols-[260px_1fr]">
          <nav aria-label="Contents" className="hidden lg:block">
            <div className="sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto rounded-3xl bg-mist p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-stone">Contents</p>
              <ol className="mt-4 space-y-2 text-sm">
                {headings.map((h) => (
                  <li key={h}>
                    <a href={`#${slugify(h)}`} className="text-ink/75 hover:text-leaf">
                      {h}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>
          <div
            className="max-w-3xl leading-relaxed text-ink/80 [overflow-wrap:anywhere]
              [&_a]:text-leaf [&_a]:underline [&_a]:underline-offset-4
              [&_h2]:mt-14 [&_h2]:scroll-mt-28 [&_h2]:font-display [&_h2]:text-3xl [&_h2]:font-light [&_h2]:text-forest
              [&_li]:mt-2 [&_p]:mt-5 [&_strong]:font-semibold [&_strong]:text-forest [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-6 [&>*:first-child]:mt-0"
          >
            <Markdown
              remarkPlugins={[remarkGfm]}
              components={{
                h2: ({ children }) => <h2 id={slugify(textOf(children))}>{children}</h2>,
              }}
            >
              {md}
            </Markdown>
          </div>
        </div>
      </Container>
    </>
  );
}
