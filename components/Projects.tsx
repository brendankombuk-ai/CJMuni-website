import { SmartImage } from "@/components/SmartImage";
import { PROJECTS } from "@/data/projects";

/**
 * The full project list. Plain cards: photo, category, title, description and
 * location, with an honest "details to follow" marker where the written
 * project detail is not yet cleared for publication.
 */
export function Projects() {
  return (
    <section className="bg-white py-14 sm:py-20">
      <div className="frame">
        <ul className="grid gap-6 sm:grid-cols-2">
          {PROJECTS.map((project) => (
            <li key={project.ref} className="group border border-black/10 bg-white">
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-ink-800">
                <div className="absolute inset-0 transition-transform duration-500 ease-muni group-hover:scale-[1.04]">
                  <SmartImage
                    src={project.image}
                    alt={project.imageAlt}
                    slotLabel={project.image}
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                </div>
              </div>

              <div className="p-6">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-label text-charcoal">
                    {project.ref}
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-label text-gold-600">
                    {project.category}
                  </span>
                  {project.detailsPending ? (
                    <span className="border border-black/15 px-2 py-0.5 text-[9px] font-bold uppercase tracking-label text-charcoal-light">
                      Details to follow
                    </span>
                  ) : null}
                </div>

                <h3 className="mt-3 font-heading text-lg font-bold uppercase leading-tight tracking-headline text-ink">
                  {project.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-charcoal">
                  {project.description}
                </p>

                <div className="mt-5 border-t border-black/10 pt-4">
                  <span className="block text-[10px] font-bold uppercase tracking-label text-charcoal-light">
                    Location
                  </span>
                  <span className="mt-1 block text-sm text-ink">
                    {project.location}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
