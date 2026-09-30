import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogIndex } from "@/components/BlogIndex";
import { CATEGORIES, getAllPosts } from "@/lib/posts";

export const dynamicParams = false;

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ slug: c.slug }));
}

const INTROS: Record<string, string> = {
  press_release: "Recent developments at Tremap.",
  "media-coverage": "Tremap on radio, TV and in the press.",
  "focus-trees": "Remarkable trees and the stories behind them.",
};

export async function generateMetadata({ params }: PageProps<"/blog/categories/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const cat = CATEGORIES.find((c) => c.slug === slug);
  return { title: cat?.label ?? "Blog", description: INTROS[slug] };
}

export default async function CategoryPage({ params }: PageProps<"/blog/categories/[slug]">) {
  const { slug } = await params;
  const cat = CATEGORIES.find((c) => c.slug === slug);
  if (!cat) notFound();
  const posts = getAllPosts().filter((p) => p.categories.includes(cat.label));
  return <BlogIndex posts={posts} title={cat.label} intro={INTROS[slug]} active={slug} />;
}
