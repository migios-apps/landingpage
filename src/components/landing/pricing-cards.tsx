"use client"

import { useState } from "react"
import { Building, Calendar, Check, Dumbbell, Info, Star, User, Users, type LucideIcon } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { perPeriod, priceFor, rupiah, type Pricing, type PricingPlanGroup } from "@/lib/pricing"
import { signUpHref } from "@/lib/site"
import { cn } from "@/lib/utils"

const addonIcons: Record<string, LucideIcon> = {
  member_pack: Users,
  staff_seat: User,
  coach_pack: Dumbbell,
  class_schedule_pack: Calendar,
  branch: Building,
}

type GroupRowProps = {
  group: PricingPlanGroup
  dark: boolean
  open: boolean
  onToggle: () => void
}

function GroupRow({ group, dark, open, onToggle }: GroupRowProps) {
  const accessOf = (feature: PricingPlanGroup["features"][number]) => feature.access
  const total = group.features.length
  const included = group.features.filter((feature) => accessOf(feature) === "included").length
  const muted = dark ? "text-[#a1a1a1]" : "text-muted-foreground"

  return (
    <li className="relative">
      <div className="flex min-h-[30px] items-center gap-2.5 text-sm leading-[1.4]">
        <Check className="size-4 shrink-0 text-brand" strokeWidth={2.4} aria-label="Termasuk" />
        <span>
          {group.label}
          {included < total ? (
            <span className={cn("text-[12.5px]", muted)}>
              {" "}
              · {included} dari {total}
            </span>
          ) : null}
        </span>
        {group.grouped ? (
          <button
            type="button"
            aria-label={`Detail ${group.label}`}
            aria-expanded={open}
            onClick={onToggle}
            className={cn("ml-auto flex size-7 shrink-0 items-center justify-center rounded-full", muted)}
          >
            <Info className="size-[15px]" aria-hidden />
          </button>
        ) : null}
      </div>
      {open ? (
        <div
          role="tooltip"
          className={cn(
            "absolute top-[34px] right-0 z-10 flex w-60 flex-col gap-1.5 rounded-xl px-3 py-2.5 text-[12.5px] leading-[1.4]",
            dark
              ? "bg-white text-[#0a0a0a] shadow-[0_12px_28px_rgba(0,0,0,0.35)]"
              : "bg-[#0a0a0a] text-[#fafafa] shadow-[0_12px_28px_rgba(0,0,0,0.18)]",
          )}
        >
          <span className="font-semibold">{group.label}</span>
          {group.features.map((feature) => {
            const access = accessOf(feature)
            const monthly = priceFor(feature.addon_prices, "monthly")
            return (
              <div key={feature.key} className="flex items-start gap-2">
                <span
                  aria-hidden
                  className={cn(
                    "w-3 shrink-0 font-bold",
                    access === "included"
                      ? dark
                        ? "text-emerald-600"
                        : "text-emerald-400"
                      : access === "addon"
                        ? dark
                          ? "text-orange-700"
                          : "text-orange-400"
                        : dark
                          ? "text-neutral-500"
                          : "text-neutral-400",
                  )}
                >
                  {access === "included" ? "✓" : access === "addon" ? "+" : "–"}
                </span>
                <span>
                  {feature.label}
                  {access !== "included" ? (
                    <span className={dark ? "text-neutral-500" : "text-neutral-400"}>
                      {" · "}
                      {access === "addon" && monthly !== null ? `add-on ${rupiah(monthly)}/bln` : "tidak tersedia"}
                    </span>
                  ) : null}
                </span>
              </div>
            )
          })}
        </div>
      ) : null}
    </li>
  )
}

export function PricingCards({ pricing, titleAs: Title = "h2" }: { pricing: Pricing; titleAs?: "h1" | "h2" }) {
  const [code, setCode] = useState(
    pricing.periods.some((period) => period.code === "monthly") ? "monthly" : (pricing.periods[0]?.code ?? ""),
  )
  const [tip, setTip] = useState<string | null>(null)
  const reference = pricing.plans.find((plan) => !plan.is_trial)
  const period = pricing.periods.find((item) => item.code === code)

  const periodChip = (periodCode: string, months: number) => {
    const saving = reference?.prices.find((price) => price.code === periodCode)?.saving_percent ?? 0
    if (months <= 1 || saving <= 0) return null
    return months === 12 ? `Hemat ${Math.round((months * saving) / 100)} bulan` : `Hemat ${saving}%`
  }

  const featureAddons = pricing.features
    .map((feature) => priceFor(feature.addon_prices, code))
    .filter((amount): amount is number => amount !== null)

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
            Semua paket sudah termasuk kasir. Bayar bulanan, per 6 bulan, atau tahunan, dan tambah fitur satu per satu
            lewat add-on.
          </p>

          <ToggleGroup
            aria-label="Periode pembayaran"
            value={[code]}
            onValueChange={(value) => {
              if (value[0] !== undefined) setCode(value[0])
            }}
            spacing={1}
            className="mt-8 rounded-xl bg-chip p-1 shadow-[inset_0_0_0_1px_var(--line)]"
          >
            {pricing.periods.map((period) => {
              const chip = periodChip(period.code, period.months)
              return (
                <ToggleGroupItem
                  key={period.code}
                  value={period.code}
                  className="h-9 rounded-[9px] px-2.5 text-[13px] font-semibold text-body hover:bg-transparent hover:text-foreground aria-pressed:bg-card aria-pressed:text-foreground aria-pressed:shadow-[0_1px_2px_rgba(0,0,0,0.1),0_0_0_1px_rgba(0,0,0,0.04)] md:px-4 md:text-sm"
                >
                  {period.label}
                  {chip && (
                    <span className="ml-1.5 rounded-md bg-brand-soft px-1.5 py-0.5 text-[11px] font-semibold text-link">
                      {chip}
                    </span>
                  )}
                </ToggleGroupItem>
              )
            })}
          </ToggleGroup>
        </div>

        <div className="mt-10 flex flex-wrap items-start gap-4">
          {pricing.plans.map((plan) => {
            const dark = plan.code === "basic"
            const monthly = priceFor(plan.prices, "monthly")
            const shown =
              plan.prices.find((price) => price.code === code) ??
              plan.prices.find((price) => price.code === "monthly") ??
              plan.prices[0]
            const amount = shown?.amount ?? 0
            const muted = dark ? "text-[#a1a1a1]" : "text-muted-foreground"
            return (
              <article
                key={plan.code}
                className={cn(
                  "relative flex min-w-0 flex-[1_1_250px] flex-col rounded-3xl p-[22px] md:p-[26px]",
                  dark
                    ? "bg-[#0a0a0a] text-[#fafafa] shadow-[0_0_0_1px_#0a0a0a,0_28px_56px_-20px_rgba(0,0,0,0.4)] dark:bg-[#1a1a1a] dark:shadow-[0_0_0_1px_rgba(245,74,0,0.45),0_28px_56px_-20px_rgba(0,0,0,0.6)]"
                    : "bg-card shadow-[0_0_0_1px_var(--card-ring),0_2px_4px_rgba(0,0,0,0.04)]",
                )}
              >
                {dark && (
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-3xl bg-[radial-gradient(circle,rgba(255,255,255,0.07)_1px,transparent_1.3px)] bg-size-[18px_18px] [mask-image:linear-gradient(180deg,#000_0%,transparent_45%)]"
                  />
                )}
                <h3 className="relative text-lg font-semibold tracking-[-0.01em]">{plan.name}</h3>
                <p className={cn("relative mt-1.5 min-h-[42px] text-sm leading-normal", muted)}>{plan.description}</p>
                <p className="relative mt-5 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                  <span className="text-4xl font-[650] tracking-[-0.035em] tabular-nums">
                    {plan.is_trial ? "Rp 0" : rupiah(amount)}
                  </span>
                  <span className={cn("text-sm", dark ? "text-[#a1a1a1]" : "text-subtle")}>
                    {plan.is_trial ? `/ ${pricing.trial_days ?? 0} hari` : shown ? perPeriod(shown) : null}
                  </span>
                </p>
                <p className={cn("relative mt-1.5 min-h-5 text-[13px]", dark ? "text-[#ff8a4c]" : "text-link")}>
                  {plan.is_trial
                    ? "Masa trial, tanpa biaya"
                    : !shown
                      ? null
                      : shown.days > 0
                        ? `Berlaku ${shown.days} hari`
                        : shown.months === 1
                          ? "Ditagih setiap bulan"
                          : monthly !== null && monthly * shown.months > amount
                            ? `Setara ${rupiah(Math.round(amount / shown.months))} per bulan · hemat ${rupiah(monthly * shown.months - amount)}`
                            : `Ditagih per ${shown.label.toLowerCase()}`}
                </p>
                <a
                  href={signUpHref}
                  className={cn(
                    "relative mt-5",
                    dark
                      ? cn(
                          buttonVariants(),
                          "h-11 rounded-xl text-[15px] font-semibold shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_6px_16px_-4px_rgba(202,53,0,0.5)] hover:bg-[#b32f00]",
                        )
                      : cn(
                          buttonVariants({ variant: "outline" }),
                          "h-11 rounded-xl border-0 bg-card text-[15px] font-semibold text-foreground shadow-[0_0_0_1px_var(--control-ring),0_1px_2px_rgba(0,0,0,0.05)] dark:bg-card",
                        ),
                  )}
                >
                  {plan.is_trial ? "Coba Gratis" : `Pilih ${plan.name}`}
                </a>

                <>
                  <div className={cn("relative mt-6 border-t pt-[18px]", dark ? "border-white/10" : "border-line")}>
                    <p className={cn("mb-1 font-mono text-[11px] tracking-[0.08em] uppercase", muted)}>Kapasitas</p>
                    <dl>
                      {plan.capacities
                        .filter((capacity) => !(capacity.key === "clubs.max" && capacity.value === 1))
                        .map((capacity) => (
                          <div key={capacity.key} className="flex justify-between gap-3 py-[7px] text-sm">
                            <dt className={muted}>
                              {capacity.key === "clubs.max" ? "Cabang termasuk" : capacity.label}
                            </dt>
                            <dd className="font-semibold tabular-nums">
                              {capacity.value === null ? "Tanpa batas" : capacity.value.toLocaleString("id-ID")}
                            </dd>
                          </div>
                        ))}
                    </dl>
                  </div>

                  <div className={cn("relative mt-3.5 border-t pt-[18px]", dark ? "border-white/10" : "border-line")}>
                    <p className={cn("mb-2 font-mono text-[11px] tracking-[0.08em] uppercase", muted)}>Fitur</p>
                    <ul className="flex flex-col gap-0.5">
                      {plan.feature_groups
                        .filter((group) => group.features.some((feature) => feature.access === "included"))
                        .map((group, index) => {
                          const id = `${plan.code}:${index}`
                          return (
                            <GroupRow
                              key={id}
                              group={group}
                              dark={dark}
                              open={tip === id}
                              onToggle={() => setTip(tip === id ? null : id)}
                            />
                          )
                        })}
                    </ul>
                  </div>
                </>
              </article>
            )
          })}
        </div>

        <div className="mt-4 rounded-3xl bg-frame p-[22px] shadow-[inset_0_0_0_1px_var(--line)] md:p-7">
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1.5">
            <h3 className="text-lg font-semibold tracking-[-0.01em]">Butuh lebih? Tambah add-on.</h3>
            <span className="text-[13px] text-body">
              {period ? `Harga ${perPeriod(period).replace("/", "per")}` : null}
            </span>
          </div>
          <ul className="mt-4 flex flex-wrap gap-2.5">
            {pricing.addons
              .filter((addon) => addon.price_mode !== "follow_plan")
              .map((addon) => {
                const Icon = addonIcons[addon.code] ?? Users
                const amount = priceFor(addon.prices, code)
                return (
                  <li
                    key={addon.code}
                    className="flex min-w-0 flex-[1_1_190px] items-center gap-3 rounded-[14px] bg-card p-3 shadow-[0_0_0_1px_var(--card-ring)]"
                  >
                    <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-[11px] bg-brand-soft text-brand-icon">
                      <Icon className="size-[17px]" aria-hidden />
                    </span>
                    <div className="min-w-0">
                      <p className="text-[13px] font-semibold">{addon.name}</p>
                      <p className="text-xs text-muted-foreground">{addon.unit_label}</p>
                      <p className="mt-0.5 font-mono text-[13px] font-semibold">
                        {addon.price_mode === "follow_plan"
                          ? "Ikut harga paket"
                          : amount !== null
                            ? rupiah(amount)
                            : "—"}
                      </p>
                    </div>
                  </li>
                )
              })}
            {featureAddons.length > 0 ? (
              <li className="flex min-w-0 flex-[1_1_190px] items-center gap-3 rounded-[14px] bg-card p-3 shadow-[0_0_0_1px_var(--card-ring)]">
                <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-[11px] bg-brand-soft text-brand-icon">
                  <Star className="size-[17px]" aria-hidden />
                </span>
                <div className="min-w-0">
                  <p className="text-[13px] font-semibold">Fitur tambahan</p>
                  <p className="text-xs text-muted-foreground">per fitur, semua cabang</p>
                  <p className="mt-0.5 font-mono text-[13px] font-semibold">
                    mulai {rupiah(Math.min(...featureAddons))}
                  </p>
                </div>
              </li>
            ) : null}
          </ul>
        </div>

        <p className="mx-auto mt-5 max-w-[720px] text-center text-[13px] leading-[1.6] text-muted-foreground">
          Member aktif, staf, coach, dan jadwal kelas aktif dihitung per cabang. Cabang tambahan dibeli seharga paket
          dibagi jumlah cabang yang termasuk, dan mendapat kapasitas penuh paketnya. Paket dan add-on aktif setelah
          pembayaran berhasil.
        </p>
      </div>
    </section>
  )
}
