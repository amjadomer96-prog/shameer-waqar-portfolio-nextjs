import Link from "next/link";

export const metadata = {
  title: "Page not found | Shameer Waqar",
};

export default function NotFound() {
  return (
    <main className="grid min-h-[100dvh] place-content-center bg-[radial-gradient(ellipse_at_50%_35%,#e3e7ec,#b8c0cb_72%)] px-[var(--gx)] py-24">
      <p className="hud hud-muted">ERROR_404 / Signal lost</p>
      <h1 className="mt-4 max-w-[16ch] text-[clamp(2.4rem,6vw,4.5rem)] font-semibold leading-[1] tracking-[-0.045em]">
        This page doesn&apos;t exist.
      </h1>
      <p className="hud-copy mt-5 max-w-[44ch] text-ink/75">
        The link may be old or mistyped. The work, log and contact details are
        all on the home page.
      </p>
      <div className="mt-9">
        <Link href="/" className="btn btn-primary">
          Back to the home page
        </Link>
      </div>
    </main>
  );
}
