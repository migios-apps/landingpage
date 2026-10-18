import { Check, X } from "lucide-react"

import { Faq } from "@/components/landing/faq"
import { Pricing } from "@/components/landing/pricing"
import { pageMetadata, planCapacity, planFeatures, planPrices } from "@/lib/site"

export const metadata = pageMetadata({
  path: "/harga",
  title: "Harga",
  description:
    "Harga paket Migios: Free 30 hari, Basic, dan Pro, bayar bulanan, per 6 bulan, atau tahunan. Bandingkan kapasitas dan fitur setiap paket.",
})

const plans = [
  { name: "Free", price: "Rp 0 / 30 hari" },
  { name: "Basic", price: `Rp ${planPrices.basic[0].toLocaleString("id-ID")}/bln` },
  { name: "Pro", price: `Rp ${planPrices.pro[0].toLocaleString("id-ID")}/bln` },
]

const groupLabel = "pt-5 pb-2 text-left font-mono text-[10.5px] font-normal tracking-[0.08em] text-subtle uppercase"
const rowLabel = "h-12 pr-2 text-left text-[13px] font-normal text-neutral-800 md:text-sm dark:text-neutral-300"

export default function PricingPage() {
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
          </div>

          <div className="mx-auto mt-7 max-w-[960px] rounded-[20px] bg-card px-3 pt-2 pb-3 shadow-[0_0_0_1px_var(--card-ring),0_2px_4px_rgba(0,0,0,0.04)] md:px-7 md:pt-3 md:pb-5 lg:mt-10">
            <table className="w-full table-fixed border-collapse">
              <caption className="sr-only">Perbandingan kapasitas dan fitur paket Free, Basic, dan Pro</caption>
              <colgroup>
                <col className="w-[124px] md:w-[31.8%]" />
                <col />
                <col />
                <col />
              </colgroup>
              <thead className="sticky top-0 z-10 bg-card">
                <tr>
                  <td />
                  {plans.map((plan) => (
                    <th key={plan.name} scope="col" className="px-1 pt-4 pb-3.5 align-bottom font-normal">
                      <span className="block text-[13px] font-[650] md:text-[15px]">{plan.name}</span>
                      <span className="mt-0.5 block text-[11px] text-subtle md:text-[12.5px]">{plan.price}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th colSpan={4} scope="colgroup" className={groupLabel}>
                    Kapasitas
                  </th>
                </tr>
                {planCapacity.map((row) => (
                  <tr key={row.label} className="border-t border-line">
                    <th scope="row" className={rowLabel}>
                      {row.label}
                    </th>
                    {row.values.map((value, i) => (
                      <td key={plans[i].name} className="text-center text-[13px] font-semibold tabular-nums md:text-sm">
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
                <tr>
                  <th colSpan={4} scope="colgroup" className={groupLabel}>
                    Fitur
                  </th>
                </tr>
                {planFeatures.map((feature) => (
                  <tr key={feature.name} className="border-t border-line">
                    <th scope="row" className={rowLabel}>
                      {feature.name}
                    </th>
                    {plans.map((plan, i) => (
                      <td key={plan.name} className="text-center">
                        {i > 0 || feature.free ? (
                          <>
                            <Check className="inline size-[18px] text-emerald-600 dark:text-emerald-400" aria-hidden />
                            <span className="sr-only">Termasuk</span>
                          </>
                        ) : (
                          <>
                            <X className="inline size-4 text-neutral-300 dark:text-neutral-600" aria-hidden />
                            <span className="sr-only">Tidak termasuk</span>
                          </>
                        )}
                      </td>
                    ))}
                  </tr>
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
