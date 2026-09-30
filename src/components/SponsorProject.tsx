import Image from "next/image";
import type { ReactNode } from "react";
import type { MediaItem } from "@/lib/media";
import { Reveal } from "./motion";
import { Button, Container, Eyebrow, H2, PageHero, Section } from "./ui";

/** Shared layout for single-species sponsorship project pages. */
export function SponsorProject({
  eyebrow,
  title,
  intro,
  hero,
  sponsorLogo,
  sponsorName,
  sponsorHref,
  facts,
  story,
  map,
  cta,
}: {
  eyebrow: string;
  title: ReactNode;
  intro: ReactNode;
  hero: MediaItem;
  sponsorLogo: MediaItem;
  sponsorName: string;
  sponsorHref?: string;
  facts?: { title: string; body: ReactNode }[];
  story: { heading: ReactNode; body: ReactNode };
  map: ReactNode;
  cta: { label: string; href: string };
}) {
  const logo = (
    <Image src={sponsorLogo.src} alt={sponsorName} width={sponsorLogo.w} height={sponsorLogo.h} className="h-12 w-auto object-contain" />
  );
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} intro={intro} image={hero}>
        <Button href={cta.href}>{cta.label}</Button>
        <Button href="#map" variant="outline-light" arrow={false}>
          See the live map
        </Button>
      </PageHero>

      <Section className="!py-12">
        <Container className="flex flex-wrap items-center justify-between gap-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-stone">Sponsored by</p>
          <div className="flex items-center gap-4 rounded-full bg-white px-8 py-4 ring-1 ring-forest/10">
            {sponsorHref ? (
              <a href={sponsorHref} target="_blank" rel="noopener">
                {logo}
              </a>
            ) : (
              logo
            )}
          </div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-stone">Powered by Tremap</p>
        </Container>
      </Section>

      {facts && (
        <Section className="!pt-4">
          <Container>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {facts.map((f, i) => (
                <Reveal key={f.title} delay={0.06 * i} className="rounded-3xl bg-mist p-7">
                  <span className="font-display text-sm text-ember">0{i + 1}</span>
                  <h2 className="mt-3 font-display text-2xl text-forest">{f.title}</h2>
                  <p className="mt-2 leading-relaxed text-stone">{f.body}</p>
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>
      )}

      <Section className="!pt-4">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <Eyebrow>The project</Eyebrow>
            <H2 className="mt-5">{story.heading}</H2>
          </Reveal>
          <Reveal delay={0.1} className="space-y-5 text-lg leading-relaxed text-stone">
            {story.body}
            <div className="pt-4">
              <Button href={cta.href}>{cta.label}</Button>
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section id="map" className="!pt-0">
        <Container>
          <Reveal>{map}</Reveal>
        </Container>
      </Section>
    </>
  );
}
