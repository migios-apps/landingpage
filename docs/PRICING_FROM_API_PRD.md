# PRD — Harga Landing Page dari API

- **Status**: Diimplementasikan 2026-10-22 (belum di-commit). `getPricing` ada di
  `src/lib/pricing-data.ts` (server saja); tipe dan format di `src/lib/pricing.ts` dipakai juga oleh
  client component.
- **Scope**: `ladingpage-next` — semua harga, kapasitas, fitur paket, add-on, dan lama masa trial
  dibaca dari backend, tidak lagi ditulis di kode.
- **Bergantung pada**: `GET /v1/public/pricing` di
  `migios-be/docs/SUBSCRIPTION_PRICING_ADDON_PRD.md` §7 (katalog Free Trial 14 hari, Starter,
  Basic, Pro, add-on fitur).
- **Desain katalog**: canvas https://claude.ai/artifact/RadcoELpwwy9UdE8s99b4k. Tampilan landing
  page tetap mengikuti canvas landing page https://claude.ai/artifact/D3EH6VTk8BcdHp2hJeirin;
  struktur Pricing dan halaman Harga di canvas itu perlu disesuaikan ke empat paket dan
  status Termasuk/Add-on sebelum diimplementasikan.

## 1. Masalah sekarang

Katalog lama ditulis di kode dan sudah tidak sesuai:

| Lokasi | Isi sekarang |
| --- | --- |
| `src/lib/site.ts` `planPrices`, `planCapacity`, `planFeatures` | Free / Basic Rp 100.000 / Pro Rp 400.000, member 20/300/5.000, kelas per bulan, 7 fitur |
| `src/components/landing/pricing.tsx` `addons` | member pack per 100, kelas tambahan, cabang Rp 249.000 |
| `src/app/page.tsx` JSON-LD `offers` | Free "Masa trial 30 hari", Basic, Pro |
| Teks "30 hari" | `site.ts` `siteDescription`, `hero.tsx`, `pricing.tsx`, `site-footer.tsx`, `faq.tsx`, `harga/page.tsx`, `tentang/page.tsx`, `opengraph-image.tsx`, `content/legal.json` |

Setiap perubahan harga di owner SaaS menuntut edit kode dan deploy landing page, dan mudah
terlewat.

## 2. Keputusan

1. **Satu sumber**: `GET /v1/public/pricing`. Landing page tidak menyimpan angka harga, kapasitas,
   atau daftar fitur di kode.
2. **Tetap statis untuk SEO**: data dibaca di server dengan Cache Components (`cacheComponents`
   sudah aktif di `next.config.ts`), masuk ke HTML prerender, dan diperbarui di latar belakang.
3. **Tidak pernah kosong**: bila API gagal saat build atau saat revalidasi, pakai salinan JSON
   terakhir yang disimpan di repo.

## 3. Pengambilan data

File baru `src/lib/pricing.ts`:

```ts
import { cacheLife, cacheTag } from "next/cache"
import fallback from "@/content/pricing.json"

export async function getPricing(): Promise<Pricing> {
  "use cache"
  cacheLife({ stale: 300, revalidate: 600, expire: 86400 })
  cacheTag("pricing")
  try {
    const res = await fetch(`${apiUrl}/api/v1/public/pricing`)
    if (!res.ok) return fallback as Pricing
    return (await res.json()).data as Pricing
  } catch {
    return fallback as Pricing
  }
}
```

- Env baru server-only `MIGIOS_API_URL` (origin backend tanpa `/api/v1`), tambahkan ke
  `.env.example` dengan keterangan. Bila kosong, langsung pakai fallback.
- `revalidate: 600`: perubahan di owner SaaS tampil paling lama ±10 menit. Backend hanya dipanggil
  sekali per revalidasi per instance; di backend pun respons sudah di-cache Redis.
- Tipe `Pricing` mengikuti contoh respons di PRD backend §7. Tidak ada field yang di-hardcode
  di komponen selain teks pemasaran.
- `src/content/pricing.json`: salinan respons terakhir. Diperbarui dengan skrip
  `npm run pricing:snapshot` (fetch endpoint, tulis file). Jalankan sebelum rilis.

## 4. Yang membaca data

| Tempat | Perubahan |
| --- | --- |
| `components/landing/pricing.tsx` | Kartu Free Trial, Starter, Basic, Pro dari `plans`; toggle periode dari `periods`; "hemat X%" dari `saving_percent`; kapasitas dari `capacities`; fitur dari `plans[].feature_groups` sesuai urutan yang disusun owner per paket (✓ termasuk, ✓ "· x dari y" grup sebagian, + "· add-on"); baris `grouped` punya tombol ikon info yang membuka tooltip berisi anggota grup (✓ / + "add-on Rp x/bln"), aturan sama dengan `migios-be/docs/SUBSCRIPTION_PRICING_ADDON_PRD.md` §3.4; daftar add-on dari `addons` (cabang: "Ikut harga paket"). Komponen tetap client component untuk toggle, data dikirim sebagai props dari server component pembungkus. |
| `app/(halaman)/harga/page.tsx` | Tabel perbandingan dibangun dari `features` (satu seksi "Fitur", baris per fitur, kolom per paket, sel ✓ / "Add-on Rp x/bln" / —) dan `capacities`. Metadata deskripsi memakai `trial_days`. |
| `app/page.tsx` JSON-LD | `offers` dari `plans` (harga bulanan); trial: `"Masa trial ${trial_days} hari tanpa biaya"`. |
| Teks trial | Semua "30 hari" di tabel §1 diganti `trial_days` dari data. `siteDescription` menjadi fungsi atau dibangun di `generateMetadata`. `legal.json` memakai placeholder `{trial_days}` yang diganti saat render. |
| `opengraph-image.tsx` | Fakta "Gratis {trial_days} hari". |
| `lib/site.ts` | Hapus `planPrices`, `planCapacity`, `planFeatures`. |

Paket dengan `is_trial` (Free Trial) tampil dengan harga "Rp 0" dan sufiks "/ {trial_days} hari".

Kartu harga selalu menampilkan blok Kapasitas lalu Fitur. Free Trial menampilkan satu baris grup
"Semua fitur Basic" dari susunan paketnya.

## 5. Aturan tampilan

- Urutan paket dan fitur mengikuti respons (owner SaaS yang mengatur urutan).
- Fitur `access = none` di semua paket tidak ditampilkan.
- Harga selalu diformat `id-ID` (`Rp 149.000`).
- Bila fallback dipakai, halaman tetap sama; tidak ada pesan error untuk pengunjung. Tulis
  `console.warn` di server.

## 6. Verifikasi

`npm run lint` dan `npm run build` (landing page bukan bagian aturan "tanpa build" backoffice),
lalu cek di Browser pane lewat preview `ladingpage-next`:

1. Dengan backend lokal menyala: Pricing dan Harga menampilkan empat paket, Starter Rp 149.000,
   hemat 8% / 17%, fitur Termasuk/Add-on sesuai PRD backend §3.3, teks "14 hari".
2. Ubah harga Starter di owner SaaS → setelah ±10 menit (atau restart preview), landing page
   memakai harga baru.
3. Matikan backend → build tetap berhasil dan halaman memakai `content/pricing.json`.
4. JSON-LD di halaman utama memuat `offers` dengan harga dari API.

## 8. Durasi hari dan bulan (2026-10-22)

Toggle periode dibangun dari `periods` API (bisa berisi durasi hari, misalnya "30 Hari") dan dipilih
berdasarkan `code`. Harga kartu = harga paket untuk `code` terpilih, atau harga bulanannya, atau harga
pertamanya; sufiks dari durasi harga itu ("/ bulan", "/ tahun", "/ 30 hari") dan baris bawah
"Berlaku n hari" untuk durasi hari. Header tabel perbandingan dan JSON-LD memakai harga bulanan atau
harga pertama paket. Judul add-on "Harga per {durasi}".

