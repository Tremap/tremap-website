"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import logo from "@/assets/logo.png";
import logoWhite from "@/assets/logo-white.png";
import { NAV, PORTAL_URL, type NavItem } from "@/lib/site";
import { Arrow } from "./ui";

// Pages that open with a dark image hero; every other page gets the solid header
const DARK_HERO = new Set([
  "/",
  "/solutions",
  "/greenspaces",
  "/pricing",
  "/labelling",
  "/traceabilityaddedvalue",
  "/creativeconnect",
  "/speciessponsors",
  "/the-global-tea-forest",
  "/heathrow-black-poplars",
  "/ghl-cork-oak",
  "/the-nare-magnolia-campbellii",
  "/about",
  "/partners",
  "/news",
]);

export function Header() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState<string | null>(null);
  const [lastPath, setLastPath] = useState(pathname);

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 40));

  // Close menus after navigating
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
    setMenu(null);
  }

  const solidPage = !DARK_HERO.has(pathname);
  const light = scrolled || open || solidPage;

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between rounded-full px-5 py-2.5 transition-all duration-500 ease-out-soft sm:px-7 ${
          light
            ? "bg-cream/85 shadow-[0_8px_30px_-12px_rgba(18,36,26,0.25)] ring-1 ring-forest/5 backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <Link href="/" aria-label="Tremap home" className="relative block h-7 w-[136px] shrink-0">
          <Image
            src={logoWhite}
            alt=""
            priority
            className={`absolute inset-0 h-7 w-auto transition-opacity duration-500 ${light ? "opacity-0" : "opacity-100"}`}
          />
          <Image
            src={logo}
            alt="Tremap"
            priority
            className={`absolute inset-0 h-7 w-auto transition-opacity duration-500 ${light ? "opacity-100" : "opacity-0"}`}
          />
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex" onMouseLeave={() => setMenu(null)}>
          {NAV.map((item) => (
            <DesktopItem key={item.label} item={item} light={light} menu={menu} setMenu={setMenu} pathname={pathname} />
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={PORTAL_URL}
            className={`hidden rounded-full px-4 py-2 text-[0.92rem] font-medium transition-colors sm:block ${
              light ? "text-ink/75 hover:text-forest" : "text-white/85 hover:text-white"
            }`}
          >
            Portal login
          </a>
          <Link
            href="/contact?topic=demo"
            className="group hidden items-center gap-2 rounded-full bg-ember px-5 py-2.5 text-[0.92rem] font-semibold text-white transition-colors hover:bg-[#d9652a] sm:flex"
          >
            Book a demo
            <Arrow className="transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className={`grid size-10 place-items-center rounded-full lg:hidden ${light ? "text-forest" : "text-white"}`}
          >
            <span className="relative block h-3 w-5">
              <span className={`absolute left-0 top-0 h-0.5 w-5 rounded bg-current transition-transform duration-300 ${open ? "translate-y-[5px] rotate-45" : ""}`} />
              <span className={`absolute bottom-0 left-0 h-0.5 w-5 rounded bg-current transition-transform duration-300 ${open ? "-translate-y-[5px] -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="mx-auto mt-2 max-h-[calc(100svh-6rem)] max-w-7xl overflow-y-auto rounded-3xl bg-cream/97 p-4 shadow-xl ring-1 ring-forest/5 backdrop-blur-xl lg:hidden"
          >
            {NAV.map((item) =>
              "children" in item ? (
                <details key={item.label} className="group rounded-2xl">
                  <summary className="flex cursor-pointer list-none items-center justify-between rounded-2xl px-4 py-3 font-display text-2xl text-forest hover:bg-forest/5">
                    {item.label}
                    <span className="text-lg transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <div className="pb-2 pl-4">
                    {item.children.map((c) => (
                      <Link key={c.href} href={c.href} className="block rounded-xl px-4 py-2.5 text-ink/80 hover:bg-forest/5">
                        {c.label}
                      </Link>
                    ))}
                  </div>
                </details>
              ) : (
                <Link key={item.href} href={item.href} className="block rounded-2xl px-4 py-3 font-display text-2xl text-forest hover:bg-forest/5">
                  {item.label}
                </Link>
              ),
            )}
            <a href={PORTAL_URL} className="block rounded-2xl px-4 py-3 font-display text-2xl text-forest hover:bg-forest/5">
              Portal login
            </a>
            <Link href="/contact?topic=demo" className="mt-2 block rounded-full bg-ember px-5 py-3 text-center font-semibold text-white">
              Book a demo
            </Link>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

function DesktopItem({
  item,
  light,
  menu,
  setMenu,
  pathname,
}: {
  item: NavItem;
  light: boolean;
  menu: string | null;
  setMenu: (v: string | null) => void;
  pathname: string;
}) {
  const base = `rounded-full px-4 py-2 text-[0.92rem] font-medium transition-colors ${
    light ? "text-ink/75 hover:bg-forest/5 hover:text-forest" : "text-white/85 hover:bg-white/10 hover:text-white"
  }`;

  if (!("children" in item)) {
    const active = pathname === item.href;
    return (
      <Link href={item.href} className={`${base} ${active ? (light ? "text-forest" : "text-white") : ""}`}>
        {item.label}
      </Link>
    );
  }

  const isOpen = menu === item.label;
  return (
    <div className="relative" onMouseEnter={() => setMenu(item.label)}>
      <button
        type="button"
        aria-expanded={isOpen}
        onClick={() => setMenu(isOpen ? null : item.label)}
        className={`${base} flex items-center gap-1.5`}
      >
        {item.label}
        <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
          <path d="M2 3.5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        </svg>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-1/2 top-full w-[22rem] -translate-x-1/2 pt-3"
          >
            <div className="rounded-3xl bg-cream p-2.5 shadow-[0_24px_60px_-20px_rgba(18,36,26,0.4)] ring-1 ring-forest/10">
              {item.children.map((c) => (
                <Link
                  key={c.href}
                  href={c.href}
                  className="group/item flex items-center justify-between gap-4 rounded-2xl px-4 py-3 transition-colors hover:bg-white"
                >
                  <span>
                    <span className="block font-semibold text-forest">{c.label}</span>
                    {c.description && <span className="mt-0.5 block text-sm text-stone">{c.description}</span>}
                  </span>
                  <Arrow className="shrink-0 text-leaf opacity-0 transition-all group-hover/item:translate-x-0.5 group-hover/item:opacity-100" />
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
