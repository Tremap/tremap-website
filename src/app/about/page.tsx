import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/motion";
import { Button, Container, CtaBand, Eyebrow, H2, PageHero, Section } from "@/components/ui";
import { m } from "@/lib/media";

export const metadata: Metadata = {
  title: "About",
  description: "Tremap's team of global tech developers, foresters and horticultural experts.",
};

// Roles left blank where the current site shows none — to be confirmed.
const TEAM: { name: string; role?: string; photo: string }[] = [
  { name: "Jonathon Jones OBE", role: "Chairman & Founder", photo: "943aed_f857e654bf694f448256b908eff4b4cc~mv2.jpg" },
  { name: "Richard Maxwell", role: "Sales & Business Development", photo: "943aed_64765d0713cf47bb889f26ab4c9d4758~mv2.jpg" },
  { name: "George Eustice", role: "Strategic Development", photo: "635fc6_d0a0f06cdf0d4a0296eb9c3534d223ff~mv2.jpeg" },
  { name: "Morag Jones", role: "CFO", photo: "943aed_1e4e5d36e45a46ab930c51920cc3a6d6~mv2.jpg" },
  { name: "Adam Orme", role: "Sales and Client Support", photo: "635fc6_ff18e592210b40878e5eb3ad55138f8b~mv2.png" },
  { name: "Anita Haddock", role: "GIS and Data Services", photo: "635fc6_7ff4904cec8944e5989cadfae509edff~mv2.jpg" },
  { name: "Alexander Pataridze", role: "CTO", photo: "943aed_b72dd502a20645f4ba6db19c98492c69~mv2.png" },
  { name: "Giorgi Khimshiashvili", role: "Solutions Development Lead", photo: "943aed_08f15a36b7cc4e808e9dcff5528b5708~mv2.webp" },
  { name: "Nika Gabunia", role: "Project Manager", photo: "943aed_42d3e8c7acef4d508fe1b96e00ce8956~mv2.jpg" },
  { name: "Ana Baghdavadze", role: "UX/UI Designer", photo: "943aed_2ff38d695a0948bab209adeb3804a1a6~mv2.png" },
  { name: "Levani Lortkipanidze", role: "UI and Web Design", photo: "943aed_98a7bc55bde8432fbe0657545d0987bd~mv2.webp" },
  { name: "Levani Khimshiashvili", role: "Frontend Development", photo: "943aed_58f8aca5838148d99c983b1b7fb3848b~mv2.png" },
  { name: "Guga Takniashvili", photo: "943aed_565fa6c64b2d4ae1a52462f3dae26d0c~mv2.png" },
  { name: "Givi Iashvili", photo: "943aed_c098e469561444139054fccfa51b4317~mv2.jpg" },
  { name: "Jeko Tediashvili", photo: "943aed_30f6b5a1c11b4ca09e48cdf852a389df~mv2.png" },
  { name: "Nika Kereselidze", role: "Backend Development", photo: "943aed_abdd5e5274c74a49ba446e28a3985651~mv2.jpg" },
  { name: "Niko Chopikashvili", photo: "943aed_6821f76b101b416991dacea9328a9d5c~mv2.jpg" },
  { name: "Rob Sanders", photo: "943aed_1c08567ccc4e4a9ba79e4ff4a28309ba~mv2.jpeg" },
  { name: "Alan Rowe", role: "Arboricultural Consultant", photo: "943aed_c87526c31af94b44ba161bf3189a197d~mv2.jpg" },
  { name: "Dr. Andrew Ormerod", photo: "943aed_efc71a48e7404e8988a6c2a3b4ac237c~mv2.jpeg" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Tremap"
        title={<>We love simplicity and <em>efficiency.</em></>}
        intro="A team of global tech developers, foresters and horticultural experts building simple tools to help anyone care for trees and green areas."
        image={m("11062b_51b3c353893c4cd9bf7e236bd46e6538~mv2.jpeg")}
      />

      <Section>
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <Eyebrow>The journey</Eyebrow>
            <H2 className="mt-5">
              From one rare collection to <em>the global tree map.</em>
            </H2>
          </Reveal>
          <Reveal delay={0.1} className="space-y-5 text-lg leading-relaxed text-stone">
            <p>
              Founder Jonathon Jones wanted an easy to use app on his phone to map an extremely rare collection of trees and shrubs. He scoured the
              market and tested all the tree mapping systems out there, but none were as simple and easy to use as he needed. He came up with a
              brief with lots of unique features, including to help the collection owners instantly and easily map every tree and shrub. By the end
              of 2021, the Tremap proof-of-concept app and database was on the app stores for download.
            </p>
            <p>
              Since that rapid start, Tremap has evolved into a suite of intelligent but simple tools, built to help anyone — amateurs to academics,
              private gardeners to professionals — care for trees and green areas.
            </p>
            <p>At Tremap, we love simplicity and efficiency — both in how our platform works and how we work to create it.</p>
            <p className="font-display text-2xl text-forest">Welcome to our team.</p>
          </Reveal>
        </Container>
      </Section>

      <Section id="team" className="!pt-0">
        <Container>
          <Reveal>
            <Eyebrow>The Tremap team</Eyebrow>
          </Reveal>
          <ul className="mt-10 grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
            {TEAM.map((p, i) => {
              const img = m(p.photo);
              return (
                <Reveal key={p.name} delay={(i % 4) * 0.06}>
                  <li className="group">
                    <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-sage">
                      <Image
                        src={img.src}
                        alt={p.name}
                        fill
                        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                        className="object-cover grayscale-[35%] transition duration-700 ease-out-soft group-hover:scale-105 group-hover:grayscale-0"
                      />
                    </div>
                    <p className="mt-4 font-display text-xl text-forest">{p.name}</p>
                    {p.role && <p className="mt-0.5 text-sm text-stone">{p.role}</p>}
                  </li>
                </Reveal>
              );
            })}
          </ul>
        </Container>
      </Section>

      <CtaBand title={<>Want to work <em>with us?</em></>} text="Whether you're a garden, a council, a brand or an investor — we'd love to hear from you.">
        <Button href="/contact">Get in touch</Button>
        <Button href="/partners" variant="glass" arrow={false}>
          Our partners
        </Button>
      </CtaBand>
    </>
  );
}
