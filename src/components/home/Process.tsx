import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { process } from "@/lib/content";

export default function Process() {
  return (
    <section className="relative overflow-hidden bg-night py-24 text-bone sm:py-32">
      <div className="container-x">
        <SectionHeading
          light
          eyebrow="Our process"
          title={
            <>
              From first consultation <em className="text-clay">to the final reveal.</em>
            </>
          }
          text="Clear communication and transparency at every stage — you'll always know what's happening and what comes next."
        />

        <ol className="mt-16 grid gap-4 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {process.map((step, i) => (
            <Reveal
              as="li"
              key={step.title}
              delay={i * 0.1}
              className="group relative flex min-h-80 flex-col overflow-hidden rounded-3xl border border-bone/10 bg-coal p-8 transition-colors duration-500 hover:border-clay hover:text-night"
            >
              {/* colour fills up from the bottom on hover */}
              <span
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-0 bg-clay transition-[height] duration-700 ease-luxe group-hover:h-full"
              />
              <span className="relative font-display text-7xl leading-none text-clay transition-colors duration-500 group-hover:text-night">
                0{i + 1}
              </span>
              <h3 className="relative mt-auto pt-12 font-display text-3xl">{step.title}</h3>
              <p className="relative mt-3 leading-relaxed text-bone/60 transition-colors duration-500 group-hover:text-night/75">
                {step.text}
              </p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
