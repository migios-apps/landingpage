import { useRef } from "react"
import { motion, useInView, useReducedMotion } from "motion/react"
import type { Transition } from "motion/react"
import { Building2, Dumbbell, MapPin, Users } from "lucide-react"
import type { LucideIcon } from "lucide-react"

import { MigiosMarkPlain } from "@/components/MigiosLogo"

/**
 * Multi-branch integration, visualized with Motion. Neutral white branch
 * orbs (ink icons, card-style shadows — consistent with the design
 * system) pull into the single brand-orange Migios orb, hold, then ease
 * back out. One continuous keyframe cycle that starts and ends in the
 * same pose, so the infinite loop has no seams. No filter animations —
 * transform and opacity only, for a fully composited, smooth render.
 */

const CYCLE = 7.2
// timeline: apart → merging → merged (hold) → returning → apart (hold)
const TIMES = [0, 0.2, 0.38, 0.55, 0.73, 0.93, 1]

const loop: Transition = {
  duration: CYCLE,
  times: TIMES,
  ease: "easeInOut",
  repeat: Infinity,
}

type Branch = {
  icon: LucideIcon
  side: "left" | "right"
  top: string
  edge: string
  size: string
  midX: string
  endX: string
}

const branches: Branch[] = [
  { icon: Dumbbell, side: "left", top: "24%", edge: "10%", size: "14%", midX: "70%", endX: "205%" },
  { icon: MapPin, side: "left", top: "60%", edge: "15%", size: "13%", midX: "65%", endX: "185%" },
  { icon: Building2, side: "right", top: "24%", edge: "15%", size: "13%", midX: "-65%", endX: "-185%" },
  { icon: Users, side: "right", top: "60%", edge: "10%", size: "14%", midX: "-70%", endX: "-205%" },
]

export function BranchMergeAnimation() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0.35 })
  const reduce = useReducedMotion()
  const state = reduce ? "merged" : inView ? "loop" : "apart"

  return (
    <div
      ref={ref}
      className="relative mx-auto aspect-[1030/460] w-full max-w-[900px]"
    >
      {/* Connection trails — brand orange, soft blurred glow (blur is
          static; only transform/opacity animate, so it stays smooth) */}
      {branches.map((b, i) => (
        <motion.div
          key={`trail-${i}`}
          className="absolute h-[20%] w-[32%] rounded-full blur-[24px]"
          style={{
            top: `calc(${b.top} + 2%)`,
            [b.side]: `calc(${b.edge} + 3%)`,
            transformOrigin: b.side === "left" ? "left center" : "right center",
            background:
              b.side === "left"
                ? "linear-gradient(90deg, rgba(252,140,4,0.55) 0%, rgba(252,140,4,0.2) 55%, transparent 100%)"
                : "linear-gradient(270deg, rgba(252,140,4,0.55) 0%, rgba(252,140,4,0.2) 55%, transparent 100%)",
          }}
          variants={{
            apart: { opacity: 0, scaleX: 0.4 },
            merged: { opacity: 0, scaleX: 0.2 },
            loop: {
              opacity: [0, 0.9, 0, 0, 0.9, 0, 0],
              scaleX: [0.4, 1, 0.2, 0.2, 1, 0.4, 0.4],
              transition: loop,
            },
          }}
          initial={false}
          animate={state}
          aria-hidden="true"
        />
      ))}

      {/* Branch orbs — neutral surface, ink icon, card shadow */}
      {branches.map((b, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute flex aspect-square items-center justify-center rounded-full bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.04),0_4px_8px_rgba(0,0,0,0.06)]"
          style={{ top: b.top, [b.side]: b.edge, width: b.size }}
          variants={{
            apart: { x: "0%", scale: 1, opacity: 1 },
            merged: { x: b.endX, scale: 0.3, opacity: 0 },
            loop: {
              x: ["0%", b.midX, b.endX, b.endX, b.midX, "0%", "0%"],
              scale: [1, 0.92, 0.3, 0.3, 0.92, 1, 1],
              opacity: [1, 1, 0, 0, 1, 1, 1],
              transition: loop,
            },
          }}
          initial={false}
          animate={state}
        >
          <b.icon
            className="w-[38%] text-[#131316]"
            strokeWidth={1.8}
            aria-hidden="true"
          />
        </motion.div>
      ))}

      {/* Central Migios orb — the one brand accent */}
      <motion.div
        className="absolute left-1/2 top-1/2 flex aspect-square w-[27%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[radial-gradient(circle_at_35%_30%,#fc8c04_0%,#fe3200_120%)] shadow-[0_0_50px_rgba(252,140,4,0.45)]"
        variants={{
          apart: { scale: 0.94 },
          merged: { scale: 1.12 },
          loop: {
            scale: [0.94, 0.97, 1.12, 1.12, 0.97, 0.94, 0.94],
            transition: loop,
          },
        }}
        initial={false}
        animate={state}
      >
        <MigiosMarkPlain className="w-[46%]" />
      </motion.div>

      {/* Merge bloom — soft radial glow, gradient falloff only */}
      <motion.div
        className="absolute left-1/2 top-1/2 aspect-square w-[46%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(252,140,4,0.45)_0%,rgba(254,50,0,0.15)_45%,transparent_68%)]"
        variants={{
          apart: { opacity: 0, scale: 0.7 },
          merged: { opacity: 1, scale: 1.1 },
          loop: {
            opacity: [0, 0.1, 1, 1, 0.1, 0, 0],
            scale: [0.7, 0.78, 1.1, 1.1, 0.78, 0.7, 0.7],
            transition: loop,
          },
        }}
        initial={false}
        animate={state}
        aria-hidden="true"
      />
    </div>
  )
}
