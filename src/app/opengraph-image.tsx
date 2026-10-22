import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { ImageResponse } from "next/og"

import { getPricing } from "@/lib/pricing-data"

export const alt = "Migios, software manajemen gym dan fitness"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function OpengraphImage() {
  const trialDays = (await getPricing()).trial_days
  const logo = await readFile(join(process.cwd(), "public/images/migios-logo.svg"))
  const logoSrc = `data:image/svg+xml;base64,${logo.toString("base64")}`

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#ffffff",
          color: "#0a0a0a",
          borderBottom: "14px solid #f54a00",
        }}
      >
        <img src={logoSrc} alt="" width={177} height={52} />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 80, fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1.05 }}>
            Kelola gym kamu dari
          </div>
          <div style={{ fontSize: 80, fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1.05, color: "#f54a00" }}>
            satu layar.
          </div>
          <div style={{ marginTop: 28, fontSize: 30, lineHeight: 1.4, color: "#525252", maxWidth: 900 }}>
            Membership, kasir, jadwal kelas, sesi PT, absensi wajah, dan laporan keuangan dalam satu aplikasi.
          </div>
        </div>
        <div style={{ display: "flex", gap: 16 }}>
          {[trialDays ? `Gratis ${trialDays} hari` : "Coba gratis", "Kasir sudah termasuk", "Multi-cabang"].map((fact) => (
            <div
              key={fact}
              style={{
                display: "flex",
                alignItems: "center",
                height: 48,
                padding: "0 22px",
                borderRadius: 999,
                background: "#f54a0024",
                color: "#ca3500",
                fontSize: 24,
                fontWeight: 600,
              }}
            >
              {fact}
            </div>
          ))}
        </div>
      </div>
    ),
    size
  )
}
