import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { team } from "@/lib/content";

export default function TeamTeaser() {
  return (
    <section className="bg-night py-24 text-bone sm:py-32">
      <div className="container-x grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-20">
        <div>
          <SectionHeading
            light
            align="left"
            eyebrow="Meet the team"
            title={
              <>
                The people <em className="text-clay">behind Prime.</em>
              </>
            }
          />
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-bone/65">
              Nearly three decades of experience across the Australian and New Zealand property landscape — and
              a coordinator who keeps every trade, manager and client connected.
            </p>
            <Button href="/about" variant="ghost" className="mt-10">
              Our story
            </Button>
          </Reveal>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:gap-6">
          {team.map((member, i) => (
            <Reveal key={member.name} delay={i * 0.12} className={i === 1 ? "mt-16" : ""}>
              <Link href="/about#team" className="group block">
                <div className="relative aspect-[3/4] overflow-hidden rounded-3xl bg-graphite">
                  <Image
                    src={member.image}
                    alt={`${member.name}, ${member.role}`}
                    fill
                    sizes="(min-width: 1024px) 26vw, 50vw"
                    className="object-cover object-top transition-all duration-[1.2s] ease-luxe group-hover:scale-105 lg:grayscale lg:group-hover:grayscale-0"
                  />
                </div>
                <p className="mt-5 font-display text-2xl sm:text-3xl">{member.name}</p>
                <p className="mt-1 text-sm text-bone/55">{member.role}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
