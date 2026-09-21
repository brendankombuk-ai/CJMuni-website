import Link from "next/link";
import { SmartImage } from "@/components/SmartImage";
import { Atmosphere, atmosphere } from "@/components/Atmosphere";
import { PROJECTS } from "@/data/projects";

/**
 * Three projects on the home page as a taste of the work, with a single clear
 * route through to the full list. Keeps the home page short.
 */
export function ProjectsTeaser() {
  const featured = PROJECTS.slice(0, 3);

  return (
    <section className={atmosphere("projects", "seam-top py-16 sm:py-20")}>
      <Atmosphere variant="projects" />

      <div className="frame">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow text-white/70">Projects</p>
            <h2 className="mt-3 font-heading text-2xl font-extrabold uppercase tracking-headline text-white sm:text-3xl">
              Recent work
            </h2>
          </div>
          <Link
            href="/projects"
            className="text-[11px] font-bold uppercase tracking-label text-gold hover:text-white"
          >
            View all projects
          </Link>
        </div>

        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((project) => (
            <li key={project.ref} className="group panel-interactive">
              <div className="media-frame aspect-[16/10] w-full border-0 border-b border-white/10 bg-ink-800 shadow-none">
                <div className="absolute inset-0 transition-transform duration-500 ease-muni group-hover:scale-[1.04]">
                  <SmartImage
                    src={project.image}
                    alt={project.imageAlt}
                    slotLabel={project.image}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              </div>
              <div className="relative z-[1] p-5">
                <p className="text-[11px] font-bold uppercase tracking-label text-white/70">
                  {project.category}
                </p>
                <h3 className="mt-2.5 font-heading text-base font-bold uppercase leading-tight tracking-headline text-white">
                  {project.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-white/70">
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
