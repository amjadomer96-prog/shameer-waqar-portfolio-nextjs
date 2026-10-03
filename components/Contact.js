import { EnvelopeSimple } from "@phosphor-icons/react/ssr";
import SplitWords from "@/components/motion/SplitWords";
import Reveal from "@/components/motion/Reveal";
import Magnetic from "@/components/motion/Magnetic";
import CopyEmail from "@/components/contact/CopyEmail";
import ContactCard from "@/components/contact/ContactCard";
import { CONTACT_LABEL, EMAIL } from "@/lib/site";

export default function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="relative isolate overflow-hidden py-24 sm:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[18%] -z-10 h-[64%] w-[100%] -translate-x-1/2 rounded-[100%] bg-[radial-gradient(closest-side,rgb(var(--accent)/0.12),transparent)] blur-2xl"
      />
      <div className="wrap grid items-center gap-16 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <div>
          <SplitWords
            as="h2"
            id="contact-title"
            className="text-[clamp(2.8rem,7vw,6rem)] font-semibold leading-[0.98] tracking-[-0.05em]"
            lines={[{ text: "Let's build" }, { text: "something.", className: "text-muted" }]}
          />
          <Reveal delay={0.2}>
            <p className="mt-7 max-w-[46ch] text-lg leading-relaxed text-muted">
              Open to freelance MERN and mobile builds, and early AI product work.
              Based in Karachi, happy to work remote.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Magnetic>
                <a href={`mailto:${EMAIL}`} className="btn btn-primary h-12 px-6 text-base">
                  <EnvelopeSimple size={18} aria-hidden="true" />
                  {CONTACT_LABEL}
                </a>
              </Magnetic>
              <CopyEmail email={EMAIL} className="btn btn-ghost h-12 px-6 text-base" />
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15} y={50}>
          <ContactCard />
        </Reveal>
      </div>
    </section>
  );
}
