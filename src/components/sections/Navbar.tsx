import { useState } from "react"
import { ArrowUpRight, ChevronDown, Menu } from "lucide-react"

import { MigiosLogo } from "@/components/MigiosLogo"

const byRole = [
  { href: "/gym-owners", title: "Gym owners", desc: "Run one gym or fifty." },
  {
    href: "/franchise",
    title: "Franchise operators",
    desc: "Standardize every location.",
  },
  {
    href: "/studio-managers",
    title: "Studio managers",
    desc: "Fill every class, every day.",
  },
  {
    href: "/trainers",
    title: "Personal trainers",
    desc: "Clients, sessions, and packages.",
  },
  {
    href: "/front-desk",
    title: "Front desk",
    desc: "Check-ins without the queue.",
  },
  { href: "/sales", title: "Sales teams", desc: "Turn leads into members." },
  { href: "/finance", title: "Finance", desc: "Billing on autopilot." },
]

const byGymType = [
  {
    href: "/fitness-centers",
    title: "Fitness centers",
    desc: "Full-floor gyms and chains.",
  },
  {
    href: "/studios",
    title: "Studios & boxes",
    desc: "Yoga, pilates, and CrossFit.",
  },
]

const resources = [
  { href: "/insights", title: "Insights", desc: "Growth playbooks for gyms." },
  { href: "/guides", title: "Guides", desc: "Set up Migios step by step." },
  { href: "/faqs", title: "FAQs", desc: "Answers to common questions." },
  {
    href: "/integrations",
    title: "Integrations",
    desc: "Payments, access, and more.",
  },
  { href: "/api", title: "API docs", desc: "Build on the Migios platform." },
  {
    href: "/community",
    title: "Community",
    desc: "Operators helping operators.",
  },
]

function MegaLink({
  href,
  title,
  desc,
}: {
  href: string
  title: string
  desc: string
}) {
  return (
    <a
      href={href}
      className="flex flex-col rounded-[10px] px-2.5 py-[9px] no-underline transition-colors hover:bg-[#f4f3f1]"
    >
      <span className="text-[14.5px] font-medium leading-[1.35] text-[#131316]">
        {title}
      </span>
      <span className="text-[12.5px] leading-[1.35] text-[#71757e]">{desc}</span>
    </a>
  )
}

const launchBannerEnd = new Date("2026-08-03T23:59:59Z").getTime()

export function Navbar() {
  const [open, setOpen] = useState<"solutions" | "resources" | null>(null)
  const showBanner = Date.now() <= launchBannerEnd

  return (
    <header className="sticky top-0 z-[100] transition-colors duration-300 bg-white/85 backdrop-blur-md backdrop-saturate-[1.8]">
      {showBanner && (
      <a href="/whats-new" className="lb-bar relative w-full">
        <span className="lb-line mx-auto flex w-full max-w-[1240px] flex-nowrap items-center justify-center gap-x-2.5 whitespace-nowrap px-4 py-[9px] md:px-[50px]">
          <span className="leading-snug whitespace-nowrap">
            Migios 2.0 is here — multi-gym analytics
          </span>
          <span aria-hidden="true" className="shrink-0 text-white/30">
            ·
          </span>
          <span className="lb-cta inline-flex shrink-0 items-center gap-1 whitespace-nowrap">
            See what&rsquo;s new
            <ArrowUpRight className="lb-arrow size-3.5" aria-hidden="true" />
          </span>
        </span>
      </a>
      )}

      <div
        className="mx-auto flex w-full max-w-[1240px] items-center gap-3 px-5 transition-[padding] duration-200 md:px-[50px] lg:gap-6 py-4"
        onMouseLeave={() => setOpen(null)}
      >
        <a href="/" className="flex shrink-0 items-center" aria-label="Migios home">
          <MigiosLogo className="h-8" />
        </a>

        <nav className="ml-2 hidden items-center gap-1 lg:flex" aria-label="Primary">
          <div className="relative flex items-center gap-1">
            <button
              type="button"
              className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-[15px] font-normal text-[#131316] no-underline cursor-pointer bg-transparent"
              aria-expanded={open === "solutions"}
              aria-haspopup="true"
              onMouseEnter={() => setOpen("solutions")}
              onClick={() => setOpen(open === "solutions" ? null : "solutions")}
            >
              Solutions
              <ChevronDown
                className={`size-[15px] text-[#7a7f8a] transition-transform duration-200 ${open === "solutions" ? "rotate-180" : ""}`}
                aria-hidden="true"
              />
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-[15px] font-normal text-[#131316] no-underline cursor-pointer bg-transparent"
              aria-expanded={open === "resources"}
              aria-haspopup="true"
              onMouseEnter={() => setOpen("resources")}
              onClick={() => setOpen(open === "resources" ? null : "resources")}
            >
              Resources
              <ChevronDown
                className={`size-[15px] text-[#7a7f8a] transition-transform duration-200 ${open === "resources" ? "rotate-180" : ""}`}
                aria-hidden="true"
              />
            </button>

            <div
              className="mfy-mega absolute left-0 top-[calc(100%+12px)] z-20 w-[640px] max-w-[calc(100vw-40px)] overflow-hidden rounded-[18px] border border-[#ececec] bg-white shadow-[0_30px_60px_rgba(0,0,0,0.12),0_2px_8px_rgba(0,0,0,0.06)]"
              data-open={open === "solutions"}
              role="region"
              aria-label="Solutions"
            >
              <div className="p-[22px]">
                <div className="flex gap-5">
                  <a
                    href="/solutions"
                    className="group flex w-[190px] shrink-0 flex-col rounded-[12px] bg-[#f7f6f4] p-4 no-underline transition-colors hover:bg-[#f0efec]"
                  >
                    <p className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[#9a9ea6]">
                      Solutions
                    </p>
                    <p className="mt-2 text-[13px] leading-[1.45] text-[#71757e]">
                      How every fitness business runs on Migios.
                    </p>
                    <span className="mt-auto inline-flex items-center gap-1 pt-3 text-[13px] font-medium text-[#131316]">
                      View all solutions →
                    </span>
                  </a>
                  <div className="flex-1 space-y-3">
                    <div>
                      <p className="mb-1 px-2.5 text-[10.5px] font-semibold uppercase tracking-[0.06em] text-[#b4b7be]">
                        By role
                      </p>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-0.5">
                        {byRole.map((item) => (
                          <MegaLink key={item.title} {...item} />
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="mb-1 px-2.5 text-[10.5px] font-semibold uppercase tracking-[0.06em] text-[#b4b7be]">
                        By gym type
                      </p>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-0.5">
                        {byGymType.map((item) => (
                          <MegaLink key={item.title} {...item} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="mfy-mega absolute left-0 top-[calc(100%+12px)] z-20 w-[480px] max-w-[calc(100vw-40px)] overflow-hidden rounded-[18px] border border-[#ececec] bg-white shadow-[0_30px_60px_rgba(0,0,0,0.12),0_2px_8px_rgba(0,0,0,0.06)]"
              data-open={open === "resources"}
              role="region"
              aria-label="Resources"
            >
              <div className="p-[22px]">
                <div className="grid grid-cols-2 gap-x-4 gap-y-0.5">
                  {resources.map((item) => (
                    <MegaLink key={item.title} {...item} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <a
            href="/pricing"
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-[15px] font-normal text-[#131316] no-underline fx-link"
          >
            Pricing
          </a>
          <a
            href="/enterprise"
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-[15px] font-normal text-[#131316] no-underline fx-link"
          >
            Enterprise
          </a>
          <a
            href="/contact"
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-[15px] font-normal text-[#131316] no-underline fx-link"
          >
            Contact
          </a>
        </nav>

        <div className="ml-auto hidden items-center gap-5 lg:flex">
          <a
            href="/dashboard"
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-[15px] font-normal text-[#131316] no-underline fx-link"
          >
            Sign In
          </a>
          <a className="mfy-btn mfy-btn--primary" href="/dashboard">
            Start Free Trial
          </a>
        </div>

        <button
          type="button"
          className="ml-auto inline-flex size-[42px] items-center justify-center rounded-[10px] bg-transparent text-[#131316] lg:hidden"
          aria-label="Open menu"
          aria-expanded="false"
        >
          <Menu className="size-6" aria-hidden="true" />
        </button>
      </div>
    </header>
  )
}
