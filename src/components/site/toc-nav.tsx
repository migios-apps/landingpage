"use client"

import { useEffect, useState } from "react"

// Table of contents beside long pages; the active entry follows the heading last scrolled past.
export function TocNav({ title, items }: { title: string; items: { id: string; label: string }[] }) {
  const [active, setActive] = useState(items[0]?.id)

  useEffect(() => {
    const onScroll = () => {
      let current = items[0]?.id
      for (const item of items) {
        const heading = document.getElementById(item.id)
        if (heading && heading.getBoundingClientRect().top <= 120) current = item.id
      }
      setActive(current)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [items])

  return (
    <nav aria-label={title}>
      <p className="font-mono text-[10px] tracking-[0.08em] text-subtle uppercase">{title}</p>
      <ul className="mt-2.5">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              aria-current={active === item.id ? "location" : undefined}
              className="block border-l-2 border-border py-1.5 pl-3 text-[13.5px] leading-[1.4] font-medium text-subtle transition-colors hover:text-foreground aria-[current=location]:border-brand aria-[current=location]:font-semibold aria-[current=location]:text-foreground"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
