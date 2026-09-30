"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import heroImg from "@/assets/images/aerial-town.jpg";
import Link from "next/link";
import { PORTAL_URL } from "@/lib/site";
import { Arrow } from "./ui";
import { CountUp } from "./motion";

const ease = [0.22, 1, 0.36, 1] as const;

// Pins dropped on trees in the aerial photo (percent positions)
const PINS = [
  { x: 63, y: 24, label: "Quercus robur", delay: 1.2 },
  { x: 80, y: 44, label: "Betula pendula", delay: 1.6 },
  { x: 57, y: 55, delay: 1.9 },
  { x: 90, y: 22, delay: 2.1 },
  { x: 70, y: 66, delay: 2.3 },
];

export function Hero({ treeCount }: { treeCount: number }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="p-2 sm:p-3">
      <div className="relative isolate flex min-h-[640px] flex-col overflow-hidden rounded-[28px] bg-forest-deep sm:rounded-[36px] h-[calc(100svh-1rem)] sm:h-[calc(100svh-1.5rem)]">
        <motion.div
          style={{ y: imgY }}
          className="absolute inset-0 -z-20"
        >
          <motion.div
            initial={{ scale: 1.15 }}
            animate={{ scale: 1.03 }}
            transition={{ duration: 2.8, ease }}
            className="relative h-full w-full"
          >
            <Image
              src={heroImg}
              alt="Aerial view of trees among homes"
              fill
              priority
              placeholder="blur"
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
        </motion.div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-forest-deep via-forest-deep/55 to-forest-deep/30" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-forest-deep/70 via-transparent to-transparent" />

        {/* Map pins */}
        <div className="pointer-events-none absolute inset-0 -z-10 hidden md:block">
          {PINS.map((pin, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
              initial={{ opacity: 0, y: -14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: pin.delay }}
            >
              <span className="relative block size-3">
                <span className="absolute inset-0 animate-ping-soft rounded-full bg-ember" />
                <span className="absolute inset-0 rounded-full bg-ember ring-2 ring-white/90" />
              </span>
              {pin.label && (
                <span className="absolute left-5 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-white/15 px-3 py-1 text-xs font-medium italic text-white ring-1 ring-white/25 backdrop-blur-md">
                  {pin.label}
                </span>
              )}
            </motion.div>
          ))}
        </div>

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
            <span className="h-px w-10 bg-ember" />
            Transparency to trees for the first time
          </motion.p>

          <h1 className="max-w-4xl font-display text-[clamp(3.2rem,8.5vw,7.4rem)] font-light leading-[0.98] tracking-[-0.03em] text-white">
            <span className="block overflow-hidden pb-[0.08em]">
              <motion.span
                className="block"
                initial={{ y: "105%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.1, ease, delay: 0.45 }}
              >
                The global
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.12em]">
              <motion.span
                className="block italic text-ember-soft"
                initial={{ y: "105%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.1, ease, delay: 0.57 }}
              >
                tree map.
              </motion.span>
            </span>
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
                className="mt-3 block font-display text-4xl font-light tabular-nums text-white sm:text-5xl"
              />
              <p className="mt-1 text-sm text-white/70">
                trees in the Tremap Global Database — and counting!
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
