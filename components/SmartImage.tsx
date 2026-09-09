"use client";

import Image from "next/image";
import { useState } from "react";

type SmartImageProps = {
  src: string;
  alt: string;
  /** Path shown on the placeholder so the client knows where to drop the file. */
  slotLabel?: string;
  className?: string;
  /** Use fill layout (parent must be positioned). */
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
};

/**
 * Renders a real photograph from /public/images when the file exists, and a
 * sophisticated MUNI-styled placeholder when it does not — never a broken
 * image. Drop a file at the given path and it appears automatically.
 */
export function SmartImage({
  src,
  alt,
  slotLabel,
  className,
  fill = true,
  width,
  height,
  sizes = "100vw",
  priority = false,
}: SmartImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return <ImagePlaceholder label={slotLabel ?? src} className={className} />;
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      sizes={sizes}
      priority={priority}
      className={className}
      style={{ objectFit: "cover" }}
      onError={() => setFailed(true)}
    />
  );
}

export function ImagePlaceholder({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      className={`absolute inset-0 flex h-full w-full flex-col items-center justify-center overflow-hidden bg-ink-800 ${className ?? ""}`}
      aria-hidden="true"
    >
      <div className="absolute inset-0 grid-overlay opacity-60" />
      <div className="absolute -right-16 -top-16 h-56 w-56 rotate-45 border border-white/10" />
      <div className="absolute left-6 top-6 h-8 w-8 border-l border-t border-gold/50" />
      <div className="absolute bottom-6 right-6 h-8 w-8 border-b border-r border-gold/50" />

      <svg width="40" height="40" viewBox="0 0 40 40" className="mb-4 text-gold">
        <path d="M4 4h32v32H4z" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M4 4l16 16M36 4L20 20v16" fill="none" stroke="currentColor" strokeWidth="1.5" />
      </svg>

      <p className="px-4 text-center font-heading text-[11px] font-bold uppercase tracking-label text-white/70">
        Image slot
      </p>
      <p className="mt-1 max-w-[80%] break-all px-4 text-center font-sans text-[10px] text-white/35">
        {label}
      </p>
    </div>
  );
}
