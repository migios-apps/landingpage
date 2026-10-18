import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { InnerHeader } from "@/components/site/inner-header"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Halaman tidak ditemukan",
  description: "Halaman yang kamu cari mungkin sudah dipindahkan atau alamatnya salah ketik.",
}

const action = "h-12 w-full gap-2 rounded-xl px-[22px] text-[15px] font-semibold md:w-auto"

export default function NotFound() {
  return (
    <>
      <InnerHeader />
      <main
        id="konten"
        className="relative flex min-h-[640px] items-center justify-center overflow-hidden bg-background md:min-h-[760px]"
      >
        <Image
          src="/images/hero-gym-floor-full.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-[0.22] dark:hidden"
        />
        <Image
          src="/images/hero-gym-floor-full-dark.webp"
          alt=""
          fill
          sizes="100vw"
          className="hidden object-cover opacity-[0.22] dark:block"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,color-mix(in_srgb,var(--background)_55%,transparent)_0%,color-mix(in_srgb,var(--background)_92%,transparent)_60%,var(--background)_100%)]"
        />
        <div className="relative flex w-full flex-col items-center px-4 text-center md:px-8">
          <span className="font-mono text-[13px] tracking-[0.12em] text-link">ERROR 404</span>
          <p aria-hidden className="mt-2 text-[96px] leading-none font-[650] tracking-[-0.06em] md:text-[160px]">
            404
          </p>
          <h1 className="mt-3 text-[26px] font-[650] tracking-[-0.03em] md:text-[34px]">Halaman tidak ditemukan</h1>
          <p className="mt-3 max-w-[460px] text-[15px] leading-[1.55] text-body md:text-[17px]">
            Halaman yang kamu cari mungkin sudah dipindahkan atau alamatnya salah ketik.
          </p>
          <div className="mt-7 flex w-full flex-wrap justify-center gap-3 md:w-auto">
            <Link
              href="/"
              className={cn(
                buttonVariants(),
                action,
                "shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_1px_2px_rgba(202,53,0,0.3),0_6px_16px_-4px_rgba(202,53,0,0.35)] hover:bg-[#b32f00]"
              )}
            >
              Kembali ke beranda
              <ArrowRight className="size-4" aria-hidden />
            </Link>
            <Link
              href="/bantuan"
              className={cn(
                buttonVariants({ variant: "outline" }),
                action,
                "border-0 bg-card text-foreground shadow-[0_0_0_1px_var(--control-ring),0_1px_2px_rgba(0,0,0,0.05)] dark:bg-card"
              )}
            >
              Pusat bantuan
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}
