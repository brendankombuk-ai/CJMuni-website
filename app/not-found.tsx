import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main id="main" className="bg-white">
        <div className="frame py-24 text-center sm:py-32">
          <p className="text-[11px] font-bold uppercase tracking-label text-gold-600">
            Error 404
          </p>
          <h1 className="mt-4 font-heading text-3xl font-extrabold uppercase tracking-headline text-ink sm:text-4xl">
            Page not found
          </h1>
          <p className="mx-auto mt-4 max-w-md text-charcoal">
            The page you are looking for has moved or does not exist.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/" className="btn-primary">
              Back to home
            </Link>
            <Link href="/capabilities" className="btn-outline-dark">
              Products &amp; Services
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
