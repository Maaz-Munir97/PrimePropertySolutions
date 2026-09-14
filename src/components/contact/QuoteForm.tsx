"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import clsx from "clsx";
import { CheckCircle2, Loader2, Send } from "lucide-react";

const projectTypes = ["Residential", "Commercial / Strata", "Insurance repairs", "Something else"];

const fieldClass =
  "peer w-full rounded-xl border border-night/15 bg-bone/60 px-4 pb-2.5 pt-6 text-night outline-none transition-colors placeholder:text-transparent focus:border-clay focus:bg-paper";
const labelClass =
  "pointer-events-none absolute left-4 top-4 text-sm text-mute transition-all duration-300 peer-focus:top-2 peer-focus:text-xs peer-focus:text-clay-deep peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs";

function Field({
  id,
  label,
  type = "text",
  required,
  autoComplete,
  textarea,
}: {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  textarea?: boolean;
}) {
  return (
    <div className="relative">
      {textarea ? (
        <textarea id={id} name={id} rows={5} placeholder={label} className={clsx(fieldClass, "resize-none")} />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          required={required}
          placeholder={label}
          autoComplete={autoComplete}
          className={fieldClass}
        />
      )}
      <label htmlFor={id} className={labelClass}>
        {label}
        {required && <span className="text-clay-deep"> *</span>}
      </label>
    </div>
  );
}

export default function QuoteForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [projectType, setProjectType] = useState(projectTypes[0]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    // Demo only — no backend is connected yet.
    setTimeout(() => setStatus("sent"), 1200);
  };

  return (
    <div className="relative overflow-hidden rounded-[2rem] bg-paper p-6 shadow-[0_40px_120px_-40px_rgba(12,13,15,0.3)] sm:p-10">
      <div className="mb-8 border-b border-night/10 pb-6">
        <h3 className="font-display text-3xl sm:text-4xl">Request your quote</h3>
      </div>

      <AnimatePresence mode="wait">
        {status === "sent" ? (
          <motion.div
            key="sent"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex min-h-[460px] flex-col items-center justify-center text-center"
          >
            <motion.span
              initial={{ scale: 0, rotate: -40 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.1 }}
            >
              <CheckCircle2 className="size-16 text-clay" aria-hidden />
            </motion.span>
            <h4 className="mt-6 font-display text-4xl">Thank you!</h4>
            <p className="mt-3 max-w-sm text-mute">
              This is a demo form, so your enquiry wasn&apos;t actually sent. On the live site, our front desk would
              be in touch shortly.
            </p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="mt-8 text-sm font-semibold text-clay-deep hover:underline"
            >
              Send another enquiry
            </button>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={onSubmit} exit={{ opacity: 0 }} className="space-y-5">
            <fieldset>
              <legend className="text-sm font-medium text-night">Project type</legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {projectTypes.map((type) => (
                  <label
                    key={type}
                    className={clsx(
                      "cursor-pointer rounded-full border px-4 py-2 text-sm transition-colors duration-300 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-clay",
                      projectType === type
                        ? "border-night bg-night text-bone"
                        : "border-night/15 text-night/75 hover:border-night/40",
                    )}
                  >
                    <input
                      type="radio"
                      name="projectType"
                      value={type}
                      checked={projectType === type}
                      onChange={() => setProjectType(type)}
                      className="sr-only"
                    />
                    {type}
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field id="name" label="Full name" required autoComplete="name" />
              <Field id="phone" label="Phone" type="tel" required autoComplete="tel" />
            </div>
            <Field id="email" label="Email address" type="email" required autoComplete="email" />
            <Field id="suburb" label="Property suburb" autoComplete="address-level2" />
            <Field id="message" label="Tell us about your project" textarea />

            <button
              type="submit"
              disabled={status === "sending"}
              className="group relative isolate flex w-full items-center justify-center gap-3 overflow-hidden rounded-full bg-night px-8 py-4 text-sm font-semibold text-bone transition-colors duration-500 after:absolute after:inset-0 after:-z-10 after:translate-y-full after:bg-clay after:transition-transform after:duration-500 after:ease-luxe hover:text-night hover:after:translate-y-0 disabled:opacity-70 sm:w-auto"
            >
              {status === "sending" ? (
                <>
                  <Loader2 className="size-4 animate-spin" aria-hidden /> Sending…
                </>
              ) : (
                <>
                  Send enquiry
                  <Send className="size-4 transition-transform duration-500 group-hover:translate-x-1" aria-hidden />
                </>
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
