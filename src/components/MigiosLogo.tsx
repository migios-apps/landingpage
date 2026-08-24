/**
 * Migios brand mark and logo lockup. The mark is the brand's white
 * three-pillar glyph (android-chrome-512x512.png) on an orange gradient
 * tile so it reads on light backgrounds; `MigiosMarkPlain` renders the
 * bare white glyph for use on dark or colored surfaces.
 */

export function MigiosMarkPlain({ className }: { className?: string }) {
  return (
    <img
      src="/images/migios-mark.png"
      alt=""
      aria-hidden="true"
      className={className}
    />
  )
}

export function MigiosMark({ className = "size-8" }: { className?: string }) {
  return (
    <span
      className={`inline-flex aspect-square items-center justify-center rounded-[24%] bg-[linear-gradient(135deg,#fe3200_0%,#fc8c04_100%)] ${className}`}
    >
      <MigiosMarkPlain className="w-[64%]" />
    </span>
  )
}

export function MigiosLogo({ className = "h-8" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <MigiosMark className="h-full" />
      <span className="text-[1.35em] font-semibold leading-none tracking-[-0.02em] text-[#131316]">
        migios
      </span>
    </span>
  )
}
