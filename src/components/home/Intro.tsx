import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import ScrollText from "@/components/ui/ScrollText";
import StatsGrid from "@/components/ui/StatsGrid";
import { intro } from "@/lib/content";

export default function Intro() {
  return (
    <section className="bg-bone py-24 sm:py-32">
      <div className="container-x">
        <Reveal>
          <span className="eyebrow text-clay-deep">The Prime difference</span>
        </Reveal>
        <ScrollText
          text={intro.lead}
          className="mt-8 max-w-6xl font-display text-[2.6rem] leading-[1.05] text-night sm:text-6xl lg:text-[5.25rem]"
        />

        <div className="mt-16 grid gap-12 lg:mt-24 lg:grid-cols-2 lg:gap-24">
          <Reveal className="space-y-6 text-lg leading-relaxed text-mute">
            {intro.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <Button href="/about" variant="dark" className="mt-4">
              Meet the team
            </Button>
          </Reveal>
          <StatsGrid className="grid-cols-2" />
        </div>
      </div>
    </section>
  );
}
