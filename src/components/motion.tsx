"use client";

import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useEffect, useRef, type ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Fades a sentence in word by word as it scrolls into view. */
export function WordReveal({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const words = text.split(" ");
  return (
    <motion.p
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-120px" }}
      transition={{ staggerChildren: 0.035 }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block"
          variants={{
            hidden: { opacity: 0.12, y: 6 },
            show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
          }}
        >
          {word}
          {i < words.length - 1 && " "}
        </motion.span>
      ))}
    </motion.p>
  );
}

export function CountUp({
  to,
  duration = 2.2,
  suffix = "",
  className,
}: {
  to: number;
  duration?: number;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const value = useMotionValue(0);
  const text = useTransform(value, (v) => Math.round(v).toLocaleString("en-GB") + suffix);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      value.set(to);
      return;
    }
    const controls = animate(value, to, { duration, ease });
    return () => controls.stop();
  }, [inView, reduce, to, duration, value]);

  return (
    <motion.span ref={ref} className={className}>
      {text}
    </motion.span>
  );
}

/** Words light up one by one as the block is scrolled through. */
export function ScrollWords({ text, accent, className }: { text: string; accent?: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "end 0.55"] });
  const words = text.split(" ");
  const accentStart = accent ? words.length - accent.split(" ").length : words.length;
  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => (
        <ScrollWord key={i} progress={scrollYProgress} from={i / words.length} to={(i + 1) / words.length} accent={i >= accentStart}>
          {word}
          {i < words.length - 1 && " "}
        </ScrollWord>
      ))}
    </p>
  );
}

function ScrollWord({
  children,
  progress,
  from,
  to,
  accent,
}: {
  children: ReactNode;
  progress: MotionValue<number>;
  from: number;
  to: number;
  accent: boolean;
}) {
  const opacity = useTransform(progress, [from, to], [0.14, 1]);
  return (
    <motion.span style={{ opacity }} className={accent ? "italic text-leaf" : undefined}>
      {children}
    </motion.span>
  );
}

/** Moves its child a little slower or faster than the page while it is on screen. */
export function Parallax({ children, amount = 40, className }: { children: ReactNode; amount?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [amount, -amount]);
  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}

/** Grows from slightly small to full size as it scrolls into view. */
export function ScaleIn({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center 0.6"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.86, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.3, 1]);
  return (
    <motion.div ref={ref} style={{ scale, opacity }} className={className}>
      {children}
    </motion.div>
  );
}

/** Image wipe: uncovers its child from the bottom when it enters the view. */
export function Wipe({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ clipPath: "inset(100% 0 0 0 round 24px)", y: 30 }}
      whileInView={{ clipPath: "inset(0% 0 0 0 round 24px)", y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 1.1, ease, delay }}
    >
      {children}
    </motion.div>
  );
}

/** One huge line of text that slides sideways with the scroll. */
export function ScrollMarquee({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["4%", "-38%"]);
  return (
    <div ref={ref} className={`overflow-hidden ${className ?? ""}`} aria-hidden>
      <motion.div style={{ x }} className="flex w-max whitespace-nowrap">
        {children}
      </motion.div>
    </div>
  );
}

/** Thin bar under the header showing how far down the page you are. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return <motion.div style={{ scaleX: scrollYProgress }} className="fixed inset-x-0 top-0 z-[55] h-[3px] origin-left bg-ember" aria-hidden />;
}
