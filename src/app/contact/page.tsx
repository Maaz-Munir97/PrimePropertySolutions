import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import ContactList from "@/components/contact/ContactList";
import QuoteForm from "@/components/contact/QuoteForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Request a quote or get in touch with MaxOne Solutions in Australia.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact us"
        title="Let's talk about your property."
        accent={[3, 4]}
        text="Request a quote, ask a question or book a consultation — our front desk will make sure your enquiry reaches the right person."
      />

      <section className="bg-bone py-20 sm:py-28">
        <div className="container-x grid grid-cols-1 gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div className="space-y-10">
            <Reveal>
              <span className="eyebrow text-clay-deep">Front desk</span>
              <h2 className="mt-5 font-display text-5xl leading-none sm:text-6xl">
                We&apos;d love to <em className="text-clay-deep">hear from you.</em>
              </h2>
            </Reveal>
            <Reveal delay={0.05}>
              <ContactList />
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <div className="lg:sticky lg:top-28">
              <QuoteForm />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
