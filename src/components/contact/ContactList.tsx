import clsx from "clsx";
import { ArrowUpRight, Mail, Phone, PhoneCall } from "lucide-react";
import { site } from "@/lib/content";

const items = [
  { icon: PhoneCall, label: "Quotes", value: site.quotesPhone, href: site.quotesPhoneHref },
  { icon: Phone, label: "Office", value: site.officePhone, href: site.officePhoneHref },
  { icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}` },
];

export default function ContactList({ className }: { className?: string }) {
  return (
    <ul className={clsx("space-y-3", className)}>
      {items.map(({ icon: Icon, label, value, href }) => (
        <li key={label}>
          <a
            href={href}
            className="group flex items-center gap-4 rounded-2xl border border-night/10 bg-paper/60 p-4 transition-colors duration-500 hover:border-clay/60 hover:bg-paper"
          >
            <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-night text-clay-soft transition-colors duration-500 group-hover:bg-clay group-hover:text-night">
              <Icon className="size-5" aria-hidden />
            </span>
            <span className="min-w-0">
              <span className="block text-xs font-semibold tracking-[0.18em] text-mute uppercase">{label}</span>
              <span className="mt-0.5 block font-medium text-night [overflow-wrap:anywhere]">{value}</span>
            </span>
            <ArrowUpRight
              className="ml-auto size-4 shrink-0 text-mute transition-all duration-500 group-hover:rotate-45 group-hover:text-night"
              aria-hidden
            />
          </a>
        </li>
      ))}
    </ul>
  );
}
