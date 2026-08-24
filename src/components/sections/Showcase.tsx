const wide =
  "mr-4 h-full flex-none rounded-[13px] bg-[#ececec] object-cover shadow-[0_1px_0_rgba(0,0,0,0.04)] w-auto aspect-[45/32] object-top"
const tall =
  "mr-4 h-full flex-none rounded-[13px] bg-[#ececec] object-cover shadow-[0_1px_0_rgba(0,0,0,0.04)] w-[110px] object-top md:w-[150px]"
const tallCenter =
  "mr-4 h-full flex-none rounded-[13px] bg-[#ececec] object-cover shadow-[0_1px_0_rgba(0,0,0,0.04)] w-[110px] object-center md:w-[150px]"

const rowTop = [
  { src: "/images/gym/gym-rack.jpg", alt: "Iron District — strength gym", cls: wide },
  { src: "/images/gym/training.jpg", alt: "Northside Performance — coaching", cls: tall },
  { src: "/images/gym/gym-floor.jpg", alt: "The Foundry — fitness center", cls: wide },
  { src: "/images/gym/yoga.jpg", alt: "Sunrise Yoga — studio", cls: tall },
  { src: "/images/gym/barbell.jpg", alt: "Barbell Society — powerlifting", cls: wide },
]

const rowBottom = [
  { src: "/images/gym/focus.jpg", alt: "Core Studio — training", cls: tallCenter },
  { src: "/images/gym/equipment.jpg", alt: "Eastside Athletic — equipment floor", cls: wide },
  { src: "/images/gym/boxing.jpg", alt: "Southpaw Boxing — box", cls: tall },
  { src: "/images/gym/strength.jpg", alt: "Summit Strength — barbell club", cls: wide },
  { src: "/images/gym/cardio.jpg", alt: "Pulse Cardio — conditioning", cls: tall },
  { src: "/images/gym/coaching.jpg", alt: "Coach Lab — personal training", cls: wide },
  { src: "/images/gym/stretch.jpg", alt: "Flex Mobility — recovery studio", cls: tall },
]

function MarqueeRow({
  items,
  direction,
}: {
  items: typeof rowTop
  direction: "left" | "right"
}) {
  return (
    <div
      className={`flex h-[200px] w-max flex-nowrap [will-change:transform] md:h-[300px] marquee-${direction}`}
    >
      {items.map((img) => (
        <img
          key={img.alt}
          className={img.cls}
          src={img.src}
          loading="lazy"
          alt={img.alt}
        />
      ))}
      {items.map((img) => (
        <img
          key={`${img.alt}-dup`}
          className={img.cls}
          src={img.src}
          loading="lazy"
          alt=""
          aria-hidden="true"
        />
      ))}
    </div>
  )
}

export function Showcase() {
  return (
    <section id="prompt-to-output" className="bg-white py-12 md:pb-[90px] md:pt-20">
      <div className="mx-auto w-full max-w-[1240px] px-4 md:px-[50px]">
        <h2 className="text-center text-[clamp(28px,6vw,48px)] font-medium leading-[1.2] text-[#131316]">
          From sign-up to check-in.
        </h2>
        <div
          className="relative mx-auto mb-10 mt-7 flex h-[52px] w-full items-center justify-between md:w-3/5"
          aria-label="From lead to member"
        >
          <div className="pointer-events-none absolute left-[170px] right-[170px] top-1/2 h-px bg-[#e0ddd8]" />
          <span className="relative z-[1] inline-flex h-full w-40 items-center justify-center rounded-full bg-[#f3f2f0] text-[17px] font-medium text-[#131316]">
            Lead
          </span>
          <span className="relative z-[1] inline-flex h-full w-40 items-center justify-center rounded-full bg-[linear-gradient(90deg,#fcb53a_0%,#f5a6c2_52%,#d9b8ea_100%)] text-[17px] font-medium text-[#131316] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.04)]">
            Member
          </span>
        </div>
        <div className="relative mt-2 overflow-hidden rounded-[24px] bg-[#fafafa] pb-24">
          <div className="dot-grid flex flex-col gap-4 overflow-hidden rounded-[20px] p-[22px]">
            <MarqueeRow items={rowTop} direction="left" />
            <MarqueeRow items={rowBottom} direction="right" />
          </div>
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[230px] bg-[linear-gradient(180deg,rgba(250,250,250,0)_0%,#fafafa_80%)]"
            aria-hidden="true"
          />
          <div className="absolute bottom-7 left-1/2 z-[2] -translate-x-1/2">
            <a className="mfy-btn mfy-btn--primary" href="/demo">
              See Migios in action
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
