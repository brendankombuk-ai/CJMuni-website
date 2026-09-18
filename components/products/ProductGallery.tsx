"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ProductImage } from "@/data/products";

/**
 * Product imagery for one range: one large frame, thumbnails when there is
 * more than one photograph, and a lightbox for a closer look.
 *
 * Catalogue photography is modest in resolution, so every image is shown with
 * `object-fit: contain` inside a fixed frame — never cropped to fill, never
 * stretched — and the lightbox caps at the file's own size rather than
 * upscaling it into mush.
 */
export function ProductGallery({
  images,
  rangeName,
  priority = false,
}: {
  images: ProductImage[];
  rangeName: string;
  priority?: boolean;
}) {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const active = images[index];
  const count = images.length;

  const step = useCallback(
    (delta: number) => setIndex((i) => (i + delta + count) % count),
    [count],
  );

  const close = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  // While the lightbox is open: trap the page behind it and move focus in.
  useEffect(() => {
    if (!open) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();
    return () => {
      document.body.style.overflow = overflow;
    };
  }, [open]);

  return (
    <figure className="m-0">
      <button
        type="button"
        ref={triggerRef}
        onClick={() => setOpen(true)}
        aria-label={`View ${active.caption} larger`}
        className="group relative block aspect-[4/3] w-full overflow-hidden border border-black/10 bg-white duration-300 hover:border-ink/40"
      >
        <span className="absolute inset-4 flex items-center justify-center sm:inset-6">
          {/*
            Catalogue files are small. Capping the image box at 1.5x its own
            pixel size keeps product shots sharp instead of letting a wide
            frame blow a 228px photograph up to fill it.
          */}
          <span
            className="relative block h-full w-full"
            style={{
              maxWidth: Math.round(active.width * 1.5),
              maxHeight: Math.round(active.height * 1.5),
            }}
          >
            <Image
              src={active.src}
              alt={active.alt}
              fill
              sizes="(min-width: 1024px) 520px, 88vw"
              priority={priority}
              quality={90}
              className="object-contain"
            />
          </span>
        </span>

        {/* Corner cue — always visible, so it reads on touch as well as hover. */}
        <span
          aria-hidden="true"
          className="absolute bottom-0 right-0 flex items-center gap-1.5 bg-white/90 px-3 py-2 text-[10px] font-bold uppercase tracking-label text-charcoal duration-300 group-hover:bg-gold group-hover:text-ink"
        >
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
            <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.6" />
            <path d="M11 11l4 4M7 5v4M5 7h4" stroke="currentColor" strokeWidth="1.6" />
          </svg>
          Enlarge
        </span>
      </button>

      {count > 1 ? (
        <ul className="mt-3 grid grid-cols-4 gap-2 sm:gap-3">
          {images.map((image, i) => (
            <li key={image.src}>
              <button
                type="button"
                onClick={() => setIndex(i)}
                aria-pressed={i === index}
                aria-label={`Show ${image.caption}`}
                className={`relative block aspect-square w-full overflow-hidden border bg-white duration-300 ${
                  i === index
                    ? "border-gold ring-1 ring-gold"
                    : "border-black/10 hover:border-ink/40"
                }`}
              >
                <span className="absolute inset-2">
                  <Image
                    src={image.src}
                    alt=""
                    fill
                    sizes="120px"
                    className="object-contain"
                  />
                </span>
              </button>
            </li>
          ))}
        </ul>
      ) : null}

      <figcaption className="mt-3 text-xs leading-relaxed text-charcoal-light">
        {active.caption}
        {count > 1 ? (
          <span className="text-black/30">
            {" "}
            · {index + 1} of {count}
          </span>
        ) : null}
      </figcaption>

      {open ? (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={`${rangeName} imagery`}
          tabIndex={-1}
          onKeyDown={(event) => {
            if (event.key === "Escape") close();
            if (count > 1 && event.key === "ArrowRight") step(1);
            if (count > 1 && event.key === "ArrowLeft") step(-1);
          }}
          onClick={(event) => {
            if (event.target === event.currentTarget) close();
          }}
          className="fixed inset-0 z-[70] flex flex-col gap-4 bg-ink/95 p-4 sm:p-8"
        >
          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="font-heading text-[11px] font-bold uppercase tracking-label text-gold">
                {rangeName}
              </p>
              <p className="mt-1 text-sm text-white/80">{active.caption}</p>
            </div>
            <button
              type="button"
              onClick={close}
              className="shrink-0 border border-white/30 px-4 py-2 text-[11px] font-bold uppercase tracking-label text-white hover:border-gold hover:bg-gold hover:text-ink"
            >
              Close
            </button>
          </div>

          <div className="flex min-h-0 flex-1 items-center justify-center">
            <Image
              src={active.src}
              alt={active.alt}
              width={active.width}
              height={active.height}
              quality={95}
              className="h-auto max-h-full w-auto max-w-full object-contain"
            />
          </div>

          {count > 1 ? (
            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => step(-1)}
                className="border border-white/30 px-4 py-2 text-[11px] font-bold uppercase tracking-label text-white hover:border-gold hover:bg-gold hover:text-ink"
              >
                Previous
              </button>
              <span className="text-xs text-white/50">
                {index + 1} / {count}
              </span>
              <button
                type="button"
                onClick={() => step(1)}
                className="border border-white/30 px-4 py-2 text-[11px] font-bold uppercase tracking-label text-white hover:border-gold hover:bg-gold hover:text-ink"
              >
                Next
              </button>
            </div>
          ) : null}
        </div>
      ) : null}
    </figure>
  );
}
