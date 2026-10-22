import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"

import { Providers } from "@/components/providers"
import { getPricing } from "@/lib/pricing-data"
import { siteDescription, siteName, siteTitle, siteUrl } from "@/lib/site"

import "./globals.css"

const geistSans = Geist({ variable: "--font-sans", subsets: ["latin"] })
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export async function generateMetadata(): Promise<Metadata> {
  const description = siteDescription((await getPricing()).trial_days)
  return {
    metadataBase: new URL(siteUrl),
    title: { default: siteTitle, template: `%s · ${siteName}` },
    description,
    applicationName: siteName,
    keywords: [
      "software gym",
      "aplikasi manajemen gym",
      "aplikasi gym",
      "software fitness",
      "aplikasi membership gym",
      "kasir gym",
      "absensi wajah gym",
      "jadwal kelas gym",
      "aplikasi personal trainer",
      "Migios",
    ],
    authors: [{ name: siteName, url: siteUrl }],
    creator: siteName,
    publisher: siteName,
    category: "business",
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      locale: "id_ID",
      url: "/",
      siteName,
      title: siteTitle,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: siteTitle,
      description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    formatDetection: { telephone: false, email: false, address: false },
  }
}

export const viewport: Viewport = {
  themeColor: "#ffffff",
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // next-themes sets the theme class on <html> before hydration.
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
