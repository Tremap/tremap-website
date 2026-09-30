import type { Metadata } from "next";
import { SpeciesMap } from "@/components/SpeciesMap";
import { SponsorProject } from "@/components/SponsorProject";
import { m } from "@/lib/media";
import { CONTACT, mailto } from "@/lib/site";

export const metadata: Metadata = {
  title: "GHL Cork Oak",
  description:
    "The UK's first and only comprehensive map of Cork Oak (Quercus suber). Sponsored by Glenn Humphries Landscaping, powered by Tremap.",
};

export default function GhlCorkOakPage() {
  const hero = m("173562_d282b95f8d044ff9a4214a22b570e7f7~mv2.webp");
  return (
    <SponsorProject
      eyebrow="GHL Cork Oak"
      title={<>The UK&apos;s first and only comprehensive map of <em>Cork Oak.</em></>}
      intro="Mapping nature's most versatile survivor."
      hero={hero}
      sponsorLogo={m("173562_4d02929d8bb145c4b7827e3ccd3f23bb~mv2.png")}
      sponsorName="Glenn Humphries Landscaping"
      sponsorHref="https://glennhumphrieslandscapingltd.co.uk/"
      story={{
        heading: <>Mapping nature&apos;s most <em>versatile survivor.</em></>,
        body: (
          <>
            <p className="font-semibold text-forest">Sponsored by Glenn Humphries Landscaping. Powered by Tremap.</p>
            <p>
              Tremap and Glenn Humphries Landscaping are partnering on a global initiative. We are setting out to map the distribution of the Cork
              Oak (<em>Quercus suber</em>) — a tree that has served humanity from ancient Greece to modern space travel.
            </p>
            <p>
              To do this, we are documenting these resilient evergreens to highlight their unique, regenerative bark and their role in supporting
              rich biodiversity. We are enlisting the help of tree lovers to track these historic and vital trees across the UK and beyond.
            </p>
            <p>Check back here regularly to track our progress. Want to get involved yourself?</p>
          </>
        ),
      }}
      map={<SpeciesMap genus="Quercus" species="suber" lat={45} lng={-2} zoom={4} label="Cork Oak" poster={hero.src} />}
      cta={{ label: "Get involved", href: mailto(CONTACT.infoEmail, "I'd like to get involved in the GHL Cork Oak Project") }}
    />
  );
}
