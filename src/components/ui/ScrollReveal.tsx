import type { ReactNode } from "react"
import { motion, useReducedMotion } from "motion/react"

type ScrollRevealProps = {
  children: ReactNode
  delay?: number
}

const ease = [0.33, 1, 0.68, 1] as const

export function ScrollReveal({ children, delay = 0 }: ScrollRevealProps) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 36 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1, margin: "0px 0px -60px 0px" }}
      transition={{ duration: 0.65, delay, ease }}
    >
      {children}
    </motion.div>
  )
}
