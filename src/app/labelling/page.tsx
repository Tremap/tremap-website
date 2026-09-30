import type { Metadata } from "next";
import Image from "next/image";
import { DocCard } from "@/components/DocCard";
import { Reveal } from "@/components/motion";
import { Phone } from "@/components/Phone";
import { Button, CheckItem, Container, CtaBand, Eyebrow, H2, PageHero, Panel, Section } from "@/components/ui";
import { m } from "@/lib/media";
import { APP_LINKS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Labelling",
  description: "Label any tree and add it to the Tremap global database of trees.",
};

const OLD = [
  "Expensive and time-consuming to maintain",
  "Environmentally damaging",
  "Damaging to trees",
  "Easily lost, perish, fade and “disappear”",
  "Limited information",
];

const NEW = [
  "Cheaper to maintain. Instantaneous labelling.",
  "Environmentally friendly – no plastic, no metal",
  "Zero damage to trees/woody plants",
  "Zero maintenance",
  "Track much more information",
];

const FEATURES = [
  ["Map and digitally label up to 200 trees and plants on your phone", "More options for bigger collections available."],
  ["Cloud based Tremap Web Portal", "View, edit and add collection information on your desktop."],
  ["Share access for up to 3 users", "Let others you trust add and edit collection information."],
  ["Attach up to 3 photos per tree", "Record pruning, flowering and other details."],
  ["Secure your garden", "Reserve access to your digital collection and virtual property boundaries."],
];

const TREBG = [
  "Map and create virtual labels in seconds right on your phone — no more time and money spent on physical labelling systems.",
  "A slick Virtual Visitor Guide: images and video, text, social links, “likes”, donations for the care of a tree and personalisation of a tree to a person or company.",
  "Integrates with the treTube Tree Species Video Library — two-minute video vignettes for any tree in your collection.",
  "Protect your trees from harmful foot traffic around roots — visitors no longer need to approach trees to read labels.",
  "Hassle-free import of existing collection datasets, with automatic digital labelling of existing tree data.",
  "Export your collection data in CSV format in seconds for any reporting or analysis system.",
  "Geofencing protects your virtual collection from unauthorised editing; rare and valuable species can be hidden from public view.",
  "Browser-based desktop interface for an overview of your collection and record maintenance.",
];

export default function LabellingPage() {
  return (
    <>
      <PageHero
        eyebrow="Tree mapping & digital labelling"
        title={<>Tired of maintaining <em>physical labels?</em></>}
        intro={
          <>
            Wish there was an alternative to environmentally unfriendly, plastic and metal labelling that just keeps &ldquo;disappearing?&rdquo;
            Label any tree and add it to the Tremap global database of trees — no-cost, permanent, eco-friendly.
          </>
        }
        image={m("943aed_c3a8d25f47244ed48794a501295e723a~mv2.jpg")}
      >
        <Button href={APP_LINKS.ios}>Download the app</Button>
        <Button href="/contact?topic=labelling" variant="outline-light" arrow={false}>
          Tell me more about this!
        </Button>
      </PageHero>

      <Section>
        <Container>
          <Reveal>
            <Eyebrow>Tremap virtual labelling for private gardens</Eyebrow>
            <H2 className="mt-5 max-w-3xl">
              Fed up with physical labels? <em>Map and label digitally.</em>
            </H2>
          </Reveal>
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            <Reveal className="rounded-[28px] bg-sand/70 p-8 sm:p-10">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-stone">Physical labels</p>
              <ul className="mt-6 space-y-4">
                {OLD.map((t) => (
                  <li key={t} className="flex items-start gap-3 text-ink/75">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-[#c2502a]/15 text-xs font-bold text-[#c2502a]">✕</span>
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.1} className="rounded-[28px] bg-forest p-8 text-white sm:p-10">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sage">Tremap digital labels</p>
              <ul className="mt-6 space-y-4">
                {NEW.map((t) => (
                  <CheckItem key={t} light>
                    {t}
                  </CheckItem>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Panel tone="mist">
        <Container className="grid items-center gap-16 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <Reveal>
              <Eyebrow>Tremap features for private gardens</Eyebrow>
              <H2 className="mt-5">
                Your whole garden, <em>in your pocket.</em>
              </H2>
            </Reveal>
            <ol className="mt-10 space-y-2">
              {FEATURES.map(([title, body], i) => (
                <Reveal key={title} delay={0.06 * i}>
                  <li className="flex gap-5 rounded-2xl p-4 transition-colors hover:bg-white/70">
                    <span className="grid size-10 shrink-0 place-items-center rounded-full bg-forest font-display text-white">{i + 1}</span>
                    <div>
                      <h3 className="font-semibold text-forest">{title}</h3>
                      <p className="mt-1 text-stone">{body}</p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>
            <Reveal delay={0.2} className="mt-8 max-w-md">
              <DocCard
                href="/files/tremap-virtual-labelling-for-private-gardens.pdf"
                cover="/media/docs/tremap-virtual-labelling-for-private-gardens.jpg"
                title="Tremap Virtual Labelling for Private Gardens"
                meta="PDF · 1.3 MB"
              />
            </Reveal>
          </div>
          <Reveal delay={0.1} className="mx-auto flex w-full max-w-md items-end justify-center gap-4">
            <Phone shot={m("943aed_dad1f747fdc74480813b88c1857e53a4~mv2.png")} alt="Mapping and labelling a tree in the Tremap app" className="w-[48%] -rotate-2" />
            <Phone shot={m("943aed_e6446bce968b4ed98483b315e750d8d0~mv2.png")} alt="A labelled tree in the Tremap app" className="mb-12 w-[48%] rotate-2" />
          </Reveal>
        </Container>
      </Panel>

      <Section id="gardens">
        <Container className="grid gap-14 lg:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <Eyebrow>For botanical gardens & arboreta</Eyebrow>
            <H2 className="mt-5">
              <em>treBG</em> — collection management and virtual visitor guide.
            </H2>
            <p className="mt-6 text-lg leading-relaxed text-stone">
              The world&apos;s simplest, quickest, most environmentally friendly collection management system — for botanical gardens, city parks
              and gardens, campuses and arboreta. Powered by Tremap, in cooperation with Eden Project.
            </p>
            <div className="mt-8 max-w-md">
              <DocCard href="/files/trebg-collection-management.pdf" cover="/media/docs/trebg-collection-management.jpg" title="treBG product sheet" meta="PDF · 1.3 MB" />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="grid gap-4 sm:grid-cols-2">
              {TREBG.map((t) => (
                <li key={t} className="rounded-3xl bg-white p-6 leading-relaxed text-ink/80 ring-1 ring-forest/5">
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </Section>

      <CtaBand
        title={<>Want to start digitally <em>labelling your garden?</em></>}
        text="Download the Tremap app from the app stores and start mapping!"
      >
        <a href={APP_LINKS.ios} className="transition-transform hover:-translate-y-0.5">
          <Image src={m("173562_7847c54f7470426c8e07318d8458bcc1~mv2.png").src} alt="Download on the App Store" width={180} height={60} className="h-[52px] w-auto" />
        </a>
        <a href={APP_LINKS.android} className="transition-transform hover:-translate-y-0.5">
          <Image src={m("173562_cd9c07b88b2a4a9297a6937b1eb632a9~mv2.png").src} alt="Get it on Google Play" width={180} height={60} className="h-[52px] w-auto" />
        </a>
        <Button href="/contact?topic=labelling" variant="glass" arrow={false}>
          Tell me more about this!
        </Button>
      </CtaBand>
    </>
  );
}
