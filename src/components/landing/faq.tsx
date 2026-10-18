import Link from "next/link"
import { MessageCircle } from "lucide-react"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

// Also rendered as FAQPage structured data on the page, so keep questions and answers in sync here.
export const faqs = [
  {
    question: "Apakah Migios bisa dicoba gratis?",
    answer:
      "Bisa. Paket Free berlaku 30 hari tanpa biaya untuk 1 cabang dengan 20 member, 1 staf, dan 5 kelas per bulan, kasir sudah termasuk. Setelah itu lanjutkan dengan paket Basic atau Pro.",
  },
  {
    question: "Bagaimana cara membayar langganan?",
    answer:
      "Langganan dibayar di muka lewat pembayaran online, per bulan, 6 bulan, atau tahunan. Paket, cabang, atau kapasitas tambahan aktif setelah pembayaran berhasil.",
  },
  {
    question: "Bisa dipakai untuk lebih dari satu cabang?",
    answer:
      "Bisa. Paket Pro mencakup 3 cabang dalam satu perusahaan, dan cabang tambahan bisa dibeli sebagai add-on. Semua cabang dikelola dari satu akun.",
  },
  {
    question: "Apakah member punya aplikasi sendiri?",
    answer:
      "Ya. Dari aplikasi Migios, member melihat paket aktif dan jadwal, check-in, serta membaca promo dan artikel dari klub. Di paket Basic dan Pro, member juga bisa memesan paket dan produk sendiri.",
  },
  {
    question: "Absensi wajah butuh perangkat apa?",
    answer:
      "Komputer Windows di klub yang menjalankan aplikasi Migios Desk. Wajah dipindai dari tablet display atau layar resepsionis, dan data wajah member tersimpan dengan aman.",
  },
  {
    question: "Apakah ada pengingat lewat WhatsApp?",
    answer:
      "Ada di paket Basic dan Pro. Pengingat jadwal dan tagihan dikirim lewat WhatsApp gateway yang terhubung ke klub.",
  },
]

export function Faq() {
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
