import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogIndex } from "@/components/BlogIndex";
import { getAllPosts, tagSlug } from "@/lib/posts";

export const dynamicParams = false;

function allTags() {
  const tags = new Map<string, string>();
  for (const p of getAllPosts()) for (const t of p.tags) tags.set(tagSlug(t), t);
  return tags;
}

export function generateStaticParams() {
  return [...allTags().keys()].map((tag) => ({ tag }));
}

export async function generateMetadata({ params }: PageProps<"/blog/tags/[tag]">): Promise<Metadata> {
  const { tag } = await params;
  return { title: `#${allTags().get(tag) ?? tag}` };
}

export default async function TagPage({ params }: PageProps<"/blog/tags/[tag]">) {
  const { tag } = await params;
  const label = allTags().get(tag);
  if (!label) notFound();
  const posts = getAllPosts().filter((p) => p.tags.some((t) => tagSlug(t) === tag));
  return <BlogIndex posts={posts} title={<>#{label}</>} intro={`Posts tagged ${label}.`} />;
}
