"use client";

import Image from "next/image";
import { motion, useMotionTemplate, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { useRef, useState, type ReactNode } from "react";
import aerial from "@/assets/images/aerial-town.jpg";

const ease = [0.22, 1, 0.36, 1] as const;

// Pins dropped on trees in the aerial photo (percent positions)
const PINS = [
  { x: 63, y: 24, label: "Quercus robur" },
  { x: 80, y: 44, label: "Betula pendula" },
  { x: 57, y: 55 },
  { x: 90, y: 22 },
  { x: 70, y: 66, label: "Fagus sylvatica" },
  { x: 22, y: 30 },
  { x: 36, y: 70 },
];

/**
 * A photo that grows from a small card to the full screen while you scroll,
 * then drops pins on the trees: from the whole planet down to single trees.
 */
export function PlanetToTree({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (v) => setOpen(v > 0.62));

  // Built from plain numbers: interpolating the clip-path string directly is unreliable.
  const insetY = useTransform(scrollYProgress, [0.15, 0.6], [18, 0]);
  const insetX = useTransform(scrollYProgress, [0.15, 0.6], [24, 0]);
  const radius = useTransform(scrollYProgress, [0.15, 0.6], [36, 0]);
  const clipPath = useMotionTemplate`inset(${insetY}% ${insetX}% ${insetY}% ${insetX}% round ${radius}px)`;
  const scale = useTransform(scrollYProgress, [0.15, 0.75], [1.25, 1]);

  return (
    <section ref={ref} className="relative h-[230vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div style={{ clipPath }} className="absolute inset-0 bg-forest-deep">
          <motion.div style={{ scale }} className="absolute inset-0">
            <Image src={aerial} alt="Aerial view of trees among homes" fill placeholder="blur" sizes="100vw" className="object-cover" />
          </motion.div>
          <motion.div
            initial={false}
            animate={{ opacity: open ? 1 : 0 }}
            transition={{ duration: 0.8, ease }}
            className="absolute inset-0 bg-gradient-to-r from-forest-deep/95 via-forest-deep/60 to-forest-deep/10"
          />

          <div className="pointer-events-none absolute inset-0 hidden md:block">
            {PINS.map((pin, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
                initial={false}
                animate={open ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: -18, scale: 0.6 }}
                transition={{ duration: 0.6, ease, delay: open ? 0.15 + i * 0.09 : 0 }}
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
            initial={false}
            animate={open ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, ease }}
            className="absolute inset-0 mx-auto flex w-full max-w-7xl flex-col justify-center px-6 text-white sm:px-10 lg:px-14"
          >
            {children}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
