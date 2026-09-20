import { SPEC_HEADING, type SpecRow } from "@/data/products";

/**
 * Specification table for a product range.
 *
 * One component, one data shape, two presentations: a real `<table>` from
 * `md` up (scrollable sideways when a range has a column per product), and
 * definition lists below it so nothing shrinks into unreadable columns on a
 * phone. A range with several products gets one card per product there.
 */
export function ProductSpecifications({
  columns,
  rows,
  note,
  caption,
  headingId,
}: {
  columns: string[];
  rows: SpecRow[];
  note?: string;
  /** Screen-reader caption, e.g. "AMEX™ Range technical specification". */
  caption: string;
  headingId: string;
}) {
  const multiProduct = columns.length > 1;

  return (
    <section aria-labelledby={headingId} className="border border-white/10 bg-ink-900">
      <h3
        id={headingId}
        className="border-b border-white/10 bg-white/[0.04] px-5 py-4 font-heading text-[11px] font-bold uppercase tracking-label text-white sm:px-6"
      >
        {SPEC_HEADING}
      </h3>

      {/* Tablet and desktop: the catalogue's own table. */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
          <caption className="sr-only">{caption}</caption>
          <thead>
            <tr className="border-b border-white/20">
              <th
                scope="col"
                className="w-[14rem] px-6 py-3.5 text-[11px] font-bold uppercase tracking-label text-white/70"
              >
                Parameter
              </th>
              {columns.map((column) => (
                <th
                  key={column}
                  scope="col"
                  className="px-6 py-3.5 text-[11px] font-bold uppercase tracking-label text-white/70"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.parameter}
                className="border-b border-white/10 last:border-0"
              >
                <th
                  scope="row"
                  className="px-6 py-3.5 align-top font-sans text-sm font-semibold leading-snug text-white"
                >
                  {row.parameter}
                </th>
                {row.values.map((value, i) => (
                  <td
                    key={`${row.parameter}-${columns[i] ?? i}`}
                    className="px-6 py-3.5 align-top leading-snug text-white/70"
                  >
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Phones: parameter/value pairs, one card per product where there are several. */}
      <div className="md:hidden">
        {multiProduct ? (
          <div className="divide-y divide-white/10">
            {columns.map((column, columnIndex) => (
              <div key={column} className="px-5 py-5">
                <p className="font-heading text-sm font-bold uppercase tracking-headline text-white">
                  {column}
                </p>
                <dl className="mt-3 divide-y divide-white/10 border-t border-white/10">
                  {rows.map((row) => (
                    <div
                      key={row.parameter}
                      className="grid grid-cols-[minmax(0,7.5rem)_1fr] gap-3 py-2.5"
                    >
                      <dt className="text-[11px] font-bold uppercase leading-snug tracking-label text-white/50">
                        {row.parameter}
                      </dt>
                      <dd className="text-sm leading-snug text-white">
                        {row.values[columnIndex]}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
        ) : (
          <dl className="divide-y divide-white/10">
            {rows.map((row) => (
              <div
                key={row.parameter}
                className="grid grid-cols-[minmax(0,8rem)_1fr] gap-3 px-5 py-3.5"
              >
                <dt className="text-[11px] font-bold uppercase leading-snug tracking-label text-white/50">
                  {row.parameter}
                </dt>
                <dd className="text-sm leading-snug text-white">
                  {row.values[0]}
                </dd>
              </div>
            ))}
          </dl>
        )}
      </div>

      {note ? (
        <p className="border-t border-white/10 px-5 py-3.5 text-xs leading-relaxed text-white/50 sm:px-6">
          {note}
        </p>
      ) : null}
    </section>
  );
}
