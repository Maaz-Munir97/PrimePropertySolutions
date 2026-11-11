import type { Metadata } from "next";
import clsx from "clsx";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import BeforeAfter from "@/components/ui/BeforeAfter";
import Process from "@/components/home/Process";
import QuoteSection from "@/components/contact/QuoteSection";
import { services, site, transformations } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services",
  description: "Commercial & strata, residential and insurance repair services from MaxOne Solutions.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Complete solutions for every kind of property."
        accent={[3, 4, 5, 6]}
        text="From a single room to an entire strata complex, one experienced team handles every detail — and keeps you informed from first consultation to final reveal."
        image="/images/gallery/g8.webp"
        imageAlt="Open-plan kitchen and dining area"
      />

      {services.map((service, i) => {
        const t = transformations[service.transformation];
        return (
          <section
            key={service.slug}
            id={service.slug}
            className={clsx("scroll-mt-20 py-24 sm:py-32", i % 2 ? "bg-paper" : "bg-bone")}
          >
            <div className="container-x grid items-center gap-14 lg:grid-cols-2 lg:gap-24">
              <div className={clsx(i % 2 === 1 && "lg:order-2")}>
                <Reveal>
                  <span className="eyebrow text-clay-deep">
                    {service.number} — {service.tagline}
                  </span>
                  <h2 className="mt-6 font-display text-5xl leading-none sm:text-7xl">{service.title}</h2>
                  <p className="mt-8 text-lg leading-relaxed text-mute">{service.description}</p>
                </Reveal>
                <Reveal delay={0.1}>
                  <ul className="mt-10 divide-y divide-night/10 border-y border-night/10">
                    {service.points.map((point, j) => (
                      <li key={point} className="flex items-center justify-between gap-6 py-4">
                        <span>{point}</span>
                        <span className="font-display text-lg text-clay-deep italic">0{j + 1}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-10 flex flex-wrap gap-3">
                    <Button href="/contact" variant="dark">
                      Request a quote
                    </Button>
                    <Button href={site.phoneHref} variant="ghost-dark" icon={false}>
                      Call {site.phone}
                    </Button>
                  </div>
                </Reveal>
              </div>

              <Reveal delay={0.15} className="mx-auto w-full max-w-md">
                <BeforeAfter before={t.before} after={t.after} label={t.title} sizes="(min-width: 1024px) 28rem, 90vw" />
                <p className="mt-4 text-center text-sm text-mute">Drag to compare — a recent {t.title.toLowerCase()} project</p>
              </Reveal>
            </div>
          </section>
        );
      })}

      <Process />
      <QuoteSection />
    </>
  );
}
