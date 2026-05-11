import { useScrollReveal } from '../hooks/useScrollReveal'
import { stops } from '../content'

export function Itinerary() {
  const ref = useScrollReveal<HTMLElement>({ stagger: 0.12 })

  return (
    <section ref={ref} className="px-6 md:px-16 py-28 md:py-40 max-w-6xl mx-auto">
      <div className="text-[11px] tracking-[0.25em] uppercase text-ink/55 mb-4" data-reveal>
        02 / Stops
      </div>
      <h2 className="font-serif text-4xl md:text-6xl mb-16 leading-tight" data-reveal>
        立ち寄る場所
      </h2>

      <div className="grid md:grid-cols-3 gap-10 md:gap-12">
        {stops.map((s, i) => (
          <article key={s.id} data-reveal>
            <div className="aspect-[4/5] mb-6 overflow-hidden relative">
              <div
                className="absolute inset-0"
                style={{
                  background:
                    i === 0
                      ? 'linear-gradient(135deg, rgba(61,74,54,0.18), rgba(61,74,54,0.05))'
                      : i === 1
                      ? 'linear-gradient(135deg, rgba(184,85,46,0.18), rgba(184,85,46,0.04))'
                      : 'linear-gradient(135deg, rgba(200,194,182,0.5), rgba(200,194,182,0.1))',
                }}
              />
              <div className="absolute inset-0 flex flex-col justify-between p-5">
                <span className="font-mono text-[11px] tracking-[0.2em] text-ink/55">
                  {s.index}
                </span>
                <span className="font-serif text-[8rem] leading-none text-ink/15 self-end">
                  {s.subtitle.charAt(0)}
                </span>
              </div>
            </div>
            <div className="font-mono text-[11px] text-ink/55 tracking-wider mb-2">
              {s.time}
            </div>
            <h3 className="font-serif text-3xl md:text-4xl mb-1 leading-tight">{s.title}</h3>
            <div className="text-sm text-ink/45 mb-4 tracking-wider">{s.subtitle}</div>
            <p className="text-ink/75 leading-relaxed text-[15px]">{s.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
