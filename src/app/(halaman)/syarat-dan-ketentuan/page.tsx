import { LegalPage } from "@/components/site/legal-page"
import legal from "@/content/legal.json"
import { pageMetadata } from "@/lib/site"

export const metadata = pageMetadata({
  path: legal.terms.path,
  title: legal.terms.title,
  description: `${legal.terms.description} Termasuk masa coba gratis, pembayaran langganan, dan kapasitas paket.`,
})

export default function TermsPage() {
  return <LegalPage document={legal.terms} />
}
