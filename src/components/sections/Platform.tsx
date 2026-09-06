import type { ReactNode } from "react"

const cardCls =
  "group feature-flame relative isolate flex min-h-[330px] snap-start flex-col overflow-hidden rounded-[20px] bg-[#f5f3f1] p-6 dark:bg-[#171717] [flex:0_0_clamp(240px,24vw,320px)] transition-transform duration-500 ease-[cubic-bezier(0.22,0.61,0.36,1)] hover:-translate-y-2.5 max-[680px]:min-h-[280px] max-[680px]:[flex:0_0_78vw]"
const titleCls =
  "mb-1.5 mt-6 text-[15px] font-normal leading-[22px] tracking-[0.15px] text-[#777169] transition-colors duration-[450ms] dark:text-white/55 [font-family:Inter,sans-serif] group-hover:text-white"
const bodyCls =
  "text-[15px] font-normal leading-[22px] tracking-[0.15px] text-black transition-colors duration-[450ms] dark:text-white [font-family:Inter,sans-serif] group-hover:text-white"

const features: { title: string; body: string; icon: ReactNode }[] = [
  {
    title: "Member CRM",
    body: "Profiles, plans, notes, and attendance history.",
    icon: (
      <>
        <circle cx={12} cy={8} r={4} stroke="currentColor" strokeWidth={1.6} />
        <path
          d="M4 21c0-3.9 3.6-6 8-6s8 2.1 8 6"
          stroke="currentColor"
          strokeWidth={1.6}
          strokeLinecap="round"
        />
      </>
    ),
  },
  {
    title: "Scheduling",
    body: "Classes, courts, and appointments with waitlists.",
    icon: (
      <>
        <rect x={3} y={5} width={18} height={16} rx={2} stroke="currentColor" strokeWidth={1.6} />
        <path
          d="M3 10h18M8 3v4M16 3v4"
          stroke="currentColor"
          strokeWidth={1.6}
          strokeLinecap="round"
        />
      </>
    ),
  },
  {
    title: "Billing",
    body: "Recurring dues, POS, and payment recovery built in.",
    icon: (
      <>
        <rect x={2.5} y={6} width={19} height={13} rx={2} stroke="currentColor" strokeWidth={1.6} />
        <path
          d="M2.5 10.5h19M6 15h4"
          stroke="currentColor"
          strokeWidth={1.6}
          strokeLinecap="round"
        />
      </>
    ),
  },
  {
    title: "Access control",
    body: "24/7 door access with QR and RFID check-in.",
    icon: (
      <>
        <rect x={5} y={10} width={14} height={11} rx={2} stroke="currentColor" strokeWidth={1.6} />
        <path
          d="M8 10V7a4 4 0 0 1 8 0v3M12 14.5v3"
          stroke="currentColor"
          strokeWidth={1.6}
          strokeLinecap="round"
        />
      </>
    ),
  },
  {
    title: "Analytics",
    body: "Revenue, retention, and churn across locations.",
    icon: (
      <path
        d="M3 21h18M7 21v-9M12 21V5M17 21v-6"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
      />
    ),
  },
  {
    title: "Member app",
    body: "Branded app for booking, check-in, and payments.",
    icon: (
      <>
        <rect x={6} y={3} width={12} height={18} rx={2} stroke="currentColor" strokeWidth={1.6} />
        <path d="M11 18h2" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" />
      </>
    ),
  },
]

export function Platform() {
  return (
    <section id="platform" className="relative overflow-x-clip bg-white pb-16 dark:bg-[#0b0b0b]">
      <div className="mx-auto w-full max-w-[1240px] box-border px-5 pt-16 md:px-[50px]">
        <div className="mb-[34px] text-left">
          <h2 className="mb-4 text-[clamp(28px,6vw,48px)] font-medium leading-[1.2] text-[#131316] dark:text-white">
            A full gym platform, not just a member list.
          </h2>
          <p className="max-w-[520px] text-[clamp(1rem,1.3vw,1.12rem)] leading-relaxed text-[#5f6470] dark:text-white/60">
            Manage, schedule, bill, secure, and grow every location from one
            place.
          </p>
        </div>
      </div>
      <div
        className="flex snap-x snap-proximity gap-4 overflow-x-auto overscroll-x-contain pb-1 pt-4 [--edge:1.25rem] [-ms-overflow-style:none] [scrollbar-width:none] [scroll-padding-left:var(--edge)] [&::-webkit-scrollbar]:hidden ml-[calc(50%-50vw)] mr-[calc(50%-50vw)] pl-[var(--edge)] pr-[var(--edge)] md:[--edge:max(50px,calc((100vw-1240px)/2+50px))]"
        role="list"
      >
        {features.map((f) => (
          <article key={f.title} role="listitem" className={cardCls}>
            <span className="mb-auto inline-flex items-center justify-start text-[#131316] dark:text-white">
              <svg width={26} height={26} viewBox="0 0 24 24" fill="none" aria-hidden="true">
                {f.icon}
              </svg>
            </span>
            <h3 className={titleCls}>{f.title}</h3>
            <p className={bodyCls}>{f.body}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
