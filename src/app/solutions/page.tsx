import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/motion";
import { PricingNote, PricingTable } from "@/components/PricingTable";
import { Arrow, Container, Eyebrow, H2, PageHero, Panel, Section } from "@/components/ui";
import { m } from "@/lib/media";

export const metadata: Metadata = {
  title: "Solutions",
  description: "Innovative tree services, save money and the environment.",
};

const SOLUTIONS = [
  { title: "Tree Mapping and Digital Labelling", sub: "No-cost, permanent, eco-friendly", href: "/labelling", image: "943aed_ea0b15fa3586426c8580f06749ae27a3~mv2.jpg" },
  { title: "Creative Connect", sub: "for Artists", href: "/creativeconnect", image: "11062b_5a018a770d764656aebd3634421f1c64~mv2.jpeg" },
  { title: "Tree-based Promotion and Marketing", sub: "for Agritourism", href: "/contact?topic=agritourism", image: "943aed_43a71750a37d47a4abfb7d3889dbbbab~mv2.jpg" },
  { title: "Tree Care Projects", sub: "for Corporate Sponsors", href: "/speciessponsors", image: "943aed_baabd404283e49559cd5e94f270637c0~mv2.jpg" },
  { title: "Traceability and Added Value", sub: "for Commercial Growers and Brands", href: "/traceabilityaddedvalue", image: "943aed_8622893c703d4dfbb8fc9d666501f066~mv2.png" },
  { title: "Plant Records Systems & Visitor Guides", sub: "for Gardens and Arboreta", href: "/labelling#gardens", image: "943aed_40b1bd51641349f3b4c8c799f5feef59~mv2.jpg" },
  { title: "Community Engagement Tools", sub: "for Urban Green Spaces", href: "/contact?topic=community-engagement", image: "943aed_e892893f8e2e471690fa54fb2f11ab9d~mv2.png" },
  { title: "Quick and Easy Surveying Tools", sub: "for Tree Surveyors and Arborists", href: "/contact?topic=surveying", image: "943aed_a73591a2ec7a410185c62a02100074d9~mv2.jpg" },
  { title: "GreenSpaces", sub: "Tree and green space management", href: "/greenspaces", image: "943aed_7ce6a4fb34e84ed1a3ca92b4637ec74e~mv2.jpg" },
  { title: "Ground-Truthing and Transparency", sub: "for Tree Planting", href: "/contact?topic=tree-planting", image: "943aed_7c64795d480e4e72829d3c2222552fa9~mv2.jpg" },
  { title: "Pest and Disease Monitoring Tools", sub: "for Citizen Scientists", href: "/contact?topic=pest-disease", image: "943aed_139eced4841a48c188561a2185db7adb~mv2.png" },
  { title: "Virtual, Smartphone-Accessible Memorial Trees", sub: "for Heritage & Memorials", href: "/contact?topic=memorial-trees", image: "943aed_91f5aa8828b642dab174060862a7f809~mv2.png" },
];

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Solutions"
        title={<>Simple tools for <em>every tree</em> and everyone who cares for them.</>}
        intro="From digital labels for a private garden to full green space management for a city — find the Tremap solution that fits the job in hand."
        image={m("943aed_7ce6a4fb34e84ed1a3ca92b4637ec74e~mv2.jpg")}
      />

      <Section>
        <Container>
          <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {SOLUTIONS.map((s, i) => {
              const img = m(s.image);
              return (
                <Reveal key={s.title} delay={(i % 3) * 0.08}>
                  <Link href={s.href} className="group block">
                    <div className="relative aspect-[5/4] overflow-hidden rounded-3xl bg-sage">
                      <Image src={img.src} alt="" fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-[1.2s] ease-out-soft group-hover:scale-105" />
                      <span className="absolute right-4 top-4 grid size-11 place-items-center rounded-full bg-white/90 text-forest opacity-0 backdrop-blur transition-all duration-300 group-hover:opacity-100">
                        <Arrow className="-rotate-45" />
                      </span>
                    </div>
                    <p className="mt-5 text-sm font-medium text-leaf">{s.sub}</p>
                    <h2 className="mt-1 font-display text-2xl font-light leading-snug text-forest transition-colors group-hover:text-leaf">
                      {s.title}
                    </h2>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </Section>

      <Panel tone="mist" id="pricing">
        <Container>
          <Reveal className="max-w-3xl">
            <Eyebrow>Subscription plans</Eyebrow>
            <H2 className="mt-5">
              Simple, <em>transparent</em> pricing.
            </H2>
            <div className="mt-6">
              <PricingNote below />
            </div>
          </Reveal>
          <Reveal delay={0.1} className="mt-12">
            <PricingTable />
          </Reveal>
        </Container>
      </Panel>

      <Section id="contact">
        <Container className="grid gap-14 lg:grid-cols-[1fr_1.1fr]">
          <Reveal>
            <Eyebrow>Ask us about our solutions!</Eyebrow>
            <H2 className="mt-5">
              Want to know more about how you can use <em>Tremap?</em>
            </H2>
            <p className="mt-6 text-lg text-stone">Get in touch!</p>
          </Reveal>
          <Reveal delay={0.1} className="rounded-[28px] bg-mist p-6 sm:p-10">
            <ContactForm topic="Solutions enquiry" submitLabel="Send" />
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
