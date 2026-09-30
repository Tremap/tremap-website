import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Reveal } from "@/components/motion";
import { PostCard } from "@/components/PostCard";
import { ShareButtons } from "@/components/ShareButtons";
import { Arrow, Container, Eyebrow, Section } from "@/components/ui";
import { CATEGORIES, formatDate, getAllPosts, getPost, tagSlug } from "@/lib/posts";
import { SITE_URL } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/post/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt || undefined,
    alternates: { canonical: `/post/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt || undefined,
      publishedTime: post.date,
      modifiedTime: post.updated,
      authors: [post.author],
      images: post.cover ? [post.cover] : undefined,
    },
  };
}

export default async function PostPage({ params }: PageProps<"/post/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const all = getAllPosts();
  const related = all
    .filter((p) => p.slug !== post.slug)
    .sort((a, b) => Number(b.categories.some((c) => post.categories.includes(c))) - Number(a.categories.some((c) => post.categories.includes(c))))
    .slice(0, 3);
  const catSlug = (label: string) => CATEGORIES.find((c) => c.label === label)?.slug;

  return (
    <article>
      <Container className="pb-8 pt-36 sm:pt-44">
        <Reveal className="mx-auto max-w-3xl">
          <Link href="/blog" className="group inline-flex items-center gap-2 text-sm font-semibold text-leaf">
            <Arrow className="rotate-180 transition-transform group-hover:-translate-x-1" /> All posts
          </Link>
          <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-stone">
            {post.categories.map((c) => {
              const s = catSlug(c);
              return s ? (
                <Link key={c} href={`/blog/categories/${s}`} className="rounded-full bg-sage px-3 py-1 font-medium text-forest hover:bg-leaf hover:text-white">
                  {c}
                </Link>
              ) : null;
            })}
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden>·</span>
            <span>{post.readingMinutes} min read</span>
          </div>
          <h1 className="mt-6 font-display text-[clamp(2.2rem,5vw,3.8rem)] font-light leading-[1.06] tracking-[-0.025em] text-forest">{post.title}</h1>
          <p className="mt-6 text-stone">
            By <span className="font-semibold text-ink">{post.author}</span>
          </p>
        </Reveal>
      </Container>

      <Container>
        <div
          className="prose-tremap mx-auto max-w-3xl text-lg leading-relaxed text-ink/85 [overflow-wrap:anywhere]
            [&_a]:font-medium [&_a]:text-leaf [&_a]:underline [&_a]:decoration-leaf/40 [&_a]:underline-offset-4 hover:[&_a]:decoration-leaf
            [&_h2]:mt-12 [&_h2]:font-display [&_h2]:text-3xl [&_h2]:font-light [&_h2]:text-forest
            [&_h3]:mt-10 [&_h3]:font-display [&_h3]:text-2xl [&_h3]:text-forest
            [&_h4]:mt-8 [&_h4]:font-display [&_h4]:text-xl [&_h4]:text-forest
            [&_img]:my-8 [&_img]:h-auto [&_img]:w-full [&_img]:rounded-3xl
            [&_li]:mt-2 [&_ol]:mt-5 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:mt-5 [&_strong]:font-semibold [&_strong]:text-forest
            [&_ul]:mt-5 [&_ul]:list-disc [&_ul]:pl-6 [&>*:first-child]:mt-0"
        >
          <Markdown
            remarkPlugins={[remarkGfm]}
            components={{
              img: ({ src, alt, title }) => (
                <figure>
                  {/* eslint-disable-next-line @next/next/no-img-element -- migrated post images have no stored dimensions */}
                  <img src={typeof src === "string" ? src : ""} alt={alt ?? ""} loading="lazy" decoding="async" />
                  {title && <figcaption className="-mt-4 mb-6 text-center text-sm text-stone">{title}</figcaption>}
                </figure>
              ),
              a: ({ href, children }) => {
                const external = href?.startsWith("http");
                return (
                  <a href={href} {...(external ? { target: "_blank", rel: "noopener" } : {})}>
                    {children}
                  </a>
                );
              },
              p: ({ children, node }) => {
                // Images are rendered as <figure>, which can't sit inside <p>.
                const onlyImage = node?.children.length === 1 && node.children[0].type === "element" && node.children[0].tagName === "img";
                return onlyImage ? <>{children}</> : <p>{children}</p>;
              },
            }}
          >
            {post.body}
          </Markdown>
        </div>

        <div className="mx-auto mt-14 max-w-3xl space-y-6 border-t border-forest/10 pt-8">
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((t) => (
                <Link key={t} href={`/blog/tags/${tagSlug(t)}`} className="rounded-full bg-white px-3 py-1.5 text-sm text-stone ring-1 ring-forest/10 hover:text-forest">
                  #{t}
                </Link>
              ))}
            </div>
          )}
          <ShareButtons url={`${SITE_URL}/post/${post.slug}`} title={post.title} />
        </div>
      </Container>

      <Section>
        <Container>
          <Eyebrow>More from Tremap</Eyebrow>
          <div className="mt-10 grid gap-10 md:grid-cols-3">
            {related.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </Container>
      </Section>
    </article>
  );
}
