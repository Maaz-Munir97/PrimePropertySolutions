import BeforeAfter from "@/components/ui/BeforeAfter";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { transformations } from "@/lib/content";

export default function Transformations() {
  return (
    <section className="bg-paper py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="Before & after"
          title={
            <>
              See the <em className="text-clay-deep">transformation.</em>
            </>
          }
          text="Real projects from our team. Drag the handle across each photo to compare the space before and after we stepped in."
        />

        <div className="mt-14 grid gap-12 sm:grid-cols-2 md:gap-6 lg:mt-20 lg:grid-cols-3 lg:gap-8">
          {transformations.map((t, i) => (
            <Reveal key={t.id} delay={i * 0.1} className={i === 1 ? "lg:mt-16" : ""}>
              <BeforeAfter before={t.before} after={t.after} label={t.title} />
              <div className="mt-5 flex items-baseline justify-between gap-4">
                <h3 className="font-display text-3xl">{t.title}</h3>
                <span className="font-display text-lg text-mute italic">0{i + 1}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
