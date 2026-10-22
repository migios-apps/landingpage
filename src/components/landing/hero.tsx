"use client"

import Image from "next/image"
import { motion } from "motion/react"
import {
  ArrowRight,
  Building,
  Calendar,
  Dumbbell,
  Receipt,
  ScanFace,
  ShoppingBag,
  Smartphone,
  Zap,
  type LucideIcon,
} from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { signUpHref } from "@/lib/site"
import { cn } from "@/lib/utils"

const roles: { label: string; Icon: LucideIcon }[] = [
  { label: "Owner", Icon: Building },
  { label: "Kasir", Icon: Receipt },
  { label: "Coach", Icon: Dumbbell },
  { label: "Member", Icon: Smartphone },
  { label: "Resepsionis", Icon: ScanFace },
]

// Two float phases, offset by half a cycle so neighbouring cards never move together.
const floatEase = { duration: 6.4, repeat: Infinity, ease: "easeInOut" } as const
const floatA = { y: [-10, 0, -10] }
const floatB = { y: [0, -10, 0] }

const floatingCard =
  "rounded-[18px] bg-card p-3.5 text-left shadow-[0_0_0_1px_var(--border),0_16px_36px_-10px_rgba(0,0,0,0.22)] dark:bg-[rgba(23,23,23,0.9)] dark:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1),0_18px_40px_-12px_rgba(0,0,0,0.7)] dark:backdrop-blur-[10px]"
const iconTile = "inline-flex size-9 shrink-0 items-center justify-center rounded-[11px]"
const paidBadge =
  "inline-flex h-[22px] shrink-0 items-center rounded-full bg-emerald-100 px-2 text-[11px] font-semibold text-emerald-700 ring-1 ring-emerald-300 ring-inset dark:bg-emerald-100/30 dark:text-emerald-300"
const cardMeta = "text-xs text-neutral-500 dark:text-neutral-400"

export function Hero({ trialDays }: { trialDays: number | null }) {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative overflow-hidden bg-background pb-10 md:pb-11 lg:pb-[47px]"
    >
      <div className="absolute inset-x-0 top-0 h-[760px] md:h-[900px] lg:h-[1078px]">
        {/* Light is the default theme, so its photo is the LCP image and loads eagerly;
            the dark one stays lazy and is only fetched once it is displayed. */}
        <Image
          src="/images/hero-gym-floor-full.webp"
          alt="Area latihan gym yang terang dengan treadmill, bangku, dan rak beban"
          fill
          quality={90}
          loading="eager"
          fetchPriority="high"
          sizes="100vw"
          className="object-cover dark:hidden"
        />
        <Image
          src="/images/hero-gym-floor-full-dark.webp"
          alt="Area latihan gym saat senja dengan treadmill, bangku, dan rak beban"
          fill
          quality={90}
          sizes="100vw"
          className="hidden object-cover dark:block"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(180deg,var(--hero-veil-1)_0px,var(--hero-veil-2)_240px,var(--hero-veil-3)_504px,var(--hero-veil-4)_650px)] md:bg-[linear-gradient(180deg,var(--hero-veil-1)_0px,var(--hero-veil-2)_250px,var(--hero-veil-3)_520px,var(--hero-veil-4)_690px)] lg:bg-[linear-gradient(180deg,var(--hero-veil-1)_0px,var(--hero-veil-2)_280px,var(--hero-veil-3)_539px,var(--hero-veil-4)_733px)]"
        />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 z-[2] h-[180px] bg-linear-to-b from-background/0 to-background"
        />
      </div>

      <div className="relative z-[6] flex flex-col items-center px-4 pt-24 text-center md:px-8 md:pt-[120px] lg:px-12 lg:pt-[136px]">
        <span className="inline-flex h-[34px] items-center gap-2 rounded-full bg-white/70 px-4 text-[13px] font-medium text-body-strong shadow-[inset_0_0_0_1px_var(--border)] backdrop-blur-[8px] dark:bg-white/[0.07] dark:text-white/86 dark:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.14)]">
          <span className="size-1.5 rounded-full bg-brand" aria-hidden />
          Software manajemen gym &amp; fitness
        </span>

        <h1
          id="hero-title"
          className="mt-6 max-w-[900px] text-[40px] leading-[1.03] font-[450] tracking-[-0.045em] text-balance md:mt-[26px] md:text-[56px] lg:mt-[30px] lg:text-[72px]"
        >
          Kelola gym kamu dari satu layar
        </h1>

        <p className="mt-[18px] max-w-[560px] text-base leading-normal text-pretty text-body md:mt-5 md:text-[17px] lg:mt-[22px] lg:text-lg dark:text-white/72">
          Membership, kasir, jadwal kelas, sesi PT, absensi wajah, sampai laporan keuangan, untuk satu klub atau
          banyak cabang.
        </p>

        <div className="mt-7 flex w-full flex-col items-center gap-3.5 md:mt-[34px] md:w-auto md:flex-row md:gap-7">
          <a
            href={signUpHref}
            className={cn(
              buttonVariants(),
              "h-[50px] w-full gap-2 rounded-full px-[26px] text-[15px] font-semibold shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_1px_2px_rgba(202,53,0,0.3),0_10px_30px_-12px_rgba(202,53,0,0.5)] hover:bg-[#b32f00] md:w-auto"
            )}
          >
            {trialDays ? `Coba Gratis ${trialDays} Hari` : "Coba Gratis"}
            <ArrowRight className="size-4" aria-hidden />
          </a>
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <span className="inline-flex items-center gap-1.5 text-xl font-semibold tracking-[-0.02em]">
              <Zap className="size-[18px] fill-brand" stroke="none" aria-hidden />
              Rp 0
            </span>
            <span className="mt-0.5 text-[12.5px] text-subtle dark:text-white/60">
              {trialDays ? `${trialDays} hari pertama, kasir termasuk` : "Kasir termasuk"}
            </span>
          </div>
        </div>
      </div>

      <div className="relative z-[3] mx-auto mt-9 w-[calc(100%-32px)] max-w-[1000px] md:mt-11 md:w-[calc(100%-96px)] lg:mt-[52px]">
        <div className="rounded-t-[6px] md:rounded-t-[16px] bg-white/85 px-1.5 pt-1.5 shadow-[inset_0_0_0_1px_var(--border)] [mask-image:linear-gradient(180deg,#000_85%,transparent_100%)] dark:bg-[rgba(23,23,23,0.92)]">
          <div className="overflow-hidden rounded-t-[4px] md:rounded-t-[16px]">
            <Image
              src="/images/dashboard.webp"
              alt="Dashboard Migios: pendapatan, member aktif, kunjungan, tren pendapatan, dan performa coach"
              width={2372}
              height={1354}
              quality={90}
              loading="eager"
              sizes="(min-width: 1096px) 988px, calc(100vw - 108px)"
              className="block h-auto w-full dark:hidden"
            />
            <Image
              src="/images/dashboard-dark.webp"
              alt="Dashboard Migios mode gelap: pendapatan, member aktif, kunjungan, tren pendapatan, dan performa coach"
              width={2646}
              height={1510}
              quality={90}
              sizes="(min-width: 1096px) 988px, calc(100vw - 108px)"
              className="hidden h-auto w-full dark:block"
            />
          </div>
        </div>

        <motion.div
          className="absolute top-[52px] -left-[108px] z-[5] hidden xl:block"
          animate={floatA}
          transition={floatEase}
        >
          <div className={cn(floatingCard, "w-[270px]")}>
            <div className="flex items-center gap-2.5">
              <span className={cn(iconTile, "bg-amber-500/10 text-amber-600 dark:bg-amber-400/10 dark:text-amber-400")}>
                <Calendar className="size-[17px]" aria-hidden />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-semibold">Kelas Yoga · 07.00</p>
                <p className={cardMeta}>Coach Tirta</p>
              </div>
              <span className="shrink-0 font-mono text-xs font-semibold">12/15</span>
            </div>
            <div className="mt-2.5 h-[5px] overflow-hidden rounded-[5px] bg-neutral-200 dark:bg-white/10">
              <div className="h-full w-4/5 rounded-[5px] bg-linear-to-r from-orange-500 to-brand" />
            </div>
          </div>
        </motion.div>

        <motion.div
          className="absolute z-[5] hidden md:top-[220px] md:-left-6 md:block xl:top-[212px] xl:-left-[124px]"
          animate={floatB}
          transition={floatEase}
        >
          <div className={cn(floatingCard, "w-[290px]")}>
            <div className="flex items-center gap-2.5">
              <span className="inline-flex size-[38px] shrink-0 items-center justify-center rounded-full bg-brand-soft text-[13px] font-semibold text-link dark:text-brand-icon">
                RA
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold">Rina Aulia</p>
                <p className={cardMeta}>Paket Gold 12 Bulan</p>
              </div>
              <span className="inline-flex h-[22px] shrink-0 items-center rounded-full bg-green-100 px-2 text-[11px] font-semibold text-green-700 ring-1 ring-green-300 ring-inset dark:bg-green-100/30 dark:text-green-300">
                Check-in
              </span>
            </div>
            <div className="mt-3 flex items-center justify-between gap-2 rounded-xl bg-neutral-100 px-2.5 py-2 text-xs text-neutral-700 dark:bg-white/[0.06] dark:text-neutral-300">
              <span className="inline-flex items-center gap-1.5">
                <ScanFace className="size-[15px] text-brand" aria-hidden />
                Wajah dikenali
              </span>
              <span className="font-mono font-semibold text-foreground">96% · 07.30</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="absolute z-[5] hidden md:top-10 md:-right-6 md:block xl:top-[50px] xl:-right-[112px]"
          animate={floatA}
          transition={floatEase}
        >
          <div className={cn(floatingCard, "w-[270px]")}>
            <div className="flex items-center gap-2.5">
              <span
                className={cn(iconTile, "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-400")}
              >
                <Receipt className="size-[17px]" aria-hidden />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-semibold">Pembayaran diterima</p>
                <p className="font-mono text-[11px] text-neutral-500 dark:text-neutral-400">INV-2610-0142</p>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between gap-2">
              <span className="text-[22px] font-[650] tracking-[-0.02em] tabular-nums">Rp 450.000</span>
              <span className={paidBadge}>Lunas</span>
            </div>
            <p className={cn(cardMeta, "mt-1")}>Paket Silver 3 Bulan · Pembayaran online</p>
          </div>
        </motion.div>

        <motion.div
          className="absolute top-[272px] -right-[136px] z-[5] hidden xl:block"
          animate={floatB}
          transition={floatEase}
        >
          <div className={cn(floatingCard, "w-[270px]")}>
            <div className="flex items-center gap-2.5">
              <span className={cn(iconTile, "bg-cyan-500/10 text-cyan-600 dark:bg-cyan-400/10 dark:text-cyan-400")}>
                <ShoppingBag className="size-[17px]" aria-hidden />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-semibold">Order dari aplikasi</p>
                <p className={cardMeta}>Voucher &amp; poin dipakai</p>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between gap-2">
              <span className="text-lg font-[650] tracking-[-0.02em] tabular-nums">Rp 2.700.000</span>
              <span className={paidBadge}>Dibayar online</span>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="relative z-[6] mx-auto mt-5 flex max-w-[1440px] flex-col items-center gap-4 px-4 text-center md:gap-[18px] md:px-8 lg:flex-row lg:justify-between lg:gap-10 lg:px-12 lg:text-left">
        <p className="text-base leading-[1.35] whitespace-pre-line text-body-strong dark:text-white/86">
          {"Satu aplikasi untuk\nseluruh tim klub"}
        </p>
        <ul className="flex flex-wrap items-center justify-center gap-x-[22px] gap-y-3.5 text-[15px] font-semibold tracking-[-0.01em] text-body md:flex-nowrap md:gap-8 md:text-base lg:gap-[52px] lg:text-[17px] dark:text-white/78">
          {roles.map(({ label, Icon }) => (
            <li key={label} className="inline-flex items-center gap-[9px]">
              <Icon className="size-[18px] md:size-5" aria-hidden />
              {label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
