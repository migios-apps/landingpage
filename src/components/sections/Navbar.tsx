import { useEffect, useState } from "react"
import { ArrowUpRight, ChevronDown, Menu, Moon, Sun } from "lucide-react"

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
      className="flex flex-col rounded-[10px] px-2.5 py-[9px] no-underline transition-colors hover:bg-[#f4f3f1] dark:hover:bg-white/[0.06]"
    >
      <span className="text-[14.5px] font-medium leading-[1.35] text-[#131316] dark:text-white">
        {title}
      </span>
      <span className="text-[12.5px] leading-[1.35] text-[#71757e] dark:text-[#999]">{desc}</span>
    </a>
  )
}

const launchBannerEnd = new Date("2026-08-03T23:59:59Z").getTime()

export function Navbar() {
  const [open, setOpen] = useState<"solutions" | "resources" | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const [darkMode, setDarkMode] = useState(() =>
    document.documentElement.classList.contains("dark"),
  )
  const showBanner = Date.now() <= launchBannerEnd
  const headerText = "text-[#131316] dark:text-white"
  const headerMuted = "text-[#7a7f8a] dark:text-white/60"

  useEffect(() => {
    const updateHeader = () => setScrolled(window.scrollY > 12)

    updateHeader()
    window.addEventListener("scroll", updateHeader, { passive: true })

    return () => window.removeEventListener("scroll", updateHeader)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode)
    document.documentElement.style.colorScheme = darkMode ? "dark" : "light"
  }, [darkMode])

  useEffect(() => {
    if (localStorage.getItem("theme")) return

    const media = window.matchMedia("(prefers-color-scheme: dark)")
    const updateTheme = (event: MediaQueryListEvent) => setDarkMode(event.matches)
    media.addEventListener("change", updateTheme)

    return () => media.removeEventListener("change", updateTheme)
  }, [])

  const toggleTheme = () => {
    const nextDarkMode = !darkMode
    localStorage.setItem("theme", nextDarkMode ? "dark" : "light")
    setDarkMode(nextDarkMode)
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[100] transition-[background-color,box-shadow,border-color,backdrop-filter] duration-300 ${
        scrolled
          ? "border-b border-black/[0.06] bg-white/90 shadow-[0_8px_30px_rgba(19,19,22,0.06)] backdrop-blur-xl backdrop-saturate-[1.8] dark:border-white/10 dark:bg-[#0b0b0b]/88 dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)]"
          : "border-b border-transparent bg-transparent shadow-none"
      }`}
    >
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
          <MigiosLogo
            className="h-8 [&>span:last-child]:transition-colors [&>span:last-child]:duration-300"
          />
        </a>

        <nav className="ml-2 hidden items-center gap-1 lg:flex" aria-label="Primary">
          <div className="relative flex items-center gap-1">
            <button
              type="button"
              className={`inline-flex cursor-pointer items-center gap-1.5 rounded-lg bg-transparent px-3 py-2 text-[15px] font-normal no-underline transition-colors duration-300 ${headerText}`}
              aria-expanded={open === "solutions"}
              aria-haspopup="true"
              onMouseEnter={() => setOpen("solutions")}
              onClick={() => setOpen(open === "solutions" ? null : "solutions")}
            >
              Solutions
              <ChevronDown
                className={`size-[15px] transition-all duration-300 ${headerMuted} ${open === "solutions" ? "rotate-180" : ""}`}
                aria-hidden="true"
              />
            </button>
            <button
              type="button"
              className={`inline-flex cursor-pointer items-center gap-1.5 rounded-lg bg-transparent px-3 py-2 text-[15px] font-normal no-underline transition-colors duration-300 ${headerText}`}
              aria-expanded={open === "resources"}
              aria-haspopup="true"
              onMouseEnter={() => setOpen("resources")}
              onClick={() => setOpen(open === "resources" ? null : "resources")}
            >
              Resources
              <ChevronDown
                className={`size-[15px] transition-all duration-300 ${headerMuted} ${open === "resources" ? "rotate-180" : ""}`}
                aria-hidden="true"
              />
            </button>

            <div
              className="mfy-mega absolute left-0 top-[calc(100%+12px)] z-20 w-[640px] max-w-[calc(100vw-40px)] overflow-hidden rounded-[18px] border border-[#ececec] bg-white shadow-[0_30px_60px_rgba(0,0,0,0.12),0_2px_8px_rgba(0,0,0,0.06)] dark:border-white/10 dark:bg-[#151515]"
              data-open={open === "solutions"}
              role="region"
              aria-label="Solutions"
            >
              <div className="p-[22px]">
                <div className="flex gap-5">
                  <a
                    href="/solutions"
                    className="group flex w-[190px] shrink-0 flex-col rounded-[12px] bg-[#f7f6f4] p-4 no-underline transition-colors hover:bg-[#f0efec] dark:bg-white/[0.05] dark:hover:bg-white/[0.08]"
                  >
                    <p className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[#9a9ea6]">
                      Solutions
                    </p>
                    <p className="mt-2 text-[13px] leading-[1.45] text-[#71757e] dark:text-[#999]">
                      How every fitness business runs on Migios.
                    </p>
                    <span className="mt-auto inline-flex items-center gap-1 pt-3 text-[13px] font-medium text-[#131316] dark:text-white">
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
              className="mfy-mega absolute left-0 top-[calc(100%+12px)] z-20 w-[480px] max-w-[calc(100vw-40px)] overflow-hidden rounded-[18px] border border-[#ececec] bg-white shadow-[0_30px_60px_rgba(0,0,0,0.12),0_2px_8px_rgba(0,0,0,0.06)] dark:border-white/10 dark:bg-[#151515]"
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
            className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-[15px] font-normal no-underline transition-colors duration-300 fx-link ${headerText}`}
          >
            Pricing
          </a>
          <a
            href="/enterprise"
            className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-[15px] font-normal no-underline transition-colors duration-300 fx-link ${headerText}`}
          >
            Enterprise
          </a>
          <a
            href="/contact"
            className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-[15px] font-normal no-underline transition-colors duration-300 fx-link ${headerText}`}
          >
            Contact
          </a>
        </nav>

        <div className="ml-auto hidden items-center gap-5 lg:flex">
          <a
            href="/dashboard"
            className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-[15px] font-normal no-underline transition-colors duration-300 fx-link ${headerText}`}
          >
            Sign In
          </a>
          <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex size-10 items-center justify-center rounded-[10px] border border-black/10 bg-white/70 text-[#131316] transition-colors hover:bg-white dark:border-white/10 dark:bg-white/[0.06] dark:text-white dark:hover:bg-white/[0.1]"
            aria-label={darkMode ? "Use light mode" : "Use dark mode"}
            title={darkMode ? "Use light mode" : "Use dark mode"}
          >
            {darkMode ? (
              <Sun className="size-[18px]" aria-hidden="true" />
            ) : (
              <Moon className="size-[18px]" aria-hidden="true" />
            )}
          </button>
          <a className="mfy-btn bg-[#0d0d0d] text-white hover:bg-[#2e2e2e] dark:border dark:border-white/10 dark:bg-white/[0.07] dark:hover:bg-white/[0.12]" href="/dashboard">
            Start Free Trial
          </a>
        </div>

        <button
          type="button"
          onClick={toggleTheme}
          className={`ml-auto inline-flex size-[42px] items-center justify-center rounded-[10px] border border-black/10 bg-white/70 transition-colors dark:border-white/10 dark:bg-white/[0.06] lg:hidden ${headerText}`}
          aria-label={darkMode ? "Use light mode" : "Use dark mode"}
          title={darkMode ? "Use light mode" : "Use dark mode"}
        >
          {darkMode ? (
            <Sun className="size-5" aria-hidden="true" />
          ) : (
            <Moon className="size-5" aria-hidden="true" />
          )}
        </button>

        <button
          type="button"
          className={`inline-flex size-[42px] items-center justify-center rounded-[10px] bg-transparent transition-colors duration-300 lg:hidden ${headerText}`}
          aria-label="Open menu"
          aria-expanded="false"
        >
          <Menu className="size-6" aria-hidden="true" />
        </button>
      </div>
    </header>
  )
}
