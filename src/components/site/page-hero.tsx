import { cn } from "@/lib/utils"

// Opening section of the inner pages: dotted backdrop, eyebrow, h1 and lead, then the page's first block.
export function PageHero({
  eyebrow,
  title,
  description,
  align = "center",
  className,
  children,
}: {
  eyebrow: string
  title: string
  description: React.ReactNode
  align?: "center" | "left"
  className?: string
  children?: React.ReactNode
}) {
  return (
    <section className="relative overflow-hidden bg-background">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(circle,var(--dot)_1px,transparent_1.3px)] bg-size-[22px_22px] [mask-image:linear-gradient(180deg,#000_0%,transparent_85%)]"
      />
      <div className={cn("relative mx-auto max-w-[1200px] px-4 pt-12 pb-8 md:px-8 md:pt-16 lg:pt-20 lg:pb-14", className)}>
        <div className={cn("flex flex-col", align === "center" ? "items-center text-center" : "items-start")}>
          <span className="text-sm font-semibold text-link">{eyebrow}</span>
          <h1 className="mt-3 max-w-[820px] text-[36px] leading-[1.05] font-[650] tracking-[-0.04em] text-balance md:text-[48px] lg:text-[56px]">
            {title}
          </h1>
          <p className="mt-4 max-w-[620px] text-base leading-[1.55] text-pretty text-body md:text-lg">{description}</p>
        </div>
        {children}
      </div>
    </section>
  )
}
