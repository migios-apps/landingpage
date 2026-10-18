import Image from "next/image"
import {
  Activity,
  Calendar,
  CircleCheck,
  Repeat,
  ShieldCheck,
  Smartphone,
  TriangleAlert,
  Users,
  type LucideIcon,
} from "lucide-react"

const scheduleFeatures: { title: string; text: string; Icon: LucideIcon }[] = [
  {
    title: "Empat tampilan kalender",
    text: "Bulan, minggu, hari, dan agenda, dengan filter per coach, kelas, dan member.",
    Icon: Calendar,
  },
  {
    title: "Jadwal berulang",
    text: "Ulangi setiap hari atau mingguan, dengan atau tanpa tanggal akhir. Satu jadwal bisa dipindah harinya.",
    Icon: Repeat,
  },
  {
    title: "Bentrok coach terdeteksi",
    text: "Panel Perlu Perhatian menandai coach yang bentrok dan jadwal di luar jam buka klub.",
    Icon: TriangleAlert,
  },
  {
    title: "Kapasitas peserta",
    text: "Kuota tiap kelas tampil di jadwal hari ini, dan keterisiannya terpantau di dashboard.",
    Icon: Users,
  },
  {
    title: "Tutup kelas dan sesi",
    text: "Tandai kehadiran peserta, potong sesi PT, dan tulis catatan sesi langsung dari jadwal.",
    Icon: CircleCheck,
  },
  {
    title: "Persetujuan admin",
    text: "Kelas atau sesi yang dicatat terlambat menunggu persetujuan admin sebelum memotong paket.",
    Icon: ShieldCheck,
  },
  {
    title: "Pengingat pengukuran",
    text: "Sebelum sesi PT ditutup, coach diingatkan jika ada member yang belum diukur.",
    Icon: Activity,
  },
  {
    title: "Jadwal di aplikasi member",
    text: "Member melihat kalender jadwal klub per hari, lengkap dengan jam, durasi, dan jenis kelas atau sesi PT.",
    Icon: Smartphone,
  },
]

export function Schedule() {
  return (
    <section id="jadwal" aria-labelledby="jadwal-title" className="bg-background">
      <div className="mx-auto max-w-[1200px] px-4 py-16 md:px-8 md:py-[88px] lg:py-28">
        <div className="flex flex-col items-center text-center">
          <span className="text-sm font-semibold text-link">Penjadwalan</span>
          <h2
            id="jadwal-title"
            className="mt-3 max-w-[800px] text-[34px] leading-[1.05] font-[650] tracking-[-0.035em] text-balance md:text-[42px] lg:text-[52px]"
          >
            Jadwal kelas dan sesi PT, rapi dalam satu kalender
          </h2>
          <p className="mt-4 max-w-[640px] text-[17px] leading-[1.55] text-pretty text-body">
            Atur jadwal berulang, pantau bentrok coach, lalu tutup kelas dan sesi langsung dari kalender. Member
            melihat jadwalnya sendiri dari aplikasi.
          </p>
        </div>

        <div className="relative mt-14 md:pb-12 lg:pb-16">
          <div className="relative overflow-hidden rounded-t-[6px] md:rounded-t-[16px]">
            <Image
              src="/images/jadwal-kalender.webp"
              alt="Kalender jadwal Migios tampilan bulan: kelas dan sesi PT per hari, panel Jadwal Hari Ini, dan panel Perlu Perhatian berisi bentrok coach serta jadwal di luar jam buka"
              width={2000}
              height={1290}
              quality={90}
              sizes="(min-width: 1200px) 1136px, 100vw"
              className="block h-auto w-full dark:hidden"
            />
            <Image
              src="/images/jadwal-kalender-dark.webp"
              alt="Kalender jadwal Migios tampilan bulan: kelas dan sesi PT per hari, panel Jadwal Hari Ini, dan panel Perlu Perhatian berisi bentrok coach serta jadwal di luar jam buka"
              width={2000}
              height={1290}
              quality={90}
              sizes="(min-width: 1200px) 1136px, 100vw"
              className="hidden h-auto w-full dark:block"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-[38%] bg-linear-to-b from-background/0 to-background to-92%"
            />
          </div>
          <div className="relative z-[3] mx-auto mt-8 w-[230px] md:absolute md:bottom-0 md:left-[-8px] md:mx-0 md:mt-0 md:w-[170px] lg:left-[-24px] lg:w-[250px]">
            <div className="rounded-[38px] bg-[#0a0a0a] p-[7px] shadow-[0_0_0_1px_rgba(0,0,0,0.25),0_30px_60px_-18px_rgba(0,0,0,0.5)] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.14),0_30px_60px_-18px_rgba(0,0,0,0.7)]">
              <div className="overflow-hidden rounded-[31px] bg-[#f5f5f5]">
                <div aria-hidden className="flex justify-center pt-[3.5%] pb-[5%]">
                  <span className="block aspect-[7/2] w-[30%] rounded-full bg-[#0a0a0a]" />
                </div>
                <Image
                  src="/images/aplikasi-member-jadwal.webp"
                  alt="Halaman Jadwal di aplikasi member Migios: kalender Oktober 2026 dengan penanda jadwal per hari dan daftar kelas serta sesi PT hari ini"
                  width={992}
                  height={1957}
                  quality={90}
                  sizes="(min-width: 1024px) 236px, (min-width: 768px) 156px, 216px"
                  className="block h-auto w-full"
                />
                <div aria-hidden className="flex justify-center pt-[3%] pb-[4%]">
                  <span className="block h-1 w-[34%] rounded bg-[#1b1b1b]" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <ul className="mt-16 flex flex-wrap gap-x-7 gap-y-8">
          {scheduleFeatures.map(({ title, text, Icon }) => (
            <li
              key={title}
              className="flex min-w-0 flex-[1_1_100%] flex-row gap-3.5 border-t border-line pt-5 md:flex-[1_1_240px] md:flex-col"
            >
              <span className="inline-flex size-[38px] shrink-0 items-center justify-center rounded-[11px] bg-brand-soft text-brand-icon">
                <Icon className="size-[18px]" aria-hidden />
              </span>
              <div className="min-w-0">
                <h3 className="text-[15px] font-semibold tracking-[-0.01em]">{title}</h3>
                <p className="mt-1.5 text-[13.5px] leading-normal text-muted-foreground">{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
