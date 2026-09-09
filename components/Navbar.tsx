"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Logo } from "@/components/Logo";
import { NAV_LINKS } from "@/data/site";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile panel is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <motion.header
      initial={reduce ? false : { y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div className="frame">
        <nav
          className={`mt-4 flex items-center justify-between rounded-lg border px-4 py-3 backdrop-blur-md transition-all duration-500 ease-muni sm:px-6 ${
            scrolled
              ? "border-white/10 bg-ink/90 shadow-[0_18px_50px_-20px_rgba(0,0,0,0.9)] backdrop-blur-xl"
              : "border-white/10 bg-ink/40"
          }`}
          aria-label="Primary"
        >
          <Logo tone="light" />

          <div className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group relative font-sans text-[13px] font-semibold uppercase tracking-[0.12em] text-white/80 transition-colors hover:text-white"
              >
                {link.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-gold transition-all duration-300 ease-muni group-hover:w-full" />
              </Link>
            ))}
            <Link href="/#contact" className="btn-primary text-[12px]">
              Request an Enquiry
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="relative z-50 flex h-10 w-10 items-center justify-center lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <span className="relative block h-4 w-6">
              <span
                className={`absolute left-0 block h-0.5 w-6 bg-white transition-all duration-300 ease-muni ${
                  open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 top-1/2 block h-0.5 w-6 -translate-y-1/2 bg-white transition-all duration-200 ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 block h-0.5 w-6 bg-white transition-all duration-300 ease-muni ${
                  open ? "bottom-1/2 translate-y-1/2 -rotate-45" : "bottom-0"
                }`}
              />
            </span>
          </button>
        </nav>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-ink" />
            <div className="grid-overlay absolute inset-0 opacity-40" />
            <motion.ul
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.06, delayChildren: 0.12 } },
              }}
              className="relative flex h-full flex-col justify-center gap-2 px-8"
            >
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.href}
                  variants={{
                    hidden: { opacity: 0, x: reduce ? 0 : -20 },
                    visible: { opacity: 1, x: 0 },
                  }}
                  className="border-b border-white/10"
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 py-5"
                  >
                    <span className="font-sans text-xs font-bold text-gold">
                      0{i + 1}
                    </span>
                    <span className="font-heading text-2xl font-extrabold uppercase tracking-headline text-white">
                      {link.label}
                    </span>
                  </Link>
                </motion.li>
              ))}
              <motion.li
                variants={{
                  hidden: { opacity: 0, x: reduce ? 0 : -20 },
                  visible: { opacity: 1, x: 0 },
                }}
                className="mt-8"
              >
                <Link
                  href="/#contact"
                  onClick={() => setOpen(false)}
                  className="btn-primary w-full"
                >
                  Request an Enquiry
                </Link>
              </motion.li>
            </motion.ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
