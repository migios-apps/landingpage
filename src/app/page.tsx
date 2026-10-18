import { Bento } from "@/components/landing/bento"
import { Faq, faqs } from "@/components/landing/faq"
import { Hero } from "@/components/landing/hero"
import { Pricing } from "@/components/landing/pricing"
import { Schedule } from "@/components/landing/schedule"
import { SiteFooter } from "@/components/landing/site-footer"
import { SiteHeader } from "@/components/landing/site-header"
import { planPrices, siteDescription, siteName, siteUrl } from "@/lib/site"

const monthlyOffer = (name: string, price: number) => ({
  "@type": "Offer",
  name,
  price,
  priceCurrency: "IDR",
  priceSpecification: {
    "@type": "UnitPriceSpecification",
    price,
    priceCurrency: "IDR",
    billingDuration: "P1M",
    unitText: "bulan",
  },
})

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: siteName,
      url: siteUrl,
      logo: `${siteUrl}/images/migios-logo-512.png`,
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      name: siteName,
      url: siteUrl,
      inLanguage: "id-ID",
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${siteUrl}/#software`,
      name: siteName,
      description: siteDescription,
      url: siteUrl,
      image: `${siteUrl}/images/dashboard.webp`,
      applicationCategory: "BusinessApplication",
      applicationSubCategory: "Software manajemen gym dan fitness",
      operatingSystem: "Web",
      inLanguage: "id-ID",
      publisher: { "@id": `${siteUrl}/#organization` },
      offers: [
        {
          "@type": "Offer",
          name: "Free",
          price: 0,
          priceCurrency: "IDR",
          description: "Masa trial 30 hari tanpa biaya",
        },
        monthlyOffer("Basic", planPrices.basic[0]),
        monthlyOffer("Pro", planPrices.pro[0]),
      ],
    },
    {
      "@type": "FAQPage",
      "@id": `${siteUrl}/#faq`,
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
  ],
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <a
        href="#konten"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-lg focus:bg-card focus:px-4 focus:py-2 focus:shadow-lg"
      >
        Lewati ke konten
      </a>
      <SiteHeader />
      <main id="konten">
        <Hero />
        <Bento />
        <Schedule />
        <Pricing />
        <Faq />
      </main>
      <SiteFooter />
    </>
  )
}
