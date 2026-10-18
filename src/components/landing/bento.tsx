import Image from "next/image"
import {
  Activity,
  ArrowLeftRight,
  ArrowRight,
  BadgePercent,
  Clock,
  Coins,
  Gift,
  MapPin,
  MessageCircle,
  Monitor,
  ScanFace,
  ShieldCheck,
  ShoppingBag,
  Snowflake,
  Ticket,
  type LucideIcon,
} from "lucide-react"

import {
  ActivityFeed,
  AttendanceFlow,
  BranchReports,
  CashierCart,
  ClassSchedule,
  CoachSessions,
  FaceScan,
  RevenueBars,
  SelfOrderFlow,
} from "@/components/landing/bento-visuals"
import { cn } from "@/lib/utils"

const cardShell =
  "flex h-80 min-w-0 flex-col overflow-hidden rounded-[20px] bg-card p-4 shadow-[0_0_0_1px_var(--card-ring),0_2px_4px_rgba(0,0,0,0.04)]"

function FeatureCard({
  title,
  description,
  wide,
  children,
}: {
  title: string
  description: string
  wide?: boolean
  children: React.ReactNode
}) {
  return (
    <article className={cn(cardShell, wide ? "flex-[2_1_612px]" : "flex-[1_1_300px]")}>
      <div className="flex flex-col gap-1.5">
        <h3 className="text-[15px] font-semibold tracking-[-0.01em]">{title}</h3>
        <p className={cn("text-[13px] leading-normal text-muted-foreground", wide ? "max-w-[560px]" : "max-w-[92%]")}>
          {description}
        </p>
      </div>
      <div className="relative mt-3.5 min-h-0 flex-1 overflow-hidden rounded-[14px] border border-line bg-panel">
        {children}
      </div>
    </article>
  )
}

const facePoints: { title: string; text: string; Icon: LucideIcon }[] = [
  { title: "Data wajah tersimpan aman", text: "Foto dan data wajah member disimpan dengan aman dan terlindungi.", Icon: ShieldCheck },
  {
    title: "Paket langsung dicek",
    text: "Setelah wajah dikenali, paket aktif dan batas kunjungan member dicek otomatis.",
    Icon: Ticket,
  },
  { title: "Skor kecocokan tercatat", text: "Persentase kecocokan tersimpan di setiap riwayat absensi.", Icon: Activity },
  {
    title: "Tidak tercatat dua kali",
    text: "Wajah yang sama tidak langsung tercatat ulang saat member masih di depan kamera.",
    Icon: Clock,
  },
]

const moreFeatures: { title: string; text: string; Icon: LucideIcon }[] = [
  { title: "Poin loyalitas", text: "Member mengumpulkan poin dan menukarnya dengan hadiah", Icon: Gift },
  { title: "Voucher diskon", text: "Potongan harga untuk member dan transaksi", Icon: BadgePercent },
  { title: "Komisi coach & produk", text: "Dihitung dari penjualan paket, kelas, produk, dan jasa", Icon: Coins },
  { title: "Notifikasi WhatsApp", text: "Pengingat jadwal dan tagihan lewat WhatsApp", Icon: MessageCircle },
  { title: "Pesan sendiri", text: "Member memesan paket dan produk dari aplikasi", Icon: ShoppingBag },
  { title: "Freeze paket", text: "Bekukan keanggotaan member untuk sementara", Icon: Snowflake },
  { title: "Display absensi", text: "Tablet check-in dengan kode display dan PIN", Icon: Monitor },
  { title: "Pengukuran tubuh", text: "Catat hasil pengukuran member dari waktu ke waktu", Icon: Activity },
  { title: "Transfer paket", text: "Pindahkan atau wariskan sisa paket ke member lain", Icon: ArrowLeftRight },
  { title: "Check-in antar cabang", text: "Member bisa check-in di cabang lain yang diizinkan klub", Icon: MapPin },
]

export function Bento() {
  return (
    <section id="fitur" aria-labelledby="fitur-title" className="border-t border-line bg-frame">
      <div className="mx-auto max-w-[1200px] px-4 py-16 md:px-8 md:py-[88px] lg:py-28">
        <div className="flex flex-col items-center text-center">
          <span className="text-sm font-semibold text-link">Fitur</span>
          <h2
            id="fitur-title"
            className="mt-3 max-w-[760px] text-[34px] leading-[1.05] font-[650] tracking-[-0.035em] text-balance md:text-[42px] lg:text-[52px]"
          >
            Satu tempat untuk seluruh operasional gym
          </h2>
          <p className="mt-4 max-w-[600px] text-[17px] leading-[1.55] text-pretty text-body">
            Dari pintu masuk sampai laporan akhir bulan, semua data klub tersambung dan tercatat otomatis.
          </p>
        </div>

        <div className="mt-14 flex flex-col gap-3">
          <div className="flex flex-wrap gap-3">
            <FeatureCard
              title="Absensi QR code & wajah"
              description="Member check-in dengan QR code atau wajah. Paket aktif langsung dicek saat itu juga."
            >
              <AttendanceFlow />
            </FeatureCard>
            <FeatureCard
              title="Pendapatan & kunjungan"
              description="Pendapatan, member aktif, dan kunjungan harian klub terpantau dari satu dashboard."
            >
              <RevenueBars />
            </FeatureCard>
            <FeatureCard
              title="Aktivitas real time"
              description="Check-in, pembayaran, dan sesi PT tercatat otomatis, lengkap dengan statusnya."
            >
              <ActivityFeed />
            </FeatureCard>
          </div>

          <article className="flex min-w-0 flex-wrap items-center gap-x-8 gap-y-4 overflow-hidden rounded-[20px] bg-card p-4 shadow-[0_0_0_1px_var(--card-ring),0_2px_4px_rgba(0,0,0,0.04)]">
            <div className="relative h-[260px] min-w-0 flex-[1_1_380px] overflow-hidden rounded-[14px] bg-[radial-gradient(ellipse_at_50%_45%,#1c1c1f_0%,#101012_62%,#0b0b0d_100%)] md:h-[288px]">
              <FaceScan />
            </div>
            <div className="min-w-0 flex-[1_1_340px] p-1 lg:py-2 lg:pr-2 lg:pl-0">
              <span className="inline-flex h-6 items-center gap-1.5 rounded-full bg-brand-soft px-2.5 text-xs font-semibold text-link">
                <ScanFace className="size-[13px]" strokeWidth={2.2} aria-hidden />
                Face recognition
              </span>
              <h3 className="mt-3 text-xl leading-tight font-semibold tracking-[-0.02em]">
                Absensi wajah yang tidak bisa diwakilkan
              </h3>
              <p className="mt-2 max-w-[520px] text-sm leading-normal text-muted-foreground">
                Wajah member dicocokkan setiap kali check-in, jadi QR code atau kode member orang lain tidak cukup
                untuk masuk.
              </p>
              <ul className="mt-[18px] flex flex-wrap gap-4">
                {facePoints.map(({ title, text, Icon }) => (
                  <li key={title} className="flex min-w-0 flex-[1_1_200px] gap-2.5">
                    <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-[10px] bg-brand-soft text-brand-icon">
                      <Icon className="size-4" aria-hidden />
                    </span>
                    <div className="min-w-0">
                      <p className="text-[13.5px] font-semibold">{title}</p>
                      <p className="mt-0.5 text-[12.5px] leading-[1.45] text-muted-foreground">{text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </article>

          <div className="flex flex-wrap gap-3">
            <FeatureCard
              title="Kasir & pembayaran"
              description="Jual paket, kelas, sesi PT, dan produk dari satu keranjang, lengkap dengan voucher dan poin."
              wide
            >
              <CashierCart />
            </FeatureCard>
            <FeatureCard
              title="Jadwal kelas & coach"
              description="Atur kelas dan sesi PT per coach, lengkap dengan kuota peserta dan kapasitas klien."
            >
              <ClassSchedule />
            </FeatureCard>
          </div>

          <div className="flex flex-wrap gap-3">
            <FeatureCard
              title="Aplikasi member"
              description="Member cek jadwal, check-in, dan pesan paket atau produk sendiri dari aplikasi."
            >
              <div
                aria-hidden
                className="absolute inset-0 bg-[radial-gradient(circle,var(--dot)_0.9px,transparent_1.2px)] bg-size-[14px_14px]"
              />
              <div className="absolute top-3.5 left-1/2 h-80 w-44 -translate-x-1/2 rounded-[30px] bg-[#0a0a0a] p-1.5 shadow-[0_14px_30px_-10px_rgba(0,0,0,0.35)] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.14),0_14px_30px_-10px_rgba(0,0,0,0.6)]">
                <div className="h-full overflow-hidden rounded-3xl bg-[#f5f5f5]">
                  <div aria-hidden className="flex justify-center pt-[3.5%] pb-[5%]">
                    <span className="block aspect-[7/2] w-[30%] rounded-full bg-[#0a0a0a]" />
                  </div>
                  <Image
                    src="/images/aplikasi-member-beranda.webp"
                    alt="Beranda aplikasi member Migios: sisa sesi PT, paket aktif, poin, voucher, freeze, dan pesan sendiri"
                    width={964}
                    height={1959}
                    sizes="164px"
                    quality={90}
                    className="block h-auto w-full"
                  />
                </div>
              </div>
            </FeatureCard>
            <FeatureCard
              title="Coach & sesi PT"
              description="Assign member ke coach, lalu ajar satu member atau beberapa member sekaligus dalam satu sesi."
              wide
            >
              <CoachSessions />
            </FeatureCard>
          </div>

          <div className="flex flex-wrap gap-3">
            <FeatureCard
              title="Multi-cabang & laporan"
              description="Kelola beberapa cabang dengan satu akun. Laporan bisa diunduh ke PDF, Excel, atau CSV."
              wide
            >
              <BranchReports />
            </FeatureCard>
            <FeatureCard
              title="Self-order dari aplikasi"
              description="Member pesan paket, kelas, atau produk sendiri, bayar online, lalu order langsung masuk ke kasir."
            >
              <SelfOrderFlow />
            </FeatureCard>
          </div>
        </div>

        <div className="mt-16">
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
            <h3 className="text-xl font-semibold tracking-[-0.02em]">Fitur lain yang sudah termasuk</h3>
            <a href="#harga" className="inline-flex items-center gap-1.5 text-sm font-semibold text-link">
              Bandingkan paket
              <ArrowRight className="size-3.5" aria-hidden />
            </a>
          </div>
          <ul className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-5">
            {moreFeatures.map(({ title, text, Icon }) => (
              <li
                key={title}
                className="flex min-w-0 flex-col items-start gap-3 rounded-2xl bg-card p-3.5 shadow-[0_0_0_1px_var(--card-ring)] md:flex-row md:items-center lg:flex-col lg:items-start"
              >
                <span className="inline-flex size-[38px] shrink-0 items-center justify-center rounded-[11px] bg-brand-soft text-brand-icon">
                  <Icon className="size-[18px]" aria-hidden />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold">{title}</p>
                  <p className="mt-0.5 text-[12.5px] leading-[1.45] text-muted-foreground">{text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
