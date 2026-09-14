import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { nav, services, site } from "@/lib/content";
import Logo from "./Logo";

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-xs font-semibold tracking-[0.2em] text-bone/40 uppercase">{title}</h3>
      <ul className="mt-5 space-y-3 text-sm text-bone/75">{children}</ul>
    </div>
  );
}

const linkClass = "transition-colors duration-300 hover:text-clay-soft";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-night text-bone">
      <div aria-hidden className="pointer-events-none absolute -left-40 top-0 size-[34rem] rounded-full bg-clay/10 blur-[140px]" />

      <div className="container-x relative pt-24 sm:pt-32">
        <div className="flex flex-col gap-12 border-b border-bone/10 pb-16 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow text-clay-soft">Start your project</p>
            <h2 className="mt-6 max-w-3xl font-display text-5xl leading-[0.95] sm:text-7xl lg:text-8xl">
              Let&apos;s transform <em className="text-clay">your property.</em>
            </h2>
          </div>
          <Link
            href="/contact"
            className="group flex size-40 shrink-0 items-center justify-center rounded-full bg-clay text-night transition-transform duration-700 ease-luxe hover:scale-105 sm:size-48"
          >
            <span className="flex flex-col items-center gap-2 text-center text-sm font-semibold">
              Request
              <br />a quote
              <ArrowUpRight className="size-6 transition-transform duration-500 group-hover:rotate-45" aria-hidden />
            </span>
          </Link>
        </div>

        <div className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.3fr_0.7fr_0.9fr_1.1fr]">
          <div>
            <Logo />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-bone/55">
              Residential, commercial, strata and insurance property solutions — backed by over 30 years of
              experience.
            </p>
          </div>

          <FooterColumn title="Explore">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
          </FooterColumn>

          <FooterColumn title="Services">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/services#${s.slug}`} className={linkClass}>
                  {s.title}
                </Link>
              </li>
            ))}
          </FooterColumn>

          <FooterColumn title="Contact">
            <li>
              <span className="text-bone/45">Quotes </span>
              <a href={site.quotesPhoneHref} className={linkClass}>
                {site.quotesPhone}
              </a>
            </li>
            <li>
              <span className="text-bone/45">Office </span>
              <a href={site.officePhoneHref} className={linkClass}>
                {site.officePhone}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className={`${linkClass} break-all`}>
                {site.email}
              </a>
            </li>
            {site.offices.map((o) => (
              <li key={o.name}>
                <span className="text-bone/45">{o.name} · </span>
                {o.address}
              </li>
            ))}
          </FooterColumn>
        </div>

        <div className="flex flex-col gap-3 border-t border-bone/10 py-8 text-xs text-bone/45 lg:flex-row lg:items-center lg:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name} · ABN {site.abn} · QBCC {site.qbcc} · NSW {site.nswLicence}
          </p>
          <p>Concept redesign — not the official website</p>
        </div>
      </div>

      <p
        aria-hidden
        className="pointer-events-none -mb-[0.12em] select-none text-center font-display text-[30vw] leading-[0.8] text-bone/[0.035]"
      >
        PRIME
      </p>
    </footer>
  );
}
