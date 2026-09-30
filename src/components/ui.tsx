import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { MediaItem } from "@/lib/media";
import { Reveal } from "./motion";

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden className={className}>
      <path
        d="M1 7h11M8 3l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "ember" | "forest" | "white" | "outline" | "outline-light" | "glass";
  className?: string;
  arrow?: boolean;
};

const BUTTON_STYLES: Record<NonNullable<ButtonProps["variant"]>, string> = {
  ember: "bg-ember text-white hover:bg-[#d9652a]",
  forest: "bg-forest text-white hover:bg-moss",
  white: "bg-white text-forest hover:bg-sage",
  outline: "text-forest ring-1 ring-forest/20 hover:bg-forest/5",
  "outline-light": "text-white ring-1 ring-white/35 hover:bg-white/10",
  glass: "bg-white/10 text-white ring-1 ring-white/30 backdrop-blur hover:bg-white/20",
};

export function Button({ href, children, variant = "ember", className = "", arrow = true }: ButtonProps) {
  const external = /^(https?:|mailto:|tel:)/.test(href) || href.startsWith("/files/");
  const cls = `group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 font-semibold transition-colors ${BUTTON_STYLES[variant]} ${className}`;
  const inner = (
    <>
      {children}
      {arrow && <Arrow className="transition-transform duration-300 group-hover:translate-x-1" />}
    </>
  );
  return external ? (
    <a href={href} className={cls}>
      {inner}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}

export function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <p
      className={`flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.2em] ${
        light ? "text-sage" : "text-leaf"
      }`}
    >
      <span className="h-px w-8 bg-ember" />
      {children}
    </p>
  );
}

export function H2({ children, light = false, className = "" }: { children: ReactNode; light?: boolean; className?: string }) {
  return (
    <h2
      className={`font-display text-[clamp(2.1rem,4.4vw,3.6rem)] font-light leading-[1.06] tracking-[-0.02em] [&_em]:italic ${
        light ? "text-white [&_em]:text-ember-soft" : "text-forest [&_em]:text-leaf"
      } ${className}`}
    >
      {children}
    </h2>
  );
}

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-14 ${className}`}>{children}</div>;
}

/** Rounded full-bleed panel used for tinted/dark bands. */
export function Panel({
  children,
  tone = "mist",
  className = "",
  id,
}: {
  children: ReactNode;
  tone?: "mist" | "forest" | "deep" | "sand" | "white";
  className?: string;
  id?: string;
}) {
  const tones = {
    mist: "bg-mist",
    forest: "bg-forest text-white",
    deep: "bg-forest-deep text-white",
    sand: "bg-sand/60",
    white: "bg-white",
  };
  return (
    <section id={id} className="scroll-mt-24 px-2 sm:px-3">
      <div className={`relative isolate overflow-hidden rounded-[28px] py-20 sm:rounded-[36px] sm:py-28 ${tones[tone]} ${className}`}>
        {children}
      </div>
    </section>
  );
}

export function Section({ children, className = "", id }: { children: ReactNode; className?: string; id?: string }) {
  return (
    <section id={id} className={`scroll-mt-24 py-20 sm:py-28 ${className}`}>
      {children}
    </section>
  );
}

/** Dark image hero used at the top of inner pages. */
export function PageHero({
  eyebrow,
  title,
  intro,
  image,
  children,
  imagePosition = "center",
  logo,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  image: StaticImageData | MediaItem;
  children?: ReactNode;
  imagePosition?: string;
  logo?: ReactNode;
}) {
  const src = "w" in image ? image.src : image;
  return (
    <section className="p-2 sm:p-3">
      <div className="relative isolate flex min-h-[560px] flex-col justify-end overflow-hidden rounded-[28px] bg-forest-deep sm:min-h-[620px] sm:rounded-[36px]">
        <Image
          src={src}
          alt=""
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover"
          style={{ objectPosition: imagePosition }}
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-forest-deep via-forest-deep/60 to-forest-deep/35" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-forest-deep/70 via-forest-deep/20 to-transparent" />
        <Container className="pb-12 pt-36 sm:pb-16">
          <Reveal>
            {logo && <div className="mb-8">{logo}</div>}
            {eyebrow && <Eyebrow light>{eyebrow}</Eyebrow>}
            <h1 className="mt-5 max-w-4xl font-display text-[clamp(2.6rem,6.4vw,5.6rem)] font-light leading-[1] tracking-[-0.03em] text-white [&_em]:italic [&_em]:text-ember-soft">
              {title}
            </h1>
            {intro && <div className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80 sm:text-xl">{intro}</div>}
            {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
          </Reveal>
        </Container>
      </div>
    </section>
  );
}

/** Simple top area for text-only pages (legal, posts, search). */
export function PlainHero({ eyebrow, title, intro }: { eyebrow?: string; title: ReactNode; intro?: ReactNode }) {
  return (
    <Container className="pb-10 pt-36 sm:pt-44">
      <Reveal>
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h1 className="mt-5 max-w-4xl font-display text-[clamp(2.4rem,5.6vw,4.6rem)] font-light leading-[1.02] tracking-[-0.03em] text-forest [&_em]:italic [&_em]:text-leaf">
          {title}
        </h1>
        {intro && <div className="mt-6 max-w-2xl text-lg leading-relaxed text-stone">{intro}</div>}
      </Reveal>
    </Container>
  );
}

export function Img({
  item,
  alt,
  className = "",
  sizes = "(min-width: 1024px) 50vw, 100vw",
  rounded = true,
}: {
  item: MediaItem;
  alt: string;
  className?: string;
  sizes?: string;
  rounded?: boolean;
}) {
  return (
    <Image
      src={item.src}
      alt={alt}
      width={item.w}
      height={item.h}
      sizes={sizes}
      className={`h-auto w-full ${rounded ? "rounded-3xl" : ""} ${className}`}
    />
  );
}

export function CheckItem({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <li className={`flex items-start gap-3 ${light ? "text-white/85" : "text-ink/85"}`}>
      <svg viewBox="0 0 20 20" className={`mt-0.5 size-5 shrink-0 ${light ? "text-sage" : "text-leaf"}`} aria-hidden>
        <circle cx="10" cy="10" r="9" fill="currentColor" opacity="0.18" />
        <path d="M6 10.5l2.5 2.5L14 7.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span>{children}</span>
    </li>
  );
}

/** Reusable closing call-to-action band. */
export function CtaBand({
  title,
  text,
  children,
}: {
  title: ReactNode;
  text?: ReactNode;
  children: ReactNode;
}) {
  return (
    <Panel tone="deep">
      <div className="absolute -right-24 -top-24 -z-10 size-96 rounded-full bg-leaf/20 blur-3xl" />
      <div className="absolute -bottom-32 left-10 -z-10 size-96 rounded-full bg-ember/10 blur-3xl" />
      <Container>
        <Reveal className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <H2 light>{title}</H2>
            {text && <p className="mt-5 text-lg leading-relaxed text-white/75">{text}</p>}
          </div>
          <div className="flex flex-wrap gap-3">{children}</div>
        </Reveal>
      </Container>
    </Panel>
  );
}
