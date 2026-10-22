import Image from "next/image"
import { Monitor, RefreshCw, ScanFace, ShieldCheck, Smartphone, Smile, Tag } from "lucide-react"

import { PageHero } from "@/components/site/page-hero"
import { getPricing } from "@/lib/pricing-data"
import { pageMetadata } from "@/lib/site"

export const metadata = pageMetadata({
  path: "/tentang",
  title: "Tentang kami",
  description:
    "Migios adalah software manajemen gym dan fitness untuk pemilik klub, kasir, coach, resepsionis, dan member, dalam satu aplikasi yang terhubung.",
})

const principlesFor = (trialDays: number | null) => [
  {
    title: "Mudah dipakai staf",
    description: "Kasir dan resepsionis bisa langsung bekerja tanpa pelatihan panjang.",
    Icon: Smile,
  },
  {
    title: "Data klub aman",
    description: "Data member, transaksi, dan wajah tersimpan dengan aman dan hanya bisa diakses sesuai hak akses.",
    Icon: ShieldCheck,
  },
  {
    title: "Harga yang jelas",
    description: trialDays
      ? `Paket dan add-on tertulis terbuka, mulai dari masa coba gratis ${trialDays} hari.`
      : "Paket dan add-on tertulis terbuka.",
    Icon: Tag,
  },
  {
    title: "Terus diperbarui",
    description: "Fitur baru dan perbaikan dirilis berdasarkan masukan klub.",
    Icon: RefreshCw,
  },
]

const sectionTitle = "text-[28px] leading-[1.1] font-[650] tracking-[-0.035em] text-balance md:text-[34px] lg:text-[40px]"
const card = "flex min-w-0 flex-col gap-3.5 rounded-[20px] bg-card p-3.5 shadow-[0_0_0_1px_var(--card-ring),0_2px_4px_rgba(0,0,0,0.04)]"
const iconChip = "inline-flex shrink-0 items-center justify-center rounded-[11px] bg-brand-soft text-brand-icon"

export default async function AboutPage() {
  const principles = principlesFor((await getPricing()).trial_days)
  return (
    <>
      <PageHero
        eyebrow="Tentang kami"
        title="Kami membuat gym lebih mudah dikelola"
        description="Migios adalah software manajemen gym dan fitness untuk pemilik klub, kasir, coach, resepsionis, dan member, dalam satu aplikasi yang terhubung."
      >
        <div className="relative mt-8 aspect-[4/3] overflow-hidden rounded-2xl bg-muted shadow-[inset_0_0_0_1px_var(--card-ring)] md:aspect-[21/9] lg:mt-14 lg:rounded-3xl">
          <Image
            src="/images/hero-gym-floor-full.webp"
            alt="Area latihan gym yang terang dengan treadmill, bangku, dan rak beban"
            fill
            loading="eager"
            fetchPriority="high"
            sizes="(min-width: 1200px) 1136px, calc(100vw - 32px)"
            className="object-cover dark:hidden"
          />
          <Image
            src="/images/hero-gym-floor-full-dark.webp"
            alt="Area latihan gym saat senja dengan treadmill, bangku, dan rak beban"
            fill
            sizes="(min-width: 1200px) 1136px, calc(100vw - 32px)"
            className="hidden object-cover dark:block"
          />
        </div>
      </PageHero>

      <section aria-labelledby="cerita-title" className="bg-background">
        <div className="mx-auto flex max-w-[1200px] flex-wrap gap-x-16 gap-y-4 px-4 py-12 md:px-8 lg:py-[88px]">
          <h2 id="cerita-title" className={`flex-[1_1_380px] ${sectionTitle}`}>
            Operasional gym tidak harus rumit
          </h2>
          <div className="flex flex-[1.4_1_520px] flex-col gap-4 text-base leading-[1.7] text-neutral-800 md:text-[17px] dark:text-neutral-300">
            <p>
              Banyak klub masih mencatat member di buku, menghitung komisi di spreadsheet, dan mengirim pengingat satu
              per satu. Waktu pemilik dan staf habis untuk administrasi, bukan untuk member.
            </p>
            <p>
              Migios menyatukan membership, kasir, jadwal kelas, sesi PT, absensi, dan laporan keuangan. Setiap
              transaksi dan kunjungan tercatat otomatis, jadi keputusan bisa diambil dari data, bukan tebakan.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="produk-title" className="border-t border-line bg-frame">
        <div className="mx-auto max-w-[1200px] px-4 py-14 md:px-8 lg:py-24">
          <div className="flex flex-col items-center text-center">
            <span className="text-sm font-semibold text-link">Yang kami bangun</span>
            <h2 id="produk-title" className={`mt-3 max-w-[680px] ${sectionTitle}`}>
              Tiga aplikasi, satu data klub
            </h2>
          </div>
          <div className="mt-7 grid gap-3 lg:mt-10 lg:grid-cols-3">
            <article className={card}>
              <div className="relative h-[220px] overflow-hidden rounded-[14px] shadow-[inset_0_0_0_1px_var(--card-ring)]">
                <Image
                  src="/images/dashboard.webp"
                  alt="Dashboard backoffice Migios"
                  fill
                  sizes="(min-width: 1200px) 360px, calc(100vw - 60px)"
                  className="object-cover object-left-top dark:hidden"
                />
                <Image
                  src="/images/dashboard-dark.webp"
                  alt="Dashboard backoffice Migios mode gelap"
                  fill
                  sizes="(min-width: 1200px) 360px, calc(100vw - 60px)"
                  className="hidden object-cover object-left-top dark:block"
                />
              </div>
              <div className="px-1 pb-1.5">
                <div className="flex items-center gap-2.5">
                  <span className={`size-8 ${iconChip}`}>
                    <Monitor className="size-[18px]" aria-hidden />
                  </span>
                  <h3 className="text-base font-semibold">Backoffice</h3>
                </div>
                <p className="mt-2.5 text-sm leading-[1.55] text-body">
                  Untuk owner dan staf: membership, kasir, jadwal, karyawan, dan laporan dari browser.
                </p>
              </div>
            </article>

            <article className={card}>
              <div className="relative h-[220px] overflow-hidden rounded-[14px] bg-frame shadow-[inset_0_0_0_1px_var(--card-ring)]">
                <div className="absolute top-[18px] left-1/2 w-[120px] -translate-x-1/2 rounded-[22px] bg-[#0a0a0a] p-[5px] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.14)]">
                  <div className="overflow-hidden rounded-[17px] bg-[#f5f5f5]">
                    <Image
                      src="/images/aplikasi-member-beranda.webp"
                      alt="Beranda aplikasi member Migios"
                      width={964}
                      height={1959}
                      sizes="110px"
                      className="block h-auto w-full"
                    />
                  </div>
                </div>
              </div>
              <div className="px-1 pb-1.5">
                <div className="flex items-center gap-2.5">
                  <span className={`size-8 ${iconChip}`}>
                    <Smartphone className="size-[18px]" aria-hidden />
                  </span>
                  <h3 className="text-base font-semibold">Aplikasi member</h3>
                </div>
                <p className="mt-2.5 text-sm leading-[1.55] text-body">
                  Member melihat jadwal, check-in, dan memesan paket sendiri dari HP.
                </p>
              </div>
            </article>

            <article className={card}>
              <div className="relative h-[220px] overflow-hidden rounded-[14px] bg-[radial-gradient(ellipse_at_50%_45%,#1c1c1f_0%,#101012_62%,#0b0b0d_100%)]">
                <Image
                  src="/images/face-rina.webp"
                  alt="Wajah member yang dipindai Migios Desk saat check-in"
                  width={560}
                  height={700}
                  sizes="184px"
                  className="absolute top-3.5 left-1/2 h-[230px] w-auto max-w-none -translate-x-1/2"
                />
                <svg
                  aria-hidden
                  width="96"
                  height="96"
                  viewBox="0 0 96 96"
                  fill="none"
                  className="absolute top-[52px] left-1/2 -ml-12"
                >
                  <path
                    d="M2 22V2H22M74 2H94V22M94 74V94H74M22 94H2V74"
                    stroke="#00d492"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="px-1 pb-1.5">
                <div className="flex items-center gap-2.5">
                  <span className={`size-8 ${iconChip}`}>
                    <ScanFace className="size-[18px]" aria-hidden />
                  </span>
                  <h3 className="text-base font-semibold">Migios Desk</h3>
                </div>
                <p className="mt-2.5 text-sm leading-[1.55] text-body">
                  Aplikasi desktop untuk absensi wajah di meja resepsionis. Data wajah tersimpan dengan aman.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section aria-labelledby="prinsip-title" className="bg-background">
        <div className="mx-auto max-w-[1200px] px-4 py-14 md:px-8 lg:py-24">
          <div className="flex flex-col items-center text-center">
            <span className="text-sm font-semibold text-link">Prinsip kami</span>
            <h2 id="prinsip-title" className={`mt-3 max-w-[680px] ${sectionTitle}`}>
              Cara kami membangun Migios
            </h2>
          </div>
          <ul className="mt-7 grid gap-3 sm:grid-cols-2 lg:mt-10 lg:grid-cols-4">
            {principles.map(({ title, description, Icon }) => (
              <li
                key={title}
                className="flex min-w-0 flex-col gap-3 rounded-[18px] bg-card p-5 shadow-[0_0_0_1px_var(--card-ring)]"
              >
                <span className={`size-10 ${iconChip}`}>
                  <Icon className="size-[18px]" aria-hidden />
                </span>
                <h3 className="text-base font-semibold">{title}</h3>
                <p className="text-sm leading-[1.55] text-body">{description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
