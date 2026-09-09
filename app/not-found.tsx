import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main
        id="main"
        className="relative flex min-h-[70svh] items-center overflow-hidden bg-ink"
      >
        <div className="grid-overlay absolute inset-0 opacity-30" />
        <div className="frame relative py-32 text-center">
          <span className="eyebrow justify-center text-gold">Error 404</span>
          <h1 className="mt-5 font-heading text-4xl font-extrabold uppercase tracking-headline text-white sm:text-5xl">
            Page not found.
          </h1>
          <p className="mx-auto mt-4 max-w-md text-white/60">
            The page you are looking for has moved or does not exist.
          </p>
          <Link href="/" className="btn-primary mt-8">
            Back to home
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
