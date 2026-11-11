import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import ScrollText from "@/components/ui/ScrollText";
import SectionHeading from "@/components/ui/SectionHeading";
import StatsGrid from "@/components/ui/StatsGrid";
import CtaBanner from "@/components/ui/CtaBanner";
import Accreditations from "@/components/home/Accreditations";
import { intro, values } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description: "About MaxOne Solutions — residential, commercial, strata and insurance property solutions.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="Built on trust. Delivered with care."
        accent={[3, 4, 5]}
        text="More than just trades — a team committed to building lasting relationships with every client, on every project."
        image="/images/gallery/g4.webp"
        imageAlt="Two-storey home with pool"
      />

      {/* Story */}
      <section className="bg-bone py-24 sm:py-32">
        <div className="container-x">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-24">
            <div>
              <Reveal>
                <span className="eyebrow text-clay-deep">Our story</span>
              </Reveal>
              <ScrollText
                text="Over 30 years across residential, commercial, insurance and catastrophic events."
                className="mt-8 font-display text-[2.6rem] leading-[1.05] sm:text-6xl"
              />
            </div>
            <Reveal delay={0.1} className="space-y-6 self-end text-lg leading-relaxed text-mute">
              <p>{intro.lead}</p>
              {intro.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </Reveal>
          </div>
          <StatsGrid className="mt-20 grid-cols-2 lg:grid-cols-4" />
        </div>
      </section>

      {/* Values */}
      <section className="bg-night py-24 text-bone sm:py-32">
        <div className="container-x">
          <SectionHeading
            light
            eyebrow="What we stand for"
            title={
              <>
                Setting new benchmarks <em className="text-clay">for quality & service.</em>
              </>
            }
          />
          <div className="mt-16 grid gap-px overflow-hidden rounded-[2rem] border border-bone/10 bg-bone/10 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, i) => (
              <Reveal
                key={value.title}
                delay={i * 0.08}
                className="group relative bg-night p-8 transition-colors duration-500 hover:bg-coal sm:p-10"
              >
                <span className="font-display text-6xl text-clay italic">0{i + 1}</span>
                <h3 className="mt-14 font-display text-3xl">{value.title}</h3>
                <p className="mt-3 leading-relaxed text-bone/60">{value.text}</p>
                <span
                  aria-hidden
                  className="absolute bottom-0 left-0 h-0.5 w-0 bg-clay transition-all duration-700 ease-luxe group-hover:w-full"
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Accreditations tone="bone" />
      <div className="bg-bone">
        <CtaBanner />
      </div>
    </>
  );
}
