import Button from "./Button";
import Reveal from "./Reveal";
import { site } from "@/lib/content";

export default function CtaBanner({ title = "Ready to start your project?" }: { title?: string }) {
  return (
    <section className="bg-bone pb-24 sm:pb-32">
      <div className="container-x">
        <Reveal className="relative overflow-hidden rounded-[2rem] bg-night px-6 py-16 text-bone sm:px-14 sm:py-20">
          <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 size-96 rounded-full bg-clay/30 blur-[120px]" />
          <div className="relative flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <span className="eyebrow text-clay-soft">Request your quote today</span>
              <h2 className="mt-6 max-w-2xl font-display text-5xl leading-[0.98] sm:text-6xl">{title}</h2>
              <p className="mt-5 max-w-lg text-bone/65">
                Clear communication and a transparent quote — from the first consultation to the final reveal.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button href="/contact">Request a quote</Button>
              <Button href={site.phoneHref} variant="ghost" icon={false}>
                {site.phone}
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
