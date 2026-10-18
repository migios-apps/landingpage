import Link from "next/link"
import { ArrowRight, Book, Mail, MessageCircle, type LucideIcon } from "lucide-react"

import { PageHero } from "@/components/site/page-hero"
import { emailHref, pageMetadata, whatsappHref } from "@/lib/site"

import { ContactForm } from "./contact-form"

export const metadata = pageMetadata({
  path: "/kontak",
  title: "Kontak",
  description:
    "Hubungi tim Migios untuk pertanyaan fitur, harga, pindah dari spreadsheet, membuka cabang baru, atau memasang absensi wajah.",
})

// Until a WhatsApp number or email address is configured (dummy stage), those links scroll to the form.
const channels: { title: string; description: string; action: string; href?: string; external?: boolean; Icon: LucideIcon }[] = [
  {
    title: "Chat WhatsApp",
    description: "Cara tercepat untuk tanya fitur, harga, atau minta dibantu memulai.",
    action: "Chat via WhatsApp",
    href: whatsappHref ?? "#kirim-pesan",
    external: !!whatsappHref,
    Icon: MessageCircle,
  },
  {
    title: "Email",
    description: "Untuk penawaran, kerja sama, atau pertanyaan yang butuh lampiran.",
    action: "Kirim email",
    href: emailHref ?? "#kirim-pesan",
    Icon: Mail,
  },
  {
    title: "Pusat bantuan",
    description: "Panduan langkah demi langkah untuk setiap fitur Migios.",
    action: "Buka pusat bantuan",
    href: "/bantuan",
    Icon: Book,
  },
]

export default function ContactPage() {
  return (
    <PageHero
      eyebrow="Kontak"
      title="Ada pertanyaan? Tim kami siap bantu"
      description="Ceritakan kebutuhan klub kamu, mulai dari pindah dari spreadsheet, membuka cabang baru, sampai memasang absensi wajah. Kami balas lewat email atau WhatsApp."
    >
      <div className="mt-8 flex flex-wrap items-start gap-4 md:gap-6 lg:mt-12">
        <ContactForm />
        <div className="flex min-w-0 flex-[1_1_340px] flex-col gap-3">
          {channels.map(({ title, description, action, href, external, Icon }) => (
            <div
              key={title}
              className="flex gap-3.5 rounded-[18px] bg-card p-[18px] shadow-[0_0_0_1px_var(--card-ring)]"
            >
              <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-[11px] bg-brand-soft text-brand-icon">
                <Icon className="size-[18px]" aria-hidden />
              </span>
              <div className="min-w-0 flex-1">
                <h2 className="text-[15px] font-semibold">{title}</h2>
                <p className="mt-1 text-[13.5px] leading-[1.55] text-body">{description}</p>
                {href && (
                  <Link
                    href={href}
                    {...(external && { target: "_blank", rel: "noopener noreferrer" })}
                    className="mt-2.5 inline-flex items-center gap-1.5 text-sm font-semibold text-link"
                  >
                    {action}
                    <ArrowRight className="size-3.5" aria-hidden />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageHero>
  )
}
