// Mutable state shared between the DOM and the 3D scene. Written and read
// inside animation frames, never through React state.
export const world = {
  scroll: 0,
  keys: [],
  finale: [Infinity, Infinity],
};

// Where things live along the camera path (world units).
export const BLOCK_Z = (i) => -24 - 12 * i;
export const RING_Z = -82;
export const LOG_Z = -102;
export const FINALE_Z = -114;

export const OPEN_EVENT = "world:open";
export const openProject = (slug) =>
  window.dispatchEvent(new CustomEvent(OPEN_EVENT, { detail: slug }));

// Scroll so a section's sticky screen is centred, through Lenis when present.
export function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const vh = window.innerHeight;
  const top = el.getBoundingClientRect().top + window.scrollY;
  const y = top + Math.max(0, el.offsetHeight - vh) * 0.5;
  if (window.__lenis) window.__lenis.scrollTo(y, { duration: 2.2 });
  else window.scrollTo({ top: y, behavior: "smooth" });
}
