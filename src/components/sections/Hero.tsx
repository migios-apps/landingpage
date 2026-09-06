import { motion, useReducedMotion } from "motion/react"
import { ArrowRight, Building2, Play } from "lucide-react"
import { HeroSpotlight } from "../ui/HeroSpotlight"

const ease = [0.33, 1, 0.68, 1] as const

const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.08,
      staggerChildren: 0.09,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.48, ease },
  },
}

export function Hero() {
  const reduceMotion = useReducedMotion()

  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="box-border w-full"
    >
      <div className="hero-atmosphere relative h-[940px] w-full overflow-hidden px-5 pt-32 sm:h-[1020px] md:h-[1120px] md:px-[50px] md:pt-40">
        <HeroSpotlight />
        <div
          aria-hidden="true"
          className="hero-planet absolute left-1/2 top-[610px] size-[920px] -translate-x-1/2 rounded-full md:top-[650px] md:size-[1380px]"
        />
        <motion.div
          initial={reduceMotion ? false : "hidden"}
          animate="visible"
          variants={containerVariants}
          className="relative z-10 mx-auto max-w-[1240px]"
        >
          <div className="flex justify-center text-center">
            <div className="flex max-w-[900px] flex-col items-center">
              <motion.div
                variants={itemVariants}
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#e0ddd8] bg-white/55 px-3.5 py-2 text-xs font-medium uppercase tracking-[0.14em] text-[#5f6470] shadow-[0_1px_2px_rgba(19,19,22,0.04)] backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.045] dark:text-white/70 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
              >
                <Building2 className="size-3.5 text-[#fe5a16]" aria-hidden="true" />
                Cloud gym management platform
              </motion.div>

              <motion.h1
                variants={itemVariants}
                id="hero-title"
                className="max-w-[900px] text-[clamp(46px,6.6vw,88px)] font-medium leading-[0.96] tracking-[-0.058em] text-[#131316] dark:text-white"
              >
                Run every gym with{" "}
                <span className="bg-[linear-gradient(110deg,#fe3200_0%,#fc8c04_100%)] bg-clip-text text-transparent">
                  one platform.
                </span>
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="mt-6 max-w-[650px] text-[clamp(17px,1.5vw,20px)] leading-[1.6] text-[#5f6470] dark:text-white/60"
              >
                Memberships, billing, schedules, access, and reporting stay
                connected across every branch in one calm workspace.
              </motion.p>

              <motion.div
                variants={itemVariants}
                className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"
              >
                <motion.a
                  whileHover={reduceMotion ? undefined : { y: -2, scale: 1.01 }}
                  whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                  transition={{ duration: 0.18, ease }}
                  className="mfy-btn group min-h-12 bg-[linear-gradient(135deg,#fe3200_0%,#fc8c04_100%)] px-6 text-white hover:brightness-95"
                  href="/dashboard"
                >
                  Start your free trial
                  <ArrowRight
                    className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </motion.a>
                <motion.a
                  whileHover={reduceMotion ? undefined : { y: -2 }}
                  whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                  transition={{ duration: 0.18, ease }}
                  className="mfy-btn min-h-12 border border-[#d3d5db] bg-white px-6 text-[#0d0d0d] hover:bg-[#f1f1f1] dark:border-white/10 dark:bg-white/[0.07] dark:text-white dark:hover:bg-white/[0.12]"
                  href="/demo"
                >
                  <Play className="size-4 fill-current" aria-hidden="true" />
                  Watch product tour
                </motion.a>
              </motion.div>
            </div>
          </div>

          <motion.div
            variants={itemVariants}
            whileHover={reduceMotion ? undefined : { y: -4 }}
            transition={{ duration: 0.3, ease }}
            className="hero-dashboard-shell relative mx-auto mt-12 max-w-[1120px] overflow-hidden rounded-t-[22px] border border-[#d9d6d1] bg-[#171717] p-1.5 pb-0 shadow-[0_38px_100px_rgba(32,22,16,0.2)] sm:mt-14 sm:rounded-t-[28px] sm:p-2 sm:pb-0 dark:border-white/12 dark:shadow-[0_42px_130px_rgba(0,0,0,0.62)]"
          >
            <div className="flex h-9 items-center gap-2 rounded-t-[17px] border-b border-white/8 bg-[#202020] px-4 sm:h-11 sm:rounded-t-[21px]">
              <span className="size-2 rounded-full bg-[#ff6b5f] sm:size-2.5" />
              <span className="size-2 rounded-full bg-[#f5bd4f] sm:size-2.5" />
              <span className="size-2 rounded-full bg-[#61c454] sm:size-2.5" />
              <span className="mx-auto -translate-x-5 rounded-md border border-white/5 bg-white/[0.055] px-4 py-1 text-[10px] tracking-wide text-white/38 sm:px-12 sm:text-xs">
                app.migios.com/dashboard
              </span>
            </div>
            <img
              src="/images/product/dashboard-annual-overview.jpg"
              alt="Migios dashboard showing annual gym revenue, memberships, visits, and member growth"
              className="block w-full"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
