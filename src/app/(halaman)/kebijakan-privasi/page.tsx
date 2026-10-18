import { LegalPage } from "@/components/site/legal-page"
import legal from "@/content/legal.json"
import { pageMetadata } from "@/lib/site"

export const metadata = pageMetadata({
  path: legal.privacy.path,
  title: legal.privacy.title,
  description: `${legal.privacy.description} Termasuk data member, transaksi, dan data wajah untuk absensi.`,
})

export default function PrivacyPage() {
  return <LegalPage document={legal.privacy} />
}
