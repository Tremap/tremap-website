"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import Link from "next/link";
import { PORTAL_URL } from "@/lib/site";
import { WorldTrees } from "./home/WorldTrees";
import { Arrow } from "./ui";
import { CountUp } from "./motion";

const ease = [0.22, 1, 0.36, 1] as const;

const LINES = [
  { text: "The global", className: "" },
  { text: "tree map.", className: "italic text-ember-soft" },
];

export function Hero({ treeCount }: { treeCount: number }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const mapScale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const mapFade = useTransform(scrollYProgress, [0, 0.9], [1, 0.25]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="p-2 sm:p-3">
      <div className="relative isolate flex min-h-[max(640px,calc(100svh-1rem))] flex-col overflow-hidden rounded-[28px] bg-forest-deep sm:h-[calc(100svh-1.5rem)] sm:min-h-[640px] sm:rounded-[36px]">
        {/* Soft light behind the map */}
        <div className="absolute left-1/2 top-[18%] -z-30 size-[60rem] -translate-x-1/2 rounded-full bg-leaf/20 blur-[140px]" />

        <motion.div style={{ scale: mapScale, opacity: mapFade }} className="absolute inset-x-0 top-0 -z-20 h-[100svh] max-sm:opacity-70 sm:inset-0 sm:h-auto">
          <WorldTrees />
        </motion.div>

        <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-t from-forest-deep via-forest-deep/35 to-transparent" />
        <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-forest-deep/60 via-transparent to-transparent" />

        <motion.div
          style={{ y: contentY, opacity: fade }}
          className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-end px-6 pb-10 pt-32 sm:px-10 sm:pb-14 lg:px-14"
        >
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.3 }}
            className="mb-6 flex items-center gap-3 text-sm font-medium uppercase tracking-[0.2em] text-sage"
          >
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.9, ease, delay: 0.3 }}
              className="h-px w-10 origin-left bg-ember"
            />
            Transparency to trees for the first time
          </motion.p>

          <h1 className="max-w-4xl font-display text-[clamp(3.2rem,8.5vw,7.4rem)] font-light leading-[0.98] tracking-[-0.03em] text-white">
            {LINES.map((line, i) => (
              <span key={line.text} className="block overflow-hidden pb-[0.12em]">
                <motion.span
                  className={`block ${line.className}`}
                  initial={{ y: "105%", rotate: 3 }}
                  animate={{ y: 0, rotate: 0 }}
                  transition={{ duration: 1.1, ease, delay: 0.45 + i * 0.12 }}
                  style={{ transformOrigin: "left bottom" }}
                >
                  {line.text}
                </motion.span>
              </span>
            ))}
          </h1>

          <div className="mt-10 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease, delay: 1 }}
              className="max-w-xl"
            >
              <p className="text-lg leading-relaxed text-white/80 sm:text-xl">
                The world&apos;s first global database of trees is here! Tremap
                is a super simple, budget-friendly ledger system for botanical
                gardens, arboreta and city councils. And it&apos;s an engaging,
                fun-to-use app for every person on the planet!
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={PORTAL_URL}
                  className="group flex items-center gap-2 rounded-full bg-white px-6 py-3.5 font-semibold text-forest transition-colors hover:bg-sage"
                >
                  Explore the live map
                  <Arrow className="transition-transform duration-300 group-hover:translate-x-1" />
                </a>
                <Link
                  href="/solutions"
                  className="rounded-full px-6 py-3.5 font-semibold text-white ring-1 ring-white/35 transition-colors hover:bg-white/10"
                >
                  Get more info
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease, delay: 1.2 }}
              className="w-full max-w-sm rounded-3xl bg-white/10 p-6 ring-1 ring-white/20 backdrop-blur-xl sm:w-auto"
            >
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-sage">
                <span className="relative block size-2">
                  <span className="absolute inset-0 animate-ping-soft rounded-full bg-[#8fd18a]" />
                  <span className="absolute inset-0 rounded-full bg-[#8fd18a]" />
                </span>
                Live
              </div>
              <CountUp
                to={treeCount}
                duration={3.4}
                className="mt-3 block font-display text-4xl font-light tabular-nums text-white sm:text-5xl"
              />
              <p className="mt-1 text-sm text-white/70">
                trees in the Tremap Global Database — and counting!
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          style={{ opacity: fade }}
          className="pointer-events-none absolute bottom-5 left-1/2 hidden -translate-x-1/2 lg:block"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.4, duration: 1 }}
            className="relative block h-9 w-px overflow-hidden bg-white/20"
          >
            <span className="absolute inset-x-0 top-0 h-3 animate-scroll-hint bg-white" />
          </motion.span>
        </motion.div>
      </div>
    </section>
  );
}
