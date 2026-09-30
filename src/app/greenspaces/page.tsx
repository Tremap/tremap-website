import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/motion";
import { Button, CheckItem, Container, CtaBand, Eyebrow, H2, PageHero, Panel, Section } from "@/components/ui";
import { VideoGallery } from "@/components/VideoGallery";
import { m } from "@/lib/media";
import { CONTACT, mailto } from "@/lib/site";

export const metadata: Metadata = {
  title: "GreenSpaces",
  description:
    "Cutting edge green space management software for local and regional authorities, city councils, arborists, tree surveyors and landscapers.",
};

const DEMO = mailto(CONTACT.salesEmail, "I'd like to schedule a demo of Tremap GreenSpaces");

const WHY = [
  {
    title: "Increase efficiency",
    body: "Green management based on up-to-date, real-time information is much more cost-effective. Make decisions with a comprehensive record at your fingertips of every single management event and user action performed.",
  },
  {
    title: "Engage the public",
    body: "Wondering how to increase public engagement in green spaces? Tremap GreenSpaces provides the citizen reporting and public portal toolkit to help communities become involved and invested in their green spaces.",
  },
  {
    title: "Integrate",
    body: "Our flexible open standards based solutions can be easily integrated into existing management systems. This gives you full control of your data at all times via clearly documented interfaces.",
  },
  {
    title: "Improve safety",
    body: "Updated monitoring of trees and play equipment helps reduce the risk of accidents in public areas. GreenSpaces includes integrated QTRA calculation, tree assessments, playground inspections and secure tracking of maintenance activities.",
  },
  {
    title: "Innovate",
    body: "GreenSpaces represents 20 years of constant development and improvement in data capture techniques, use of environmental sensors, NFC and RFID tagging. It offers much-improved and more accurate ecosystem services calculation and intelligent workflow planning.",
  },
];

const TECH = [
  ["A single, up-to-date database", "Have special requirements for procedures, managed lists and user roles? Tremap GreenSpaces lets you configure everything to suit the way you work."],
  ["Unlimited number of users", "You decide who uses the platform. There is no limit on the number of users you can create for all stakeholders involved in the management of green areas."],
  ["Data import/export", "Tremap GreenSpaces allows authorised users to import and export survey data in a standardised and documented format."],
  ["Compliance", "Tremap GreenSpaces follows international data storage and data structure standards for tree assessments and playground management."],
  ["Sharing", "An activity calendar for each site can be shared with contractors and administrators as a detailed job list or Gantt chart. Users can view only those activities for which they have responsibility."],
  ["Scheduling", "Maintenance activities, tree assessments and inspections can be scheduled and assigned to operators. Automatic procedures allow planning of activities dependent on inspection outcomes."],
  ["Versions", "GreenSpaces is available in various versions for green space management companies, public administrations and tree and playground experts."],
  ["Interoperability", "Don't want your data locked into one platform? Tremap GreenSpaces is designed for interoperability, allowing integration with other IT platforms via API interfaces."],
  ["Software as a Service", "Tremap GreenSpaces is available as Software as a Service (SaaS) for an annual subscription fee, which includes the use of the web platform and mobile app hosting service, daily data back-up and remote support."],
  ["Offline operation", "Information can be updated directly in the field using the mobile app. In the event of weak or no Internet connectivity, data is recorded and synced with the server when connectivity is restored."],
  ["QTRA calculation", "Tremap GreenSpaces includes inbuilt QTRA calculation for risk assessment."],
  ["Base maps and data layers", "Ordnance Survey maps included as standard. Tree canopy cover layers, remote sensing data layers and tree equity scoring data coming soon."],
];

const VIDEOS = [
  {
    vimeoId: "947268750",
    title: "GreenSpaces | Hamburg Success Story",
    duration: "7:51",
    thumb: m("058f91_ea21c9bb17364d2b81f1974f753b83a0~mv2.png").src,
    description:
      "SBH | Schulbau Hamburg is responsible for managing the safety and maintenance of the entire set of green infrastructure assets at over 400 school ground sites across the city of Hamburg, Germany. See how they've used GreenSpaces to totally revolutionise their work flows, involving all kinds of stakeholders and cutting costs, excess communications and stress.",
  },
  {
    vimeoId: "947321107",
    title: "GreenSpaces | Bolzano Success Story",
    duration: "7:52",
    thumb: "/media/vimeo-bolzano.jpg",
    description:
      "Check out how the City of Bolzano in South Tyrol, Italy, has made huge savings in time and money using GreenSpaces! By giving all their staff, admins and external contractors access to the GreenSpaces system, they've totally eliminated needless communication, waiting times, wasted trips out on site and delays in generating reports.",
  },
  {
    vimeoId: "947339645",
    title: "GreenSpaces | Kraków Success Story",
    duration: "8:37",
    thumb: "/media/vimeo-krakow.jpg",
    description:
      "ZZM Kraków (Poland) manages a vast array of green infrastructure sites across the city. And they've used GreenSpaces to bring all their data into one, easily accessible system. With all their data in one place, they've totally eliminated the extra steps that slow down green space management.",
  },
];

export default function GreenSpacesPage() {
  const gsLogo = m("943aed_173e72cefbfd44bea88605e4a15e7d80~mv2.jpg");
  return (
    <>
      <PageHero
        eyebrow="Tremap GreenSpaces"
        title={<>State-of-the-art management software for <em>urban trees and green areas.</em></>}
        intro="GreenSpaces has defined the standard in innovative green space management throughout Europe for more than 20 years."
        image={m("943aed_d3a851bf753f47a3a3c6451acab3e403~mv2.jpg")}
      >
        <Button href={DEMO}>Request a demo</Button>
        <Button href="#videos" variant="outline-light" arrow={false}>
          Watch success stories
        </Button>
      </PageHero>

      {/* Presenting + stats */}
      <Section>
        <Container className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <p className="text-lg leading-relaxed text-stone">
              Optimised for use by UK local authorities, tree care and green space management professionals, we proudly present
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <Image src={m("7ca40b_e0aa8cdfb5b94f348caaa5b6ff017571~mv2.png").src} alt="Tremap" width={1631} height={525} className="h-12 w-auto" />
              <span className="h-10 w-px bg-forest/15" />
              <Image src={gsLogo.src} alt="GreenSpaces, designed by R3GIS" width={gsLogo.w} height={gsLogo.h} className="h-20 w-auto mix-blend-multiply" />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <dl className="grid grid-cols-3 gap-4">
              {[
                ["30k+", "Equipment installations monitored"],
                ["2m+", "Trees managed"],
                ["5,000+", "Satisfied users"],
              ].map(([n, l]) => (
                <div key={l} className="rounded-3xl bg-mist p-6">
                  <dt className="font-display text-[clamp(1.8rem,3.2vw,2.7rem)] font-light leading-none text-forest">{n}</dt>
                  <dd className="mt-3 text-sm leading-snug text-stone">{l}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </Container>
      </Section>

      {/* What is */}
      <Panel tone="mist">
        <Container>
          <Reveal className="max-w-3xl">
            <Eyebrow>What is Tremap GreenSpaces</Eyebrow>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              <>An integrated and geo-referenced platform to <strong className="font-semibold text-forest">organise and document the care and maintenance</strong> of trees, playgrounds and urban green spaces</>,
              <>A <strong className="font-semibold text-forest">single, continually updated database</strong> and a simple, user-friendly SaaS interface that provides configurable access for an unlimited number of users</>,
              <>A powerful tool to help cities, companies and consultants <strong className="font-semibold text-forest">save time and money</strong> on green space maintenance, risk management and ecosystem benefits reporting</>,
            ].map((text, i) => (
              <Reveal key={i} delay={0.08 * i} className="rounded-3xl bg-white p-8">
                <span className="font-display text-sm text-ember">0{i + 1}</span>
                <p className="mt-4 text-lg leading-relaxed text-ink/80">{text}</p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.1} className="mt-14">
            <Image src={m("943aed_73bf3258162841e4b244e7a0fe6aa983~mv2.png").src} alt="GreenSpaces on phone, desktop and tablet" width={944} height={401} sizes="(min-width: 1280px) 1100px, 100vw" className="mx-auto h-auto w-full max-w-5xl" />
          </Reveal>
        </Container>
      </Panel>

      {/* Why */}
      <Section>
        <Container>
          <Reveal>
            <Eyebrow>Why Tremap GreenSpaces</Eyebrow>
            <H2 className="mt-5 max-w-2xl">
              Better decisions, <em>safer spaces,</em> lower costs.
            </H2>
          </Reveal>
          <div className="mt-14 grid gap-px overflow-hidden rounded-[28px] bg-forest/10 sm:grid-cols-2 lg:grid-cols-3">
            {WHY.map((w, i) => (
              <Reveal key={w.title} delay={0.06 * i} className="bg-cream p-8 transition-colors hover:bg-white">
                <h3 className="font-display text-2xl text-forest">{w.title}</h3>
                <p className="mt-3 leading-relaxed text-stone">{w.body}</p>
              </Reveal>
            ))}
            <Reveal delay={0.3} className="flex flex-col justify-between bg-forest p-8 text-white">
              <p className="font-display text-2xl leading-snug">Used by thousands of urban green space management professionals across Europe.</p>
              <ul className="mt-6 space-y-2">
                <CheckItem light>Tree and green space management companies</CheckItem>
                <CheckItem light>Local/regional authorities and councils</CheckItem>
                <CheckItem light>Tree and playground consultants</CheckItem>
              </ul>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Videos */}
      <Panel tone="sand" id="videos">
        <Container>
          <Reveal>
            <Eyebrow>GreenSpaces user success stories</Eyebrow>
            <H2 className="mt-5 max-w-2xl">
              See it at work in <em>Hamburg, Bolzano and Kraków.</em>
            </H2>
          </Reveal>
          <Reveal delay={0.1} className="mt-12">
            <VideoGallery videos={VIDEOS} />
          </Reveal>
          <p className="mt-10 font-display text-xl text-forest">Watch this space for User Success Stories in the UK coming soon!</p>
        </Container>
      </Panel>

      {/* Comprehensive management */}
      <Section>
        <Container className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <Image src={m("943aed_5f613e30d10443e68fbb7d0a967ec9af~mv2.png").src} alt="Park assets managed in GreenSpaces: lawns, trees, irrigation, paths and benches" width={2000} height={850} sizes="(min-width: 1024px) 50vw, 100vw" className="h-auto w-full rounded-[28px]" />
          </Reveal>
          <Reveal delay={0.1}>
            <Eyebrow>Comprehensive management</Eyebrow>
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-stone [&_strong]:font-semibold [&_strong]:text-forest">
              <p>
                Tremap GreenSpaces manages all elements of green areas in a spatial database. Users can <strong>plan maintenance jobs</strong>,{" "}
                <strong>track issues</strong> with attached documents and photos, <strong>calculate QTRA scores</strong> and carry out{" "}
                <strong>tree assessments</strong> and <strong>playground/sports equipment inspections</strong>.
              </p>
              <p>
                Via the GreenSpaces mobile app, users can monitor and document operations directly in the field (even without Internet connectivity).
                Numeric or RFID tags help identify objects under management and provide <strong>full traceability</strong> for all maintenance events.
              </p>
              <p>
                Data structures for managed objects, monitoring forms, validation procedures, types of jobs and user profiles are all{" "}
                <strong>highly configurable</strong>, providing clients with an interface solution perfectly adapted to their needs.
              </p>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Modules + testimonial */}
      <Panel tone="deep">
        <Container>
          <Reveal className="max-w-3xl">
            <Eyebrow light>Tremap GreenSpaces Modules</Eyebrow>
            <p className="mt-6 text-lg leading-relaxed text-white/75">
              Tremap GreenSpaces has been designed to provide a fully comprehensive solution for inventory and management of urban green areas. In
              addition to basic inventory, assessment and work planning functionalities, a set of additional modules turn GreenSpaces into a powerful
              tool to help cities adapt to climate change, reduce the carbon footprint of maintenance activities and foster citizen engagement.
            </p>
          </Reveal>
          <div className="mt-14 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
            <Reveal className="rounded-[28px] bg-white/[0.06] p-8 ring-1 ring-white/10 sm:p-10">
              <div className="inline-block rounded-2xl bg-white px-5 py-3">
                <Image src={m("943aed_01487738ecb849478c125ce081b9833b~mv2.png").src} alt="GreenSpaces METEO Module" width={578} height={184} className="h-12 w-auto" />
              </div>
              <h3 className="mt-8 font-display text-2xl leading-snug">Take weather data into account while planning and scheduling maintenance</h3>
              <p className="mt-3 text-white/70">
                Maintenance activities in the field are highly dependent on weather conditions. This module provides the necessary weather information to
                plan activities more efficiently:
              </p>
              <ul className="mt-6 space-y-3">
                <CheckItem light>Weather dashboard with current hourly data and future forecasts for precipitation, temperature, humidity, wind, evapotranspiration and solar radiation</CheckItem>
                <CheckItem light>Weather warnings available several days in advance and updated every hour</CheckItem>
                <CheckItem light>Allows download of raw weather data and forecasts</CheckItem>
              </ul>
            </Reveal>
            <Reveal delay={0.1} className="flex flex-col justify-between rounded-[28px] bg-ember p-8 sm:p-10">
              <svg viewBox="0 0 48 36" className="h-8 w-11 text-white/60" aria-hidden>
                <path fill="currentColor" d="M0 36V21.6C0 9.9 6.2 2.7 18.6 0l2.2 4.8C14 6.8 10.6 10.8 10.4 16.8H20V36H0Zm28 0V21.6C28 9.9 34.2 2.7 46.6 0l2.2 4.8c-6.8 2-10.2 6-10.4 12H48V36H28Z" />
              </svg>
              <blockquote className="mt-6 font-display text-2xl leading-snug sm:text-3xl">
                &ldquo;Integrated QTRA calculation, super simple work flow management and sensible pricing? Tremap GreenSpaces is a game-changer!&rdquo;
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-4">
                <Image src={m("943aed_c87526c31af94b44ba161bf3189a197d~mv2.jpg").src} alt="" width={56} height={56} className="size-14 rounded-full object-cover" />
                <span>
                  <span className="block font-semibold">Alan Rowe</span>
                  <span className="block text-sm text-white/80">Operations Manager, Plymouth City Council</span>
                </span>
              </figcaption>
            </Reveal>
          </div>
        </Container>
      </Panel>

      {/* Technical information */}
      <Section>
        <Container>
          <Reveal>
            <Eyebrow>Technical information</Eyebrow>
            <H2 className="mt-5 max-w-2xl">
              Everything configurable. <em>Nothing locked in.</em>
            </H2>
          </Reveal>
          <div className="mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {TECH.map(([title, body], i) => (
              <Reveal key={title} delay={(i % 3) * 0.06} className="border-t border-forest/15 pt-6">
                <h3 className="font-display text-xl text-forest">{title}</h3>
                <p className="mt-2 leading-relaxed text-stone">{body}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* More information */}
      <Panel tone="mist">
        <Container>
          <Reveal>
            <Eyebrow>Want more information?</Eyebrow>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              { title: "Tremap GreenSpaces product brochure", meta: "PDF · 6.3 MB", href: "/files/greenspaces-brochure-2023.pdf" },
              { title: "Tremap GreenSpaces technical description", meta: "PDF · 2.4 MB", href: "/files/greenspaces-technical-description-2023.pdf" },
              { title: "Explore GreenSpaces product documentation", meta: "Request access from our team", href: "/contact?topic=greenspaces-documentation" },
            ].map((d, i) => (
              <Reveal key={d.title} delay={0.08 * i}>
                <a href={d.href} className="group flex h-full flex-col justify-between rounded-3xl bg-white p-7 ring-1 ring-forest/5 transition-all hover:-translate-y-1 hover:shadow-[0_24px_50px_-24px_rgba(18,36,26,0.35)]">
                  <span className="grid size-12 place-items-center rounded-2xl bg-sage text-forest">
                    <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
                      <path d="M7 3h7l5 5v13H7z" strokeLinejoin="round" />
                      <path d="M14 3v5h5M10 13h6M10 17h6" strokeLinecap="round" />
                    </svg>
                  </span>
                  <span className="mt-8 block font-display text-xl leading-snug text-forest">{d.title}</span>
                  <span className="mt-2 block text-sm text-stone">{d.meta}</span>
                </a>
              </Reveal>
            ))}
          </div>
        </Container>
      </Panel>

      <CtaBand title={<>See GreenSpaces <em>in action.</em></>} text="Book a demo with our team and see how GreenSpaces fits the way you work.">
        <Button href={DEMO}>Request a demo</Button>
        <Button href="/pricing" variant="outline-light" arrow={false}>
          Pricing
        </Button>
      </CtaBand>
    </>
  );
}
