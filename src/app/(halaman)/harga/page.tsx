import { Fragment } from "react"
import { Check, X } from "lucide-react"

import { Faq } from "@/components/landing/faq"
import { Pricing } from "@/components/landing/pricing"
import { perPeriod, priceFor, rupiah, type PeriodPrice } from "@/lib/pricing"
import { getPricing } from "@/lib/pricing-data"
import { pageMetadata } from "@/lib/site"

export async function generateMetadata() {
  const pricing = await getPricing()
  const trial = pricing.plans.find((plan) => plan.is_trial)
  const paid = pricing.plans.filter((plan) => !plan.is_trial).map((plan) => plan.name)
  return pageMetadata({
    path: "/harga",
    title: "Harga",
    description: `Harga paket Migios: ${trial ? `${trial.name} ${pricing.trial_days} hari, ` : ""}${paid.join(", ")}, bayar bulanan, per 6 bulan, atau tahunan. Bandingkan kapasitas dan fitur setiap paket.`,
  })
}

const headline = (prices: PeriodPrice[]) => {
  const price = prices.find((item) => item.code === "monthly") ?? prices[0]
  if (!price) return null
  return price.code === "monthly" ? `${rupiah(price.amount)}/bln` : `${rupiah(price.amount)} ${perPeriod(price)}`
}

const groupLabel = "pt-5 pb-2 text-left font-mono text-[10.5px] font-normal tracking-[0.08em] text-subtle uppercase"
const rowLabel = "h-12 pr-2 text-left text-[13px] font-normal text-neutral-800 md:text-sm dark:text-neutral-300"

export default async function PricingPage() {
  const pricing = await getPricing()
  const plans = pricing.plans
  const groups = [
    {
      label: "Fitur",
      features: pricing.features.filter((feature) => Object.values(feature.access).some((access) => access !== "none")),
    },
  ]
  const branch = pricing.addons.find((addon) => addon.price_mode === "follow_plan")
  const capacityRows = (plans[0]?.capacities ?? []).map((capacity) => ({
    label: capacity.label,
    values: plans.map((plan) => {
      const value = plan.capacities.find((item) => item.key === capacity.key)?.value
      return value === undefined ? null : value === null ? "Tanpa batas" : value.toLocaleString("id-ID")
    }),
  }))

  return (
    <>
      <Pricing titleAs="h1" />

      <section aria-labelledby="bandingkan-title" className="border-t border-line bg-frame">
        <div className="mx-auto max-w-[1200px] px-4 py-14 md:px-8 lg:py-24">
          <div className="flex flex-col items-center text-center">
            <span className="text-sm font-semibold text-link">Bandingkan paket</span>
            <h2
              id="bandingkan-title"
              className="mt-3 text-[28px] leading-[1.1] font-[650] tracking-[-0.035em] md:text-[34px] lg:text-[40px]"
            >
              Semua detail dalam satu tabel
            </h2>
            <p className="mt-3 max-w-[560px] text-base leading-[1.55] text-pretty text-body">
              Fitur di luar paket bisa dibeli per bulan sebagai add-on tanpa naik paket, dan berlaku untuk semua cabang.
            </p>
          </div>

          <div className="mx-auto mt-7 max-w-[960px] rounded-[20px] bg-card px-3 pt-2 pb-3 shadow-[0_0_0_1px_var(--card-ring),0_2px_4px_rgba(0,0,0,0.04)] md:px-7 md:pt-3 md:pb-5 lg:mt-10">
            <table className="w-full table-fixed border-collapse">
              <caption className="sr-only">
                Perbandingan kapasitas dan fitur paket {plans.map((plan) => plan.name).join(", ")}
              </caption>
              <colgroup>
                <col className="w-[104px] md:w-[27%]" />
                {plans.map((plan) => (
                  <col key={plan.code} />
                ))}
              </colgroup>
              <thead className="sticky top-[68px] z-10 bg-card md:top-[76px]">
                <tr>
                  <td />
                  {plans.map((plan) => (
                    <th key={plan.code} scope="col" className="px-1 pt-4 pb-3.5 align-bottom font-normal">
                      <span className="block text-[13px] font-[650] md:text-[15px]">{plan.name}</span>
                      <span className="mt-0.5 block text-[11px] text-subtle md:text-[12.5px]">
                        {plan.is_trial ? `Rp 0 / ${pricing.trial_days} hari` : headline(plan.prices)}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th colSpan={plans.length + 1} scope="colgroup" className={groupLabel}>
                    Kapasitas
                  </th>
                </tr>
                {capacityRows.map((row) => (
                  <tr key={row.label} className="border-t border-line">
                    <th scope="row" className={rowLabel}>
                      {row.label}
                    </th>
                    {row.values.map((value, i) => (
                      <td key={plans[i].code} className="text-center text-[13px] font-semibold tabular-nums md:text-sm">
                        {value ?? (
                          <>
                            <span aria-hidden>—</span>
                            <span className="sr-only">Tidak ada</span>
                          </>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
                {branch ? (
                  <tr className="border-t border-line">
                    <th scope="row" className={rowLabel}>
                      {branch.name}
                    </th>
                    {plans.map((plan) => (
                      <td key={plan.code} className="text-center text-[13px] font-semibold md:text-sm">
                        {branch.plans.includes(plan.code) ? (
                          "Ikut harga"
                        ) : (
                          <>
                            <span aria-hidden>—</span>
                            <span className="sr-only">Tidak tersedia</span>
                          </>
                        )}
                      </td>
                    ))}
                  </tr>
                ) : null}
                {groups.map((group) => (
                  <Fragment key={group.label}>
                    <tr>
                      <th colSpan={plans.length + 1} scope="colgroup" className={groupLabel}>
                        {group.label}
                      </th>
                    </tr>
                    {group.features.map((feature) => (
                      <tr key={feature.key} className="border-t border-line">
                        <th scope="row" className={rowLabel}>
                          {feature.label}
                        </th>
                        {plans.map((plan) => {
                          const access = feature.access[plan.code] ?? "none"
                          const monthly = priceFor(feature.addon_prices, "monthly")
                          return (
                            <td key={plan.code} className="text-center">
                              {access === "included" ? (
                                <>
                                  <Check
                                    className="inline size-[18px] text-emerald-600 dark:text-emerald-400"
                                    aria-hidden
                                  />
                                  <span className="sr-only">Termasuk</span>
                                </>
                              ) : access === "addon" ? (
                                <span className="inline-flex flex-col items-center leading-tight">
                                  <span className="rounded-md bg-brand-soft px-1.5 py-0.5 text-[11px] font-semibold text-link">
                                    Add-on
                                  </span>
                                  {monthly !== null ? (
                                    <span className="mt-0.5 text-[11px] text-subtle md:text-xs">
                                      {rupiah(monthly)}/bln
                                    </span>
                                  ) : null}
                                </span>
                              ) : (
                                <>
                                  <X className="inline size-4 text-neutral-300 dark:text-neutral-600" aria-hidden />
                                  <span className="sr-only">Tidak tersedia</span>
                                </>
                              )}
                            </td>
                          )
                        })}
                      </tr>
                    ))}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <Faq />
    </>
  )
}
