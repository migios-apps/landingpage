const stories = [
  {
    src: "/images/product/sales-report-2026.jpg",
    alt: "Migios sales report showing 2026 revenue totals, invoice metrics, and a monthly performance chart",
    label: "Sales intelligence",
    title: "Know what drives revenue",
    body: "Follow gross sales, net revenue, invoices, and payment performance without piecing together spreadsheets.",
  },
  {
    src: "/images/product/member-report-2026.jpg",
    alt: "Migios member report showing 2026 total, new, and active member metrics with a growth chart",
    label: "Member health",
    title: "See membership momentum",
    body: "Track new, active, and total members in one privacy-safe view built for fast operational decisions.",
  },
  {
    src: "/images/product/schedule-month-view.jpg",
    alt: "Migios monthly schedule showing recurring classes and personal-training sessions in September 2026",
    label: "Schedule control",
    title: "Keep every session in view",
    body: "Coordinate classes and personal training from a clear monthly calendar that keeps the team aligned.",
  },
]

function ProductFrame({
  src,
  alt,
  priority = false,
}: {
  src: string
  alt: string
  priority?: boolean
}) {
  return (
    <div className="overflow-hidden rounded-[14px] bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.1),0_1px_3px_rgba(0,0,0,0.15),0_18px_50px_rgba(0,0,0,0.08)]">
      <div className="flex h-10 items-center gap-1.5 border-b border-[#e0ddd8] bg-[#f7f6f4] px-4">
        <span className="size-2 rounded-full bg-[#d3d5db]" />
        <span className="size-2 rounded-full bg-[#d3d5db]" />
        <span className="size-2 rounded-full bg-[#d3d5db]" />
      </div>
      <img
        className="block h-auto w-full bg-[#ececec]"
        src={src}
        width="1171"
        height="927"
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
        alt={alt}
      />
    </div>
  )
}

export function Showcase() {
  return (
    <section
      id="prompt-to-output"
      className="overflow-hidden bg-white py-14 md:py-20"
      aria-labelledby="product-showcase-title"
    >
      <div className="mx-auto w-full max-w-[1240px] px-5 md:px-[50px]">
        <div className="mx-auto max-w-[720px] text-center">
          <p className="text-sm font-medium text-[#71757e]">Your operation, in focus</p>
          <h2
            id="product-showcase-title"
            className="mt-3 text-[clamp(32px,6vw,48px)] font-medium leading-[1.2] text-[#131316]"
          >
            The whole gym, at a glance.
          </h2>
          <p className="mx-auto mt-4 max-w-[600px] text-[clamp(1rem,1.3vw,1.12rem)] leading-relaxed text-[#5f6470]">
            Turn daily activity into a clear view of revenue, members, and
            schedules—so every decision starts with the full picture.
          </p>
        </div>

        <article className="relative mt-10 overflow-hidden rounded-[24px] bg-[#f3f2f0] p-3 md:mt-14 md:p-7">
          <div
            className="pointer-events-none absolute inset-x-[15%] top-0 h-56 bg-[radial-gradient(circle_at_top,#fc8c04_0%,rgba(252,140,4,0)_72%)] opacity-30 blur-[50px]"
            aria-hidden="true"
          />
          <div className="relative">
            <ProductFrame
              src="/images/product/dashboard-annual-overview.jpg"
              alt="Migios annual dashboard showing 2026 revenue, visit, and new-member metrics with performance charts"
              priority
            />
          </div>
          <div className="relative flex flex-col gap-3 px-2 pb-3 pt-6 md:flex-row md:items-end md:justify-between md:px-3 md:pb-2 md:pt-7">
            <div>
              <p className="text-sm font-medium text-[#71757e]">Annual overview</p>
              <h3 className="mt-1 text-[1.2rem] font-medium text-[#131316]">
                Lead with the numbers that matter
              </h3>
            </div>
            <p className="max-w-[500px] text-[0.95rem] leading-relaxed text-[#5f6470] md:text-right">
              Revenue, visits, new members, and sales composition come together
              in one decision-ready dashboard.
            </p>
          </div>
        </article>

        <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-3">
          {stories.map((story) => (
            <article
              key={story.src}
              className="flex flex-col overflow-hidden rounded-[20px] bg-[#f7f6f4] p-3"
            >
              <ProductFrame src={story.src} alt={story.alt} />
              <div className="flex flex-1 flex-col px-2 pb-3 pt-6">
                <p className="text-sm font-medium text-[#71757e]">{story.label}</p>
                <h3 className="mt-1.5 text-[1.05rem] font-medium tracking-[-0.01em] text-[#131316]">
                  {story.title}
                </h3>
                <p className="mt-2 text-[0.92rem] leading-[1.5] text-[#5f6470]">
                  {story.body}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a className="mfy-btn mfy-btn--primary" href="/demo">
            See Migios in action
          </a>
        </div>
      </div>
    </section>
  )
}
