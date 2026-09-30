import Image from "next/image";
import Link from "next/link";
import { formatDate, type Post } from "@/lib/posts";

export function PostCard({ post, priority = false }: { post: Post; priority?: boolean }) {
  return (
    <Link href={`/post/${post.slug}`} className="group flex h-full flex-col">
      <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-white ring-1 ring-forest/5">
        {post.cover ? (
          <Image
            src={post.cover}
            alt=""
            fill
            priority={priority}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-[1.2s] ease-out-soft group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-sage to-mist" />
        )}
      </div>
      <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-stone">
        {post.categories[0] && (
          <span className="rounded-full bg-sage px-3 py-1 font-medium text-forest">{post.categories[0]}</span>
        )}
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        <span aria-hidden>·</span>
        <span>{post.readingMinutes} min read</span>
      </div>
      <h3 className="mt-3 font-display text-2xl font-light leading-snug text-forest transition-colors group-hover:text-leaf">
        {post.title}
      </h3>
      {post.excerpt && <p className="mt-2 line-clamp-2 text-stone">{post.excerpt}</p>}
    </Link>
  );
}
