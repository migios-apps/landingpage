import { SiteFooter } from "@/components/landing/site-footer"
import { InnerHeader } from "@/components/site/inner-header"

export default function InnerPagesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a
        href="#konten"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-lg focus:bg-card focus:px-4 focus:py-2 focus:shadow-lg"
      >
        Lewati ke konten
      </a>
      <InnerHeader />
      <main id="konten">{children}</main>
      <SiteFooter />
    </>
  )
}
