# Migios landing page

Landing page SaaS Migios (software manajemen gym dan fitness), dibangun dari canvas Claude Design
[Migios Landing Page](https://claude.ai/artifact/D3EH6VTk8BcdHp2hJeirin).

Stack: Next.js 16.4.2 (App Router, Turbopack), Tailwind CSS 4.3.3, shadcn 4.22.0 dengan Base UI, Motion 14.3.0.
Semua dependency di-pin ke versi exact (`.npmrc` berisi `save-exact=true`).

## Menjalankan

```bash
npm install
cp .env.example .env.local
npm run dev
```

Halaman tersedia di http://localhost:3000.

## Environment

| Variabel | Fungsi |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | URL publik landing page. Dipakai untuk canonical, Open Graph, `sitemap.xml`, dan `robots.txt`. Wajib diisi di production. |
| `NEXT_PUBLIC_APP_URL` | URL backoffice Migios. Tombol "Masuk" dan "Coba Gratis" menuju `/sign-in` dan `/sign-up` di sana. Kosongkan agar tombol menggulir ke section CTA. |
| `NEXT_PUBLIC_CONTACT_WHATSAPP` | Nomor WhatsApp tim Migios (format internasional, angka saja) untuk halaman Kontak. Kosongkan bila belum ada: kartu WhatsApp tampil tanpa tautan. |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Email tim Migios untuk halaman Kontak. Form Kontak membuka WhatsApp bila nomor diisi, jika tidak membuka aplikasi email; tombol kirim nonaktif bila keduanya kosong. |

## SEO

- Metadata lengkap di `src/app/layout.tsx`: title template, description, keywords, canonical, Open Graph, Twitter card, robots.
- Structured data JSON-LD di `src/app/page.tsx`: Organization, WebSite, SoftwareApplication (dengan harga paket), dan FAQPage.
- `sitemap.xml`, `robots.txt`, dan web manifest dari `src/app/sitemap.ts`, `robots.ts`, `manifest.ts`.
- Gambar Open Graph dibuat otomatis oleh `src/app/opengraph-image.tsx`. Favicon, `icon.png`, `apple-icon.png`, dan ikon manifest memakai logo putih yang sama dengan backoffice; logo oranye `public/images/migios-logo-512.png` dipakai untuk structured data.
- Halaman dirender statis: satu `h1`, heading per section, alt text di semua gambar, dan `lang="id"`.

## Halaman

| Route | Isi |
| --- | --- |
| `/` | Landing page |
| `/harga` | Paket, tabel perbandingan, FAQ |
| `/blog`, `/blog/[slug]` | Daftar artikel (filter kategori, pencarian, dan halaman lewat query string) dan artikel |
| `/bantuan` | Pusat bantuan dengan pencarian panduan (`?q=`) |
| `/kontak` | Form pesan dan kanal kontak |
| `/tentang` | Tentang Migios |
| `/kebijakan-privasi`, `/syarat-dan-ketentuan` | Dokumen legal |

Konten blog, panduan bantuan, dan teks legal adalah data dummy JSON di `src/content/`. Artikel hanya punya
halaman sendiri bila memiliki `body`; artikel lain tampil sebagai pratinjau di daftar.

## Struktur

```
src/app/                    layout, landing page, 404, file metadata SEO
src/app/(halaman)/          halaman dalam dengan header solid dan footer bersama
src/components/landing/     section: header, hero, bento, penjadwalan, harga, FAQ, footer
src/components/site/        header halaman dalam, hero halaman, daftar isi, layout legal
src/components/blog/        kartu artikel dan tombol bagikan
src/content/                data dummy JSON: blog, bantuan, legal
src/components/ui/          komponen shadcn (Base UI)
src/lib/site.ts             konfigurasi situs, URL CTA, dan harga paket
public/images/              logo dan screenshot produk asli
```
