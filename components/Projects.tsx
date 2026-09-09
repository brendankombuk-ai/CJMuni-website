import { PROJECTS } from "@/data/projects";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { SmartImage } from "@/components/SmartImage";

export function Projects() {
  return (
    <section id="projects" className="bg-white py-24 sm:py-32">
      <div className="frame">
        <SectionHeading
          eyebrow="Capability Evidence"
          title="Projects."
          intro="A place for real project photography and detail. The structure below is ready — content is added as projects are cleared for publication."
        />

        <div className="mt-14 grid gap-8 sm:grid-cols-2">
          {PROJECTS.map((project, i) => (
            <Reveal as="article" key={project.ref} delay={(i % 2) * 0.06}>
              <div className="group border border-ink/12 bg-white transition-colors duration-500 hover:border-ink/30">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <div className="absolute inset-0 transition-transform duration-700 ease-muni group-hover:scale-105">
                    <SmartImage
                      src={project.image}
                      alt={project.imageAlt}
                      slotLabel={project.image}
                      sizes="(max-width: 640px) 100vw, 50vw"
                    />
                  </div>
                  <div className="absolute inset-0 bg-ink/45" />
                  <span className="absolute left-4 top-4 font-heading text-xs font-bold uppercase tracking-label text-white">
                    {project.ref}
                  </span>
                  {project.detailsPending ? (
                    <span className="absolute right-4 top-4 border border-white/40 px-2 py-1 font-sans text-[9px] font-bold uppercase tracking-label text-white/80">
                      Details to follow
                    </span>
                  ) : null}
                </div>

                <div className="p-6">
                  <span className="font-sans text-[11px] font-bold uppercase tracking-label text-gold-600">
                    {project.category}
                  </span>
                  <h3 className="mt-3 font-heading text-lg font-bold uppercase leading-tight tracking-headline text-ink">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal">
                    {project.description}
                  </p>

                  <div className="mt-5 flex items-end justify-between border-t border-ink/10 pt-4">
                    <div>
                      <span className="block font-sans text-[10px] font-bold uppercase tracking-label text-charcoal-light">
                        Location
                      </span>
                      <span className="mt-1 block text-sm text-ink">
                        {project.location}
                      </span>
                    </div>
                    <svg
                      width="24"
                      height="8"
                      viewBox="0 0 24 8"
                      fill="none"
                      className="mb-1 text-ink transition-transform duration-500 ease-muni group-hover:translate-x-1.5"
                      aria-hidden="true"
                    >
                      <path d="M0 4h21M18 1l3 3-3 3" stroke="currentColor" strokeWidth="1.4" />
                    </svg>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
