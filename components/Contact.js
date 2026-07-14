import { Github, Linkedin, Mail, Phone } from "lucide-react";
import { GITHUB_URL, LINKEDIN_URL } from "./Nav";

export default function Contact() {
  return (
    <section className="relative overflow-hidden bg-ink py-24 pb-[88px]">
      <div className="grid-bg grid-bg-dark" />
      <div className="relative z-10 mx-auto max-w-wrap px-7">
        <div className="max-w-[640px]">
          <p className="eyebrow eyebrow-amber">$ contact --send</p>
          <h2 className="mb-4 font-display text-[clamp(28px,4vw,42px)] font-semibold tracking-tight text-white">
            Let&apos;s build something.
          </h2>
          <p className="mb-8 max-w-[52ch] text-base text-[#B9C6DA]">
            Open to internship extensions, freelance MERN/mobile builds, and
            early AI-assisted product work. Based in Karachi — happy to work
            remote.
          </p>
          <div className="flex flex-wrap gap-3.5">
            <a
              href="mailto:23FA-011-CS@students.uitu.edu.pk"
              className="btn btn-amber"
            >
              <Mail size={15} />
              23FA-011-CS@students.uitu.edu.pk
            </a>
            <a href="tel:03322403737" className="btn btn-on-dark">
              <Phone size={15} />
              0332-2403737
            </a>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-on-dark"
            >
              <Github size={15} />
              GitHub
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-on-dark"
            >
              <Linkedin size={15} />
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
