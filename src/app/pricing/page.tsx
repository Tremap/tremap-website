import type { Metadata } from "next";
import { Reveal } from "@/components/motion";
import { PricingNote, PricingTable } from "@/components/PricingTable";
import { Button, Container, CtaBand, PageHero, Section } from "@/components/ui";
import { m } from "@/lib/media";
import { PORTAL_SIGNIN_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Tremap is the world's first easy-to-use global database of trees. It's also the most economical! Check out our generous introductory pricing.",
};

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title={<>Subscription <em>plans.</em></>}
        intro={<PricingNote light />}
        image={m("11062b_e29499f407ea42c9bc4fee4042e443f7~mv2.jpg")}
      >
        <Button href={PORTAL_SIGNIN_URL}>Start your free trial</Button>
      </PageHero>

      <Section>
        <Container>
          <Reveal>
            <PricingTable />
          </Reveal>
          <p className="mt-6 text-sm text-stone">
            All plans include the free Tremap app. POA = price on application.
          </p>
        </Container>
      </Section>

      <CtaBand
        title={<>Need GreenSpaces or a <em>custom plan?</em></>}
        text="Talk to our sales team about Tremap GreenSpaces, embedded web maps and on-site support."
      >
        <Button href="/contact?topic=pricing">Get more info</Button>
      </CtaBand>
    </>
  );
}
