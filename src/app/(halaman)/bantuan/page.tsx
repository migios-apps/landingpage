import { Suspense } from "react"
import Form from "next/form"
import Link from "next/link"
import {
  ArrowRight,
  Calendar,
  ChartColumn,
  CreditCard,
  Receipt,
  Rocket,
  ScanFace,
  Search,
  Smartphone,
  Users,
  type LucideIcon,
} from "lucide-react"

import { PageHero } from "@/components/site/page-hero"
import help from "@/content/bantuan.json"
import { buttonVariants } from "@/components/ui/button"
import { pageMetadata } from "@/lib/site"
import { cn } from "@/lib/utils"

export const metadata = pageMetadata({
  path: "/bantuan",
  title: "Pusat bantuan",
  description:
    "Panduan langkah demi langkah untuk setiap fitur Migios, dari membuat klub, kasir, jadwal kelas, dan absensi sampai membaca laporan.",
})

const icons: Record<string, LucideIcon> = {
  rocket: Rocket,
  users: Users,
  receipt: Receipt,
  calendar: Calendar,
  "scan-face": ScanFace,
  smartphone: Smartphone,
  chart: ChartColumn,
  "credit-card": CreditCard,
}

export default function HelpPage({ searchParams }: PageProps<"/bantuan">) {
  // The full guide list doubles as the prerendered shell; a search query streams in from the URL.
  return (
    <Suspense fallback={<HelpCenter />}>
      {searchParams.then(({ q }) => (
        <HelpCenter q={Array.isArray(q) ? q[0] : q} />
      ))}
    </Suspense>
  )
}

function HelpCenter({ q }: { q?: string }) {
  const query = q?.trim() ?? ""
  const words = query.toLowerCase().split(/\s+/).filter(Boolean)
  const results = help.categories
    .map((category) => ({
      ...category,
      // Keywords cover terms a guide title does not use, such as "import" for "Mengimpor".
      guides: category.guides.filter((guide) =>
        words.every((word) =>
          `${category.title} ${guide.title} ${guide.keywords ?? ""}`.toLowerCase().includes(word)
        )
      ),
    }))
    .filter((category) => category.guides.length > 0)

  return (
    <>
      <PageHero
        eyebrow="Pusat bantuan"
        title="Ada yang bisa kami bantu?"
        description="Panduan langkah demi langkah untuk setiap fitur Migios, dari membuat klub sampai membaca laporan."
      >
        <div className="flex flex-col items-center">
          <Form action="/bantuan" role="search" className="mt-7 w-full max-w-[560px]">
            <label className="flex h-[52px] items-center gap-2.5 rounded-[14px] bg-card px-4 shadow-[0_0_0_1px_var(--border),0_8px_24px_-12px_rgba(0,0,0,0.18)] focus-within:shadow-[0_0_0_1px_var(--ring),0_0_0_4px_color-mix(in_srgb,var(--ring)_25%,transparent)]">
              <Search className="size-[18px] shrink-0 text-subtle" aria-hidden />
              <span className="sr-only">Cari panduan</span>
              <input
                type="search"
                name="q"
                defaultValue={query}
                placeholder="Cari panduan, misalnya “freeze paket”"
                className="h-full min-w-0 flex-1 bg-transparent text-[15px] outline-none placeholder:text-neutral-400 dark:placeholder:text-neutral-500"
              />
            </label>
          </Form>
          <nav aria-label="Pencarian populer" className="mt-4 flex flex-wrap justify-center gap-2">
            {help.suggestions.map((suggestion) => (
              <Link
                key={suggestion}
                href={`/bantuan?q=${encodeURIComponent(suggestion)}`}
                aria-current={suggestion.toLowerCase() === query.toLowerCase() ? "page" : undefined}
                className="inline-flex h-[34px] items-center rounded-full bg-card px-3.5 text-[13px] font-medium whitespace-nowrap text-body-strong shadow-[0_0_0_1px_var(--border)] hover:text-foreground aria-[current=page]:bg-foreground aria-[current=page]:font-semibold aria-[current=page]:text-background aria-[current=page]:shadow-none"
              >
                {suggestion}
              </Link>
            ))}
          </nav>
        </div>
      </PageHero>

      <section aria-label="Panduan" className="bg-background">
        <div className="mx-auto max-w-[1200px] px-4 py-4 md:px-8 lg:py-8">
          {results.length > 0 ? (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {results.map((category) => {
                const Icon = icons[category.icon]
                return (
                  <article
                    key={category.title}
                    className="min-w-0 rounded-[18px] bg-card p-[18px] shadow-[0_0_0_1px_var(--card-ring),0_2px_4px_rgba(0,0,0,0.03)]"
                  >
                    <div className="flex items-center gap-3">
                      <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-[11px] bg-brand-soft text-brand-icon">
                        <Icon className="size-[18px]" aria-hidden />
                      </span>
                      <h2 className="text-base font-semibold">{category.title}</h2>
                    </div>
                    <ul className="mt-3.5">
                      {category.guides.map((guide) => (
                        <li
                          key={guide.title}
                          className="flex items-center justify-between gap-2 border-t border-line py-[9px] text-sm text-neutral-800 dark:text-neutral-300"
                        >
                          <span>{guide.title}</span>
                          <ArrowRight className="size-3.5 shrink-0 text-neutral-400 dark:text-neutral-500" aria-hidden />
                        </li>
                      ))}
                    </ul>
                  </article>
                )
              })}
            </div>
          ) : (
            <div className="rounded-[22px] bg-frame px-6 py-12 text-center shadow-[inset_0_0_0_1px_var(--line)]">
              <p className="text-base font-semibold">Belum ada panduan untuk “{query}”</p>
              <p className="mt-1.5 text-sm text-body">Coba kata kunci lain, atau tanyakan langsung ke tim kami.</p>
              <Link href="/bantuan" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-link">
                Lihat semua panduan
                <ArrowRight className="size-3.5" aria-hidden />
              </Link>
            </div>
          )}

          <div className="mt-8 flex flex-wrap items-center justify-between gap-5 rounded-[22px] bg-[#171717] p-[22px] text-[#fafafa] md:p-8 lg:mt-12 dark:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]">
            <div className="min-w-0 flex-[1_1_320px]">
              <h2 className="text-[22px] font-[650] tracking-[-0.02em] md:text-[26px]">Masih butuh bantuan?</h2>
              <p className="mt-2 text-[15px] leading-[1.55] text-[#a1a1a1]">
                Hubungi tim kami lewat WhatsApp atau email. Sertakan nama klub supaya kami bisa langsung membantu.
              </p>
            </div>
            <Link
              href="/kontak"
              className={cn(
                buttonVariants(),
                "h-12 w-full gap-2 rounded-xl px-[22px] text-[15px] font-semibold shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_1px_2px_rgba(202,53,0,0.3),0_6px_16px_-4px_rgba(202,53,0,0.35)] hover:bg-[#b32f00] md:w-auto"
              )}
            >
              Hubungi kami
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
