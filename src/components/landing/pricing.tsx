import { PricingCards } from "@/components/landing/pricing-cards"
import { getPricing } from "@/lib/pricing-data"

export async function Pricing({ titleAs }: { titleAs?: "h1" | "h2" }) {
  const pricing = await getPricing()
  return <PricingCards pricing={pricing} titleAs={titleAs} />
}
