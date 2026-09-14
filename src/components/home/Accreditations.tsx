import clsx from "clsx";
import { Award, Building2, Paintbrush, ShieldCheck } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { accreditations } from "@/lib/content";

const icons = { dulux: Paintbrush, mbq: Building2, qbcc: ShieldCheck, guarantee: Award };

export default function Accreditations({ tone = "paper" }: { tone?: "paper" | "bone" }) {
  return (
    <section className={clsx("py-24 sm:py-32", tone === "paper" ? "bg-paper" : "bg-bone")}>
      <div className="container-x">
        <SectionHeading
          eyebrow="Accreditations & awards"
          title={
            <>
              Licensed, accredited <em className="text-clay-deep">& guaranteed.</em>
            </>
          }
          text="Peace of mind comes standard. Our work is fully licensed, industry accredited and backed by a five-year workmanship guarantee."
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {accreditations.map((item, i) => {
            const Icon = icons[item.icon];
            return (
              <Reveal
                key={item.title}
                delay={i * 0.08}
                className={clsx(
                  "group rounded-3xl border border-night/10 p-8 transition-all duration-500 ease-luxe hover:-translate-y-2 hover:shadow-[0_30px_60px_-30px_rgba(12,13,15,0.35)]",
                  tone === "paper" ? "bg-bone" : "bg-paper",
                )}
              >
                <span className="flex size-14 items-center justify-center rounded-2xl bg-night text-clay-soft transition-colors duration-500 group-hover:bg-clay group-hover:text-night">
                  <Icon className="size-6" aria-hidden />
                </span>
                <h3 className="mt-12 font-display text-3xl leading-tight">{item.title}</h3>
                <p className="mt-2 text-sm text-mute">{item.detail}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
