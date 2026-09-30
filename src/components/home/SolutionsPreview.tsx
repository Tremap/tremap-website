"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { MediaItem } from "@/lib/media";
import { Arrow } from "../ui";

export type SolutionRow = {
  audience: string;
  title: string;
  body: string;
  href: string;
  image: MediaItem;
};

export function SolutionsPreview({ rows }: { rows: SolutionRow[] }) {
  const [active, setActive] = useState(0);

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
      <div className="relative hidden lg:block">
        <div className="sticky top-28 aspect-[4/5] overflow-hidden rounded-[28px] bg-sage">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              <Image src={rows[active].image.src} alt="" fill sizes="45vw" className="object-cover" />
            </motion.div>
          </AnimatePresence>
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-forest-deep/70 to-transparent p-7 pt-24">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-sage">{rows[active].audience}</p>
          </div>
        </div>
      </div>

      <ul className="border-t border-forest/10">
        {rows.map((s, i) => (
          <li key={s.title}>
            <Link
              href={s.href}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              className="group block border-b border-forest/10 py-7 outline-none"
            >
              <div className="flex items-start gap-6">
                <span className={`mt-2 font-display text-sm tabular-nums transition-colors ${active === i ? "text-ember" : "text-stone/60"}`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex-1">
                  <p className="text-sm font-medium text-stone">{s.audience}</p>
                  <h3
                    className={`mt-1 font-display text-2xl font-light tracking-[-0.01em] transition-colors duration-300 sm:text-3xl ${
                      active === i ? "text-forest" : "text-forest/70"
                    }`}
                  >
                    {s.title}
                  </h3>
                  <div className={`grid grid-rows-[1fr] transition-all duration-500 ease-out-soft ${active === i ? "" : "lg:grid-rows-[0fr]"}`}>
                    <div className="overflow-hidden">
                      <p className="max-w-md pt-3 leading-relaxed text-stone">{s.body}</p>
                      <div className="relative mt-5 aspect-[16/9] overflow-hidden rounded-2xl lg:hidden">
                        <Image src={s.image.src} alt="" fill sizes="100vw" className="object-cover" />
                      </div>
                    </div>
                  </div>
                </div>
                <span
                  className={`mt-2 grid size-10 shrink-0 place-items-center rounded-full ring-1 transition-all duration-300 ${
                    active === i ? "bg-forest text-white ring-forest" : "text-forest ring-forest/15"
                  }`}
                >
                  <Arrow className="transition-transform duration-300 group-hover:-rotate-45" />
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
