"use client"

import { useState } from "react"
import { Building, Calendar, Check, Dumbbell, Minus, User, Users, type LucideIcon } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { planCapacity, planFeatures, planPrices, signUpHref } from "@/lib/site"
import { cn } from "@/lib/utils"

const periods = ["Bulanan", "6 Bulan", "Tahunan"]
const periodMonths = [1, 6, 12]
const periodSuffix = ["/ bulan", "/ 6 bulan", "/ tahun"]
const addonPeriod = ["Harga per bulan", "Harga per 6 bulan", "Harga per tahun"]

// Add-on prices per period (subscription_addon_prices).
const addons: { name: string; unit: string; Icon: LucideIcon; prices: number[] }[] = [
  { name: "Member pack", unit: "per 100 member", Icon: Users, prices: [100000, 550000, 1000000] },
  { name: "Staf tambahan", unit: "per 1 orang", Icon: User, prices: [50000, 275000, 500000] },
  { name: "Akun Coach tambahan", unit: "per 1 coach", Icon: Dumbbell, prices: [75000, 412500, 750000] },
  { name: "Kelas tambahan", unit: "per 10 kelas", Icon: Calendar, prices: [30000, 165000, 300000] },
  { name: "Cabang tambahan", unit: "per 1 cabang", Icon: Building, prices: [249000, 1369000, 2490000] },
]

const rupiah = (value: number) => `Rp ${String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`

// The landing page shows this title as an h2; /harga promotes it to the page h1.
export function Pricing({ titleAs: Title = "h2" }: { titleAs?: "h1" | "h2" }) {
  const [period, setPeriod] = useState(0)

  const note = (prices: readonly number[]) =>
    period === 0
      ? "Ditagih setiap bulan"
      : `Setara ${rupiah(Math.round(prices[period] / periodMonths[period]))} per bulan · hemat ${rupiah(prices[0] * periodMonths[period] - prices[period])}`

  const plans = [
    {
      name: "Free",
      description: "Pintu masuk untuk gym kecil yang baru mulai",
      price: "Rp 0",
      suffix: "/ 30 hari",
      note: "Masa trial, tanpa biaya",
      cta: "Coba Gratis",
      dark: false,
      capacity: planCapacity.map(({ label, values }) => [label, values[0] ?? "Tidak ada"]),
      free: true,
    },
    {
      name: "Basic",
      description: "Gym menengah dengan operasional harian penuh",
      price: rupiah(planPrices.basic[period]),
      suffix: periodSuffix[period],
      note: note(planPrices.basic),
      cta: "Pilih Basic",
      dark: true,
      capacity: planCapacity.map(({ label, values }) => [label, values[1] ?? "Tidak ada"]),
      free: false,
    },
    {
      name: "Pro",
      description: "Untuk bisnis membership yang berkembang dengan multi-cabang",
      price: rupiah(planPrices.pro[period]),
      suffix: periodSuffix[period],
      note: note(planPrices.pro),
      cta: "Pilih Pro",
      dark: false,
      capacity: planCapacity.map(({ label, values }) => [label, values[2] ?? "Tidak ada"]),
      free: false,
    },
  ]

  return (
    <section id="harga" aria-labelledby="harga-title" className="bg-background">
      <div className="mx-auto max-w-[1200px] px-4 py-16 md:px-8 md:py-[88px] lg:py-28">
        <div className="flex flex-col items-center text-center">
          <span className="text-sm font-semibold text-link">Harga</span>
          <Title
            id="harga-title"
            className="mt-3 max-w-[760px] text-[34px] leading-[1.05] font-[650] tracking-[-0.035em] text-balance md:text-[42px] lg:text-[52px]"
          >
            Mulai gratis, upgrade saat klub berkembang
          </Title>
          <p className="mt-4 max-w-[560px] text-[17px] leading-[1.55] text-pretty text-body">
            Semua paket sudah termasuk kasir. Bayar bulanan, per 6 bulan, atau tahunan.
          </p>

          <ToggleGroup
            aria-label="Periode pembayaran"
            value={[String(period)]}
            onValueChange={(value) => {
              if (value[0] !== undefined) setPeriod(Number(value[0]))
            }}
            spacing={1}
            className="mt-8 rounded-xl bg-chip p-1 shadow-[inset_0_0_0_1px_var(--line)]"
          >
            {periods.map((label, i) => (
              <ToggleGroupItem
                key={label}
                value={String(i)}
                className="h-9 rounded-[9px] px-2.5 text-[13px] font-semibold text-body hover:bg-transparent hover:text-foreground aria-pressed:bg-card aria-pressed:text-foreground aria-pressed:shadow-[0_1px_2px_rgba(0,0,0,0.1),0_0_0_1px_rgba(0,0,0,0.04)] md:px-4 md:text-sm"
              >
                {label}
                {i === 2 && (
                  <span className="ml-1.5 rounded-md bg-brand-soft px-1.5 py-0.5 text-[11px] font-semibold text-link">
                    Hemat 2 bulan
                  </span>
                )}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>

        <div className="mt-10 flex flex-wrap items-stretch gap-4">
          {plans.map((plan) => (
            <article
              key={plan.name}
              className={cn(
                "relative flex min-w-0 flex-[1_1_300px] flex-col overflow-hidden rounded-3xl p-[22px] md:p-7",
                plan.dark
                  ? "bg-[#0a0a0a] text-[#fafafa] shadow-[0_0_0_1px_#0a0a0a,0_28px_56px_-20px_rgba(0,0,0,0.4)] dark:bg-[#1a1a1a] dark:shadow-[0_0_0_1px_rgba(245,74,0,0.45),0_28px_56px_-20px_rgba(0,0,0,0.6)]"
                  : "bg-card shadow-[0_0_0_1px_var(--card-ring),0_2px_4px_rgba(0,0,0,0.04)]"
              )}
            >
              {plan.dark && (
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.07)_1px,transparent_1.3px)] bg-size-[18px_18px] [mask-image:linear-gradient(180deg,#000_0%,transparent_45%)]"
                />
              )}
              <h3 className="relative text-lg font-semibold tracking-[-0.01em]">{plan.name}</h3>
              <p className={cn("relative mt-1.5 min-h-[42px] text-sm leading-normal", plan.dark ? "text-[#a1a1a1]" : "text-muted-foreground")}>
                {plan.description}
              </p>
              <p className="relative mt-5 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                <span className="text-4xl font-[650] tracking-[-0.035em] tabular-nums">{plan.price}</span>
                <span className={cn("text-sm", plan.dark ? "text-[#a1a1a1]" : "text-subtle")}>{plan.suffix}</span>
              </p>
              <p className={cn("relative mt-1.5 min-h-5 text-[13px]", plan.dark ? "text-[#ff8a4c]" : "text-link")}>
                {plan.note}
              </p>
              <a
                href={signUpHref}
                className={cn(
                  "relative mt-5",
                  plan.dark
                    ? cn(
                        buttonVariants(),
                        "h-11 rounded-xl text-[15px] font-semibold shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_6px_16px_-4px_rgba(202,53,0,0.5)] hover:bg-[#b32f00]"
                      )
                    : cn(
                        buttonVariants({ variant: "outline" }),
                        "h-11 rounded-xl border-0 bg-card text-[15px] font-semibold text-foreground shadow-[0_0_0_1px_var(--control-ring),0_1px_2px_rgba(0,0,0,0.05)] dark:bg-card"
                      )
                )}
              >
                {plan.cta}
              </a>

              <div className={cn("relative mt-6 border-t pt-[18px]", plan.dark ? "border-white/10" : "border-line")}>
                <p
                  className={cn(
                    "mb-1 font-mono text-[11px] tracking-[0.08em] uppercase",
                    plan.dark ? "text-[#a1a1a1]" : "text-muted-foreground"
                  )}
                >
                  Kapasitas
                </p>
                <dl>
                  {plan.capacity.map(([key, value]) => (
                    <div key={key} className="flex justify-between gap-3 py-[7px] text-sm">
                      <dt className={plan.dark ? "text-[#a1a1a1]" : "text-muted-foreground"}>{key}</dt>
                      <dd
                        className={cn(
                          "font-semibold tabular-nums",
                          value === "Tidak ada" && "text-subtle"
                        )}
                      >
                        {value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className={cn("relative mt-3.5 border-t pt-[18px]", plan.dark ? "border-white/10" : "border-line")}>
                <p
                  className={cn(
                    "mb-2.5 font-mono text-[11px] tracking-[0.08em] uppercase",
                    plan.dark ? "text-[#a1a1a1]" : "text-muted-foreground"
                  )}
                >
                  Fitur
                </p>
                <ul className="flex flex-col gap-2.5">
                  {planFeatures.map((feature) =>
                    !plan.free || feature.free ? (
                      <li key={feature.name} className="flex items-start gap-2.5 text-sm leading-[1.4]">
                        <Check className="mt-px size-4 shrink-0 text-brand" strokeWidth={2.4} aria-hidden />
                        {feature.name}
                      </li>
                    ) : (
                      <li key={feature.name} className="flex items-start gap-2.5 text-sm leading-[1.4] text-subtle">
                        <Minus className="mt-px size-4 shrink-0 text-subtle/60" strokeWidth={2.4} aria-hidden />
                        <span>
                          <span className="sr-only">Tidak termasuk: </span>
                          {feature.name}
                        </span>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-4 rounded-3xl bg-frame p-[22px] shadow-[inset_0_0_0_1px_var(--line)] md:p-7">
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1.5">
            <h3 className="text-lg font-semibold tracking-[-0.01em]">Butuh kapasitas lebih? Tambah add-on.</h3>
            <span className="text-[13px] text-body">{addonPeriod[period]}</span>
          </div>
          <ul className="mt-4 flex flex-wrap gap-2.5">
            {addons.map(({ name, unit, Icon, prices }) => (
              <li
                key={name}
                className="flex min-w-0 flex-[1_1_190px] items-center gap-3 rounded-[14px] bg-card p-3 shadow-[0_0_0_1px_var(--card-ring)]"
              >
                <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-[11px] bg-brand-soft text-brand-icon">
                  <Icon className="size-[17px]" aria-hidden />
                </span>
                <div className="min-w-0">
                  <p className="text-[13px] font-semibold">{name}</p>
                  <p className="text-xs text-muted-foreground">{unit}</p>
                  <p className="mt-0.5 font-mono text-[13px] font-semibold">{rupiah(prices[period])}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <p className="mx-auto mt-5 max-w-[720px] text-center text-[13px] leading-[1.6] text-muted-foreground">
          Member, staf, akun coach, dan kelas dihitung per klub, sedangkan cabang dihitung per perusahaan. Paket dan
          kapasitas baru aktif setelah pembayaran berhasil.
        </p>
      </div>
    </section>
  )
}
