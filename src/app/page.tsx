import Image from "next/image";
import { ContactForm } from "@/components/ContactForm";
import { Hero } from "@/components/Hero";
import { SolutionsPreview, type SolutionRow } from "@/components/home/SolutionsPreview";
import { LogoWall } from "@/components/LogoWall";
import { CountUp, Reveal } from "@/components/motion";
import { Monitor, Phone } from "@/components/Phone";
import { PostCard } from "@/components/PostCard";
import { Button, CheckItem, Container, Eyebrow, H2, Panel, Section } from "@/components/ui";
import { m } from "@/lib/media";
import { getAllPosts } from "@/lib/posts";
import { APP_LINKS, getTreeCount, PORTAL_URL } from "@/lib/site";

const SOLUTIONS: SolutionRow[] = [
  {
    audience: "Local authorities & councils",
    title: "GreenSpaces",
    body: "State-of-the-art management software for urban trees and green areas — inventory, QTRA, inspections and work planning in one live database.",
    href: "/greenspaces",
    image: m("943aed_7ce6a4fb34e84ed1a3ca92b4637ec74e~mv2.jpg"),
  },
  {
    audience: "Gardens, arboreta & everyone",
    title: "Tree mapping & digital labelling",
    body: "No-cost, permanent, eco-friendly. Label any tree and add it to the Tremap global database of trees.",
    href: "/labelling",
    image: m("943aed_ea0b15fa3586426c8580f06749ae27a3~mv2.jpg"),
  },
  {
    audience: "Commercial growers & brands",
    title: "Traceability & added value",
    body: "Add QR codes to your packaging and let consumers trace your product back to the tree!",
    href: "/traceabilityaddedvalue",
    image: m("943aed_8622893c703d4dfbb8fc9d666501f066~mv2.png"),
  },
  {
    audience: "Corporate sponsors",
    title: "Species sponsorship",
    body: "Partner with Tremap to map the iconic, rare and endangered species of the planet.",
    href: "/speciessponsors",
    image: m("943aed_7c7ea9767e1847009ea5dc5ed28a87e0~mv2.jpg"),
  },
  {
    audience: "Artists & musicians",
    title: "Creative Connect",
    body: "Trees. Art. People. Attach your creative work to trees in the Tremap app and put it in front of a global audience.",
    href: "/creativeconnect",
    image: m("11062b_5a018a770d764656aebd3634421f1c64~mv2.jpeg"),
  },
  {
    audience: "Tree planting projects",
    title: "Ground-truthing & transparency",
    body: "Evidence of what was planted, where, and how it is surviving — for funders, communities and the public.",
    href: "/solutions",
    image: m("943aed_7c64795d480e4e72829d3c2222552fa9~mv2.jpg"),
  },
];

const SPONSORED = [
  {
    href: "/heathrow-black-poplars",
    species: "Black Poplar",
    latin: "Populus nigra subsp. betulifolia",
    sponsor: "Heathrow",
    image: m("943aed_7c7ea9767e1847009ea5dc5ed28a87e0~mv2.jpg"),
  },
  {
    href: "/ghl-cork-oak",
    species: "Cork Oak",
    latin: "Quercus suber",
    sponsor: "Glenn Humphries Landscaping",
    image: m("173562_d282b95f8d044ff9a4214a22b570e7f7~mv2.webp"),
  },
  {
    href: "/the-nare-magnolia-campbellii",
    species: "Magnolia campbellii",
    latin: "The “flamingo of flowers”",
    sponsor: "The Nare",
    image: m("7ca40b_b16445ea7aa74e9e9ff0a287299606fe~mv2.jpg"),
  },
  {
    href: "/the-global-tea-forest",
    species: "The Global Tea Forest",
    latin: "Camellia sinensis",
    sponsor: "Open for sponsors",
    image: m("2d97491482e74e98bfcc09d7cf6c2f7c.jpg"),
  },
];

export default async function Home() {
  const treeCount = await getTreeCount();
  const latest = getAllPosts().slice(0, 3);

  return (
    <>
      <Hero treeCount={treeCount} />

      {/* Who works with Tremap? */}
      <Section className="!pb-16 !pt-16">
        <Container>
          <Reveal className="flex flex-col items-center text-center">
            <Eyebrow>Who works with Tremap?</Eyebrow>
          </Reveal>
        </Container>
        <div className="mt-10">
          <LogoWall />
        </div>
        <Container>
          <Reveal className="mx-auto mt-14 max-w-3xl text-center">
            <blockquote className="font-display text-[clamp(1.7rem,3.4vw,2.8rem)] font-light leading-[1.18] tracking-[-0.015em] text-forest">
              &ldquo;Tremap is a great idea. You definitely have <em className="text-leaf">my support&hellip;</em>&rdquo;
            </blockquote>
            <p className="mt-5 text-stone">
              <span className="font-semibold text-ink">Sir Tim Smit</span> · Eden Project
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* Get the app */}
      <Panel tone="mist">
        <Container className="grid items-center gap-16 lg:grid-cols-[1fr_1.05fr]">
          <Reveal>
            <Eyebrow>Get the app</Eyebrow>
            <H2 className="mt-5">
              Map, label and discover trees — <em>right from your phone.</em>
            </H2>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-stone">
              Drop a pin on any tree, add its species, photos and story, and
              explore more than {Math.floor(treeCount / 1_000_000)} million trees
              already on the global tree map.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <div className="flex flex-col gap-3">
                <a href={APP_LINKS.ios} aria-label="Download on the App Store" className="transition-transform hover:-translate-y-0.5">
                  <Image src={m("173562_7847c54f7470426c8e07318d8458bcc1~mv2.png").src} alt="Download on the App Store" width={180} height={60} className="h-[52px] w-auto" />
                </a>
                <a href={APP_LINKS.android} aria-label="Get it on Google Play" className="transition-transform hover:-translate-y-0.5">
                  <Image src={m("173562_cd9c07b88b2a4a9297a6937b1eb632a9~mv2.png").src} alt="Get it on Google Play" width={180} height={60} className="h-[52px] w-auto" />
                </a>
              </div>
              <div className="flex items-center gap-4 rounded-3xl bg-white p-3 pr-6 ring-1 ring-forest/5">
                <Image src={m("173562_acf93993d2864fcb838db43f713fa9bd~mv2.png").src} alt="QR code to download the Tremap app" width={212} height={212} className="size-24 rounded-xl" />
                <p className="max-w-[9rem] text-sm leading-snug text-stone">Scan to download the Tremap app</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="relative mx-auto flex w-full max-w-xl items-end justify-center gap-3 sm:gap-5">
            <Phone shot={m("943aed_acf6384f53f9462b80cfba6655054cca~mv2.png")} alt="Tremap app: tree details for visitors" className="mb-10 w-[31%] -rotate-3" />
            <Phone shot={m("943aed_e6446bce968b4ed98483b315e750d8d0~mv2.png")} alt="Tremap app: a selected tree on the map" className="z-10 w-[36%]" />
            <Phone shot={m("943aed_39259515b5e54086bdce84f887d20ea8~mv2.png")} alt="Tremap app: editing tree information" className="mb-10 w-[31%] rotate-3" />
          </Reveal>
        </Container>
      </Panel>

      {/* Global database + integrate */}
      <Section>
        <Container className="grid gap-6 lg:grid-cols-2">
          <Reveal className="relative overflow-hidden rounded-[28px] bg-forest p-8 text-white sm:p-12">
            <Image src={m("943aed_108a7e3f119c4f15aae29b6561be4ccf~mv2.png").src} alt="" width={214} height={214} className="absolute -right-6 -top-6 w-40 opacity-90 sm:w-52" />
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sage">The Tremap Global Database</p>
            <CountUp to={treeCount} className="mt-10 block font-display text-[clamp(3rem,7vw,5.2rem)] font-light leading-none tabular-nums tracking-[-0.03em]" />
            <p className="mt-3 text-lg text-white/75">trees and counting!</p>
            <div className="mt-10">
              <Button href={PORTAL_URL} variant="white">Explore the map</Button>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="relative overflow-hidden rounded-[28px] bg-sand/70 p-8 sm:p-12">
            <Image src={m("943aed_a9a5b9669792450585e6aace659c7b6d~mv2.png").src} alt="" width={252} height={252} className="absolute -bottom-4 -right-4 w-40 sm:w-52" />
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-leaf">Tree data to add?</p>
            <h2 className="mt-10 max-w-sm font-display text-[clamp(2rem,4vw,3rem)] font-light leading-[1.08] tracking-[-0.02em] text-forest">
              Integrate it into the Tremap <em className="text-leaf">global database.</em>
            </h2>
            <div className="mt-10">
              <Button href="/contact?topic=integration" variant="forest">Integrate now</Button>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Version 2.0 */}
      <Panel tone="deep">
        <div className="absolute -left-20 top-10 -z-10 size-[30rem] rounded-full bg-leaf/25 blur-3xl" />
        <Container className="grid items-center gap-16 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full bg-ember/15 px-4 py-1.5 text-sm font-semibold text-ember-soft ring-1 ring-ember/30">
              <span className="size-1.5 rounded-full bg-ember" />
              Out now
            </p>
            <H2 light className="mt-6">
              Tremap App and Web Portal <em>Version 2.0</em>
            </H2>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/75">
              Your free trial of the latest Tremap app and desktop portal.
            </p>
            <ul className="mt-8 space-y-3">
              <CheckItem light>Free 30-day trial</CheckItem>
              <CheckItem light>Map, label and save trees from phone or desktop</CheckItem>
              <CheckItem light>Geo-fencing, photos and team access</CheckItem>
            </ul>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button href="/pricing">Sign up for a free trial!</Button>
              <Button href={PORTAL_URL} variant="outline-light" arrow={false}>
                Open the portal
              </Button>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <Monitor shot={m("943aed_7ab3c159b0964416a5ea2d8e36e3035c~mv2.png")} alt="The Tremap web portal" />
          </Reveal>
        </Container>
      </Panel>

      {/* Solutions */}
      <Section>
        <Container>
          <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <Reveal>
              <Eyebrow>Solutions</Eyebrow>
              <H2 className="mt-5 max-w-2xl">
                Built to help anyone <em>care for trees.</em>
              </H2>
            </Reveal>
            <Reveal delay={0.1} className="max-w-sm">
              <p className="text-lg leading-relaxed text-stone">
                Amateurs to academics, private gardeners to professionals —
                a suite of intelligent but simple tools.
              </p>
              <div className="mt-6">
                <Button href="/solutions" variant="outline">All solutions</Button>
              </div>
            </Reveal>
          </div>
          <SolutionsPreview rows={SOLUTIONS} />
        </Container>
      </Section>

      {/* GreenSpaces */}
      <Panel tone="mist" id="greenspaces">
        <Container className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
          <Reveal>
            <Image src={m("943aed_173e72cefbfd44bea88605e4a15e7d80~mv2.jpg").src} alt="GreenSpaces, designed by R3GIS" width={500} height={292} className="w-44 rounded-xl mix-blend-multiply" />
            <H2 className="mt-8">
              State-of-the-art management software for <em>urban trees and green areas.</em>
            </H2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-stone">
              GreenSpaces has defined the standard in innovative green space
              management throughout Europe for more than 20 years — now
              optimised for UK local authorities, tree care and green space
              management professionals.
            </p>
            <dl className="mt-10 grid max-w-lg grid-cols-3 gap-6">
              {[
                ["30k+", "Equipment installations monitored"],
                ["2m+", "Trees managed"],
                ["5,000+", "Satisfied users"],
              ].map(([n, l]) => (
                <div key={l}>
                  <dt className="font-display text-4xl font-light text-forest">{n}</dt>
                  <dd className="mt-1 text-sm leading-snug text-stone">{l}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button href="/contact?topic=greenspaces-demo" variant="forest">Request a demo</Button>
              <Button href="/greenspaces" variant="outline" arrow={false}>Explore GreenSpaces</Button>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <Image
              src={m("943aed_73bf3258162841e4b244e7a0fe6aa983~mv2.png").src}
              alt="GreenSpaces on desktop, tablet and phone"
              width={944}
              height={401}
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="h-auto w-full"
            />
          </Reveal>
        </Container>
      </Panel>

      {/* Species sponsorship */}
      <Section>
        <Container>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <Reveal>
              <Eyebrow>Species sponsorship</Eyebrow>
              <H2 className="mt-5 max-w-2xl">
                Mapping the iconic, rare and <em>endangered species</em> of the planet.
              </H2>
            </Reveal>
            <Reveal delay={0.1}>
              <Button href="/speciessponsors" variant="outline">Become a sponsor</Button>
            </Reveal>
          </div>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {SPONSORED.map((s, i) => (
              <Reveal key={s.href} delay={0.08 * i}>
                <a href={s.href} className="group relative block aspect-[3/4] overflow-hidden rounded-3xl">
                  <Image src={s.image.src} alt={s.species} fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-[1.4s] ease-out-soft group-hover:scale-[1.06]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/90 via-forest-deep/10 to-transparent" />
                  <div className="absolute left-4 top-4 rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white ring-1 ring-white/25 backdrop-blur-md">
                    {s.sponsor}
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                    <p className="text-sm italic text-white/70">{s.latin}</p>
                    <h3 className="mt-1 font-display text-2xl font-light">{s.species}</h3>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* News */}
      <Panel tone="sand">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Reveal>
              <Eyebrow>News</Eyebrow>
              <H2 className="mt-5">
                Latest from <em>Tremap.</em>
              </H2>
            </Reveal>
            <Reveal delay={0.1}>
              <Button href="/blog" variant="outline">All posts</Button>
            </Reveal>
          </div>
          <div className="mt-14 grid gap-10 md:grid-cols-3">
            {latest.map((post, i) => (
              <Reveal key={post.slug} delay={0.08 * i}>
                <PostCard post={post} />
              </Reveal>
            ))}
          </div>
        </Container>
      </Panel>

      {/* Get in touch */}
      <Section id="contact">
        <Container className="grid gap-14 lg:grid-cols-[1fr_1.1fr]">
          <Reveal>
            <Eyebrow>Get in touch</Eyebrow>
            <H2 className="mt-5">
              Let&apos;s map <em>what matters.</em>
            </H2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-stone">
              Questions about the app, the portal, GreenSpaces or sponsorship?
              Send us a message and our team will get back to you.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="rounded-[28px] bg-mist p-6 sm:p-10">
            <ContactForm topic="Homepage enquiry" submitLabel="Get more info" />
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
