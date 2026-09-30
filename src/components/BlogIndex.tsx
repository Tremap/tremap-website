import Link from "next/link";
import { Reveal } from "./motion";
import { PostCard } from "./PostCard";
import { Container, PlainHero, Section } from "./ui";
import { CATEGORIES, type Post } from "@/lib/posts";

export function BlogIndex({
  posts,
  title,
  intro,
  active,
}: {
  posts: Post[];
  title: React.ReactNode;
  intro?: string;
  active?: string;
}) {
  const tabs = [{ slug: "", label: "All posts" }, ...CATEGORIES];
  return (
    <>
      <PlainHero eyebrow="Blog" title={title} intro={intro} />
      <Container>
        <div className="flex flex-col gap-4 border-b border-forest/10 pb-6 md:flex-row md:items-center md:justify-between">
          <nav aria-label="Categories" className="flex flex-wrap gap-2">
            {tabs.map((t) => {
              const href = t.slug ? `/blog/categories/${t.slug}` : "/blog";
              const on = (active ?? "") === t.slug;
              return (
                <Link
                  key={t.slug || "all"}
                  href={href}
                  aria-current={on ? "page" : undefined}
                  className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
                    on ? "bg-forest text-white" : "bg-white text-forest ring-1 ring-forest/10 hover:bg-sage"
                  }`}
                >
                  {t.label}
                </Link>
              );
            })}
          </nav>
          <form action="/search" className="flex items-center gap-2 rounded-full bg-white p-1.5 pl-5 ring-1 ring-forest/10 focus-within:ring-leaf md:w-80">
            <label htmlFor="blog-search" className="sr-only">
              Search posts
            </label>
            <input id="blog-search" name="q" placeholder="Search posts…" className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-stone/60" />
            <button type="submit" className="rounded-full bg-forest px-4 py-2 text-sm font-semibold text-white">
              Search
            </button>
          </form>
        </div>
      </Container>
      <Section className="!pt-12">
        <Container>
          {posts.length === 0 ? (
            <p className="text-lg text-stone">No posts yet.</p>
          ) : (
            <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, i) => (
                <Reveal key={post.slug} delay={(i % 3) * 0.06}>
                  <PostCard post={post} priority={i < 3} />
                </Reveal>
              ))}
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}
