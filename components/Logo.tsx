import Link from "next/link";
import Image from "next/image";

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
  const content =
    variant === "emblem" ? (
      <span className={`block h-9 ${className ?? ""}`}>
        <EmblemPlaceholder tone={tone} />
        <span className="sr-only">MUNI</span>
      </span>
    ) : (
      <span className={`inline-flex items-center ${className ?? ""}`}>
        <Image
          src="/images/logo/muni-logo-light.png"
          alt="MUNI — The Power of Partnership"
          width={848}
          height={315}
          className="h-10 w-auto sm:h-16"
          priority
        />
      </span>
    );

  if (href === null) return content;

  return (
    <Link href={href} aria-label="MUNI home" className="inline-flex">
      {content}
    </Link>
  );
}
