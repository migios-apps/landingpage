export type FeatureAccess = "included" | "addon" | "none"

export type PricingPeriod = { code: string; label: string; months: number; days: number }

export type PeriodPrice = PricingPeriod & { amount: number }

export type PricingPlan = {
  code: string
  name: string
  description: string | null
  is_trial: boolean
  addons_allowed: boolean
  prices: (PeriodPrice & { saving_percent: number })[]
  feature_groups: PricingPlanGroup[]
  capacities: {
    key: string
    label: string
    unit: string
    value: number | null
  }[]
}

export type PricingFeature = {
  key: string
  label: string
  access: Record<string, FeatureAccess>
  addon_prices: PeriodPrice[]
}

export type PricingPlanGroup = {
  label: string
  grouped: boolean
  features: {
    key: string
    label: string
    access: FeatureAccess
    addon_prices: PeriodPrice[]
  }[]
}

export type PricingAddon = {
  code: string
  name: string
  unit_label: string
  price_mode: "fixed" | "follow_plan"
  prices: PeriodPrice[]
  plans: string[]
}

export type Pricing = {
  currency: string
  trial_days: number | null
  periods: PricingPeriod[]
  plans: PricingPlan[]
  features: PricingFeature[]
  addons: PricingAddon[]
}

export const rupiah = (value: number) => `Rp ${String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`

export const priceFor = (prices: PeriodPrice[], code: string) =>
  prices.find((price) => price.code === code)?.amount ?? null

export const perPeriod = (price: PricingPeriod) =>
  price.code === "monthly" ? "/ bulan" : price.code === "yearly" ? "/ tahun" : `/ ${price.label.toLowerCase()}`
