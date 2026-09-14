import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import ContactList from "./ContactList";
import QuoteForm from "./QuoteForm";

export default function QuoteSection() {
  return (
    <section id="quote" className="scroll-mt-20 bg-bone py-24 sm:py-32">
      <div className="container-x grid grid-cols-1 gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div>
          <SectionHeading
            align="left"
            eyebrow="Request your quote today"
            title={
              <>
                Tell us about <em className="text-clay-deep">your project.</em>
              </>
            }
          />
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-mute">
              We understand that selecting the right team can be challenging. Share a few details and we&apos;ll come
              back with a clear, transparent quote.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <ContactList className="mt-10" />
          </Reveal>
        </div>
        <Reveal delay={0.15}>
          <QuoteForm />
        </Reveal>
      </div>
    </section>
  );
}
