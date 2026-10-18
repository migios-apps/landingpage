"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, ChevronDown } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { emailHref, whatsappHref } from "@/lib/site"
import { cn } from "@/lib/utils"

const topics = ["Fitur dan harga", "Bantuan memulai", "Pindah dari spreadsheet", "Absensi wajah", "Kerja sama", "Lainnya"]
const branchCounts = ["1 cabang", "2 sampai 3 cabang", "4 sampai 10 cabang", "Lebih dari 10 cabang"]

const control =
  "h-10 w-full min-w-0 rounded-[10px] bg-card px-3 text-sm text-foreground shadow-[0_0_0_1px_var(--border)] outline-none placeholder:text-neutral-400 focus-visible:shadow-[0_0_0_1px_var(--ring),0_0_0_4px_color-mix(in_srgb,var(--ring)_25%,transparent)] dark:placeholder:text-neutral-500"
const label = "flex min-w-0 flex-col gap-1.5"
const labelText = "text-[13px] font-semibold text-neutral-800 dark:text-neutral-200"

// There is no message endpoint yet, so the form hands the message to WhatsApp, or to the visitor's
// email app when only an email address is configured. With neither configured (dummy stage) it only
// confirms on the page and sends nothing.
export function ContactForm() {
  const [sent, setSent] = useState(false)
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const field = (name: string) => String(data.get(name) ?? "").trim()
    const details = [
      ["Topik", field("topik")],
      ["Jumlah cabang", field("cabang")],
      ["Email", field("email")],
      ["WhatsApp", field("whatsapp")],
    ]
      .filter(([, value]) => value)
      .map(([key, value]) => `${key}: ${value}`)
    const greeting = `Halo Migios, saya ${field("nama")}${field("klub") ? ` dari ${field("klub")}` : ""}.`
    const text = [greeting, ...details, "", field("pesan")].join("\n")

    if (whatsappHref) {
      window.open(`${whatsappHref}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer")
    } else if (emailHref) {
      const subject = `Pesan dari ${field("nama")}${field("klub") ? `, ${field("klub")}` : ""}`
      window.open(`${emailHref}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`, "_self")
    } else {
      setSent(true)
      event.currentTarget.reset()
    }
  }

  const select = (name: string, placeholder: string, options: string[]) => (
    <span className="relative">
      <select
        name={name}
        defaultValue=""
        className={cn(
          control,
          "appearance-none pr-9 has-[option[value='']:checked]:text-neutral-400 dark:[color-scheme:dark] dark:has-[option[value='']:checked]:text-neutral-500"
        )}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
      <ChevronDown
        className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-subtle"
        aria-hidden
      />
    </span>
  )

  return (
    <form
      onSubmit={onSubmit}
      aria-labelledby="kirim-pesan"
      className="flex min-w-0 flex-[1.35_1_560px] flex-col gap-4 rounded-[20px] bg-card p-5 shadow-[0_0_0_1px_var(--card-ring),0_2px_4px_rgba(0,0,0,0.04)] md:p-7"
    >
      <h2 id="kirim-pesan" className="text-xl font-[650] tracking-[-0.02em]">
        Kirim pesan
      </h2>
      <div className="grid gap-4 md:grid-cols-2">
        <label className={label}>
          <span className={labelText}>Nama lengkap</span>
          <input name="nama" required autoComplete="name" placeholder="Nama kamu" className={control} />
        </label>
        <label className={label}>
          <span className={labelText}>Email</span>
          <input name="email" type="email" autoComplete="email" placeholder="nama@email.com" className={control} />
        </label>
        <label className={label}>
          <span className={labelText}>Nomor WhatsApp</span>
          <input
            name="whatsapp"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="08xx xxxx xxxx"
            className={control}
          />
        </label>
        <label className={label}>
          <span className={labelText}>Nama klub</span>
          <input name="klub" autoComplete="organization" placeholder="Nama gym atau studio" className={control} />
        </label>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <label className={label}>
          <span className={labelText}>Topik</span>
          {select("topik", "Pilih topik", topics)}
        </label>
        <label className={label}>
          <span className={labelText}>Jumlah cabang</span>
          {select("cabang", "Pilih jumlah", branchCounts)}
        </label>
      </div>
      <label className={label}>
        <span className={labelText}>Pesan</span>
        <textarea
          name="pesan"
          required
          rows={5}
          placeholder="Tulis pertanyaan atau kebutuhan klub kamu"
          className={cn(control, "h-[120px] resize-y py-2.5 leading-normal")}
        />
      </label>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-[12.5px] text-subtle">
          Dengan mengirim pesan, kamu menyetujui{" "}
          <Link href="/kebijakan-privasi" className="underline underline-offset-2 hover:text-foreground">
            kebijakan privasi
          </Link>{" "}
          Migios.
        </p>
        <button
          type="submit"
          className={cn(
            buttonVariants(),
            "h-12 w-full gap-2 rounded-xl px-[22px] text-[15px] font-semibold shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_1px_2px_rgba(202,53,0,0.3),0_6px_16px_-4px_rgba(202,53,0,0.35)] hover:bg-[#b32f00] md:w-auto"
          )}
        >
          Kirim pesan
          <ArrowRight className="size-4" aria-hidden />
        </button>
      </div>
      {sent && (
        <p role="status" className="rounded-xl bg-success-soft px-3.5 py-2.5 text-sm text-success-text">
          Terima kasih, pesanmu sudah kami terima. Kami akan membalas lewat email atau WhatsApp.
        </p>
      )}
    </form>
  )
}
