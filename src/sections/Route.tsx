import { useScrollReveal } from '../hooks/useScrollReveal'
import { route } from '../content'

export function Route() {
  const ref = useScrollReveal<HTMLElement>()

  return (
    <section ref={ref} className="px-6 md:px-16 py-28 md:py-40 max-w-5xl mx-auto">
      <div className="text-[11px] tracking-[0.25em] uppercase text-ink/55 mb-4" data-reveal>
        01 / Route
      </div>
      <h2 className="font-serif text-4xl md:text-6xl mb-16 leading-tight" data-reveal>
        一日の道のり
      </h2>

      <div>
        {route.map((stop, i) => (
          <div
            key={i}
            className="grid grid-cols-[4.5rem_1fr] md:grid-cols-[8rem_1fr] gap-6 items-center border-t border-ink/15 py-6"
            data-reveal
          >
            <div className="relative w-14 h-14 md:w-20 md:h-20 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-ink/20 bg-ink/[0.03]" />
              <span className="relative font-mono text-xs md:text-sm text-ink/70 tracking-wider">
                {stop.time}
              </span>
            </div>
            <div className="flex flex-col md:flex-row md:items-baseline md:gap-8">
              <span className="font-serif text-2xl md:text-3xl">{stop.place}</span>
              <span className="text-ink/65 text-sm md:text-base">{stop.note}</span>
            </div>
          </div>
        ))}
        <div className="border-t border-ink/15"></div>
      </div>
    </section>
  )
}
