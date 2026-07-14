import { Github, Linkedin } from "lucide-react";

const LINKEDIN_URL = "https://www.linkedin.com/in/shameer-waqar-85482834a/";
const GITHUB_URL = "https://github.com/amjadomer96-prog";

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-wrap items-center justify-between px-7">
        <a
          href="#top"
          className="border-[1.5px] border-ink px-[9px] py-[5px] font-mono text-sm tracking-wide"
        >
          SW
        </a>

        <nav className="hidden items-center gap-6 md:flex">
          <a href="#stack" className="nav-link">
            Stack
          </a>
          <a href="#experience" className="nav-link">
            Experience
          </a>
          <a href="#project" className="nav-link">
            Project
          </a>
          <a href="#education" className="nav-link">
            Education
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-ink-2 transition-colors hover:text-blue"
          >
            <Github size={19} />
          </a>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-ink-2 transition-colors hover:text-blue"
          >
            <Linkedin size={19} />
          </a>
          <a href="mailto:23FA-011-CS@students.uitu.edu.pk" className="btn btn-solid">
            Say hello
          </a>
        </div>
      </div>
    </header>
  );
}

export { LINKEDIN_URL, GITHUB_URL };
