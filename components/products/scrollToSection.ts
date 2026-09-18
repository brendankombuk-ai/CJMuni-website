/**
 * In-page scrolling for the /products catalogue.
 *
 * The site deliberately leaves `scroll-behavior` alone — see the comment in
 * app/globals.css — because smooth scrolling fights the router on a route
 * change. /products is the one page built as a single scroll, so it asks for
 * smooth scrolling here, per interaction, instead of globally. Users who
 * prefer reduced motion get an instant jump.
 */
export function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function scrollToSection(id: string) {
  const target = document.getElementById(id);
  if (!target) return false;

  target.scrollIntoView({
    behavior: prefersReducedMotion() ? "auto" : "smooth",
    block: "start",
  });

  // Keep the URL shareable without letting the browser jump the page itself.
  window.history.replaceState(null, "", `#${id}`);
  return true;
}
