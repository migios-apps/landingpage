import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { getPricing } from "@/lib/pricing-data"
import { signInHref, signUpHref } from "@/lib/site"
import { cn } from "@/lib/utils"

const columns = [
  {
    title: "Produk",
    links: [
      { href: "/#fitur", label: "Fitur" },
      { href: "/harga", label: "Harga" },
      { href: "/#jadwal", label: "Aplikasi member" },
      { href: "/#fitur", label: "Migios Desk" },
    ],
  },
  {
    title: "Bantuan",
    links: [
      { href: "/#faq", label: "FAQ" },
      { href: "/bantuan", label: "Panduan" },
      { href: "/kontak", label: "Hubungi kami" },
    ],
  },
  {
    title: "Akun",
    links: [
      { href: signInHref, label: "Masuk" },
      { href: signUpHref, label: "Daftar klub" },
    ],
  },
]

export async function SiteFooter() {
  const trialDays = (await getPricing()).trial_days
  return (
    <footer className="overflow-hidden bg-[#0a0a0a] text-[#fafafa] dark:border-t dark:border-white/8">
      <div className="mx-auto max-w-[1200px] px-4 pt-12 md:px-8 md:pt-[72px] lg:pt-24">
        <section
          id="daftar"
          aria-labelledby="daftar-title"
          className="relative flex flex-wrap items-end justify-between gap-8 overflow-hidden rounded-[28px] bg-[#171717] p-6 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)] md:p-10 lg:p-16"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.08)_1px,transparent_1.3px)] bg-size-[20px_20px] [mask-image:linear-gradient(90deg,transparent_20%,#000_100%)]"
          />
          <div className="relative min-w-0 flex-[1_1_420px]">
            <h2
              id="daftar-title"
              className="max-w-[640px] text-[32px] leading-[1.05] font-[650] tracking-[-0.035em] text-balance md:text-[42px] lg:text-[52px]"
            >
              Rapikan operasional gym kamu mulai hari ini.
            </h2>
            <p className="mt-4 max-w-[520px] text-[17px] leading-[1.55] text-pretty text-[#a1a1a1]">
              {trialDays ? `Coba gratis ${trialDays} hari. ` : ""}Buat klub, atur paket dan jadwal, lalu mulai jualan dari kasir.
            </p>
          </div>
          <div className="relative flex w-full flex-wrap gap-3 md:w-auto">
            <a
              href={signUpHref}
              className={cn(
                buttonVariants(),
                "h-12 basis-full gap-2 rounded-xl px-[22px] text-[15px] font-semibold shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_8px_20px_-6px_rgba(202,53,0,0.6)] hover:bg-[#b32f00] md:basis-auto"
              )}
            >
              Coba Gratis
              <ArrowRight className="size-4" aria-hidden />
            </a>
            <Link
              href="/harga"
              className="inline-flex h-12 basis-full items-center justify-center rounded-xl bg-white/6 px-[22px] text-[15px] font-semibold text-[#fafafa] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.16)] transition-colors hover:bg-white/10 md:basis-auto"
            >
              Lihat Harga
            </Link>
          </div>
        </section>

        <div className="mt-14 flex flex-wrap gap-x-12 gap-y-10 md:mt-20">
          <div className="min-w-0 flex-[2_1_280px]">
            <Image
              src="/images/migios-logo.svg"
              alt="Migios"
              width={88}
              height={26}
              unoptimized
              className="h-[26px] w-auto invert"
            />
            <p className="mt-4 max-w-[340px] text-sm leading-[1.6] text-[#a1a1a1]">
              Software manajemen gym dan fitness: membership, kasir, jadwal, absensi, dan laporan dalam satu aplikasi.
            </p>
          </div>
          {columns.map((column) => (
            <nav key={column.title} aria-label={column.title} className="min-w-0 flex-[1_1_140px]">
              <h3 className="text-[13px] font-semibold">{column.title}</h3>
              <ul className="mt-3.5 flex flex-col gap-2.5 text-sm">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-[#a1a1a1] transition-colors hover:text-[#fafafa]">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-white/8 py-5 text-[13px] text-[#8a8a8a]">
          <p>© 2026 Migios. Semua hak dilindungi.</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <Link href="/kebijakan-privasi" className="transition-colors hover:text-[#fafafa]">
              Kebijakan privasi
            </Link>
            <Link href="/syarat-dan-ketentuan" className="transition-colors hover:text-[#fafafa]">
              Syarat dan ketentuan
            </Link>
          </div>
        </div>
      </div>

      <div aria-hidden className="mx-auto h-[72px] max-w-[1200px] overflow-hidden px-4 md:h-[150px] md:px-8 lg:h-[210px]">
        <Image
          src="/images/migios-logo.svg"
          alt=""
          width={8204}
          height={2411}
          unoptimized
          className="block h-auto w-full opacity-[0.07] invert"
        />
      </div>
    </footer>
  )
}
