import { cacheLife, cacheTag } from "next/cache"

import fallback from "@/content/pricing.json"
import type { Pricing } from "@/lib/pricing"

const apiUrl = process.env.MIGIOS_API_URL?.replace(/\/$/, "")

export async function getPricing(): Promise<Pricing> {
  "use cache"
  cacheLife({ stale: 300, revalidate: 600, expire: 86400 })
  cacheTag("pricing")

  if (!apiUrl) return fallback as Pricing
  try {
    const response = await fetch(`${apiUrl}/api/v1/public/pricing`)
    if (!response.ok) {
      console.warn(`Harga dari API gagal (HTTP ${response.status}), memakai content/pricing.json`)
      return fallback as Pricing
    }
    return (await response.json()).data as Pricing
  } catch (error) {
    console.warn("Harga dari API gagal, memakai content/pricing.json", error)
    return fallback as Pricing
  }
}
