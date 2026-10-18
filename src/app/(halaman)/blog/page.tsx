import { Suspense } from "react"
import Form from "next/form"
import Link from "next/link"
import { ArrowRight, Search } from "lucide-react"

import { PostCard, PostCover, PostMeta } from "@/components/blog/post-card"
import { PageHero } from "@/components/site/page-hero"
import { categories, categoryLabel, posts } from "@/lib/blog"
import { pageMetadata } from "@/lib/site"
import { cn } from "@/lib/utils"

export const metadata = pageMetadata({
  path: "/blog",
  title: "Blog",
  description:
    "Tips mengelola gym dan klub fitness: panduan praktis seputar membership, jadwal, kasir, dan laporan untuk pemilik dan staf klub.",
})

const perPage = 6

type Filters = { kategori?: string; q?: string; halaman?: string }

const chip = "inline-flex h-[34px] shrink-0 items-center rounded-full px-3.5 text-[13px] whitespace-nowrap"
const chipIdle = "bg-card font-medium text-body-strong shadow-[0_0_0_1px_var(--border)] hover:text-foreground"
const chipActive = "bg-foreground font-semibold text-background"

const pageButton =
  "inline-flex size-10 items-center justify-center rounded-[10px] text-sm font-semibold bg-card text-body-strong shadow-[0_0_0_1px_var(--border)] hover:text-foreground"

export default function BlogPage({ searchParams }: PageProps<"/blog">) {
  // The unfiltered list doubles as the prerendered shell; filters stream in from the query string.
  return (
    <Suspense fallback={<BlogListing />}>
      {searchParams.then((params) => {
        const first = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] : value)
        return <BlogListing kategori={first(params.kategori)} q={first(params.q)} halaman={first(params.halaman)} />
      })}
    </Suspense>
  )
}

function BlogListing({ kategori, q, halaman }: Filters) {
  const category = categories.find((item) => item.slug === kategori)
  const query = q?.trim() ?? ""
  const words = query.toLowerCase().split(/\s+/).filter(Boolean)

  const matches = posts.filter((post) => {
    const haystack = `${post.title} ${post.excerpt} ${categoryLabel(post.category)}`.toLowerCase()
    return (!category || post.category === category.slug) && words.every((word) => haystack.includes(word))
  })
  const featured = !category && !query ? posts.find((post) => post.featured) : undefined
  const list = matches.filter((post) => post !== featured)
  const pageCount = Math.max(1, Math.ceil(list.length / perPage))
  const page = Math.min(pageCount, Math.max(1, Number(halaman) || 1))
  const pagePosts = list.slice((page - 1) * perPage, page * perPage)

  const hrefFor = (filters: Filters) => {
    const params = new URLSearchParams(Object.entries(filters).filter((entry): entry is [string, string] => !!entry[1]))
    return params.size ? `/blog?${params}` : "/blog"
  }

  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Tips mengelola gym dan klub fitness"
        description="Panduan praktis seputar membership, jadwal, kasir, dan laporan untuk pemilik dan staf klub."
        className="lg:pt-[88px]"
      >
        <div className="mt-7 flex flex-wrap items-center justify-between gap-3 lg:mt-11">
          <nav
            aria-label="Kategori artikel"
            className="-mx-4 flex w-[calc(100%+2rem)] gap-2 overflow-x-auto px-4 [scrollbar-width:none] md:mx-0 md:w-auto md:flex-wrap md:overflow-visible md:px-0"
          >
            <Link
              href={hrefFor({ q: query })}
              aria-current={!category ? "page" : undefined}
              className={cn(chip, !category ? chipActive : chipIdle)}
            >
              Semua
            </Link>
            {categories.map((item) => (
              <Link
                key={item.slug}
                href={hrefFor({ kategori: item.slug, q: query })}
                aria-current={category?.slug === item.slug ? "page" : undefined}
                className={cn(chip, category?.slug === item.slug ? chipActive : chipIdle)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Form action="/blog" role="search" className="w-full md:w-[280px]">
            {category && <input type="hidden" name="kategori" value={category.slug} />}
            <label className="flex h-10 items-center gap-2 rounded-[10px] bg-card px-3 shadow-[0_0_0_1px_var(--border)] focus-within:shadow-[0_0_0_1px_var(--ring),0_0_0_4px_color-mix(in_srgb,var(--ring)_25%,transparent)]">
              <Search className="size-4 shrink-0 text-subtle" aria-hidden />
              <span className="sr-only">Cari artikel</span>
              <input
                type="search"
                name="q"
                defaultValue={query}
                placeholder="Cari artikel"
                className="h-full min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-neutral-400 dark:placeholder:text-neutral-500"
              />
            </label>
          </Form>
        </div>

        {featured && page === 1 && (
          <article className="group relative mt-6 flex flex-wrap items-center gap-[18px] rounded-[22px] bg-card p-3 shadow-[0_0_0_1px_var(--card-ring),0_2px_4px_rgba(0,0,0,0.04)] md:mt-8 md:gap-10 md:p-4">
            <div className="min-w-0 flex-[1.15_1_520px]">
              <PostCover
                post={featured}
                className="aspect-[16/10] rounded-[14px]"
                sizes="(min-width: 1200px) 608px, 100vw"
              />
            </div>
            <div className="flex min-w-0 flex-[1_1_380px] flex-col gap-3 px-1 pb-1.5 md:py-2 md:pr-4 md:pl-0">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-6 items-center rounded-full bg-brand-soft px-2.5 text-xs font-semibold text-link">
                  Pilihan editor
                </span>
                <span className="text-[12.5px] font-semibold text-link">{categoryLabel(featured.category)}</span>
              </div>
              <h2 className="text-2xl leading-[1.15] font-[650] tracking-[-0.03em] text-balance md:text-[32px]">
                <Link
                  href={`/blog/${featured.slug}`}
                  className="after:absolute after:inset-0 after:rounded-[22px] group-hover:underline group-hover:underline-offset-4"
                >
                  {featured.title}
                </Link>
              </h2>
              <p className="text-[15px] leading-[1.6] text-body md:text-base">{featured.excerpt}</p>
              <PostMeta post={featured} />
              <span aria-hidden className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-link">
                Baca artikel
                <ArrowRight className="size-3.5" />
              </span>
            </div>
          </article>
        )}
      </PageHero>

      <section aria-label="Daftar artikel" className="bg-background">
        <div className="mx-auto max-w-[1200px] px-4 py-2 md:px-8 lg:py-6">
          {pagePosts.length > 0 ? (
            <div className="mt-10 grid gap-x-6 gap-y-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-y-10">
              {pagePosts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            !featured && (
              <div className="mt-10 rounded-[22px] bg-frame px-6 py-12 text-center shadow-[inset_0_0_0_1px_var(--line)]">
                <p className="text-base font-semibold">Belum ada artikel yang cocok</p>
                <p className="mt-1.5 text-sm text-body">Coba kata kunci lain atau pilih kategori berbeda.</p>
                <Link href="/blog" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-link">
                  Lihat semua artikel
                  <ArrowRight className="size-3.5" aria-hidden />
                </Link>
              </div>
            )
          )}

          {pageCount > 1 && (
            <nav aria-label="Halaman artikel" className="mt-10 flex items-center justify-center gap-2 lg:mt-14">
              {Array.from({ length: pageCount }, (_, i) => i + 1).map((number) => (
                <Link
                  key={number}
                  href={hrefFor({ kategori: category?.slug, q: query, halaman: number > 1 ? String(number) : undefined })}
                  aria-current={number === page ? "page" : undefined}
                  className={cn(pageButton, number === page && "bg-foreground text-background shadow-none hover:text-background")}
                >
                  {number}
                </Link>
              ))}
              {page < pageCount && (
                <Link
                  href={hrefFor({ kategori: category?.slug, q: query, halaman: String(page + 1) })}
                  className={cn(pageButton, "w-auto gap-1.5 px-3.5")}
                >
                  Berikutnya
                  <ArrowRight className="size-3.5" aria-hidden />
                </Link>
              )}
            </nav>
          )}
        </div>
      </section>
    </>
  )
}
