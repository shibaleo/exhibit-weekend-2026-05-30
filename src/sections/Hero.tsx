import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { trip } from '../content'
import { SaitamaBackdrop } from '../components/SaitamaBackdrop'

export function Hero() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.from('[data-hero-meta]', { y: 12, opacity: 0, duration: 0.8, stagger: 0.1 })
        .from('[data-hero-title]', { y: 24, opacity: 0, duration: 1 }, '-=0.4')
        .from('[data-hero-sub]', { y: 16, opacity: 0, duration: 0.9 }, '-=0.5')
        .from('[data-hero-foot]', { y: 12, opacity: 0, duration: 0.8, stagger: 0.1 }, '-=0.5')
    },
    { scope: ref },
  )

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col px-6 py-10 md:px-16 md:py-14"
    >
      <div className="flex justify-between text-[11px] tracking-[0.2em] uppercase text-ink/55">
        <span data-hero-meta>Exhibit · Weekend Trip</span>
        <span data-hero-meta>No. 001</span>
      </div>

      <div className="flex-1 flex flex-col justify-center items-center my-8 md:my-12">
        <div
          className="font-serif text-6xl md:text-8xl tracking-tight mb-8 md:mb-10"
          data-hero-title
        >
          {trip.destination}
        </div>

        <div className="w-full max-w-4xl aspect-[2/1] relative">
          <SaitamaBackdrop />
        </div>

        <div
          className="font-serif text-base md:text-xl mt-10 md:mt-12 text-ink/75 text-center max-w-xl"
          data-hero-sub
        >
          {trip.subtitle}
        </div>
      </div>

      <div className="flex justify-between items-end text-[11px] tracking-[0.15em] text-ink/50">
        <span data-hero-foot className="font-mono">↓ scroll</span>
        <span data-hero-foot className="font-serif">{trip.dateLong}</span>
      </div>
    </section>
  )
}
