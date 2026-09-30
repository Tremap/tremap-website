import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/motion";
import { Button, Container, Eyebrow, H2, PlainHero, Section } from "@/components/ui";
import { m } from "@/lib/media";

export const metadata: Metadata = {
  title: "GOP Zaragoza",
  description: "The Garden of Peace, Zaragoza, Spain — a Tremap partner garden in a city shaped by Romans, Muslims, Jews and Christians.",
};

export default function GopZaragozaPage() {
  const badge = m("943aed_a61d850d37e64dc3a442df7500795095~mv2.png");
  const logo = m("943aed_39667a33055a42e38eecb57c2549916d~mv2.png");
  return (
    <>
      <PlainHero
        eyebrow="Zaragoza, Spain"
        title={<>The Garden of Peace, <em>Zaragoza.</em></>}
        intro="Zaragoza presents an impressive monumental heritage on its streets that is the legacy of Romans, Muslims, Jews and Christians, who have left their traces here."
      />
      <Section className="!pt-4">
        <Container className="grid gap-14 lg:grid-cols-[1fr_1.4fr]">
          <Reveal className="space-y-6">
            <div className="rounded-[28px] bg-white p-8 ring-1 ring-forest/5">
              <Image src={badge.src} alt="" width={badge.w} height={badge.h} className="mx-auto h-40 w-auto" />
            </div>
            <a href="https://www.thegardenofpeace.org/" target="_blank" rel="noopener" className="block rounded-[28px] bg-mist p-8 transition-colors hover:bg-sage">
              <Image src={logo.src} alt="The Garden of Peace" width={logo.w} height={logo.h} className="mx-auto h-16 w-auto" />
              <p className="mt-4 text-center text-sm font-semibold text-forest">thegardenofpeace.org ↗</p>
            </a>
          </Reveal>
          <Reveal delay={0.1}>
            <Eyebrow>A living mosaic</Eyebrow>
            <H2 className="mt-5">
              A city that <em>embraces diversity.</em>
            </H2>
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-stone">
              <p>
                Zaragoza masterfully unveils its extraordinary monumental heritage along its streets, a precious testament to a rich and fascinating
                past. The streets of this city are a valuable mosaic that preserves the legacy of Romans, Muslims, Jews, and Christians, each of whom
                has left their indelible traces.
              </p>
              <p>
                Through elegant buildings, imposing ruins, and splendid cathedrals, it is possible to embark on a journey through time to discover the
                cultural and religious diversity that has marked the history of Zaragoza. The streets are a living stage where stones tell stories of
                conquests, coexistence, exchanges, and conflicts, revealing the complexity of a city that has welcomed and merged different identities
                over the centuries.
              </p>
              <p>
                The Roman remains evoke the ancient greatness of the city, while the remnants of Muslim architecture bring to mind the elegance and
                harmony of the Moorish era. The traces of the Jewish community recall a vibrant and influential group, while the imposing Christian
                buildings manifest the power and spirituality of a period of Christian dominance.
              </p>
              <p>
                This fascinating blend of architectural styles and cultural influences converges in the streets of Zaragoza, creating a unique and
                enchanting atmosphere. Every corner reveals a piece of history, offering a captivating perspective on the complexity and richness of
                the diverse traditions that have intertwined over the centuries. Zaragoza is a city that embraces diversity and proudly celebrates its
                multicultural heritage with gratitude and pride.
              </p>
            </div>
            <div className="mt-10">
              <Button href="https://www.thegardenofpeace.org/" variant="outline">
                Visit The Garden of Peace
              </Button>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
