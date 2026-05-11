import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { saitamaPath, stopMarkers } from '../saitama'

const VB_W = 800
const VB_H = 400

const RING_COUNT = 3
const RING_DURATION = 3.2
const RING_BASE_R = 8
const RING_MAX_R = 72
const CORE_R = 7

export function SaitamaBackdrop() {
  const ref = useRef<SVGSVGElement>(null)

  useGSAP(
    () => {
      const outline = ref.current?.querySelector<SVGPathElement>('[data-outline]')
      if (outline) {
        const len = outline.getTotalLength()
        gsap.fromTo(
          outline,
          { strokeDasharray: len, strokeDashoffset: len, opacity: 0 },
          {
            strokeDashoffset: 0,
            opacity: 0.5,
            duration: 2.8,
            ease: 'power2.inOut',
            delay: 0.2,
          },
        )
      }

      const cores = ref.current?.querySelectorAll<SVGCircleElement>('[data-core]')
      cores?.forEach((c, i) => {
        gsap.fromTo(
          c,
          { opacity: 0, scale: 0 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.7,
            delay: 1.4 + i * 0.25,
            ease: 'back.out(2)',
            transformOrigin: '50% 50%',
          },
        )
      })

      const rings = ref.current?.querySelectorAll<SVGCircleElement>('[data-pulse]')
      rings?.forEach((ring) => {
        const indexInGroup = Number(ring.dataset.index ?? '0')
        gsap.fromTo(
          ring,
          { attr: { r: RING_BASE_R }, opacity: 0.55 },
          {
            attr: { r: RING_MAX_R },
            opacity: 0,
            duration: RING_DURATION,
            repeat: -1,
            delay: 2 + (indexInGroup * RING_DURATION) / RING_COUNT,
            ease: 'power2.out',
          },
        )
      })
    },
    { scope: ref },
  )

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      preserveAspectRatio="xMidYMid meet"
      className="absolute inset-0 w-full h-full pointer-events-none text-moss"
      aria-hidden="true"
    >
      <path
        data-outline
        d={saitamaPath}
        fill="currentColor"
        fillOpacity={0.2}
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
      {stopMarkers.map((m) => (
        <g key={m.id} transform={`translate(${m.x} ${m.y})`}>
          {Array.from({ length: RING_COUNT }).map((_, i) => (
            <circle
              key={i}
              data-pulse
              data-index={i}
              r={RING_BASE_R}
              fill="none"
              stroke="var(--color-rust)"
              strokeWidth="1.2"
              opacity="0"
            />
          ))}
          <circle
            data-core
            r={CORE_R}
            fill="var(--color-rust)"
            opacity="0"
          />
        </g>
      ))}
    </svg>
  )
}
