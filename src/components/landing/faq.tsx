import Link from "next/link"
import { MessageCircle } from "lucide-react"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import type { Pricing } from "@/lib/pricing"
import { getPricing } from "@/lib/pricing-data"

const joinNames = (names: string[], last: string) =>
  names.length <= 1 ? (names[0] ?? "") : `${names.slice(0, -1).join(", ")} ${last} ${names[names.length - 1]}`

// Also rendered as FAQPage structured data on the page, so keep questions and answers in sync here.
export function faqsFor(pricing: Pricing) {
  const paid = pricing.plans.filter((plan) => !plan.is_trial)
  const trial = pricing.plans.find((plan) => plan.is_trial)
  const capacity = (key: string) => trial?.capacities.find((item) => item.key === key)?.value ?? null
  const featureAccess = (key: string) => pricing.features.find((feature) => feature.key === key)?.access ?? {}
  const plansWith = (key: string, access: "included" | "addon") =>
    paid.filter((plan) => featureAccess(key)[plan.code] === access).map((plan) => plan.name)
  const branchPlans = pricing.addons
    .find((addon) => addon.price_mode === "follow_plan")
    ?.plans.map((code) => pricing.plans.find((plan) => plan.code === code)?.name)
    .filter((name): name is string => Boolean(name))
  const webIn = plansWith("member_web_app", "included")[0]
  const mobileIn = plansWith("member_mobile_app", "included")[0]
  const faceIn = plansWith("face_attendance", "included")
  const faceAddon = plansWith("face_attendance", "addon")
  const paidNames = joinNames(
    paid.map((plan) => plan.name),
    "atau",
  )

  return [
    {
      question: "Apakah Migios bisa dicoba gratis?",
      answer: trial
        ? `Bisa. ${trial.name} berlaku ${pricing.trial_days} hari tanpa biaya setup, dengan semua fitur Basic untuk ${capacity("clubs.max") ?? 1} cabang, ${capacity("members.max")} member aktif, ${capacity("staff.max")} staf, dan ${capacity("coaches.max")} coach. Setelah itu lanjutkan dengan paket ${paidNames}.`
        : `Pilih paket ${paidNames} dan mulai dari kasir.`,
    },
    {
      question: "Bagaimana cara membayar langganan?",
      answer:
        "Langganan dibayar di muka lewat pembayaran online, per bulan, 6 bulan, atau tahunan. Paket, cabang, atau kapasitas tambahan aktif setelah pembayaran berhasil.",
    },
    {
      question: "Bisa dipakai untuk lebih dari satu cabang?",
      answer: `Bisa. ${branchPlans?.length ? `Di paket ${joinNames(branchPlans, "dan")}, cabang` : "Cabang"} baru dibeli seharga paket dibagi jumlah cabang yang termasuk paket, dan cabang itu mendapat kapasitas penuh paketnya. Semua cabang dikelola dari satu akun.`,
    },
    {
      question: "Apakah member punya aplikasi sendiri?",
      answer: [
        "Ya. Dari aplikasi Migios, member melihat paket aktif dan jadwal, check-in, serta membaca promo dan artikel dari klub.",
        webIn && mobileIn
          ? `Aplikasi web member dan coach termasuk di paket ${webIn}, aplikasi mobile termasuk di paket ${mobileIn}, dan keduanya bisa ditambah sebagai add-on.`
          : null,
        "Pesan paket dan produk sendiri tersedia di aplikasi mobile.",
      ]
        .filter(Boolean)
        .join(" "),
    },
    {
      question: "Absensi wajah butuh perangkat apa?",
      answer: [
        "Komputer Windows di klub yang menjalankan aplikasi Migios Desk. Wajah dipindai dari tablet display atau layar resepsionis, dan data wajah member tersimpan dengan aman.",
        faceIn.length && faceAddon.length
          ? `Absensi wajah termasuk di paket ${joinNames(faceIn, "dan")} dan bisa ditambah sebagai add-on di ${joinNames(faceAddon, "dan")}.`
          : null,
      ]
        .filter(Boolean)
        .join(" "),
    },
    {
      question: "Apakah ada pengingat lewat WhatsApp?",
      answer: "Ada di semua paket. Pengingat jadwal dan tagihan dikirim lewat WhatsApp gateway yang terhubung ke klub.",
    },
  ]
}

export async function Faq() {
  const faqs = faqsFor(await getPricing())
  return (
    <section id="faq" aria-labelledby="faq-title" className="border-t border-line bg-frame">
      <div className="mx-auto flex max-w-[1200px] flex-wrap gap-x-16 gap-y-10 px-4 py-16 md:px-8 md:py-[88px] lg:py-28">
        <div className="min-w-0 flex-[1_1_320px]">
          <span className="text-sm font-semibold text-link">FAQ</span>
          <h2
            id="faq-title"
            className="mt-3 text-[32px] leading-[1.08] font-[650] tracking-[-0.035em] text-balance md:text-[40px] lg:text-[44px]"
          >
            Pertanyaan yang sering ditanyakan
          </h2>
          <p className="mt-4 max-w-[360px] text-base leading-[1.55] text-body">
            Belum menemukan jawabannya? Tim Migios siap membantu menyiapkan klub kamu.
          </p>
          <Link
            href="/kontak"
            className="mt-6 inline-flex h-11 items-center gap-2 rounded-xl bg-card px-[18px] text-sm font-semibold shadow-[0_0_0_1px_var(--control-ring),0_1px_2px_rgba(0,0,0,0.05)]"
          >
            <MessageCircle className="size-4" aria-hidden />
            Hubungi Kami
          </Link>
        </div>

        <Accordion defaultValue={[0]} className="min-w-0 flex-[2_1_520px] border-t border-line">
          {faqs.map((faq, i) => (
            <AccordionItem key={faq.question} value={i} className="border-b border-line">
              <AccordionTrigger className="min-h-16 py-4 text-[15px] font-semibold md:text-base">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="pr-12 pb-5 text-[15px] leading-[1.65] text-body">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
