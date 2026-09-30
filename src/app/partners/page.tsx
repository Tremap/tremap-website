import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/motion";
import { Button, Container, Eyebrow, H2, PageHero, Panel, Section } from "@/components/ui";
import { m } from "@/lib/media";
import { CONTACT, mailto } from "@/lib/site";

export const metadata: Metadata = {
  title: "Partners",
  description: "Tremap's supporters, early adopters and development partners.",
};

const PARTNERS = [
  { name: "UKRI Innovate UK", logo: "943aed_ecdf1aa9f13e4a75873997df52318af9~mv2.png", text: "Tremap has been the recipient of UKRI InnovateUK funding." },
  { name: "European Regional Development Fund", logo: "943aed_5705b38259bd45ad8e2a46dbde279bcd~mv2.png", text: "Tremap enjoys the generous support of the ERDF through various funding programmes." },
  { name: "Agritech Cornwall", logo: "943aed_2cbb2d21605941189ce4b85a7bea5784~mv2.png", text: "Tremap is honoured to have received funding from the Agritech Cornwall Innovation Grant Scheme funded from the ERDF as part of the European Structural and Investment Fund Growth Programme 2014-2021." },
  { name: "Eden Project", logo: "943aed_7c52f974c98942f28082e1715e10270c~mv2.jpg", text: "Tremap is excited to work with Eden Project in mapping their outdoor Living Landscape collections as one of our first major pilot projects." },
  { name: "University of Exeter", logo: "943aed_96979bed58f54b34b78b66b1ea28eaee~mv2.jpeg", text: "Tremap is collaborating with Exeter University, offering student placements within the framework of their ERDF Future Focus project." },
  { name: "Aerospace Cornwall", logo: "943aed_8d481cf749374816a61be96d8452e06a~mv2.png", text: "Tremap is the proud recipient of development support by the ERDF, through Aerospace Cornwall's funding programmes." },
  { name: "Tevi", logo: "943aed_40e620f4325c49ddafae299b3c5cf9d1~mv2.jpg", text: "Tremap is grateful for funding support from Tevi to help put Cornwall on the world map as an exporter of innovative solutions." },
  { name: "Falmouth Town Council", logo: "943aed_10743db80d2846899706228a7aab19bf~mv2.png", text: "Falmouth Town Council (Cornwall, UK) is revolutionising their green space visitor experience, working together with Tremap on a parks and gardens management solution and virtual visitor guide pilot project." },
  { name: "Esri Startup Partner", logo: "943aed_5532b87360d442b29b81cfc8f41a70a0~mv2.png", text: "Tremap is a proud Startup Partner of Esri and has benefited from extensive development support using Esri's ArcGIS global database platform." },
  { name: "R3GIS", logo: "943aed_aaf54381e34943d18df499becc6fe087~mv2.png", text: "Tremap is proud to join forces with Italian software house R3GIS to launch GreenSpaces on the UK market — Europe's leading green space management platform." },
];

export default function PartnersPage() {
  return (
    <>
      <PageHero
        eyebrow="Partners"
        title={<>Win-wins for us, our partners — <em>and our planet.</em></>}
        intro="Tremap has attracted significant interest from government funding programmes, city councils, academic institutions and the private sector."
        image={m("11062b_5f1706105a6e4225ad02a522f4b2d65d~mv2.jpg")}
      />

      <Section>
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <Eyebrow>Synergy in our partnerships</Eyebrow>
            <H2 className="mt-5">
              A &ldquo;win&rdquo; in the fight to <em>save our trees.</em>
            </H2>
          </Reveal>
          <Reveal delay={0.1} className="space-y-5 text-lg leading-relaxed text-stone">
            <p>Each of these has their own needs, their own goals, their own version of what a &ldquo;win&rdquo; means for them.</p>
            <p>
              At Tremap, we&apos;re intent on synergy in our partnerships. We want &ldquo;win-wins&rdquo; in <em>all</em> of our relationships — from
              our B2B and B2C clients to funding programmes to investors. Most of all, we want a &ldquo;win&rdquo; for our planet, a &ldquo;win&rdquo;
              in the fight to save our trees, a &ldquo;win&rdquo; in the fight against climate change.
            </p>
            <p>
              We&apos;re delighted to have the vote of confidence of leading global entities. And in return, we&apos;re delighted to bring the
              world&apos;s easiest-to-use, most economical, most accessible tree database platform to the global market.
            </p>
          </Reveal>
        </Container>
      </Section>

      <Section className="!pt-0">
        <Container>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PARTNERS.map((p, i) => {
              const logo = m(p.logo);
              return (
                <Reveal key={p.name} delay={(i % 3) * 0.06}>
                  <li className="flex h-full flex-col rounded-[28px] bg-white p-7 ring-1 ring-forest/5 transition-shadow hover:shadow-[0_24px_50px_-28px_rgba(18,36,26,0.35)]">
                    <div className="grid h-28 place-items-center rounded-2xl bg-cream/60">
                      <Image src={logo.src} alt={p.name} width={logo.w} height={logo.h} className="max-h-20 w-auto max-w-[70%] object-contain" />
                    </div>
                    <h2 className="mt-6 font-display text-xl text-forest">{p.name}</h2>
                    <p className="mt-2 leading-relaxed text-stone">{p.text}</p>
                  </li>
                </Reveal>
              );
            })}
          </ul>
        </Container>
      </Section>

      <Panel tone="deep" id="invest">
        <Container className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <Reveal>
            <Eyebrow light>Considering investment?</Eyebrow>
            <H2 light className="mt-5">
              Impact funds, family offices <em>and CVCs.</em>
            </H2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">
              If you are an institutional investor please contact us! We are always keen to speak to Impact Funds, Family Offices and CVCs, although
              if you&apos;re not speaking to us already it may be too late to invest in this round.
            </p>
            <p className="mt-4 text-sm text-white/50">*Investments of this nature carry risks to your capital. Please invest aware.</p>
          </Reveal>
          <Reveal delay={0.1} className="flex lg:justify-end">
            <Button href={mailto(CONTACT.infoEmail, "Investment enquiry")}>Get more info</Button>
          </Reveal>
        </Container>
      </Panel>
    </>
  );
}
