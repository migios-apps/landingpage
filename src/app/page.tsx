import { Bento } from "@/components/landing/bento"
import { Faq, faqsFor } from "@/components/landing/faq"
import { Hero } from "@/components/landing/hero"
import { Pricing } from "@/components/landing/pricing"
import { Schedule } from "@/components/landing/schedule"
import { SiteFooter } from "@/components/landing/site-footer"
import { SiteHeader } from "@/components/landing/site-header"
import { type PeriodPrice, type Pricing as PricingData } from "@/lib/pricing"
import { getPricing } from "@/lib/pricing-data"
import { siteDescription, siteName, siteUrl } from "@/lib/site"

const offer = (name: string, price?: PeriodPrice) => ({
  "@type": "Offer",
  name,
  price: price?.amount ?? 0,
  priceCurrency: "IDR",
  priceSpecification: {
    "@type": "UnitPriceSpecification",
    price: price?.amount ?? 0,
    priceCurrency: "IDR",
    billingDuration: price?.days ? `P${price.days}D` : `P${price?.months ?? 1}M`,
    unitText: price?.days ? "hari" : "bulan",
  },
})

const jsonLdFor = (pricing: PricingData) => ({
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
      description: siteDescription(pricing.trial_days),
      url: siteUrl,
      image: `${siteUrl}/images/dashboard.webp`,
      applicationCategory: "BusinessApplication",
      applicationSubCategory: "Software manajemen gym dan fitness",
      operatingSystem: "Web",
      inLanguage: "id-ID",
      publisher: { "@id": `${siteUrl}/#organization` },
      offers: pricing.plans.map((plan) =>
        plan.is_trial
          ? {
              "@type": "Offer",
              name: plan.name,
              price: 0,
              priceCurrency: "IDR",
              description: `Masa trial ${pricing.trial_days} hari tanpa biaya`,
            }
          : offer(plan.name, plan.prices.find((price) => price.code === "monthly") ?? plan.prices[0]),
      ),
    },
    {
      "@type": "FAQPage",
      "@id": `${siteUrl}/#faq`,
      mainEntity: faqsFor(pricing).map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
  ],
})

export default async function Home() {
  const pricing = await getPricing()
  const jsonLd = jsonLdFor(pricing)
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
        <Hero trialDays={pricing.trial_days} />
        <Bento />
        <Schedule />
        <Pricing />
        <Faq />
      </main>
      <SiteFooter />
    </>
  )
}
