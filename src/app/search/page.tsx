import type { Metadata } from "next";
import Link from "next/link";
import { Arrow, Container, PlainHero, Section } from "@/components/ui";
import { formatDate, getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Search",
  robots: { index: false },
};

const PAGES = [
  { title: "Home", href: "/", text: "The global tree map. Transparency to trees for the first time. Get the app. Global database." },
  { title: "Solutions", href: "/solutions", text: "Tree mapping digital labelling creative connect agritourism corporate sponsors traceability gardens arboreta community surveying arborists greenspaces tree planting pest disease memorial trees subscription plans" },
  { title: "GreenSpaces", href: "/greenspaces", text: "Management software urban trees green areas QTRA playground inspections councils local authorities R3GIS weather meteo module brochure" },
  { title: "Pricing", href: "/pricing", text: "Subscription plans free starter value pro web portal price trial" },
  { title: "Labelling", href: "/labelling", text: "Digital labels physical labels private gardens treBG botanical gardens visitor guide" },
  { title: "Traceability and Added Value", href: "/traceabilityaddedvalue", text: "QR codes packaging consumers source trees brand olive oil" },
  { title: "Creative Connect", href: "/creativeconnect", text: "Artists art music painting photography trees exhibition sell your work" },
  { title: "Species Sponsors", href: "/speciessponsors", text: "Sponsorship iconic rare endangered species conservation" },
  { title: "The Global Tea Forest", href: "/the-global-tea-forest", text: "Tea Camellia sinensis sponsorship plantations" },
  { title: "Heathrow Black Poplars", href: "/heathrow-black-poplars", text: "Black poplar Populus nigra Heathrow rarest native tree" },
  { title: "GHL Cork Oak", href: "/ghl-cork-oak", text: "Cork oak Quercus suber Glenn Humphries Landscaping" },
  { title: "The Nare Magnolia campbellii", href: "/the-nare-magnolia-campbellii", text: "Magnolia campbellii Darjeeling flamingo spring The Nare" },
  { title: "The Garden of Peace Zaragoza", href: "/gopzaragoza", text: "Zaragoza Spain garden of peace heritage" },
  { title: "About", href: "/about", text: "Team journey founder Jonathon Jones" },
  { title: "Partners", href: "/partners", text: "Funding Innovate UK ERDF Eden Project Exeter Esri R3GIS investment investors" },
  { title: "News & press", href: "/news", text: "Press releases media coverage press kit logo screenshots" },
  { title: "Contact", href: "/contact", text: "Email phone address get in touch" },
  { title: "Privacy policy", href: "/privacy-policy", text: "Privacy personal information data" },
  { title: "Terms and conditions", href: "/terms-and-conditions", text: "Terms conditions agreement" },
];

function score(haystack: string, terms: string[]) {
  const h = haystack.toLowerCase();
  return terms.reduce((n, t) => n + (h.includes(t) ? 1 : 0), 0);
}

export default async function SearchPage({ searchParams }: PageProps<"/search">) {
  const { q } = await searchParams;
  const query = (typeof q === "string" ? q : "").trim().slice(0, 100);
  const terms = query.toLowerCase().split(/\s+/).filter((t) => t.length > 1);

  const pages = terms.length
    ? PAGES.map((p) => ({ ...p, s: score(`${p.title} ${p.title} ${p.text}`, terms) })).filter((p) => p.s > 0).sort((a, b) => b.s - a.s)
    : [];
  const posts = terms.length
    ? getAllPosts()
        .map((p) => ({ p, s: score(`${p.title} ${p.title} ${p.excerpt} ${p.tags.join(" ")} ${p.body}`, terms) }))
        .filter((x) => x.s > 0)
        .sort((a, b) => b.s - a.s)
    : [];

  return (
    <>
      <PlainHero eyebrow="Search" title={query ? <>Results for <em>&ldquo;{query}&rdquo;</em></> : "Search the site"} />
      <Section className="!pt-2">
        <Container>
          <form action="/search" className="flex max-w-2xl items-center gap-2 rounded-full bg-white p-2 pl-6 ring-1 ring-forest/10 focus-within:ring-leaf">
            <label htmlFor="q" className="sr-only">
              Search
            </label>
            <input id="q" name="q" defaultValue={query} placeholder="Search pages and posts…" className="min-w-0 flex-1 bg-transparent text-lg outline-none" />
            <button type="submit" className="rounded-full bg-forest px-6 py-3 font-semibold text-white">
              Search
            </button>
          </form>

          {query && pages.length + posts.length === 0 && <p className="mt-10 text-lg text-stone">No results. Try a different word.</p>}

          {pages.length > 0 && (
            <div className="mt-14">
              <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-stone">Pages</h2>
              <ul className="mt-4 divide-y divide-forest/10 border-y border-forest/10">
                {pages.map((p) => (
                  <li key={p.href}>
                    <Link href={p.href} className="group flex items-center justify-between py-5">
                      <span className="font-display text-2xl text-forest group-hover:text-leaf">{p.title}</span>
                      <Arrow className="text-leaf transition-transform group-hover:translate-x-1" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {posts.length > 0 && (
            <div className="mt-14">
              <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-stone">Posts</h2>
              <ul className="mt-4 divide-y divide-forest/10 border-y border-forest/10">
                {posts.map(({ p }) => (
                  <li key={p.slug}>
                    <Link href={`/post/${p.slug}`} className="group block py-5">
                      <span className="text-sm text-stone">{formatDate(p.date)}</span>
                      <span className="mt-1 block font-display text-2xl text-forest group-hover:text-leaf">{p.title}</span>
                      {p.excerpt && <span className="mt-1 line-clamp-2 block text-stone">{p.excerpt}</span>}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}
