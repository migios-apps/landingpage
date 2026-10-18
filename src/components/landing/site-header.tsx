"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { buttonVariants } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { signInHref, signUpHref } from "@/lib/site"
import { cn } from "@/lib/utils"

// Same menu as the inner-page header; Fitur stays an in-page anchor on the landing page.
const links = [
  { href: "#fitur", label: "Fitur" },
  { href: "/harga", label: "Harga" },
  { href: "/blog", label: "Blog" },
  { href: "/bantuan", label: "Bantuan" },
  { href: "/kontak", label: "Kontak" },
]

const outlinePill =
  "bg-card text-foreground shadow-[0_0_0_1px_var(--border),0_1px_2px_rgba(0,0,0,0.05)] dark:bg-card/60 dark:shadow-[inset_0_0_0_1px_var(--border)]"

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()

  // The header floats transparent over the hero photo and gains a backdrop once the page scrolls.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-200",
        scrolled ? "border-line bg-background/80 backdrop-blur-[10px]" : "border-transparent"
      )}
    >
      <nav
        aria-label="Navigasi utama"
        className="mx-auto flex h-[68px] max-w-[1440px] items-center justify-between gap-6 px-4 md:h-[76px] md:px-8 lg:h-[84px] lg:px-12"
      >
        <a href="#" aria-label="Migios, ke beranda" className="flex shrink-0 items-center">
          <Image
            src="/images/migios-logo.svg"
            alt="Migios"
            width={88}
            height={26}
            unoptimized
            className="h-[26px] w-auto dark:invert"
          />
        </a>

        <div className="hidden items-center gap-[26px] text-sm font-medium md:flex lg:gap-[34px]">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-body-strong transition-colors hover:text-foreground dark:text-white/82 dark:hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex shrink-0 items-center gap-2.5">
          {/* Both icons render; CSS picks one, so server and client markup match before the theme is known. */}
          <button
            type="button"
            aria-label="Ganti mode terang atau gelap"
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className="inline-flex size-11 items-center justify-center rounded-full text-foreground transition-colors hover:bg-foreground/5 md:size-[38px]"
          >
            <Moon className="size-[18px] dark:hidden" aria-hidden />
            <Sun className="hidden size-[18px] dark:block" aria-hidden />
          </button>
          <a
            href={signInHref}
            className={cn(
              outlinePill,
              "hidden h-[38px] items-center rounded-full px-[18px] text-[13.5px] font-semibold md:inline-flex"
            )}
          >
            Masuk
          </a>
          <a
            href={signUpHref}
            className={cn(
              buttonVariants(),
              "h-[38px] rounded-full px-[18px] text-[13.5px] font-semibold shadow-[inset_0_1px_0_rgba(255,255,255,0.22),0_1px_2px_rgba(202,53,0,0.3)] hover:bg-[#b32f00]"
            )}
          >
            Coba Gratis
          </a>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              aria-label="Buka menu"
              className={cn(outlinePill, "inline-flex size-11 items-center justify-center rounded-full md:hidden")}
            >
              <Menu className="size-5" aria-hidden />
            </SheetTrigger>
            <SheetContent
              side="right"
              className="gap-1 rounded-2xl border p-3 pt-14 data-[side=right]:inset-y-2 data-[side=right]:right-2 data-[side=right]:h-auto data-[side=right]:w-[calc(100%-1rem)] data-[side=right]:max-w-xs"
            >
              <SheetTitle className="sr-only">Menu</SheetTitle>
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex h-11 items-center rounded-[10px] px-3 text-[15px] font-medium hover:bg-muted"
                >
                  {link.label}
                </Link>
              ))}
              <a
                href={signInHref}
                onClick={() => setOpen(false)}
                className="flex h-11 items-center rounded-[10px] px-3 text-[15px] font-medium hover:bg-muted"
              >
                Masuk
              </a>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  )
}
