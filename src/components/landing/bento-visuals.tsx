"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { motion, useReducedMotion } from "motion/react"
import {
  Banknote,
  Building,
  Calendar,
  Check,
  CircleCheck,
  CreditCard,
  Dumbbell,
  LogIn,
  Package,
  Receipt,
  ScanFace,
  Smartphone,
  Snowflake,
  Ticket,
  User,
  Wallet,
  Zap,
  type LucideIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"

// One shared beat for every card; it stays at 0 when the visitor prefers reduced motion.
function useTick(ms = 1900) {
  const reduce = useReducedMotion()
  const [tick, setTick] = useState(0)
  useEffect(() => {
    if (reduce) return
    const id = setInterval(() => setTick((value) => value + 1), ms)
    return () => clearInterval(id)
  }, [ms, reduce])
  return tick
}

const grad = {
  blue: ["#2f6fe4", "#1d4ed8"],
  orange: ["#f26a1b", "#c2410c"],
  violet: ["#7c3aed", "#6d28d9"],
  green: ["#0e9f6e", "#047857"],
  amber: ["#e08a00", "#b45309"],
} as const

const raised = (c: readonly string[]) => ({
  color: "#ffffff",
  background: `linear-gradient(180deg, ${c[0]}, ${c[1]})`,
  borderColor: c[1],
  boxShadow:
    "inset 0 1px 0 rgba(255,255,255,0.35), inset 0 -2px 6px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.08), 0 4px 8px rgba(0,0,0,0.06)",
})
const flat = {
  color: "var(--subtle)",
  background: "var(--card)",
  borderColor: "var(--line)",
  boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
}
const spring = { type: "spring", stiffness: 500, damping: 35 } as const
const dotGrid = "absolute inset-0 bg-[radial-gradient(circle,var(--dot)_0.9px,transparent_1.2px)] bg-size-[14px_14px]"
const hatch = "bg-[repeating-linear-gradient(45deg,transparent_0_6px,var(--hatch)_6px_7px)]"
const label = "font-mono text-[9px] tracking-[0.08em] text-subtle uppercase"
// Running colour for flow lines: dashes keep moving along a drawn line, paused for reduced motion.
const flowDash = "animate-flow-dash transition-opacity duration-[450ms] motion-reduce:animate-none"

const flowCaptions = [
  "Member datang ke klub",
  "Pilih QR code atau wajah",
  "Wajah dikenali · cocok 96%",
  "Paket Gold aktif s.d. 12 Des 2026",
  "Check-in tercatat · 07.30",
  "Check-in tercatat · 07.30",
]

export function AttendanceFlow() {
  const step = useTick() % 6
  const on: Record<string, boolean> = { M: step <= 1, S: step >= 2 && step <= 4, P: step === 3, C: step >= 4 }
  const nodes: { key: string; x: number; y: number; text: string; Icon: LucideIcon; c: readonly string[] }[] = [
    { key: "M", x: 44, y: 98, text: "MEMBER", Icon: User, c: grad.blue },
    { key: "S", x: 184, y: 98, text: "SCAN", Icon: ScanFace, c: grad.orange },
    { key: "P", x: 272, y: 42, text: "PAKET", Icon: Ticket, c: grad.violet },
    { key: "C", x: 272, y: 154, text: "MASUK", Icon: LogIn, c: grad.green },
  ]
  const paths = [
    { d: "M72 98H100", color: "#2f6fe4", drawn: step >= 1 },
    { d: "M124 98H156", color: "#f26a1b", drawn: step >= 2 },
    { d: "M184 70V42H244", color: "#7c3aed", drawn: step >= 3 },
    { d: "M184 126V154H244", color: "#0e9f6e", drawn: step >= 4 },
  ]
  const routerOn = step === 1

  return (
    <>
      <div aria-hidden className={dotGrid} />
      <p className="absolute top-2.5 left-2.5 z-[2] inline-flex h-[22px] items-center gap-1.5 rounded-full bg-card px-2 font-mono text-[9.5px] whitespace-nowrap text-body-strong shadow-[0_0_0_1px_var(--line)]">
        <span className="size-1.5 rounded-full bg-brand" />
        {flowCaptions[step]}
      </p>
      <div aria-hidden className="absolute top-1/2 left-1/2 -mt-[92px] -ml-[160px] h-[196px] w-[320px]">
        <svg width="320" height="196" viewBox="0 0 320 196" fill="none" className="absolute inset-0 overflow-visible">
          {paths.map((path) => (
            <path key={path.d} d={path.d} strokeWidth={1} className="stroke-(--stroke)" />
          ))}
          {paths.map((path) => (
            <g key={`${path.d}-flow`}>
              {[4, 1.6].map((width) => (
                <motion.path
                  key={width}
                  d={path.d}
                  stroke={path.color}
                  strokeWidth={width}
                  strokeOpacity={width === 4 ? 0.18 : 0.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={false}
                  animate={{ pathLength: path.drawn ? 1 : 0 }}
                  transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
                />
              ))}
              <path
                d={path.d}
                stroke={path.color}
                strokeWidth={2.2}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="6 8"
                className={cn(flowDash, path.drawn ? "opacity-100" : "opacity-0")}
              />
            </g>
          ))}
        </svg>
        {nodes.map(({ key, x, y, text, Icon, c }) => (
          <motion.div
            key={key}
            className="absolute -mt-7 -ml-7 flex size-14 flex-col items-center justify-center gap-[3px] rounded-[15px] border transition-[color,border-color,box-shadow] duration-300"
            style={{ left: x, top: y, ...(on[key] ? raised(c) : flat) }}
            animate={{ scale: on[key] ? 1.06 : 1 }}
            transition={{ duration: 0.35 }}
          >
            <Icon className="size-[18px]" />
            <span className="font-mono text-[7.5px] font-bold tracking-[0.06em]">{text}</span>
          </motion.div>
        ))}
        <div
          className={cn(
            "absolute top-[98px] left-[112px] -mt-3 -ml-3 flex size-6 items-center justify-center rounded-full border-2 transition-colors duration-300",
            routerOn ? "border-[#f59e0b] bg-[#fef3c7] dark:bg-[#f59e0b26]" : "border-(--stroke) bg-card"
          )}
        >
          <motion.div
            className={cn(
              "size-[11px] rounded-full border-[1.5px] border-dashed",
              routerOn ? "border-[#b45309] dark:border-[#f59e0b]" : "border-[#a3a3a3]"
            )}
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
          />
        </div>
      </div>
    </>
  )
}

const days = ["SEN", "SEL", "RAB", "KAM", "JUM", "SAB", "MIN"]
const barBase = [45, 70, 38, 82, 60, 92, 50]
const stats = [
  { label: "Pendapatan", value: "Rp 6,2 jt", trend: "+26%", points: "0,17 15,10 29,13 44,3" },
  { label: "Kunjungan", value: "186", trend: "+12%", points: "0,16 15,12 29,7 44,5" },
]

export function RevenueBars() {
  const tick = useTick()
  const statOn = Math.floor(tick / 2) % 2

  return (
    <div className="absolute inset-0 flex flex-col gap-2.5 px-3 pt-4 pb-2.5">
      <div className="flex gap-2.5 pr-1.5">
        {stats.map((stat, i) => (
          <div key={stat.label} className="relative h-[60px] min-w-0 flex-1">
            <div aria-hidden className={cn("absolute inset-0 rounded-xl border border-line", hatch)} />
            <motion.div
              className="absolute inset-0 flex items-center justify-between gap-2 rounded-xl border border-line bg-card px-[11px] py-[9px]"
              animate={{ x: statOn === i ? 6 : 0, y: statOn === i ? -6 : 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 16 }}
            >
              <div className="flex min-w-0 flex-col">
                <span className="font-mono text-[8.5px] tracking-[0.08em] text-subtle uppercase">{stat.label}</span>
                <span className="mt-1 font-mono text-[15px] font-semibold tracking-[-0.02em] whitespace-nowrap">
                  {stat.value}
                </span>
                <span className="mt-[3px] font-mono text-[8.5px] font-semibold whitespace-nowrap text-success-text">
                  {stat.trend} <span className="font-normal text-subtle">vs periode lalu</span>
                </span>
              </div>
              <svg width="40" height="22" viewBox="0 0 44 22" aria-hidden className="shrink-0 overflow-visible">
                <polyline
                  points={stat.points}
                  fill="none"
                  stroke="#a3a3a3"
                  strokeWidth={1.2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>
          </div>
        ))}
      </div>
      <div aria-hidden className="flex min-h-0 flex-1 items-end gap-1.5">
        {barBase.map((base, i) => {
          const height = Math.max(12, Math.min(96, Math.round(base + 16 * Math.sin(tick * 0.9 + i * 1.3))))
          const today = i === 5
          return (
            <div
              key={days[i]}
              className={cn("relative h-full flex-1 overflow-hidden rounded-[9px] border border-line bg-panel", hatch)}
            >
              <motion.div
                className="absolute inset-x-0 bottom-0 rounded-t-lg shadow-[inset_0_1px_0_rgba(255,255,255,0.35),inset_0_-3px_8px_rgba(0,0,0,0.15)]"
                style={{
                  background: today
                    ? "linear-gradient(180deg, #fb6a2c, #d9440a)"
                    : "linear-gradient(180deg, var(--bar-from), var(--bar-to))",
                }}
                initial={false}
                animate={{ height: `${height}%` }}
                transition={{ duration: 1.6, ease: [0.45, 0, 0.55, 1] }}
              />
            </div>
          )
        })}
      </div>
      <div aria-hidden className="flex gap-1.5">
        {days.map((day, i) => (
          <span
            key={day}
            className={cn("flex-1 text-center font-mono text-[8.5px] font-medium", i === 5 ? "text-brand-icon" : "text-subtle")}
          >
            {day}
          </span>
        ))}
      </div>
    </div>
  )
}

const tones = {
  success: { c: grad.green, bg: "var(--success-soft)", fg: "var(--success-text)" },
  warning: { c: grad.amber, bg: "var(--warning-soft)", fg: "var(--warning-text)" },
  info: { c: grad.violet, bg: "var(--info-soft)", fg: "var(--info-text)" },
}
const logs: { who: string; status: string; tone: keyof typeof tones; what: string; time: string; Icon: LucideIcon }[] = [
  { who: "Rina Aulia", status: "Check-in", tone: "success", what: "Paket Gold 12 Bulan · wajah 96%", time: "07.30", Icon: LogIn },
  { who: "INV-2610-0142", status: "Lunas", tone: "success", what: "Paket Silver 3 Bulan · Rp 450.000", time: "07.42", Icon: Receipt },
  { who: "Coach Dimas", status: "Menunggu", tone: "warning", what: "Potong sesi PT · sisa 7 sesi", time: "08.05", Icon: Dumbbell },
  { who: "Sari Wulandari", status: "Freeze", tone: "info", what: "Paket Silver dibekukan 14 hari", time: "08.20", Icon: Snowflake },
  { who: "Bagas Pratama", status: "Sebagian", tone: "warning", what: "Dibayar Rp 250.000 · sisa Rp 200.000", time: "08.41", Icon: Wallet },
]
const slotY: Record<number, number> = { [-2]: -66, [-1]: -36, 0: 0, 1: 36, 2: 66 }

export function ActivityFeed() {
  const active = useTick() % logs.length

  return (
    <div className="absolute inset-0 overflow-hidden">
      {logs.map((log, i) => {
        let rel = i - active
        if (rel > 2) rel -= logs.length
        if (rel < -2) rel += logs.length
        const distance = Math.abs(rel)
        const isActive = rel === 0
        const tone = tones[log.tone]
        return (
          <div
            key={log.who}
            className="absolute inset-x-2.5 top-[calc(50%-8px)] -translate-y-1/2"
            style={{ zIndex: isActive ? 30 : distance === 1 ? 20 : 10 }}
          >
            <motion.div
              initial={false}
              animate={{
                y: slotY[rel],
                scale: isActive ? 1 : distance === 1 ? 0.93 : 0.86,
                opacity: isActive ? 1 : distance === 1 ? 0.7 : 0.4,
              }}
              transition={{ y: spring, scale: spring, opacity: { duration: 0.3 } }}
              className={cn(
                "flex items-center gap-2.5 rounded-2xl border border-line",
                isActive
                  ? "bg-card px-3 py-2.5 shadow-[0_6px_14px_-6px_rgba(0,0,0,0.16)]"
                  : "bg-chip px-2.5 py-1.5"
              )}
            >
              <span
                className={cn(
                  "inline-flex shrink-0 items-center justify-center border",
                  isActive ? "size-8 rounded-[9px]" : "size-[22px] rounded-[7px]"
                )}
                style={raised(tone.c)}
              >
                <log.Icon className={isActive ? "size-[15px]" : "size-[11px]"} strokeWidth={2.2} aria-hidden />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex min-w-0 items-center gap-1.5">
                  <span
                    className={cn(
                      "truncate font-mono font-semibold text-foreground",
                      isActive ? "text-[11px]" : "text-[10px]"
                    )}
                  >
                    {log.who}
                  </span>
                  <span
                    className={cn(
                      "shrink-0 rounded-[5px] px-[5px] py-px font-mono font-semibold tracking-[0.04em] uppercase",
                      isActive ? "text-[8.5px]" : "text-[7.5px]"
                    )}
                    style={{ background: tone.bg, color: tone.fg }}
                  >
                    {log.status}
                  </span>
                </div>
                {isActive && <p className="mt-[3px] truncate text-[10.5px] text-muted-foreground">{log.what}</p>}
              </div>
              {isActive && <span className="shrink-0 font-mono text-[10px] text-subtle">{log.time}</span>}
            </motion.div>
          </div>
        )
      })}
      <div aria-hidden className="absolute inset-x-0 bottom-2 flex justify-center gap-1">
        {logs.map((log, i) => (
          <motion.span
            key={log.who}
            className="block h-[3px] rounded-[3px] bg-foreground"
            animate={{ width: i === active ? 14 : 4, opacity: i === active ? 0.6 : 0.18 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          />
        ))}
      </div>
    </div>
  )
}

// Landmarks in the 560×700 face photo's own pixels, so the overlay lines up at any size.
const faceLandmarks: Record<string, [number, number]> = {
  b1: [177, 275], b2: [220, 262], b3: [265, 272], b4: [325, 270], b5: [360, 260], b6: [400, 272],
  e1: [195, 305], e2: [225, 305], e3: [255, 310], e4: [327, 310], e5: [355, 307], e6: [387, 305],
  n0: [295, 310], n1: [297, 377], n2: [280, 392], n3: [315, 394],
  m1: [242, 455], m2: [292, 436], m3: [340, 455], m4: [292, 472],
  c0: [297, 535], j1: [167, 420], j2: [210, 505], j3: [370, 505], j4: [400, 415],
  k1: [195, 360], k2: [385, 360], f0: [295, 220],
}
const faceMesh = (
  "f0-b2 f0-b3 f0-b4 f0-b5 b1-b2 b2-b3 b4-b5 b5-b6 b3-n0 n0-b4 b2-e2 b5-e5 e1-e2 e2-e3 e4-e5 e5-e6 e3-n0 n0-e4 " +
  "n0-n1 n1-n2 n1-n3 n2-m2 n3-m2 m1-m2 m2-m3 m3-m4 m4-m1 m4-c0 e1-k1 k1-j1 k1-n2 k1-m1 e6-k2 k2-j4 k2-n3 k2-m3 " +
  "j1-j2 j2-c0 c0-j3 j3-j4 m1-j2 m3-j3 b1-e1 b6-e6"
)
  .split(" ")
  .map((edge) => edge.split("-").map((key) => faceLandmarks[key]))

// The camera view is dark in both themes, so its result card keeps fixed light colours.
export function FaceScan() {
  const step = useTick() % 4
  const matched = step >= 2

  return (
    <>
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.06)_0.9px,transparent_1.2px)] bg-size-[14px_14px]"
      />
      <p className="absolute top-3 left-3 z-[3] inline-flex h-6 items-center gap-1.5 rounded-full bg-white/8 px-2.5 text-[10.5px] font-medium text-[#e5e5e5] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)]">
        <span className="size-1.5 rounded-full bg-[#00bc7d]" />
        Face Recognition
      </p>
      <div aria-hidden className="absolute top-3 right-3 z-[3] inline-flex gap-0.5 rounded-[9px] bg-white/8 p-[3px]">
        <span className="rounded-md px-[9px] py-[3px] text-[10.5px] font-medium text-[#a1a1a1]">QR code</span>
        <span className="rounded-md bg-white px-[9px] py-[3px] text-[10.5px] font-semibold text-[#0a0a0a]">Wajah</span>
      </div>
      <div
        aria-hidden
        className="absolute top-3.5 left-1/2 z-0 h-[210px] w-[196px] -translate-x-1/2 overflow-hidden rounded-[50%] blur-[20px] transition-opacity duration-500 md:top-[17px] md:h-[230px] md:w-[214px]"
        style={{ opacity: matched ? 0.55 : 0.4 }}
      >
        <motion.div
          className="absolute top-1/2 left-1/2 -mt-[210px] -ml-[210px] size-[420px] bg-[conic-gradient(from_0deg,#ff9a85,#ffe08a,#9af5d5,#8fb8ff,#d4a8ff,#ff9a85)]"
          animate={{ rotate: 360 }}
          transition={{ duration: 5.7, repeat: Infinity, ease: "linear" }}
        />
      </div>
      <div
        aria-hidden
        className="absolute top-3.5 left-1/2 z-[1] h-[210px] w-[196px] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(ellipse_at_50%_50%,#0d0d0f_50%,rgba(13,13,15,0)_72%)] md:top-[17px] md:h-[230px] md:w-[214px]"
      />
      <div className="absolute top-[11px] left-1/2 z-[2] h-[238px] w-[190px] -translate-x-1/2 md:top-3.5 md:h-[260px] md:w-[208px]">
        <Image
          src="/images/face-rina.webp"
          alt="Wajah member yang sedang dipindai saat check-in"
          width={560}
          height={700}
          sizes="208px"
          className="block size-full"
        />
        <svg aria-hidden width="100%" height="100%" viewBox="0 0 560 700" fill="none" className="absolute inset-0 overflow-visible">
          <defs>
            <linearGradient id="face-scan-line" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#ff8a4c" stopOpacity="0" />
              <stop offset="0.5" stopColor="#ff8a4c" stopOpacity="1" />
              <stop offset="1" stopColor="#ff8a4c" stopOpacity="0" />
            </linearGradient>
            <pattern id="face-grid" width="14" height="14" patternUnits="userSpaceOnUse">
              <path d="M14 0H0V14" stroke="#ffffff" strokeOpacity={0.22} strokeWidth={1.4} />
            </pattern>
            <clipPath id="face-clip">
              <ellipse cx="292" cy="390" rx="138" ry="182" />
            </clipPath>
          </defs>
          <rect
            width="560"
            height="700"
            fill="url(#face-grid)"
            clipPath="url(#face-clip)"
            className="transition-opacity duration-500"
            style={{ opacity: matched ? 0.35 : 1 }}
          />
          {/* Mesh lines draw in while the face is scanned, then stay dimmed once it matches. */}
          <g
            stroke="#ffffff"
            strokeOpacity={0.6}
            strokeWidth={1.8}
            strokeLinecap="round"
            style={{
              strokeDasharray: "100 100",
              strokeDashoffset: step === 0 ? 100 : 0,
              opacity: matched ? 0.55 : 1,
              transition:
                step === 0 ? "none" : "stroke-dashoffset 1.6s cubic-bezier(0.65, 0, 0.35, 1), opacity 0.4s ease",
            }}
          >
            {faceMesh.map(([[x1, y1], [x2, y2]]) => (
              <path key={`${x1}-${y1}-${x2}-${y2}`} d={`M${x1} ${y1}L${x2} ${y2}`} pathLength={100} />
            ))}
          </g>
          <g
            fill="#ffffff"
            className="transition-opacity duration-900"
            style={{ opacity: step === 0 ? 0.55 : matched ? 0.7 : 1 }}
          >
            {Object.values(faceLandmarks).map(([cx, cy]) => (
              <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={4.5} />
            ))}
          </g>
          <path
            d="M165 280V235H210M380 235H425V280M425 500V545H380M210 545H165V500"
            strokeWidth={6}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-[stroke] duration-300"
            stroke={matched ? "#00d492" : "#ff8a4c"}
          />
          <motion.g
            initial={false}
            animate={{ y: step === 0 ? 540 : 232, opacity: matched ? 0 : 1 }}
            transition={{ y: { duration: 1.9, ease: "linear" }, opacity: { duration: 0.3 } }}
          >
            <rect x="150" y="0" width="290" height="5" rx="2.5" fill="url(#face-scan-line)" />
          </motion.g>
        </svg>
      </div>
      <motion.p
        aria-hidden
        className="absolute bottom-[18px] left-1/2 z-[4] inline-flex h-[26px] -translate-x-1/2 items-center gap-1.5 rounded-full bg-white/10 px-3 font-mono text-[10.5px] whitespace-nowrap text-[#e5e5e5]"
        animate={{ opacity: matched ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <span className="size-1.5 rounded-full bg-[#ff8a4c]" />
        Memindai wajah
      </motion.p>
      <motion.div
        className="absolute inset-x-3 bottom-3 z-[4] flex items-center gap-2.5 rounded-xl bg-white px-3 py-2.5 text-[#0a0a0a] shadow-[0_10px_24px_-8px_rgba(0,0,0,0.5)]"
        initial={false}
        animate={{ opacity: matched ? 1 : 0, y: matched ? 0 : 10 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="inline-flex size-[34px] shrink-0 items-center justify-center rounded-full bg-[#f54a0024] text-xs font-semibold text-[#ca3500]">
          RA
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[13px] font-semibold">Rina Aulia</p>
          <p className="truncate text-[11px] text-[#737373]">Paket Gold 12 Bulan · check-in 07.30</p>
        </div>
        <span className="inline-flex h-[22px] shrink-0 items-center rounded-full bg-[#00bc7d1a] px-2 font-mono text-[10.5px] font-semibold text-[#004f3b]">
          Cocok 96%
        </span>
      </motion.div>
    </>
  )
}

const cart: { name: string; meta: string; price: string; Icon: LucideIcon }[] = [
  { name: "PT Program 6 Sesi", meta: "Coach Tirta", price: "Rp 900.000", Icon: Dumbbell },
  { name: "Yoga", meta: "Kelas 1 hari", price: "Rp 100.000", Icon: Calendar },
  { name: "Sarung Tangan Fitness L", meta: "1 pcs", price: "Rp 98.000", Icon: Package },
  { name: "Vitamin G", meta: "1 pcs", price: "Rp 66.500", Icon: Package },
]
const payMethods: { text: string; Icon: LucideIcon }[] = [
  { text: "Tunai", Icon: Banknote },
  { text: "Transfer", Icon: CreditCard },
  { text: "Pembayaran online", Icon: Zap },
]

export function CashierCart() {
  const tick = useTick()
  const cartOn = tick % cart.length
  const payOn = Math.floor(tick / 2) % payMethods.length

  return (
    <div className="absolute inset-0 flex gap-3.5 px-3.5 py-3">
      <div className="flex min-w-0 flex-1 flex-col">
        <div className={cn(label, "mb-1.5 flex items-center justify-between gap-2")}>
          <span>Keranjang · 4 item</span>
          <span className="whitespace-nowrap">Gym Cab. Surabaya</span>
        </div>
        <ul className="flex flex-col gap-[3px]">
          {cart.map((item, i) => (
            <li
              key={item.name}
              className={cn(
                "flex h-7 items-center gap-2 rounded-[9px] px-1.5 transition-all duration-300",
                i === cartOn ? "bg-card shadow-[0_0_0_1px_var(--line),0_1px_3px_rgba(0,0,0,0.06)]" : "bg-transparent"
              )}
            >
              <span
                className="inline-flex size-[22px] shrink-0 items-center justify-center rounded-[7px] border transition-all duration-300"
                style={i === cartOn ? raised(grad.orange) : flat}
              >
                <item.Icon className="size-3" strokeWidth={2.2} aria-hidden />
              </span>
              <span className="min-w-0 flex-1 truncate text-[11px]">
                <span className="font-semibold text-foreground">{item.name}</span>{" "}
                <span className="text-subtle">· {item.meta}</span>
              </span>
              <span className="shrink-0 font-mono text-[10.5px] font-semibold">{item.price}</span>
            </li>
          ))}
        </ul>
        <div className="mt-auto flex items-center justify-between gap-2 border-t border-dashed border-line pt-2">
          <span className="text-[10.5px] whitespace-nowrap text-muted-foreground">
            Poin loyalitas <span className="font-mono font-semibold text-success-text">−Rp 20.000</span>
          </span>
          <span className="font-mono text-xs font-bold whitespace-nowrap">Rp 1.144.500</span>
        </div>
      </div>
      <div className="hidden shrink-0 gap-3.5 md:flex">
        <div className="w-px bg-line" />
        <div className="flex w-[178px] flex-col gap-1.5">
          <span className={label}>Metode bayar</span>
          {payMethods.map((method, i) => (
            <div
              key={method.text}
              className={cn(
                "flex h-[30px] items-center gap-2 rounded-[9px] px-2.5 transition-all duration-300",
                i === payOn
                  ? "bg-[#fff7ed] text-[#9a2d00] shadow-[0_0_0_1.5px_#f54a00] dark:bg-brand-soft dark:text-[#ff8a4c]"
                  : "bg-card text-body-strong shadow-[0_0_0_1px_var(--line)]"
              )}
            >
              <method.Icon className="size-3.5" aria-hidden />
              <span className="min-w-0 flex-1 text-[11px] font-medium whitespace-nowrap">{method.text}</span>
              {i === payOn && <Check className="size-3 text-brand" strokeWidth={3} aria-hidden />}
            </div>
          ))}
          <span className="mt-auto flex h-[34px] items-center justify-center rounded-[10px] bg-linear-to-b from-[#d9440a] to-[#ca3500] text-[11.5px] font-semibold text-primary-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_2px_6px_rgba(202,53,0,0.25)]">
            Bayar Rp 1.144.500
          </span>
        </div>
      </div>
    </div>
  )
}

const dayNames = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"]
const classPool = [
  { time: "06.30", name: "Spinning", coach: "Coach Bagas", booked: 14, quota: 18 },
  { time: "07.00", name: "Yoga", coach: "Coach Tirta", booked: 12, quota: 15 },
  { time: "08.30", name: "Pilates", coach: "Coach Sari", booked: 8, quota: 12 },
  { time: "17.30", name: "HIIT", coach: "Coach Dimas", booked: 18, quota: 20 },
  { time: "18.30", name: "Zumba", coach: "Coach Sari", booked: 19, quota: 20 },
  { time: "19.30", name: "Body Combat", coach: "Coach Dimas", booked: 9, quota: 16 },
]

export function ClassSchedule() {
  const dayOn = Math.floor(useTick() / 2) % 7
  const classes = [dayOn % 6, (dayOn + 2) % 6, (dayOn + 4) % 6]
    .sort((a, b) => a - b)
    .map((index, j) => {
      const item = classPool[index]
      const booked = Math.max(1, Math.min(item.quota, item.booked + ((dayOn * 3 + j) % 5) - 2))
      return { ...item, booked, full: booked >= item.quota }
    })

  return (
    <div className="absolute inset-0 flex flex-col gap-2 p-3">
      <div aria-hidden className="flex gap-1">
        {dayNames.map((day, i) => (
          <div
            key={day}
            className={cn(
              "flex h-10 min-w-0 flex-1 flex-col items-center justify-center gap-px rounded-[10px] transition-all duration-300",
              i === dayOn
                ? "bg-foreground text-background shadow-[0_3px_8px_-2px_rgba(0,0,0,0.3)]"
                : "bg-card text-body-strong shadow-[0_0_0_1px_var(--line)]"
            )}
          >
            <span className="font-mono text-[8px] tracking-[0.06em] uppercase">{day}</span>
            <span className="text-xs font-semibold">{12 + i}</span>
          </div>
        ))}
      </div>
      <ul className="flex flex-col gap-[5px]">
        {classes.map((item) => (
          <li
            key={item.name}
            className="flex h-[34px] items-center gap-2.5 rounded-[10px] bg-card px-2.5 shadow-[0_0_0_1px_var(--line)]"
          >
            <span className="w-[34px] shrink-0 font-mono text-[10.5px] font-semibold">{item.time}</span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[11px] font-semibold">{item.name}</p>
              <p className="truncate text-[9.5px] text-subtle">{item.coach}</p>
            </div>
            <div className="flex w-14 shrink-0 flex-col items-end gap-[3px]">
              <span className={cn("font-mono text-[9.5px] font-medium", item.full ? "text-warning-text" : "text-body-strong")}>
                {item.full ? "Penuh" : `${item.booked}/${item.quota}`}
              </span>
              <span className="block h-1 w-14 overflow-hidden rounded bg-line">
                <motion.span
                  className={cn("block h-full rounded", item.full ? "bg-[#f0b100]" : "bg-linear-to-r from-[#ff7a33] to-brand")}
                  initial={false}
                  animate={{ width: `${Math.round((item.booked / item.quota) * 100)}%` }}
                  transition={{ duration: 0.6 }}
                />
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

const selfOrderCaptions = [
  "Member pesan paket dari aplikasi",
  "Voucher & poin dipakai",
  "Dibayar online · Rp 2.700.000",
  "Order masuk ke kasir klub",
  "Paket aktif di aplikasi member",
  "Paket aktif di aplikasi member",
]

// Order in the member app, pay online, then the order lands in the POS and the package turns active.
export function SelfOrderFlow() {
  const step = useTick() % 6
  const nodes: { key: string; x: number; y: number; text: string; Icon: LucideIcon; c: readonly string[]; on: boolean }[] = [
    { key: "app", x: 40, y: 98, text: "APP", Icon: Smartphone, c: grad.blue, on: step <= 1 },
    { key: "pay", x: 150, y: 98, text: "BAYAR", Icon: Zap, c: grad.orange, on: step === 2 },
    { key: "pos", x: 272, y: 42, text: "KASIR", Icon: Receipt, c: grad.green, on: step >= 3 },
    { key: "pkg", x: 272, y: 154, text: "AKTIF", Icon: Ticket, c: grad.violet, on: step >= 4 },
  ]
  const paths = [
    { d: "M68 98H122", color: "#f26a1b", drawn: step >= 2 },
    { d: "M150 70V42H244", color: "#0e9f6e", drawn: step >= 3 },
    { d: "M150 126V154H244", color: "#7c3aed", drawn: step >= 4 },
  ]

  return (
    <>
      <div aria-hidden className={dotGrid} />
      <p className="absolute top-2.5 left-2.5 z-[2] inline-flex h-[22px] items-center gap-1.5 rounded-full bg-card px-2 font-mono text-[9.5px] whitespace-nowrap text-body-strong shadow-[0_0_0_1px_var(--line)]">
        <span className="size-1.5 rounded-full bg-brand" />
        {selfOrderCaptions[step]}
      </p>
      <div aria-hidden className="absolute top-1/2 left-1/2 -mt-[92px] -ml-[160px] h-[196px] w-[320px]">
        <svg width="320" height="196" viewBox="0 0 320 196" fill="none" className="absolute inset-0 overflow-visible">
          {paths.map((path) => (
            <path key={path.d} d={path.d} strokeWidth={1} className="stroke-(--stroke)" />
          ))}
          {paths.map((path) =>
            [4, 1.6].map((width) => (
              <motion.path
                key={`${path.d}-${width}`}
                d={path.d}
                stroke={path.color}
                strokeWidth={width}
                strokeOpacity={width === 4 ? 0.18 : 0.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={false}
                animate={{ pathLength: path.drawn ? 1 : 0 }}
                transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
              />
            ))
          )}
          {paths.map((path) => (
            <path
              key={`${path.d}-flow`}
              d={path.d}
              stroke={path.color}
              strokeWidth={2.2}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="6 8"
              className={cn(flowDash, path.drawn ? "opacity-100" : "opacity-0")}
            />
          ))}
        </svg>
        {nodes.map(({ key, x, y, text, Icon, c, on }) => (
          <motion.div
            key={key}
            className="absolute -mt-7 -ml-7 flex size-14 flex-col items-center justify-center gap-[3px] rounded-[15px] border transition-[color,border-color,box-shadow] duration-300"
            style={{ left: x, top: y, ...(on ? raised(c) : flat) }}
            animate={{ scale: on ? 1.06 : 1 }}
            transition={{ duration: 0.35 }}
          >
            <Icon className="size-[18px]" />
            <span className="font-mono text-[7.5px] font-bold tracking-[0.06em]">{text}</span>
          </motion.div>
        ))}
        {[
          { text: "Voucher", y: 78 },
          { text: "Poin", y: 118 },
        ].map((chip) => (
          <motion.span
            key={chip.text}
            className="absolute left-[95px] inline-flex h-4 items-center rounded-full bg-brand-soft px-1.5 font-mono text-[8px] font-semibold whitespace-nowrap text-link"
            style={{ top: chip.y, x: "-50%", y: "-50%" }}
            initial={false}
            animate={{ opacity: step >= 1 ? 1 : 0, scale: step >= 1 ? 1 : 0.8 }}
            transition={{ duration: 0.35 }}
          >
            {chip.text}
          </motion.span>
        ))}
      </div>
    </>
  )
}

const coachCaptions = [
  "Coach Dimas siap menerima klien",
  "Rina di-assign ke Coach Dimas",
  "Sesi PT 1:1 dengan Rina",
  "Sesi bersama 3 member sekaligus",
  "Sesi tercatat · sisa sesi dipotong",
  "Sesi tercatat · sisa sesi dipotong",
]
const sessionMembers = [
  { initials: "RA", name: "Rina Aulia", sessions: 7, from: 1, y: 24, c: grad.blue, line: "#2f6fe4", to: "M66 80C104 80 112 24 142 24", out: "M178 24C216 24 226 80 254 80" },
  { initials: "BP", name: "Bagas Pratama", sessions: 4, from: 3, y: 80, c: grad.violet, line: "#7c3aed", to: "M66 80H142", out: "M178 80H254" },
  { initials: "SW", name: "Sari Wulandari", sessions: 10, from: 3, y: 136, c: grad.amber, line: "#e08a00", to: "M66 80C104 80 112 136 142 136", out: "M178 136C216 136 226 80 254 80" },
]

// Assign a member, run a 1:1 session, then one session for three members, then record it.
export function CoachSessions() {
  const step = useTick() % 6
  const recorded = step >= 4
  const flows = sessionMembers.flatMap((member) => [
    { d: member.to, color: member.line, drawn: step >= member.from },
    { d: member.out, color: "#0e9f6e", drawn: recorded },
  ])
  const tile = (x: number, y: number, size: number, round: boolean, isOn: boolean, c: readonly string[]) => ({
    left: x,
    top: y,
    width: size,
    height: size,
    marginLeft: -size / 2,
    marginTop: -size / 2,
    borderRadius: round ? 999 : 14,
    ...(isOn ? raised(c) : flat),
  })

  return (
    <div className="absolute inset-0 flex">
      <div className="relative min-w-0 flex-1">
        <div aria-hidden className={dotGrid} />
        <div aria-hidden className="absolute top-3 left-1/2 -ml-[160px] h-[160px] w-[320px]">
          <svg width="320" height="160" viewBox="0 0 320 160" fill="none" className="absolute inset-0 overflow-visible">
            {flows.map((flow) => (
              <path key={flow.d} d={flow.d} strokeWidth={1} className="stroke-(--stroke)" />
            ))}
            {flows.map((flow) =>
              [4, 1.6].map((width) => (
                <motion.path
                  key={`${flow.d}-${width}`}
                  d={flow.d}
                  stroke={flow.color}
                  strokeWidth={width}
                  strokeOpacity={width === 4 ? 0.18 : 1}
                  strokeLinecap="round"
                  initial={false}
                  animate={{ pathLength: flow.drawn ? 1 : 0 }}
                  transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
                />
              ))
            )}
          </svg>
          <motion.div
            className="absolute flex flex-col items-center justify-center gap-0.5 border transition-[color,border-color,box-shadow] duration-300"
            style={tile(40, 80, 52, false, step <= 3, grad.orange)}
            animate={{ scale: step <= 3 ? 1.06 : 1 }}
          >
            <Dumbbell className="size-[17px]" />
            <span className="font-mono text-[7px] font-bold tracking-[0.06em]">COACH</span>
          </motion.div>
          <span className="absolute top-[113px] left-10 inline-flex h-[18px] -translate-x-1/2 items-center rounded-full bg-card px-1.5 font-mono text-[8.5px] whitespace-nowrap text-body-strong shadow-[0_0_0_1px_var(--line)]">
            {step === 0 ? "8/10" : "9/10"} klien
          </span>
          {sessionMembers.map((member) => (
            <motion.div
              key={member.initials}
              className="absolute flex items-center justify-center border text-[10.5px] font-bold transition-[color,border-color,box-shadow] duration-300"
              style={tile(160, member.y, 36, true, step >= member.from, member.c)}
              animate={{ scale: step >= member.from ? 1.06 : 1 }}
            >
              {member.initials}
            </motion.div>
          ))}
          <motion.div
            className="absolute flex flex-col items-center justify-center gap-0.5 border transition-[color,border-color,box-shadow] duration-300"
            style={tile(280, 80, 52, false, recorded, grad.green)}
            animate={{ scale: recorded ? 1.06 : 1 }}
          >
            <CircleCheck className="size-[17px]" />
            <span className="font-mono text-[7px] font-bold tracking-[0.04em]">TERCATAT</span>
          </motion.div>
        </div>
        <p className="absolute bottom-2.5 left-1/2 inline-flex h-[22px] -translate-x-1/2 items-center gap-1.5 rounded-full bg-card px-2 font-mono text-[9.5px] whitespace-nowrap text-body-strong shadow-[0_0_0_1px_var(--line)]">
          <span className="size-1.5 rounded-full bg-brand" />
          {coachCaptions[step]}
        </p>
      </div>
      <div className="hidden shrink-0 md:flex">
        <div className="w-px bg-line" />
        <div className="flex w-[196px] flex-col gap-1.5 px-3.5 py-3">
          <span className={label}>Peserta sesi</span>
          <ul className="flex flex-col gap-1.5">
            {sessionMembers.map((member) => {
              const inSession = step >= member.from
              return (
                <li
                  key={member.initials}
                  className={cn(
                    "flex h-[30px] items-center gap-2 rounded-[9px] px-2 transition-all duration-300",
                    inSession ? "bg-card opacity-100 shadow-[0_0_0_1px_var(--line)]" : "bg-transparent opacity-45"
                  )}
                >
                  <span
                    className="inline-flex size-5 shrink-0 items-center justify-center rounded-full border text-[8px] font-bold transition-all duration-300"
                    style={inSession ? raised(member.c) : flat}
                  >
                    {member.initials}
                  </span>
                  <span className="min-w-0 flex-1 truncate text-[11px] font-semibold">{member.name}</span>
                  <span className={cn("shrink-0 font-mono text-[9.5px]", recorded ? "text-success-text" : "text-subtle")}>
                    sisa {recorded ? member.sessions - 1 : member.sessions}
                  </span>
                </li>
              )
            })}
          </ul>
          <div className="mt-auto">
            <div className="flex justify-between font-mono text-[9px] tracking-[0.08em] text-subtle uppercase">
              <span>Klien coach</span>
              <span className="font-semibold text-foreground">{step === 0 ? "8/10" : "9/10"}</span>
            </div>
            <div className="mt-[5px] h-[5px] overflow-hidden rounded-[5px] bg-line">
              <motion.div
                className="h-full rounded-[5px] bg-linear-to-r from-[#ff7a33] to-brand"
                initial={false}
                animate={{ width: step === 0 ? "80%" : "90%" }}
                transition={{ duration: 0.6 }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const branches = [
  { name: "Iron Fitness Surabaya", count: "248", pct: 83 },
  { name: "Iron Fitness Sidoarjo", count: "176", pct: 59 },
  { name: "Iron Fitness Malang", count: "92", pct: 31 },
]
const reports = [
  { format: "PDF", name: "Laporan Keuangan · Okt 2026" },
  { format: "EXCEL", name: "Penjualan · Okt 2026" },
  { format: "CSV", name: "Pembayaran · Sep 2026" },
  { format: "PDF", name: "Laba Rugi · Q3 2026" },
  { format: "EXCEL", name: "Diskon, Pajak, Refund · Okt 2026" },
  { format: "CSV", name: "Penjualan per Paket · Okt 2026" },
]
const formatTone: Record<string, string> = {
  PDF: "bg-danger-soft text-danger-text",
  EXCEL: "bg-success-soft text-success-text",
  CSV: "bg-info-soft text-info-text",
}
const exportedAgo = ["baru saja", "2 mnt lalu", "5 mnt lalu"]

export function BranchReports() {
  const tick = useTick()
  const branchOn = tick % branches.length

  return (
    <div className="absolute inset-0 flex gap-4 px-3.5 py-3">
      <div className="flex min-w-0 flex-1 flex-col">
        <span className={cn(label, "mb-2.5")}>Cabang · member aktif</span>
        <ul className="flex flex-col gap-2.5">
          {branches.map((branch, i) => {
            const isActive = i === branchOn
            return (
              <li key={branch.name} className="flex items-center gap-2.5">
                <motion.span
                  className="inline-flex size-[34px] shrink-0 items-center justify-center rounded-[11px] border transition-[color,border-color,box-shadow] duration-300"
                  style={isActive ? raised(grad.orange) : flat}
                  animate={{ scale: isActive ? 1.05 : 1 }}
                >
                  <Building className="size-[15px]" aria-hidden />
                </motion.span>
                <span
                  className={cn(
                    "w-[132px] shrink-0 truncate font-mono text-[10px] transition-colors",
                    isActive ? "font-semibold text-foreground" : "text-muted-foreground"
                  )}
                >
                  {branch.name}
                </span>
                <span className="relative h-1.5 min-w-6 flex-1 overflow-hidden rounded-md bg-line">
                  <motion.span
                    className="absolute inset-y-0 left-0 rounded-md bg-linear-to-r from-[#ff7a33] to-brand"
                    style={{ width: `${branch.pct}%` }}
                    animate={{ opacity: isActive ? 1 : 0.25 }}
                    transition={{ duration: 0.4 }}
                  />
                </span>
                <span
                  className={cn(
                    "w-7 shrink-0 text-right font-mono text-[10px] font-medium",
                    isActive ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {branch.count}
                </span>
              </li>
            )
          })}
        </ul>
        <div className="mt-auto flex items-center gap-2">
          <span className="relative inline-flex size-2 items-center justify-center">
            <motion.span
              className="absolute inset-0 rounded-full bg-[#00bc7d]"
              animate={{ scale: [1, 2.4], opacity: [0.45, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
            />
            <span className="relative size-1.5 rounded-full bg-[#00bc7d]" />
          </span>
          <span className="font-mono text-[9px] text-muted-foreground">Satu akun untuk semua cabang</span>
        </div>
      </div>
      <div className="hidden shrink-0 gap-4 md:flex">
        <div className="w-px bg-line" />
        <div className="flex w-[200px] flex-col gap-1.5">
          <span className={cn(label, "mb-1")}>Ekspor laporan</span>
          {[0, 1, 2].map((k) => {
            const sequence = tick - k
            const report = reports[((sequence % reports.length) + reports.length) % reports.length]
            return (
              <motion.div
                key={sequence}
                layout
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: [1, 0.7, 0.4][k], y: 0 }}
                transition={spring}
                className="rounded-[10px] border border-line bg-card px-[9px] py-[7px]"
              >
                <div className="mb-[3px] flex items-center justify-between gap-1.5">
                  <span
                    className={cn(
                      "rounded-[5px] px-[5px] py-0.5 font-mono text-[7.5px] font-semibold tracking-[0.04em]",
                      formatTone[report.format]
                    )}
                  >
                    {report.format}
                  </span>
                  <span className="font-mono text-[8px] text-subtle">{exportedAgo[k]}</span>
                </div>
                <p className="truncate font-mono text-[9px] text-foreground">{report.name}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
