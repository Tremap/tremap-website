import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/motion";
import { SpeciesMap } from "@/components/SpeciesMap";
import { Button, Container, CtaBand, Eyebrow, H2, Section } from "@/components/ui";
import { m } from "@/lib/media";
import { APP_LINKS } from "@/lib/site";

export const metadata: Metadata = {
  title: "The Nare Magnolia Campbellii",
  description:
    "Explore spring globally with tremap. Track spring around the world with tremap and discover 'The Nare Magnolia campbellii' in full bloom.",
};

export default function NareMagnoliaPage() {
  const nare = m("943aed_43f9485cdd4f401592300be710556b74~mv2.png");
  const flamingo = m("7ca40b_b16445ea7aa74e9e9ff0a287299606fe~mv2.jpg");
  return (
    <>
      {/* Video hero: dawn over the Darjeeling hills */}
      <section className="p-2 sm:p-3">
        <div className="relative isolate flex min-h-[620px] flex-col justify-end overflow-hidden rounded-[28px] bg-forest-deep sm:rounded-[36px]">
          <video
            className="absolute inset-0 -z-20 size-full object-cover"
            src="/video/darjeeling.mp4"
            poster={m("11062b_e12e778250c54ec0aa0d967b228e9cc3f000.jpg").src}
            autoPlay
            muted
            loop
            playsInline
            aria-hidden
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-forest-deep via-forest-deep/50 to-forest-deep/20" />
          <Container className="pb-12 pt-36 sm:pb-16">
            <Reveal>
              <Eyebrow light>The Nare · Magnolia campbellii</Eyebrow>
              <h1 className="mt-5 max-w-4xl font-display text-[clamp(2.6rem,6.4vw,5.6rem)] font-light leading-[1] tracking-[-0.03em] text-white">
                Track spring around the world <em className="italic text-ember-soft">with Tremap.</em>
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80 sm:text-xl">
                Track the southern hemisphere spring from Argentina to New Zealand — search on the Tremap app.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="#map">See the live map</Button>
                <Button href={APP_LINKS.ios} variant="outline-light" arrow={false}>
                  Get the app
                </Button>
              </div>
            </Reveal>
          </Container>
        </div>
      </section>

      <Section>
        <Container className="grid items-center gap-14 lg:grid-cols-[1fr_1.1fr]">
          <Reveal className="relative">
            <Image src={flamingo.src} alt="Magnolia campbellii in bloom — the flamingo of flowers" width={flamingo.w} height={flamingo.h} sizes="(min-width: 1024px) 45vw, 100vw" className="h-auto w-full rounded-[28px]" />
            <div className="absolute -bottom-6 right-6 rounded-3xl bg-white p-4 shadow-xl ring-1 ring-forest/5">
              <Image src={nare.src} alt="The Nare" width={nare.w} height={nare.h} className="h-16 w-auto" />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <Eyebrow>From Darjeeling to a garden near you</Eyebrow>
            <H2 className="mt-5">
              Mapping the <em>&ldquo;Flamingo of flowers!&rdquo;</em>
            </H2>
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-stone">
              <p>
                We&apos;re underway in Darjeeling, right now, mapping <em>Magnolia campbellii</em> in their native habitat. Keep an eye on this
                updated map and more information on this iconic tree!
              </p>
              <p>
                Native to Darjeeling, India, this stunning flowering tree never fails to wow in gardens across the world. Together with The Nare hotel
                in Cornwall, UK, Tremap is mapping this iconic species across the globe!
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/post/magnolia-campbellii-flowering-is-sweeping-around-the-southern-hemisphere" variant="outline">
                Read the latest update
              </Button>
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section id="map" className="!pt-0">
        <Container>
          <Reveal>
            <SpeciesMap genus="Magnolia" species="campbellii" lat={20} lng={40} zoom={2} label="Magnolia campbellii" poster={flamingo.src} />
          </Reveal>
        </Container>
      </Section>

      <CtaBand title={<>Know where a <em>Magnolia campbellii</em> grows?</>} text="Add it to the map with the free Tremap app and help track spring around the world.">
        <Button href={APP_LINKS.ios}>App Store</Button>
        <Button href={APP_LINKS.android} variant="glass">
          Google Play
        </Button>
      </CtaBand>
    </>
  );
}
