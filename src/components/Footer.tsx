import Image from "next/image";
import Link from "next/link";
import logoWhite from "@/assets/logo-white.png";
import { CONTACT, PORTAL_URL, SOCIALS } from "@/lib/site";

const COLUMNS = [
  {
    title: "Platform",
    links: [
      { label: "Solutions", href: "/solutions" },
      { label: "GreenSpaces", href: "/greenspaces" },
      { label: "Digital labelling", href: "/labelling" },
      { label: "Traceability", href: "/traceabilityaddedvalue" },
      { label: "Creative Connect", href: "/creativeconnect" },
      { label: "Pricing", href: "/pricing" },
      { label: "Portal login", href: PORTAL_URL },
    ],
  },
  {
    title: "Species",
    links: [
      { label: "Species Sponsors", href: "/speciessponsors" },
      { label: "The Global Tea Forest", href: "/the-global-tea-forest" },
      { label: "Heathrow Black Poplars", href: "/heathrow-black-poplars" },
      { label: "GHL Cork Oak", href: "/ghl-cork-oak" },
      { label: "The Nare Magnolia", href: "/the-nare-magnolia-campbellii" },
      { label: "Garden of Peace Zaragoza", href: "/gopzaragoza" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Partners", href: "/partners" },
      { label: "News & press", href: "/news" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="px-2 pb-2 pt-2 sm:px-3 sm:pb-3">
      <div className="rounded-[28px] bg-forest-deep px-6 pb-8 pt-20 text-white sm:rounded-[36px] sm:px-10 lg:px-14">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
            <div>
              <Image src={logoWhite} alt="Tremap" className="h-8 w-auto" />
              <p className="mt-6 max-w-xs leading-relaxed text-white/60">The global tree map.</p>
              <ul className="mt-6 space-y-2 text-white/75">
                <li>
                  <a href={`mailto:${CONTACT.email}`} className="transition-colors hover:text-ember-soft">
                    {CONTACT.email}
                  </a>
                </li>
                <li>
                  <a href={CONTACT.phoneHref} className="transition-colors hover:text-ember-soft">
                    {CONTACT.phone}
                  </a>
                </li>
                <li className="pt-2 leading-relaxed text-white/55">
                  {CONTACT.address.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </li>
              </ul>
              <div className="mt-8 flex flex-wrap gap-2">
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    className="rounded-full px-4 py-2 text-sm text-white/75 ring-1 ring-white/15 transition-colors hover:bg-white hover:text-forest"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>

            {COLUMNS.map((col) => (
              <div key={col.title}>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sage/80">{col.title}</p>
                <ul className="mt-5 space-y-3">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="text-white/75 transition-colors hover:text-ember-soft">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <form action="/search" className="mt-16 flex max-w-md items-center gap-2 rounded-full bg-white/10 p-1.5 pl-5 ring-1 ring-white/15 focus-within:ring-sage">
            <label htmlFor="footer-search" className="sr-only">
              Search the site
            </label>
            <input
              id="footer-search"
              name="q"
              placeholder="Search the site…"
              className="min-w-0 flex-1 bg-transparent text-white outline-none placeholder:text-white/45"
            />
            <button type="submit" className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-forest transition-colors hover:bg-sage">
              Search
            </button>
          </form>

          <p aria-hidden className="mt-16 select-none font-display text-[clamp(4rem,17vw,15rem)] font-light leading-[0.8] tracking-[-0.05em] text-white/[0.06]">
            every tree.
          </p>

          <div className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-8 text-sm text-white/50 sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} Tremap. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/privacy-policy" className="hover:text-white">
                Privacy policy
              </Link>
              <Link href="/terms-and-conditions" className="hover:text-white">
                Terms &amp; conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
