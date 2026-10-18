"use client"

import { useState } from "react"
import { Check, Link as LinkIcon, Mail, MessageCircle } from "lucide-react"

const button =
  "inline-flex size-9 items-center justify-center rounded-[10px] bg-card text-body-strong shadow-[0_0_0_1px_var(--border)] transition-colors hover:text-foreground"

export function ShareButtons({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="mt-2.5 flex gap-2">
      <button type="button" onClick={copy} aria-label="Salin tautan artikel" className={button}>
        {copied ? <Check className="size-4 text-brand" aria-hidden /> : <LinkIcon className="size-4" aria-hidden />}
      </button>
      <a
        href={`https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Bagikan lewat WhatsApp"
        className={button}
      >
        <MessageCircle className="size-4" aria-hidden />
      </a>
      <a
        href={`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`}
        aria-label="Bagikan lewat email"
        className={button}
      >
        <Mail className="size-4" aria-hidden />
      </a>
      <span role="status" className="sr-only">
        {copied ? "Tautan disalin" : ""}
      </span>
    </div>
  )
}
