import Link from "next/link";
import Image from "next/image";
import { FRONTIER } from "@/data/frontier";
import { Reveal } from "@/components/Reveal";

/**
 * Frontier Agri — the agriculture arm of CJ MUNI.
 *
 * Deliberately the only light section on the page. Products and services sit
 * on black; Frontier Agri breaks the rhythm so it reads as a separate arm of
 * the business rather than another capability card.
 */
export function FrontierAgri() {
  return (
    <section id="frontier-agri" className="bg-white py-24 sm:py-32">
      <div className="frame">
        <div className="grid items-start gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Left — narrative */}
          <div>
            <Reveal>
              <span className="eyebrow text-charcoal">{FRONTIER.eyebrow}</span>
            </Reveal>

            <Reveal delay={0.05}>
              <h2 className="mt-5 font-heading text-3xl font-extrabold leading-[1.05] tracking-headline text-ink sm:text-4xl lg:text-[2.9rem]">
                {FRONTIER.title}
              </h2>
            </Reveal>

            <Reveal delay={0.08}>
              <p className="mt-5 font-heading text-lg font-bold uppercase leading-snug tracking-headline text-ink sm:text-xl">
                {FRONTIER.lead}
              </p>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-5 text-base leading-relaxed text-charcoal sm:text-lg">
                {FRONTIER.intro}
              </p>
            </Reveal>

            {/* Headline figure */}
            <Reveal delay={0.16}>
              <div className="mt-10 border-l-2 border-gold pl-6">
                <p className="font-heading text-4xl font-extrabold leading-none tracking-headline text-ink sm:text-5xl">
                  {FRONTIER.stat.value}
                </p>
                <p className="mt-2 font-sans text-[11px] font-bold uppercase tracking-label text-charcoal">
                  {FRONTIER.stat.label}
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <Link href="/#contact" className="btn-primary mt-10">
                Talk to Frontier Agri
              </Link>
            </Reveal>
          </div>

          {/* Right — photography + pillars */}
          <div>
            <Reveal delay={0.1}>
              {/* 4:3 only from lg, where it balances the two columns. Below
                  that the panel hugs the mark instead of banking white space. */}
              <div className="flex items-center justify-center border border-ink/10 bg-white px-10 py-12 sm:px-14 lg:aspect-[4/3] lg:py-0">
                <Image
                  src={FRONTIER.logo}
                  alt={FRONTIER.logoAlt}
                  width={FRONTIER.logoWidth}
                  height={FRONTIER.logoHeight}
                  sizes="(max-width: 1024px) 80vw, 40vw"
                  className="h-auto w-full max-w-[380px] object-contain"
                />
              </div>
            </Reveal>

            <dl className="mt-px grid gap-px bg-black/10">
              {FRONTIER.pillars.map((pillar, i) => (
                <Reveal key={pillar.number} delay={0.14 + i * 0.06}>
                  <div className="group bg-white p-6 transition-colors duration-500 hover:bg-black/[0.03] sm:p-7">
                    <div className="flex items-baseline gap-4">
                      <span className="font-heading text-sm font-extrabold text-gold">
                        {pillar.number}
                      </span>
                      <dt className="font-heading text-base font-bold uppercase leading-tight tracking-headline text-ink">
                        {pillar.title}
                      </dt>
                    </div>
                    <dd className="mt-3 pl-8 text-sm leading-relaxed text-charcoal">
                      {pillar.body}
                    </dd>
                  </div>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
