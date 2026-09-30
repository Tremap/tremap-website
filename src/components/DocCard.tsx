import Image from "next/image";

/** Download card for a PDF, showing its first page. */
export function DocCard({ href, cover, title, meta }: { href: string; cover: string; title: string; meta: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      className="group flex items-center gap-5 rounded-3xl bg-white p-4 pr-6 ring-1 ring-forest/10 transition-all hover:-translate-y-0.5 hover:shadow-[0_24px_50px_-24px_rgba(18,36,26,0.35)]"
    >
      <span className="relative block h-28 w-20 shrink-0 overflow-hidden rounded-lg ring-1 ring-forest/10">
        <Image src={cover} alt="" fill sizes="80px" className="object-cover object-top" />
      </span>
      <span>
        <span className="block font-display text-lg leading-snug text-forest group-hover:text-leaf">{title}</span>
        <span className="mt-1 flex items-center gap-2 text-sm text-stone">
          <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
            <path d="M8 2v9M4 7l4 4 4-4M3 14h10" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {meta}
        </span>
      </span>
    </a>
  );
}
