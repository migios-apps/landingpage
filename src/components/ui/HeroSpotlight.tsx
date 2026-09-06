import { motion, useReducedMotion } from "motion/react"

const spotlightTransition = {
  duration: 1.2,
  ease: [0.22, 1, 0.36, 1],
} as const

export function HeroSpotlight() {
  const reduceMotion = useReducedMotion()

  return (
    <div className="hero-spotlight" aria-hidden="true">
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={spotlightTransition}
        className="hero-spotlight-primary"
      />
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, x: 45 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ ...spotlightTransition, delay: 0.12 }}
        className="hero-spotlight-secondary"
      />
      <div className="hero-spotlight-ambient" />
    </div>
  )
}
