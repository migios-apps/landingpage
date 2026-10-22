import { writeFile } from "node:fs/promises"
import { join } from "node:path"

const apiUrl = (process.env.MIGIOS_API_URL ?? "").replace(/\/$/, "")
if (!apiUrl) {
  console.error("MIGIOS_API_URL belum diisi.")
  process.exit(1)
}

const response = await fetch(`${apiUrl}/api/v1/public/pricing`)
if (!response.ok) {
  console.error(`Gagal mengambil harga: HTTP ${response.status}`)
  process.exit(1)
}

const { data } = await response.json()
const target = join(process.cwd(), "src/content/pricing.json")
await writeFile(target, `${JSON.stringify(data, null, 2)}\n`)
console.log(`Harga tersimpan di ${target}`)
