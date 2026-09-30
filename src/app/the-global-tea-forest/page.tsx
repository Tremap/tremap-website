import type { Metadata } from "next";
import Image from "next/image";
import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/motion";
import { SpeciesMap } from "@/components/SpeciesMap";
import { Button, Container, Eyebrow, H2, PageHero, Panel, Section } from "@/components/ui";
import { m } from "@/lib/media";

export const metadata: Metadata = {
  title: "The Global Tea Forest",
  description:
    "Mapping one of the most widely cultivated plants on Earth. Sponsor the Global Tea Forest and connect your organisation to every mapped tea bush.",
};

const WHY = [
  { title: "A Data Point", body: "Tracking location, condition, and growth." },
  { title: "A Story", body: "Preserving the origin, terroir, and stewardship of the land." },
  { title: "A Connection", body: "Bridging the gap between people and nature." },
];

const BENEFITS = [
  { title: "Nature at Scale", body: "Map tens of billions of living plants & lead environmental change." },
  { title: "Global Reach", body: "Connect with a species spanning continents & supply chains." },
  { title: "Measurable Impact", body: "Support a transparent dataset showing biodiversity tracking." },
  { title: "Cultural Significance", body: "Champion the world's 2nd most consumed beverage." },
];

export default function GlobalTeaForestPage() {
  const hero = m("2d97491482e74e98bfcc09d7cf6c2f7c.jpg");
  const field = m("7a80d103056d491895f4d6be5be211ef.jpg");
  const workers = m("b3439c889d78466794d2e459f37bca82.jpg");
  return (
    <>
      <PageHero
        eyebrow="Camellia sinensis"
        title={<>The Global <em>Tea Forest.</em></>}
        intro="Mapping one of the most widely cultivated plants on Earth."
        image={hero}
      >
        <Button href="#sponsor">Explore sponsorship</Button>
      </PageHero>

      <Section>
        <Container className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <Image src={field.src} alt="Green tea field" width={field.w} height={field.h} sizes="(min-width: 1024px) 50vw, 100vw" className="h-auto w-full rounded-[28px]" />
          </Reveal>
          <Reveal delay={0.1}>
            <Eyebrow>Making a lasting impact</Eyebrow>
            <H2 className="mt-5">
              An estimated <em>50 billion</em> tea bushes grow worldwide.
            </H2>
            <p className="mt-6 text-lg leading-relaxed text-stone">
              From the mist-covered mountains of Asia to emerging plantations in Africa, <em>Camellia sinensis</em> is more than just a crop. Your
              sponsorship enables anyone with a smartphone to contribute to a shared, evolving dataset. This provides vital open insights for
              climate, agriculture, and biodiversity.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-stone">
              As a sponsor, your organisation is visibly connected to every mapped tree within your chosen region or species, creating a lasting
              association with one of the world&apos;s most important cultivated plants.
            </p>
            <div className="mt-8">
              <Button href="#sponsor">Explore sponsorship</Button>
            </div>
          </Reveal>
        </Container>
      </Section>

      <Panel tone="deep">
        <Container>
          <Reveal>
            <Eyebrow light>Why map tea?</Eyebrow>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {WHY.map((w, i) => (
              <Reveal key={w.title} delay={0.08 * i} className="rounded-3xl bg-white/[0.06] p-8 ring-1 ring-white/10">
                <h3 className="font-display text-3xl font-light">{w.title}</h3>
                <p className="mt-3 text-white/70">{w.body}</p>
              </Reveal>
            ))}
          </div>
          <div className="mt-5 grid gap-px overflow-hidden rounded-3xl bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {BENEFITS.map((b, i) => (
              <Reveal key={b.title} delay={0.06 * i} className="bg-forest-deep p-8">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-ember-soft">{b.title}</p>
                <p className="mt-3 text-lg leading-relaxed text-white/80">{b.body}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Panel>

      <Section>
        <Container>
          <Reveal>
            <SpeciesMap genus="Camellia" species="sinensis" lat={22} lng={90} zoom={3} label="tea bush" poster={field.src} />
          </Reveal>
        </Container>
      </Section>

      <Section id="sponsor" className="!pt-0">
        <Container className="grid gap-14 lg:grid-cols-2">
          <Reveal className="relative hidden overflow-hidden rounded-[28px] lg:block">
            <Image src={workers.src} alt="Tea field workers" fill sizes="45vw" className="object-cover" />
          </Reveal>
          <Reveal delay={0.1} className="rounded-[28px] bg-mist p-6 sm:p-10">
            <Eyebrow>Become a sponsor</Eyebrow>
            <H2 className="mt-5">
              Contact us <em>today.</em>
            </H2>
            <div className="mt-8">
              <ContactForm topic="Global Tea Forest sponsorship" submitLabel="Submit" withOrganisation />
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
