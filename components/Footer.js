import { ArrowUp } from "@phosphor-icons/react/ssr";
import OutlineName from "@/components/footer/OutlineName";
import { GITHUB_URL, LINKEDIN_URL, SOURCE_URL } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="relative pb-8 pt-10">
      <div className="wrap">
        <OutlineName />
        <div className="mt-8 flex flex-col gap-5 border-t border-ink/10 pt-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; 2026 Shameer Waqar</p>
          <nav aria-label="Footer" className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="hover:text-ink">
              GitHub
            </a>
            <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="hover:text-ink">
              LinkedIn
            </a>
            <a href={SOURCE_URL} target="_blank" rel="noopener noreferrer" className="hover:text-ink">
              Site source
            </a>
            <a href="#top" className="inline-flex items-center gap-1.5 hover:text-ink">
              Back to top
              <ArrowUp size={14} weight="bold" aria-hidden="true" />
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
