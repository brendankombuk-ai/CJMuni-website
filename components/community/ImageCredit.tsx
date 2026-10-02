import type { CommunityImage } from "@/data/community";

/**
 * The attribution line a CC BY photograph has to carry: who took it, where it
 * came from, and the licence. Renders nothing for CJ MUNI's own photography,
 * so a slot can switch to an in-house image without touching the layout.
 */
export function ImageCredit({
  credit,
  className,
}: {
  credit: CommunityImage["credit"];
  className?: string;
}) {
  if (!credit) return null;

  const link =
    "underline decoration-white/25 underline-offset-2 hover:text-gold hover:decoration-gold/60";

  return (
    <p className={`text-[11px] leading-relaxed text-white/55 ${className ?? ""}`}>
      Photo:{" "}
      <a
        href={credit.sourceHref}
        target="_blank"
        rel="noopener noreferrer"
        className={link}
      >
        {credit.author}
      </a>
      ,{" "}
      <a
        href={credit.licenseHref}
        target="_blank"
        rel="noopener noreferrer"
        className={link}
      >
        {credit.license}
      </a>
    </p>
  );
}
