import { Reveal } from "@/components/Reveal";
import { RANGE_SUMMARY } from "@/data/products";
import { Atmosphere, atmosphere } from "@/components/Atmosphere";

/**
 * Product Range Summary — the closing table of the catalogue.
 *
 * A table from `md` up; stacked cards below it, because four columns of prose
 * on a 375px screen is not a table anyone can read. Each range links back to
 * its own section.
 */
export function ProductRangeSummary() {
  return (
    <section
      id="range-summary"
      aria-labelledby="range-summary-title"
      className={atmosphere(
        "supply-chain",
        "scroll-mt-12 border-b border-white/5 py-14 sm:py-20",
      )}
    >
      <Atmosphere variant="supply-chain" />

      <div className="frame">
        <Reveal>
          <p className="eyebrow text-white/70">Catalogue overview</p>
          <h2
            id="range-summary-title"
            className="mt-5 font-heading text-2xl font-extrabold uppercase leading-tight tracking-headline text-white sm:text-3xl lg:text-[2.35rem]"
          >
            Product Range Summary
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/70">
            The seven Orica ranges CJ MUNI supplies, and what each one is for.
          </p>
        </Reveal>

        <Reveal delay={0.05} className="mt-9">
          {/* Tablet and desktop */}
          <div className="hidden overflow-x-auto border border-white/10 md:block">
            <table className="w-full min-w-[42rem] border-collapse text-left text-sm">
              <caption className="sr-only">
                Summary of the seven Orica product ranges, their category,
                primary function and key advantage
              </caption>
              <thead>
                <tr className="border-b border-white/20 bg-white/[0.04]">
                  <th
                    scope="col"
                    className="px-6 py-4 text-[11px] font-bold uppercase tracking-label text-white/70"
                  >
                    Product Range
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-[11px] font-bold uppercase tracking-label text-white/70"
                  >
                    Category
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-[11px] font-bold uppercase tracking-label text-white/70"
                  >
                    Primary Function
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-[11px] font-bold uppercase tracking-label text-white/70"
                  >
                    Key Advantage
                  </th>
                </tr>
              </thead>
              <tbody>
                {RANGE_SUMMARY.map((row) => (
                  <tr
                    key={row.range}
                    className="border-b border-white/10 last:border-0"
                  >
                    <th scope="row" className="px-6 py-4 align-top">
                      <a
                        href={`#${row.id}`}
                        className="font-heading text-sm font-bold uppercase tracking-headline text-white underline decoration-gold decoration-2 underline-offset-4 hover:text-gold"
                      >
                        {row.range}
                      </a>
                    </th>
                    <td className="px-6 py-4 align-top leading-snug text-white/70">
                      {row.category}
                    </td>
                    <td className="px-6 py-4 align-top leading-snug text-white/70">
                      {row.primaryFunction}
                    </td>
                    <td className="px-6 py-4 align-top leading-snug text-white/70">
                      {row.keyAdvantage}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Phones */}
          <ul className="grid gap-px border border-white/10 bg-white/10 md:hidden">
            {RANGE_SUMMARY.map((row) => (
              <li key={row.range} className="cell p-5">
                <a
                  href={`#${row.id}`}
                  className="font-heading text-base font-bold uppercase tracking-headline text-white underline decoration-gold decoration-2 underline-offset-4"
                >
                  {row.range}
                </a>
                <dl className="mt-3 divide-y divide-white/10 border-t border-white/10">
                  <div className="grid grid-cols-[minmax(0,8rem)_1fr] gap-3 py-2.5">
                    <dt className="text-[11px] font-bold uppercase leading-snug tracking-label text-white/50">
                      Category
                    </dt>
                    <dd className="text-sm leading-snug text-white">
                      {row.category}
                    </dd>
                  </div>
                  <div className="grid grid-cols-[minmax(0,8rem)_1fr] gap-3 py-2.5">
                    <dt className="text-[11px] font-bold uppercase leading-snug tracking-label text-white/50">
                      Primary Function
                    </dt>
                    <dd className="text-sm leading-snug text-white">
                      {row.primaryFunction}
                    </dd>
                  </div>
                  <div className="grid grid-cols-[minmax(0,8rem)_1fr] gap-3 py-2.5">
                    <dt className="text-[11px] font-bold uppercase leading-snug tracking-label text-white/50">
                      Key Advantage
                    </dt>
                    <dd className="text-sm leading-snug text-white">
                      {row.keyAdvantage}
                    </dd>
                  </div>
                </dl>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
