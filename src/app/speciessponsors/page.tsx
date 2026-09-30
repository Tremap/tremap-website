import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion";
import { Arrow, Button, Container, CtaBand, PageHero, Section } from "@/components/ui";
import { m } from "@/lib/media";

export const metadata: Metadata = {
  title: "Species Sponsors",
  description:
    "Support conservation with Species Sponsorship. Partner with tremap technology to protect species and make a real impact today.",
};

const PROJECTS = [
  {
    nickname: "The “Pink Flamingo”",
    species: "Magnolia campbellii",
    sponsor: "The Nare",
    body: "Native to Darjeeling, India, this stunning flowering tree never fails to wow in gardens across the world. Together with The Nare hotel in Cornwall, UK, Tremap is mapping this iconic species across the globe!",
    href: "/the-nare-magnolia-campbellii",
    image: "7ca40b_b16445ea7aa74e9e9ff0a287299606fe~mv2.jpg",
  },
  {
    nickname: "The Last Survivors",
    species: "Black Poplar",
    sponsor: "Heathrow",
    body: "Did you know that there are only 7,000 of these beautiful trees left in the UK (and of those, just an estimated 200 females!) Join Tremap and sponsor Heathrow in tracking the location of these stately, but endangered trees!",
    href: "/heathrow-black-poplars",
    image: "943aed_7c7ea9767e1847009ea5dc5ed28a87e0~mv2.jpg",
  },
  {
    nickname: "The “Regenerating Wonder”",
    species: "Cork Oak",
    sponsor: "GHL",
    body: "Native to the Mediterranean Basin, this remarkable evergreen is unique for its thick, insulating bark. Unusually, it can be harvested every 9 years without harming the tree! Together with GHL, Tremap is mapping these symbols of sustainability across the globe.",
    href: "/ghl-cork-oak",
    image: "173562_d282b95f8d044ff9a4214a22b570e7f7~mv2.webp",
  },
  {
    nickname: "The Global Tea Forest",
    species: "Camellia sinensis",
    sponsor: "Open for sponsors",
    body: "An estimated 50 billion tea bushes grow worldwide. Connect your organisation to every mapped tree within your chosen region — a lasting association with one of the world's most important cultivated plants.",
    href: "/the-global-tea-forest",
    image: "7a80d103056d491895f4d6be5be211ef.jpg",
  },
];

export default function SpeciesSponsorsPage() {
  return (
    <>
      <PageHero
        eyebrow="Species sponsorship"
        title={<>Map the <em>iconic, rare and endangered</em> species of the planet.</>}
        intro="Tremap is delighted to partner with global leaders to map the iconic, rare and endangered species of the planet. Here are a few great examples."
        image={m("47c39fb6e7f245c6af0ec782f3a4364e.jpg")}
      >
        <Button href="/contact?topic=species-sponsorship">Become a sponsor</Button>
      </PageHero>

      <Section>
        <Container>
          <div className="grid gap-8 md:grid-cols-2">
            {PROJECTS.map((p, i) => {
              const img = m(p.image);
              return (
                <Reveal key={p.href} delay={(i % 2) * 0.1}>
                  <Link href={p.href} className="group flex h-full flex-col overflow-hidden rounded-[28px] bg-white ring-1 ring-forest/5 transition-shadow hover:shadow-[0_30px_60px_-30px_rgba(18,36,26,0.4)]">
                    <div className="relative aspect-[16/11] overflow-hidden bg-mist">
                      <Image src={img.src} alt={p.species} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover transition-transform duration-[1.2s] ease-out-soft group-hover:scale-105" />
                      <span className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-forest backdrop-blur">
                        {p.sponsor}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-8">
                      <p className="text-sm italic text-leaf">{p.species}</p>
                      <h2 className="mt-1 font-display text-3xl font-light text-forest">{p.nickname}</h2>
                      <p className="mt-4 flex-1 leading-relaxed text-stone">{p.body}</p>
                      <span className="mt-6 inline-flex items-center gap-2 font-semibold text-forest">
                        Learn more <Arrow className="transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </Section>

      <CtaBand
        title={<>Put your name to the <em>trees that matter.</em></>}
        text="Sponsor a species or region and your brand appears on every mapped tree — while supporting the people mapping and protecting them."
      >
        <Button href="/contact?topic=species-sponsorship">Become a sponsor</Button>
      </CtaBand>
    </>
  );
}
