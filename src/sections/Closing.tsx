import { useScrollReveal } from '../hooks/useScrollReveal'
import { closing, trip } from '../content'

export function Closing() {
  const ref = useScrollReveal<HTMLElement>({ stagger: 0.15, duration: 1.1 })

  return (
    <section
      ref={ref}
      className="px-6 md:px-16 py-32 md:py-48 text-center min-h-[70vh] flex flex-col justify-center"
    >
      <div className="text-[11px] tracking-[0.25em] uppercase text-ink/55 mb-10" data-reveal>
        03 / Closing
      </div>
      <p
        className="font-serif text-5xl md:text-8xl mb-16 leading-[0.95] tracking-tight"
        data-reveal
      >
        {closing.message}
      </p>
      <p className="text-ink/55 text-sm md:text-base" data-reveal>
        {closing.meta}
      </p>
      <div
        className="mt-28 font-mono text-[11px] tracking-[0.2em] text-ink/40"
        data-reveal
      >
        {trip.date} · {trip.origin}–{trip.destination}
      </div>
    </section>
  )
}
