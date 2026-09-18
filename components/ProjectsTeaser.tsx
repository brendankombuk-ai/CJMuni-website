import Link from "next/link";
import { SmartImage } from "@/components/SmartImage";
import { PROJECTS } from "@/data/projects";

/**
 * Three projects on the home page as a taste of the work, with a single clear
 * route through to the full list. Keeps the home page short.
 */
export function ProjectsTeaser() {
  const featured = PROJECTS.slice(0, 3);

  return (
    <section className="border-t border-black/10 bg-white py-16 sm:py-20">
      <div className="frame">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-sans text-[11px] font-bold uppercase tracking-label text-charcoal">
              Projects
            </p>
            <h2 className="mt-3 font-heading text-2xl font-extrabold uppercase tracking-headline text-ink sm:text-3xl">
              Recent work
            </h2>
          </div>
          <Link
            href="/projects"
            className="text-[11px] font-bold uppercase tracking-label text-gold-600 hover:text-ink"
          >
            View all projects
          </Link>
        </div>

        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((project) => (
            <li key={project.ref} className="group border border-black/10 bg-white">
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-ink-800">
                <div className="absolute inset-0 transition-transform duration-500 ease-muni group-hover:scale-[1.04]">
                  <SmartImage
                    src={project.image}
                    alt={project.imageAlt}
                    slotLabel={project.image}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              </div>
              <div className="p-5">
                <p className="text-[11px] font-bold uppercase tracking-label text-charcoal">
                  {project.category}
                </p>
                <h3 className="mt-2.5 font-heading text-base font-bold uppercase leading-tight tracking-headline text-ink">
                  {project.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-charcoal">
                  {project.location}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
