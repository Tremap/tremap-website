import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/motion";
import { Container, PlainHero, Section } from "@/components/ui";
import { CONTACT, mailto, PORTAL_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the Tremap team — demos, GreenSpaces, sponsorship, press and support.",
};

// Friendly labels for the ?topic= values used by buttons around the site
const TOPICS: Record<string, string> = {
  demo: "Book a demo",
  "greenspaces-demo": "GreenSpaces demo",
  "greenspaces-documentation": "GreenSpaces product documentation",
  integration: "Integrate tree data into the Tremap global database",
  labelling: "Digital labelling",
  traceability: "Traceability and added value",
  agritourism: "Tree-based promotion and marketing for agritourism",
  "community-engagement": "Community engagement tools",
  surveying: "Surveying tools for arborists",
  "tree-planting": "Ground-truthing and transparency for tree planting",
  "pest-disease": "Pest and disease monitoring",
  "memorial-trees": "Memorial trees",
  "species-sponsorship": "Species sponsorship",
  pricing: "Pricing and plans",
  development: "Functionalities in development",
};

export default async function ContactPage({ searchParams }: PageProps<"/contact">) {
  const { topic } = await searchParams;
  const key = typeof topic === "string" ? topic : "";
  const label = TOPICS[key] ?? "General enquiry";

  return (
    <>
      <PlainHero
        eyebrow="Contact"
        title={<>Let&apos;s talk <em>trees.</em></>}
        intro="Tremap is constantly working to develop cutting-edge solutions in tree management, transparency in planting and survivability and tree-care. Ask us anything — including functionalities currently in development!"
      />
      <Section className="!pt-4">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <Reveal className="space-y-8">
            <div className="rounded-[28px] bg-forest p-8 text-white">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-sage">Reach us directly</p>
              <ul className="mt-6 space-y-4 text-lg">
                <li>
                  <a href={`mailto:${CONTACT.email}`} className="hover:text-ember-soft">
                    {CONTACT.email}
                  </a>
                </li>
                <li>
                  <a href={CONTACT.phoneHref} className="hover:text-ember-soft">
                    {CONTACT.phone}
                  </a>
                </li>
                <li className="text-base leading-relaxed text-white/65">
                  {CONTACT.address.map((l) => (
                    <span key={l} className="block">
                      {l}
                    </span>
                  ))}
                </li>
              </ul>
            </div>
            <div className="rounded-[28px] bg-mist p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-stone">Quick links</p>
              <ul className="mt-4 space-y-3 text-forest">
                <li>
                  <a href={mailto(CONTACT.salesEmail, "Tremap GreenSpaces - Request for pricing info")} className="hover:text-leaf">
                    GreenSpaces sales →
                  </a>
                </li>
                <li>
                  <a href={mailto(CONTACT.infoEmail, "Press enquiry")} className="hover:text-leaf">
                    Press enquiries →
                  </a>
                </li>
                <li>
                  <a href={PORTAL_URL} className="hover:text-leaf">
                    Portal login →
                  </a>
                </li>
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="rounded-[28px] bg-white p-6 ring-1 ring-forest/5 sm:p-10">
            <p className="mb-6 inline-flex rounded-full bg-sage px-4 py-1.5 text-sm font-semibold text-forest">Topic: {label}</p>
            <ContactForm topic={label} withOrganisation />
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
