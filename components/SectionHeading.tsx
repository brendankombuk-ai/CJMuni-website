import type { ReactNode } from "react";
import { Reveal } from "@/components/Reveal";

type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  tone?: "light" | "dark";
  align?: "left" | "center";
  className?: string;
};

/**
 * Consistent section header: technical eyebrow label + gold rule, strong
 * Montserrat headline, optional intro paragraph.
 */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  tone = "dark",
  align = "left",
  className,
}: SectionHeadingProps) {
  const isLight = tone === "light";

  return (
    <div
      className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""} ${className ?? ""}`}
    >
      <Reveal>
        <span
          className={`eyebrow ${isLight ? "text-white/70" : "text-charcoal"} ${
            align === "center" ? "justify-center" : ""
          }`}
        >
          {eyebrow}
        </span>
      </Reveal>
      <Reveal delay={0.05}>
        <h2
          className={`mt-5 font-heading text-3xl font-extrabold leading-[1.05] tracking-headline sm:text-4xl lg:text-[2.9rem] ${
            isLight ? "text-white" : "text-ink"
          }`}
        >
          {title}
        </h2>
      </Reveal>
      {intro ? (
        <Reveal delay={0.1}>
          <p
            className={`mt-5 text-base leading-relaxed sm:text-lg ${
              isLight ? "text-white/70" : "text-charcoal"
            }`}
          >
            {intro}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
