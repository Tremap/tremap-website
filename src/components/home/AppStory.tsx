"use client";

import Image from "next/image";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useRef, useState, type ReactNode } from "react";
import type { MediaItem } from "@/lib/media";

export type AppStep = { title: string; body: string; shot: MediaItem; alt: string };

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * "Get the app" told in three steps. On desktop the section pins while the
 * phone screen changes with the scroll; on small screens it is a plain list.
 */
export function AppStory({ intro, steps, footer }: { intro: ReactNode; steps: AppStep[]; footer: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(Math.min(steps.length - 1, Math.floor(v * steps.length)));
  });

  return (
    <section className="px-2 sm:px-3">
      <div className="rounded-[28px] bg-mist sm:rounded-[36px]">
        {/* Desktop: pinned */}
        <div ref={ref} className="relative hidden lg:block" style={{ height: `${steps.length * 85 + 60}vh` }}>
          <div className="sticky top-0 flex h-screen items-center">
            <div className="mx-auto grid w-full max-w-7xl grid-cols-[1.1fr_0.9fr] items-center gap-16 px-14">
              <div>
                {intro}
                <ol className="mt-10 space-y-1">
                  {steps.map((step, i) => (
                    <li key={step.title} className="relative flex gap-5 py-3 pl-1">
                      <span className="absolute bottom-0 left-[1.2rem] top-0 w-px bg-forest/10" />
                      <motion.span
                        className="absolute left-[1.2rem] top-0 w-px origin-top bg-ember"
                        style={{ bottom: 0 }}
                        animate={{ scaleY: i < active ? 1 : i === active ? 0.6 : 0 }}
                        transition={{ duration: 0.6, ease }}
                      />
                      <span
                        className={`relative z-10 grid size-9 shrink-0 place-items-center rounded-full font-display text-sm transition-colors duration-500 ${
                          i <= active ? "bg-forest text-white" : "bg-white text-stone ring-1 ring-forest/10"
                        }`}
                      >
                        {i + 1}
                      </span>
                      <div className={`transition-opacity duration-500 ${i === active ? "opacity-100" : "opacity-40"}`}>
                        <h3 className="font-display text-2xl font-light text-forest">{step.title}</h3>
                        <p className="mt-1 max-w-sm leading-relaxed text-stone">{step.body}</p>
                      </div>
                    </li>
                  ))}
                </ol>
                <div className="mt-10">{footer}</div>
              </div>

              <div className="relative mx-auto w-[min(19rem,36vh)]">
                <div className="absolute -inset-16 -z-10 rounded-full bg-leaf/20 blur-3xl" />
                <div className="relative rounded-[2.6rem] bg-ink p-2.5 shadow-[0_50px_100px_-30px_rgba(18,36,26,0.6)] ring-1 ring-black/40">
                  <div className="absolute left-1/2 top-4 z-10 h-5 w-20 -translate-x-1/2 rounded-full bg-ink" />
                  <div className="relative overflow-hidden rounded-[2rem]" style={{ aspectRatio: `${steps[0].shot.w} / ${steps[0].shot.h}` }}>
                    <AnimatePresence initial={false}>
                      <motion.div
                        key={active}
                        className="absolute inset-0"
                        initial={{ y: "12%", opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.7, ease }}
                      >
                        <Image src={steps[active].shot.src} alt={steps[active].alt} fill sizes="320px" className="object-cover object-top" />
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Phone and tablet: simple list */}
        <div className="px-6 py-20 sm:px-10 lg:hidden">
          {intro}
          <ol className="mt-10 space-y-10">
            {steps.map((step, i) => (
              <li key={step.title} className="flex flex-col gap-6 sm:flex-row sm:items-center">
                <div className="flex-1">
                  <span className="grid size-9 place-items-center rounded-full bg-forest font-display text-sm text-white">{i + 1}</span>
                  <h3 className="mt-4 font-display text-2xl font-light text-forest">{step.title}</h3>
                  <p className="mt-1 leading-relaxed text-stone">{step.body}</p>
                </div>
                <div className="mx-auto w-52 rounded-[2.2rem] bg-ink p-2 shadow-[0_30px_60px_-30px_rgba(18,36,26,0.6)]">
                  <Image src={step.shot.src} alt={step.alt} width={step.shot.w} height={step.shot.h} sizes="208px" className="h-auto w-full rounded-[1.7rem]" />
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-12">{footer}</div>
        </div>
      </div>
    </section>
  );
}
