import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/motion";
import { Button, Container, CtaBand, Eyebrow, H2, PageHero, Section } from "@/components/ui";
import { m } from "@/lib/media";

export const metadata: Metadata = {
  title: "Traceability and Added Value",
  description: "Add QR codes to your packaging and let consumers trace your product back to the tree!",
};

const STEPS = [
  { title: "Add QR codes to labels…", image: "943aed_c96f126918c94355af3c96b8cdbb51ce~mv2.png", alt: "A clothing label with a Tremap QR code" },
  { title: "…or to packaging", image: "943aed_5e70a6cc687a4d2281a7e0f6ff5060f6~mv2.png", alt: "An olive oil bottle with a Tremap QR code" },
  { title: "Consumers scan the QR code", image: "943aed_110675c8e791454180eb1582e30a7173~mv2.png", alt: "Scanning a Tremap QR code with a phone" },
  { title: "The Tremap app opens to the exact location of the trees", image: "943aed_91ba936176744ddc9addfbceb75174bd~mv2.png", alt: "The Tremap app showing an olive grove" },
  { title: "Consumers engage with the farmer and your brand!", image: "943aed_667d579cb69b43bcb3c54e8e63bcc5c3~mv2.png", alt: "A grower's profile and video in the Tremap app" },
];

export default function TraceabilityPage() {
  return (
    <>
      <PageHero
        eyebrow="Traceability and added value"
        title={<>From the shelf <em>to the tree.</em></>}
        intro="Add QR codes to your product packaging and let consumers see the precise location of source trees! A simple app. A simple map. No-nonsense traceability to source. Immediate added value for your brand."
        image={m("943aed_8622893c703d4dfbb8fc9d666501f066~mv2.png")}
      >
        <Button href="/contact?topic=traceability">Tell me more about this!</Button>
      </PageHero>

      <Section>
        <Container>
          <Reveal>
            <Eyebrow>&ldquo;Show me the Trees!&rdquo; QR traceability</Eyebrow>
            <H2 className="mt-5">
              How does it <em>work?</em>
            </H2>
          </Reveal>
          <ol className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-6">
            {STEPS.map((s, i) => {
              const img = m(s.image);
              return (
                <Reveal key={s.title} delay={0.06 * i} className={i < 2 ? "lg:col-span-3" : "lg:col-span-2"}>
                  <li className="flex h-full flex-col overflow-hidden rounded-[28px] bg-white ring-1 ring-forest/5">
                    <div className="relative aspect-[4/3] bg-mist">
                      <Image src={img.src} alt={s.alt} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-contain" />
                    </div>
                    <div className="flex items-start gap-4 p-6">
                      <span className="grid size-9 shrink-0 place-items-center rounded-full bg-ember font-display text-white">{i + 1}</span>
                      <p className="font-display text-xl leading-snug text-forest">{s.title}</p>
                    </div>
                  </li>
                </Reveal>
              );
            })}
          </ol>
        </Container>
      </Section>

      <CtaBand
        title={<>Want a super simple way to <em>add value to your brand?</em></>}
        text={<>Increase market reach — add Tremap &ldquo;Show me the Trees&rdquo; QR Traceability!</>}
      >
        <Button href="/contact?topic=traceability">Tell me more about this!</Button>
      </CtaBand>
    </>
  );
}
