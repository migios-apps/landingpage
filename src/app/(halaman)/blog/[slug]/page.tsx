import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRight, Check, Lightbulb } from "lucide-react"

import { PostCard } from "@/components/blog/post-card"
import { ShareButtons } from "@/components/blog/share-buttons"
import { TocNav } from "@/components/site/toc-nav"
import { categoryLabel, postDate, posts } from "@/lib/blog"
import { siteName, siteUrl } from "@/lib/site"

const findPost = (slug: string) => posts.find((post) => post.slug === slug && post.body)

// Articles are prerendered from generateStaticParams. The page reads params outside Suspense on purpose,
// so an unknown slug answers with a real 404 status instead of streaming the not-found UI after a 200.
export const instant = false

export function generateStaticParams() {
  return posts.filter((post) => post.body).map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const post = findPost((await params).slug)
  if (!post) return {}

  const path = `/blog/${post.slug}`
  const image = post.cover.kind === "photo" ? [{ url: post.cover.src, alt: post.cover.alt }] : undefined
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      locale: "id_ID",
      siteName,
      url: path,
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
      authors: [post.author],
      section: categoryLabel(post.category),
      images: image,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: image,
    },
  }
}

const paragraph = "text-base leading-[1.75] text-neutral-800 md:text-[17px] dark:text-neutral-300"

export default async function BlogArticlePage({ params }: PageProps<"/blog/[slug]">) {
  const post = findPost((await params).slug)
  if (!post?.body) notFound()

  const url = `${siteUrl}/blog/${post.slug}`
  const headings = post.body.flatMap((block) => (block.type === "heading" ? [{ id: block.id, label: block.text }] : []))
  // Hand-picked related posts first; otherwise other posts from the same category, then the newest ones.
  const others = posts.filter((item) => item.slug !== post.slug)
  const related = post.related
    ? post.related.flatMap((slug) => posts.filter((item) => item.slug === slug))
    : [
        ...others.filter((item) => item.category === post.category),
        ...others.filter((item) => item.category !== post.category),
      ].slice(0, 3)

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        headline: post.title,
        description: post.excerpt,
        image: post.cover.kind === "photo" ? `${siteUrl}${post.cover.src}` : undefined,
        datePublished: post.date,
        inLanguage: "id-ID",
        articleSection: categoryLabel(post.category),
        author: { "@type": "Organization", name: post.author, url: siteUrl },
        publisher: { "@id": `${siteUrl}/#organization` },
        mainEntityOfPage: url,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Beranda", item: siteUrl },
          {
            "@type": "ListItem",
            position: 2,
            name: "Blog",
            item: `${siteUrl}/blog`,
          },
          { "@type": "ListItem", position: 3, name: post.title, item: url },
        ],
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <section className="bg-background">
        <div className="mx-auto max-w-[1200px] px-4 py-8 md:px-8 lg:py-14">
          <header className="mx-auto flex max-w-[1040px] flex-col gap-[18px]">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[13px] text-subtle">
              <Link href="/blog" className="transition-colors hover:text-foreground">
                Blog
              </Link>
              <span aria-hidden>/</span>
              <Link href={`/blog?kategori=${post.category}`} className="font-semibold text-link">
                {categoryLabel(post.category)}
              </Link>
            </nav>
            <h1 className="max-w-[820px] text-[32px] leading-[1.08] font-[650] tracking-[-0.04em] text-balance md:text-[44px] lg:text-[52px]">
              {post.title}
            </h1>
            <p className="max-w-[720px] text-base leading-[1.55] text-pretty text-body md:text-[19px]">
              {post.excerpt}
            </p>
            <div className="flex items-center gap-2.5">
              <span className="inline-flex size-9 items-center justify-center rounded-full bg-[#0a0a0a] dark:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.14)]">
                <Image
                  src="/images/migios-logo.svg"
                  alt=""
                  width={31}
                  height={9}
                  unoptimized
                  className="h-[9px] w-auto invert"
                />
              </span>
              <div>
                <p className="text-sm font-semibold">{post.author}</p>
                <p className="text-[12.5px] text-subtle">
                  <time dateTime={post.date}>{postDate.format(new Date(post.date))}</time> · {post.readMinutes} menit
                  baca
                </p>
              </div>
            </div>
          </header>

          {post.cover.kind === "photo" && (
            <div className="relative mx-auto mt-7 aspect-[4/3] max-w-[1040px] overflow-hidden rounded-[14px] bg-muted shadow-[inset_0_0_0_1px_var(--card-ring)] md:aspect-[21/9] lg:mt-10 lg:rounded-[20px]">
              {/* Light is the default theme, so its photo is the LCP image; the dark one loads when displayed. */}
              <Image
                src={post.cover.src}
                alt={post.cover.alt}
                fill
                loading="eager"
                fetchPriority="high"
                sizes="(min-width: 1104px) 1040px, calc(100vw - 32px)"
                style={{ objectPosition: post.cover.position }}
                className="object-cover dark:hidden"
              />
              <Image
                src={post.cover.darkSrc}
                alt={post.cover.alt}
                fill
                sizes="(min-width: 1104px) 1040px, calc(100vw - 32px)"
                style={{ objectPosition: post.cover.position }}
                className="hidden object-cover dark:block"
              />
            </div>
          )}

          <div className="mx-auto mt-7 flex max-w-[1040px] items-start gap-16 lg:mt-14">
            <article className="flex max-w-[720px] min-w-0 flex-1 flex-col gap-4">
              {post.body.map((block, i) => {
                switch (block.type) {
                  case "heading":
                    return (
                      <h2
                        key={i}
                        id={block.id}
                        className="mt-4 scroll-mt-6 text-[22px] leading-[1.25] font-[650] tracking-[-0.02em] md:text-[26px]"
                      >
                        {block.text}
                      </h2>
                    )
                  case "paragraph":
                    return (
                      <p key={i} className={paragraph}>
                        {block.text}
                      </p>
                    )
                  case "list":
                    return (
                      <ul key={i} className="flex flex-col gap-2">
                        {block.items.map((item) => (
                          <li key={item} className={`flex gap-2.5 ${paragraph} leading-[1.65]`}>
                            <Check className="mt-1 size-4 shrink-0 text-brand" aria-hidden />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )
                  case "figure":
                    return (
                      <figure key={i} className="mt-2">
                        <div className="relative aspect-video overflow-hidden rounded-[14px] bg-muted shadow-[inset_0_0_0_1px_var(--card-ring)]">
                          <Image
                            src={block.src}
                            alt={block.alt}
                            fill
                            sizes="(min-width: 768px) 720px, calc(100vw - 32px)"
                            className="object-cover object-left-top dark:hidden"
                          />
                          <Image
                            src={block.darkSrc}
                            alt={block.alt}
                            fill
                            sizes="(min-width: 768px) 720px, calc(100vw - 32px)"
                            className="hidden object-cover object-left-top dark:block"
                          />
                        </div>
                        <figcaption className="mt-2.5 text-[13px] text-subtle">{block.caption}</figcaption>
                      </figure>
                    )
                  case "tip":
                    return (
                      <aside
                        key={i}
                        className="flex gap-3.5 rounded-2xl bg-orange-50 p-[18px] shadow-[inset_0_0_0_1px_var(--color-orange-200)] dark:bg-orange-500/10 dark:shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--color-orange-500)_25%,transparent)]"
                      >
                        <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-[11px] bg-brand-soft text-brand-icon">
                          <Lightbulb className="size-[18px]" aria-hidden />
                        </span>
                        <div className="text-orange-900 dark:text-orange-200">
                          <p className="text-sm font-semibold">{block.title}</p>
                          <p className="mt-1 text-[15px] leading-[1.6]">{block.text}</p>
                        </div>
                      </aside>
                    )
                }
              })}
            </article>

            <aside className="sticky top-[100px] hidden w-60 shrink-0 flex-col gap-6 lg:flex">
              <TocNav title="Di artikel ini" items={headings} />
              <div>
                <p className="font-mono text-[10px] tracking-[0.08em] text-subtle uppercase">Bagikan</p>
                <ShareButtons url={url} title={post.title} />
              </div>
            </aside>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section aria-labelledby="artikel-lainnya" className="border-t border-line bg-frame">
          <div className="mx-auto max-w-[1200px] px-4 py-12 md:px-8 lg:py-20">
            <div className="flex items-baseline justify-between gap-4">
              <h2 id="artikel-lainnya" className="text-2xl font-[650] tracking-[-0.02em] md:text-[28px]">
                Artikel lainnya
              </h2>
              <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm font-semibold text-link">
                Lihat semua
                <ArrowRight className="size-3.5" aria-hidden />
              </Link>
            </div>
            <div className="mt-6 grid gap-x-6 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <PostCard key={item.slug} post={item} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
