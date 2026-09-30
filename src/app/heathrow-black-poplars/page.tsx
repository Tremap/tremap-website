import type { Metadata } from "next";
import { SpeciesMap } from "@/components/SpeciesMap";
import { SponsorProject } from "@/components/SponsorProject";
import { m } from "@/lib/media";
import { CONTACT, mailto } from "@/lib/site";

export const metadata: Metadata = {
  title: "Heathrow Black Poplars",
  description:
    "The UK's first and only comprehensive map of Black Poplars — Britain's rarest native tree. Sponsored by Heathrow, powered by Tremap.",
};

export default function HeathrowBlackPoplarsPage() {
  const hero = m("943aed_7c7ea9767e1847009ea5dc5ed28a87e0~mv2.jpg");
  return (
    <SponsorProject
      eyebrow="Heathrow Black Poplars"
      title={<>The UK&apos;s first and only comprehensive map of <em>Black Poplars.</em></>}
      intro={<>The <em>Populus nigra</em> subsp. <em>betulifolia</em> is Britain&apos;s rarest and most endangered native tree.</>}
      hero={hero}
      sponsorLogo={m("943aed_6bf0a8d023ed4883a5fa48813ec6bfc4~mv2.png")}
      sponsorName="Heathrow"
      facts={[
        { title: "The rare Black Poplar", body: <>The <em>Populus nigra</em> subsp. <em>betulifolia</em> is Britain&apos;s rarest and most endangered native tree.</> },
        { title: "Genetically unique?", body: "There are only an estimated 120 to 150 genetically unique trees left in the UK, from which all others have been propagated." },
        { title: "Dwindling population", body: "There are only an estimated 7,000 Black Poplar trees left in the whole of the UK. Unless we know exactly where those are and protect them, they are in danger of disappearing entirely from our landscape." },
        { title: "Scarce females", body: <>Scientists believe there are only about 200 <strong className="font-semibold text-forest">female</strong> Black Poplars among the 7,000 remaining trees. For propagation, it&apos;s critically important to know exactly where these elusive trees are.</> },
      ]}
      story={{
        heading: <>Introducing an environmental treasure hunt <em>of epic proportions.</em></>,
        body: (
          <>
            <p className="font-semibold text-forest">Sponsored by Heathrow. Powered by Tremap.</p>
            <p>
              Tremap and Heathrow are partnering to tackle an ambitious task. We&apos;re setting out to map the location of every single remaining
              Black Poplar in the UK!
            </p>
            <p>
              To do this, we&apos;ll be collaborating with academic and environmental organisations around the country to share research and data.
              And, we&apos;ll also be enlisting the help of citizen scientists and tree lovers across the UK to locate and track the last of these
              beautiful — but very threatened — iconic trees!
            </p>
            <p>Check back here regularly to track our progress. Want to get involved yourself?</p>
          </>
        ),
      }}
      map={<SpeciesMap genus="Populus" species="nigra" lat={53.5} lng={-2.2} zoom={5} label="Black Poplar" poster={hero.src} />}
      cta={{ label: "Get involved", href: mailto(CONTACT.infoEmail, "I'd like to get involved in the Heathrow Black Poplar Project") }}
    />
  );
}
