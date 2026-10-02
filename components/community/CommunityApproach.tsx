import { Atmosphere, atmosphere } from "@/components/Atmosphere";
import { COMMUNITY_PRINCIPLES } from "@/data/community";

/**
 * The commitment, then how it is kept. The four principles sit in the same
 * hairline `gap-px` lattice the capability pages use, so they read as one
 * connected sequence rather than four separate cards.
 */
export function CommunityApproach() {
  return (
    <section
      id="approach"
      className={atmosphere("neutral", "py-16 sm:py-20 lg:py-24")}
    >
      <Atmosphere variant="neutral" />

      <div className="frame">
        <div className="grid gap-7 lg:grid-cols-[5fr_7fr] lg:items-start lg:gap-16">
          <div>
            <p className="eyebrow text-white/70">Our commitment</p>
            <h2 className="mt-3.5 font-heading text-2xl font-extrabold uppercase leading-[1.12] tracking-headline text-white sm:text-3xl lg:text-[2.125rem]">
              Supporting the communities we work alongside.
            </h2>
          </div>

          <div className="max-w-[62ch] space-y-4 text-base leading-relaxed text-white/75">
            <p className="text-lg text-white/90">
              Our crews, suppliers and clients live in the same provinces we
              work in. When those communities are healthy, connected and
              growing, everyone does better, and that includes us.
            </p>
            <p>
              Through partnerships, sponsorships and local initiatives, CJ MUNI
              contributes to stronger, more connected communities across Papua
              New Guinea. We keep it practical. We listen first, work through
              the people who already lead locally, and stay involved for the
              long term.
            </p>
          </div>
        </div>

        <h3 className="mt-14 text-[13px] font-bold uppercase tracking-label text-white/70">
          How we work with communities
        </h3>

        <ol className="mt-5 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {COMMUNITY_PRINCIPLES.map((principle, i) => (
            <li key={principle.title} className="cell cell-interactive p-6 pb-7">
              <span className="font-heading text-[13px] font-extrabold tracking-wide text-gold">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h4 className="mt-3.5 font-heading text-base font-extrabold uppercase leading-tight tracking-headline text-white">
                {principle.title}
              </h4>
              <p className="mt-2.5 text-sm leading-relaxed text-white/70">
                {principle.text}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
