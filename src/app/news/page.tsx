import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/motion";
import { PostCard } from "@/components/PostCard";
import { Arrow, Button, Container, Eyebrow, H2, PageHero, Panel, Section } from "@/components/ui";
import { m } from "@/lib/media";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "News",
  description: "Press releases, media coverage and the Tremap press kit — logos, app screenshots and team photos.",
};

const PRESS_KIT = [
  { title: "Tremap logo", meta: "ZIP · 0.3 MB", href: "/files/tremap-logo.zip" },
  { title: "Tremap app screenshots", meta: "ZIP · 8.1 MB", href: "/files/tremap-app-screenshots.zip" },
  { title: "treBG — Tremap web portal", meta: "PDF · 1.3 MB", href: "/files/trebg-collection-management.pdf" },
  { title: "Tremap team photos", meta: "ZIP · 0.4 MB", href: "/files/tremap-team.zip" },
];

export default function NewsPage() {
  const posts = getAllPosts();
  const press = posts.filter((p) => p.categories.includes("Press Release")).slice(0, 3);
  const media = posts.filter((p) => p.categories.includes("Media Coverage")).slice(0, 4);
  const pressLogo = m("943aed_fdec792b68fb420c882a9deb4711d70e~mv2.png");

  return (
    <>
      <PageHero
        eyebrow="Newsroom"
        title={<>News, press and <em>media.</em></>}
        intro="The latest press releases and coverage of Tremap — plus everything journalists need in our press kit."
        image={m("943aed_cc196bbb932645a7be2f53e3a48fead5~mv2.jpg")}
      >
        <Button href="/blog">All posts</Button>
        <Button href="#press-kit" variant="outline-light" arrow={false}>
          Press kit
        </Button>
      </PageHero>

      <Section>
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Reveal>
              <Eyebrow>Press releases</Eyebrow>
            </Reveal>
            <Link href="/blog/categories/press_release" className="group inline-flex items-center gap-2 font-semibold text-forest">
              All press releases <Arrow className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="mt-10 grid gap-10 md:grid-cols-3">
            {press.map((post, i) => (
              <Reveal key={post.slug} delay={0.08 * i}>
                <PostCard post={post} />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Panel tone="mist">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Reveal>
              <Eyebrow>Media coverage</Eyebrow>
              <H2 className="mt-5">
                Tremap <em>in the media.</em>
              </H2>
            </Reveal>
            <Link href="/blog/categories/media-coverage" className="group inline-flex items-center gap-2 font-semibold text-forest">
              All coverage <Arrow className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {media.map((post, i) => (
              <Reveal key={post.slug} delay={0.06 * i}>
                <li>
                  <Link href={`/post/${post.slug}`} className="group flex items-center gap-5 rounded-3xl bg-white p-4 pr-6 ring-1 ring-forest/5 transition-shadow hover:shadow-[0_20px_40px_-24px_rgba(18,36,26,0.35)]">
                    <span className="relative size-20 shrink-0 overflow-hidden rounded-2xl bg-cream">
                      {post.cover && <Image src={post.cover} alt="" fill sizes="80px" className="object-contain p-1" />}
                    </span>
                    <span className="flex-1">
                      <span className="block font-display text-xl leading-snug text-forest group-hover:text-leaf">{post.title}</span>
                      <span className="mt-1 block text-sm text-stone">{post.date.slice(0, 4)}</span>
                    </span>
                    <Arrow className="shrink-0 text-leaf transition-transform group-hover:translate-x-1" />
                  </Link>
                </li>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Panel>

      <Section id="press-kit">
        <Container className="grid gap-14 lg:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <Eyebrow>Press kit</Eyebrow>
            <H2 className="mt-5">
              Doing a piece on Tremap? <em>We&apos;d love to talk to you!</em>
            </H2>
            <p className="mt-6 text-lg leading-relaxed text-stone">We have lots more to share! Reach out for more press information.</p>
            <ul className="mt-10 grid gap-3 sm:grid-cols-2">
              {PRESS_KIT.map((f) => (
                <li key={f.href}>
                  <a href={f.href} download className="group flex items-center gap-4 rounded-2xl bg-white p-3 pr-5 ring-1 ring-forest/10 transition-all hover:-translate-y-0.5 hover:ring-leaf/40">
                    <Image src={pressLogo.src} alt="" width={56} height={46} className="h-12 w-14 rounded-lg object-contain" />
                    <span>
                      <span className="block font-semibold leading-snug text-forest">{f.title}</span>
                      <span className="block text-sm text-stone">{f.meta}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1} className="self-start rounded-[28px] bg-mist p-6 sm:p-10">
            <ContactForm topic="Press enquiry" submitLabel="Connect with us" successText="Thanks! We'll be in touch soon!" withOrganisation />
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
