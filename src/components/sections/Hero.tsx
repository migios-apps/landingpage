import { motion, useReducedMotion } from "motion/react"
import { TrendingUp, ScanLine } from "lucide-react"

const gymTypes = [
  "Fitness Center",
  "CrossFit Box",
  "Yoga Studio",
  "Martial Arts Dojo",
  "Pilates Studio",
  "Swim Club",
]

const ease = [0.33, 1, 0.68, 1] as const

export function Hero() {
  const reduce = useReducedMotion()
  const float = (delay: number) =>
    reduce
      ? {}
      : {
          y: [0, -8, 0],
          transition: {
            duration: 4.5,
            delay,
            repeat: Infinity,
            ease: "easeInOut" as const,
          },
        }

  return (
    <section id="hero" className="box-border px-1.5 md:px-[50px]">
      <div className="relative w-full overflow-hidden rounded-b-[42px] bg-[linear-gradient(180deg,#ffffff_0%,#f6f4ff_70%,#f6d5f2_99.04%)] px-4 pb-9 pt-[18px] md:px-[50px] md:pb-[50px] md:pt-7">
        <video
          className="pointer-events-none absolute inset-0 z-0 size-full object-cover"
          src="/videos/hero-background.webm"
          poster="/images/hero-video-poster.webp"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        />
        <div className="relative z-[2] mx-auto flex max-w-[960px] flex-col items-center pt-5 text-center md:pt-[30px]">
          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease }}
            className="mb-[18px] max-w-[780px] text-[clamp(32px,5vw,48px)] font-medium leading-[1.3] tracking-[-0.01em] text-[#131316]"
          >
            Run{" "}
            <span className="hero-shine" data-text="every">
              every
            </span>{" "}
            gym from one platform.
          </motion.h1>
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.08, ease }}
            className="mb-7 max-w-[600px] text-[clamp(1rem,1.4vw,1.18rem)] leading-relaxed text-[#5f6470]"
          >
            Migios brings memberships, class schedules, billing, and access
            control for all your locations into one dashboard, ready to set
            up, scale, and grow.
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.16, ease }}
            className="mb-4 flex flex-wrap items-center justify-center gap-3"
          >
            <a className="mfy-btn mfy-btn--primary" href="/dashboard">
              Start Free Trial
            </a>
            <a className="mfy-btn mfy-btn--secondary" href="/demo">
              See Migios in action
            </a>
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.45, delay: 0.24 }}
            className="mb-9 flex max-w-[760px] flex-wrap items-center justify-center gap-x-0.5 gap-y-1"
          >
            {gymTypes.map((label, i) => (
              <span key={label} className="contents">
                {i > 0 && (
                  <span
                    className="select-none text-sm text-[#d3d5db]"
                    aria-hidden="true"
                  >
                    ·
                  </span>
                )}
                <span className="px-[9px] py-[5px] text-sm text-[#71757e]">
                  {label}
                </span>
              </span>
            ))}
          </motion.div>

          {/* SaaS dashboard preview in a browser frame */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 28, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3, ease }}
            className="relative mx-auto w-full max-w-[900px]"
          >
            <div className="relative isolate w-full rounded-[20px] p-1.5">
              <div className="hero-ring" aria-hidden="true" />
              <div className="relative z-[1] overflow-hidden rounded-[14px] bg-white shadow-[0_24px_60px_rgba(19,19,22,0.18)]">
                <div className="flex items-center gap-2 border-b border-[#ececec] bg-white px-4 py-2.5">
                  <span className="flex gap-1.5" aria-hidden="true">
                    <span className="size-2.5 rounded-full bg-[#ececec]" />
                    <span className="size-2.5 rounded-full bg-[#ececec]" />
                    <span className="size-2.5 rounded-full bg-[#ececec]" />
                  </span>
                  <span className="mx-auto flex h-6 items-center rounded-lg bg-[#f3f2f0] px-4 text-xs text-[#71757e]">
                    app.migios.com
                  </span>
                  <span className="w-10" aria-hidden="true" />
                </div>
                <div className="relative aspect-[16/9] overflow-hidden bg-[#131316]">
                  <img
                    src="/images/dashboard-preview.jpg"
                    alt="Migios analytics dashboard showing member and revenue metrics"
                    className="absolute inset-0 size-full scale-[1.28] object-cover object-[50%_62%]"
                  />
                </div>
              </div>
            </div>

            {/* Floating stat cards */}
            <motion.div
              animate={float(0.4)}
              className="absolute -left-3 bottom-10 hidden items-center gap-3 rounded-[14px] bg-white p-3.5 text-left shadow-[0_0_0_1px_rgba(0,0,0,0.04),0_12px_28px_rgba(19,19,22,0.14)] md:flex"
            >
              <span className="flex size-9 items-center justify-center rounded-[10px] bg-[#f3f2f0]">
                <TrendingUp className="size-4.5 text-[#131316]" strokeWidth={1.8} aria-hidden="true" />
              </span>
              <span>
                <span className="block text-xs text-[#71757e]">
                  Active members
                </span>
                <span className="block text-lg font-semibold leading-6 text-[#131316]">
                  12,480{" "}
                  <span className="text-xs font-medium text-[#fc8c04]">
                    +8.2%
                  </span>
                </span>
              </span>
            </motion.div>

            <motion.div
              animate={float(1.6)}
              className="absolute -right-3 top-14 hidden items-center gap-3 rounded-[14px] bg-white p-3.5 text-left shadow-[0_0_0_1px_rgba(0,0,0,0.04),0_12px_28px_rgba(19,19,22,0.14)] md:flex"
            >
              <span className="flex size-9 items-center justify-center rounded-[10px] bg-[#f3f2f0]">
                <ScanLine className="size-4.5 text-[#131316]" strokeWidth={1.8} aria-hidden="true" />
              </span>
              <span>
                <span className="block text-xs text-[#71757e]">
                  Check-ins today
                </span>
                <span className="block text-lg font-semibold leading-6 text-[#131316]">
                  1,932{" "}
                  <span className="text-xs font-medium text-[#fc8c04]">
                    across 6 branches
                  </span>
                </span>
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
