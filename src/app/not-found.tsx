import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="relative flex min-h-svh items-center overflow-hidden bg-night text-bone">
      <div aria-hidden className="bg-lines pointer-events-none absolute inset-0" />
      <div aria-hidden className="pointer-events-none absolute -right-40 top-1/4 size-[36rem] rounded-full bg-clay/20 blur-[140px]" />
      <div className="container-x relative py-40">
        <span className="eyebrow text-clay-soft">Error 404</span>
        <h1 className="mt-6 font-display text-6xl leading-[0.95] sm:text-8xl">
          This page needs <em className="text-clay">a fresh coat.</em>
        </h1>
        <p className="mt-6 max-w-md text-lg text-bone/65">
          The page you&apos;re looking for has moved or doesn&apos;t exist. Let&apos;s get you back on track.
        </p>
        <Button href="/" className="mt-10">
          Back to home
        </Button>
      </div>
    </section>
  );
}
