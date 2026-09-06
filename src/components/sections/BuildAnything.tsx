import { useEffect, useRef, useState } from "react"

const caps = [
  { label: "Memberships", img: "/images/gym/gym-floor.jpg", alt: "Members training on the gym floor" },
  { label: "Class schedules", img: "/images/gym/workout.jpg", alt: "A scheduled group class in session" },
  { label: "Billing", img: "/images/gym/equipment.jpg", alt: "Front desk and equipment area" },
  { label: "Access control", img: "/images/gym/gym-rack.jpg", alt: "Gym entrance and weight racks" },
  { label: "Trainers", img: "/images/gym/coaching.jpg", alt: "A trainer coaching a client" },
  { label: "Reports", img: "/images/gym/strength.jpg", alt: "Performance floor at a strength gym" },
]

const COPIES = 4
const SPEED = 36 // px per second

export function BuildAnything() {
  const [activeDom, setActiveDom] = useState(caps.length + 1)
  const trackRef = useRef<HTMLUListElement>(null)
  const offsetRef = useRef(-1)

  useEffect(() => {
    const track = trackRef.current
    const scroller = track?.parentElement
    if (!track || !scroller) return
    let raf = 0
    let last = performance.now()
    const step = (now: number) => {
      const rows = track.children as HTMLCollectionOf<HTMLElement>
      const copyH =
        rows.length > caps.length
          ? rows[caps.length].offsetTop - rows[0].offsetTop
          : 0
      if (copyH > 0) {
        if (offsetRef.current < 0) offsetRef.current = copyH
        const dt = Math.min((now - last) / 1000, 0.1)
        offsetRef.current += SPEED * dt
        if (offsetRef.current >= copyH * 2) offsetRef.current -= copyH
        track.style.transform = `translateY(${-offsetRef.current}px)`

        const centerY = offsetRef.current + scroller.clientHeight / 2
        let best = 0
        let bestDist = Infinity
        for (let i = 0; i < rows.length; i++) {
          const c = rows[i].offsetTop + rows[i].offsetHeight / 2
          const d = Math.abs(c - centerY)
          if (d < bestDist) {
            bestDist = d
            best = i
          }
        }
        setActiveDom(best)
      }
      last = now
      raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [])

  const jumpTo = (domIdx: number) => {
    const track = trackRef.current
    const scroller = track?.parentElement
    if (!track || !scroller) return
    const row = track.children[domIdx] as HTMLElement
    offsetRef.current =
      row.offsetTop + row.offsetHeight / 2 - scroller.clientHeight / 2
  }

  const active = activeDom % caps.length
  const n = caps.length
  const imageStyle = (i: number): React.CSSProperties => {
    const prev = (active - 1 + n) % n
    const next = (active + 1) % n
    if (i === active)
      return { transform: "translateX(0) scale(1)", zIndex: 10, opacity: 1 }
    if (i === prev)
      return { transform: "translateX(-24%) scale(0.8)", zIndex: 5, opacity: 1 }
    if (i === next)
      return { transform: "translateX(24%) scale(0.8)", zIndex: 5, opacity: 1 }
    return {
      transform: "translateX(0) scale(0.8)",
      zIndex: 1,
      opacity: 0,
      pointerEvents: "none",
    }
  }

  return (
    <section
      id="build-anything"
      className="relative h-auto overflow-hidden bg-white dark:bg-[#0b0b0b] md:h-[80vh] md:max-h-[80vh]"
    >
      <div className="grid h-full grid-cols-1 md:grid-cols-2">
        <div className="order-2 flex h-[70vh] items-center justify-center overflow-hidden bg-[linear-gradient(165deg,#fe3200_8%,#fc8c04_48%,rgba(242,138,111,0)_86%),linear-gradient(90deg,#fc8c04,#fc8c04)] px-5 md:order-none md:h-auto md:pl-[max(50px,calc((100vw-1240px)/2+50px))] md:pr-0">
          <div className="scroller">
            <ul ref={trackRef} className="scroller__track">
              {Array.from({ length: COPIES }).flatMap((_, copy) =>
                caps.map((cap, i) => {
                  const domIdx = copy * caps.length + i
                  const isMain = copy === 1
                  return (
                    <li key={`${copy}-${cap.label}`} className="scroller__row">
                      <button
                        type="button"
                        data-cap-item="true"
                        data-label={cap.label}
                        className={`scroller__item${domIdx === activeDom ? " is-active" : ""}`}
                        aria-hidden={isMain ? undefined : true}
                        tabIndex={isMain ? 0 : -1}
                        onClick={() => jumpTo(domIdx)}
                      >
                        {cap.label}
                      </button>
                    </li>
                  )
                })
              )}
            </ul>
          </div>
        </div>
        <div className="flex flex-col justify-start gap-7 overflow-hidden bg-[#f1f2f6] px-5 py-14 dark:bg-[#111] md:px-16 md:py-20">
          <div className="text-center">
            <h2 className="mb-4 text-[clamp(32px,6vw,48px)] font-medium leading-[1.2] text-[#131316] dark:text-white">
              Manage Everything
            </h2>
            <p className="mx-auto max-w-[520px] text-[clamp(1rem,1.3vw,1.12rem)] leading-relaxed text-[#5f6470] dark:text-white/60">
              Migios helps you onboard members, plan classes, collect
              payments, control access, and track every location&rsquo;s
              growth.
            </p>
          </div>
          <div className="relative mx-auto mt-6 aspect-[45/32] w-full max-w-[min(460px,80vw)] rounded-[14px]">
            {caps.map((cap, i) => (
              <img
                key={cap.label}
                className="absolute inset-0 size-full rounded-[12px] bg-[#d9d9d9] object-cover shadow-[0_8px_28px_rgba(0,0,0,0.16)] transition-[transform,opacity] duration-[420ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
                src={cap.img}
                loading="lazy"
                alt={cap.alt}
                style={imageStyle(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
