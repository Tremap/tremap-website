import { Button, Container } from "@/components/ui";

export default function NotFound() {
  return (
    <Container className="flex min-h-[70vh] flex-col items-start justify-center pb-24 pt-40">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-leaf">404</p>
      <h1 className="mt-5 max-w-3xl font-display text-[clamp(2.6rem,6vw,5rem)] font-light leading-[1.02] tracking-[-0.03em] text-forest">
        This branch doesn&apos;t <em className="italic text-leaf">lead anywhere.</em>
      </h1>
      <p className="mt-6 max-w-xl text-lg text-stone">The page you&apos;re looking for has moved or no longer exists.</p>
      <div className="mt-10 flex flex-wrap gap-3">
        <Button href="/">Back to home</Button>
        <Button href="/search" variant="outline" arrow={false}>
          Search the site
        </Button>
      </div>
    </Container>
  );
}
