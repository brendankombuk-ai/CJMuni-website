"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

type LogoProps = {
  variant?: "lockup" | "emblem";
  tone?: "light" | "dark";
  className?: string;
  href?: string | null;
};

function EmblemPlaceholder({ tone }: { tone: "light" | "dark" }) {
  const stroke = tone === "light" ? "#FFFFFF" : "#000000";
  return (
    <svg viewBox="0 0 44 44" className="h-full w-auto" role="presentation">
      <rect x="1" y="1" width="42" height="42" fill="#F1AF21" />
      <path d="M1 1 L22 22 L1 43 Z" fill={stroke} />
      <path
        d="M12 31 V15 l5 9 5 -9 v16"
        fill="none"
        stroke="#F1AF21"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Logo({ variant = "lockup", tone = "light", className, href = "/" }: LogoProps) {
  const pathname = usePathname();

  const content =
    variant === "emblem" ? (
      <span className={`block h-9 ${className ?? ""}`}>
        <EmblemPlaceholder tone={tone} />
        <span className="sr-only">CJ MUNI</span>
      </span>
    ) : (
      <span className={`inline-flex items-center ${className ?? ""}`}>
        {/* The reverse lockup: white "MU", red "NI", no white plate behind it.
            Derived from the supplied light-background file by
            scripts/make-dark-logo.mjs. */}
        <Image
          src="/images/logo/muni-logo-dark.png"
          alt="CJ MUNI — The Power of Partnership"
          width={900}
          height={300}
          className="h-9 w-auto sm:h-11"
          priority
        />
      </span>
    );

  if (href === null) return content;

  return (
    <Link
      href={href}
      aria-label="CJ MUNI home"
      className="inline-flex"
      onClick={() => {
        // Clicking the logo always lands you at the top of the home page.
        // When you are already on it the router has nothing to navigate to and
        // would leave you wherever you had scrolled to, so scroll up here.
        if (pathname === href) window.scrollTo(0, 0);
      }}
    >
      {content}
    </Link>
  );
}
