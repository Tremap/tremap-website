import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/motion";
import { Button, Container, CtaBand, Eyebrow, H2, PageHero, Panel, Section } from "@/components/ui";
import { m } from "@/lib/media";
import { CONTACT, mailto } from "@/lib/site";

export const metadata: Metadata = {
  title: "Creative Connect",
  description:
    "Do you paint, draw or photograph trees? Are you a musician or composer? Attach your creative work to trees in the Tremap app and put it in front of a global audience.",
};

const APPLY = mailto(
  CONTACT.salesEmail,
  "I'd love to be among the first 100 artists to host my tree art on the Tremap Virtual Exhibition Space!",
);

const NOW = [
  { title: "Map the tree & digitally label it", image: "943aed_dad1f747fdc74480813b88c1857e53a4~mv2.png" },
  { title: "Attach artwork", image: "943aed_1ccde8cf8d044aada2102c3c42470401~mv2.png" },
  { title: "Add photo & video content", image: "943aed_5c726ee5628042458d900b5b7ecf6d17~mv2.png" },
  { title: "Embed interactive maps in websites", image: "943aed_8a4a3e27f9e7431abbece2ee946a9801~mv2.png" },
];

const SOON = [
  {
    title: "Comments, likes, audio & sharing",
    body: "Enable viewer comments, track likes, attach audio, personalise trees and share tree locations and art on social media.",
    image: "943aed_8cd5f0c772a040eebaae827f29c8073c~mv2.png",
  },
  {
    title: "QR codes to your gallery",
    body: "Generate QR codes and bring visitors directly to your virtual tree-point gallery in the Tremap app or a webmap on your own site.",
    image: "943aed_dae6daf1efdd48eeb2dc449b9f3fa1ba~mv2.png",
  },
  {
    title: "Sell your work!",
    body: "Add a Buy Now button to your tree-point and sell your art directly to viewers.",
    image: "943aed_92ac60217ad0421abe2a233ecb46705c~mv2.png",
  },
];

export default function CreativeConnectPage() {
  const wordmark = m("943aed_8bb5589531364cfa95b5b1b715da6919~mv2.png");
  return (
    <>
      <PageHero
        eyebrow="Tremap Creative Connect · for artists"
        title={<>Trees. Art. <em>People.</em></>}
        intro="Do you paint, draw or photograph trees? Are you a musician or composer? Attach your creative work (visual or musical) to trees in the Tremap app and put it in front of a global audience!"
        image={m("943aed_d264efade3e04226bcbe7af31163ed27~mv2.jpg")}
        imagePosition="center 30%"
      >
        <Button href={APPLY}>Get more info</Button>
      </PageHero>

      <Section className="!pb-10">
        <Container>
          <Reveal className="flex justify-center">
            <Image src={wordmark.src} alt="Tremap Creative Connect" width={wordmark.w} height={wordmark.h} className="h-8 w-auto sm:h-10" />
          </Reveal>
        </Container>
      </Section>

      <Section className="!pt-0">
        <Container>
          <Reveal className="relative overflow-hidden rounded-[28px]">
            <Image src={m("943aed_d94b5a279abf44489108ac5a9eee5eff~mv2.jpg").src} alt="The Nearly Home Trees, Cornwall, UK" width={2000} height={1340} sizes="100vw" className="h-auto w-full" />
            <p className="absolute bottom-5 left-5 rounded-full bg-white/85 px-4 py-2 text-sm font-medium text-forest backdrop-blur">
              The Nearly Home Trees, Cornwall, UK
            </p>
          </Reveal>
          <div className="mt-20">
            <Reveal>
              <Eyebrow>How it works</Eyebrow>
              <H2 className="mt-5 max-w-2xl">
                Your art, pinned to the <em>tree that inspired it.</em>
              </H2>
            </Reveal>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {NOW.map((s, i) => {
                const img = m(s.image);
                return (
                  <Reveal key={s.title} delay={0.06 * i} className="flex flex-col overflow-hidden rounded-[28px] bg-white ring-1 ring-forest/5">
                    <div className="relative aspect-[4/5] bg-mist">
                      <Image src={img.src} alt={s.title} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-contain p-3" />
                    </div>
                    <p className="p-6 font-display text-xl leading-snug text-forest">{s.title}</p>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </Container>
      </Section>

      <Panel tone="mist">
        <Container>
          <Reveal>
            <Eyebrow>Features coming soon!</Eyebrow>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {SOON.map((s, i) => {
              const img = m(s.image);
              return (
                <Reveal key={s.title} delay={0.08 * i} className="flex flex-col overflow-hidden rounded-[28px] bg-white">
                  <div className="relative aspect-square bg-white">
                    <Image src={img.src} alt={s.title} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-contain p-4" />
                  </div>
                  <div className="p-7">
                    <h3 className="font-display text-2xl text-forest">{s.title}</h3>
                    <p className="mt-2 leading-relaxed text-stone">{s.body}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </Panel>

      <Section>
        <Container>
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-leaf">Featured artist</p>
            <p className="mt-5 font-display text-4xl font-light text-forest">Theo Crutchley-Mack</p>
            <p className="mt-2 text-stone">British Artist, Cornwall, UK</p>
            <div className="mt-6">
              <Button href="/post/tremap-x-theo-cruthley-mack" variant="outline">
                Read the story
              </Button>
            </div>
          </Reveal>
        </Container>
      </Section>

      <CtaBand title={<>Want to see how Tremap can widen the audience for <em>your creative work?</em></>}>
        <Button href={APPLY}>Get more info</Button>
      </CtaBand>
    </>
  );
}
