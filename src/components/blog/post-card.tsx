import Image from "next/image"
import Link from "next/link"

import { categoryLabel, postDate, type Post } from "@/lib/blog"
import { cn } from "@/lib/utils"

const coverSizes = "(min-width: 1200px) 368px, (min-width: 768px) 50vw, 100vw"

// Post thumbnails are decorative: the title next to them already names the article.
export function PostCover({ post, className, sizes = coverSizes }: { post: Post; className?: string; sizes?: string }) {
  const { cover } = post

  if (cover.kind === "face") {
    return (
      <div
        className={cn(
          "relative overflow-hidden bg-[radial-gradient(ellipse_at_50%_45%,#1c1c1f_0%,#101012_62%,#0b0b0d_100%)]",
          className
        )}
      >
        <Image
          src="/images/face-rina.webp"
          alt=""
          width={560}
          height={700}
          sizes="320px"
          className="absolute top-[8%] left-1/2 h-[104%] w-auto max-w-none -translate-x-1/2"
        />
      </div>
    )
  }

  if (cover.kind === "phone") {
    return (
      <div className={cn("relative overflow-hidden bg-frame shadow-[inset_0_0_0_1px_var(--card-ring)]", className)}>
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(circle,var(--dot)_0.9px,transparent_1.2px)] bg-size-[14px_14px]"
        />
        <div className="absolute top-[14%] left-1/2 w-[34%] -translate-x-1/2 rounded-[22px] bg-[#0a0a0a] p-[5px] shadow-[0_14px_30px_-10px_rgba(0,0,0,0.35)] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.14),0_14px_30px_-10px_rgba(0,0,0,0.6)]">
          <div className="overflow-hidden rounded-[17px] bg-[#f5f5f5]">
            <Image
              src="/images/aplikasi-member-beranda.webp"
              alt=""
              width={964}
              height={1959}
              sizes="140px"
              className="block h-auto w-full"
            />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={cn("relative overflow-hidden bg-muted shadow-[inset_0_0_0_1px_var(--card-ring)]", className)}>
      <Image
        src={cover.src}
        alt=""
        fill
        sizes={sizes}
        style={{ objectPosition: cover.position }}
        className="object-cover dark:hidden"
      />
      <Image
        src={cover.darkSrc}
        alt=""
        fill
        sizes={sizes}
        style={{ objectPosition: cover.position }}
        className="hidden object-cover dark:block"
      />
    </div>
  )
}

export function PostMeta({ post, className }: { post: Post; className?: string }) {
  const dot = <span aria-hidden className="size-[3px] rounded-full bg-current opacity-60" />
  return (
    <p className={cn("flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-[13px] text-subtle", className)}>
      <span>{post.author}</span>
      {dot}
      <time dateTime={post.date}>{postDate.format(new Date(post.date))}</time>
      {dot}
      <span>{post.readMinutes} menit baca</span>
    </p>
  )
}

export function PostCard({ post }: { post: Post }) {
  return (
    <article className="group relative flex min-w-0 flex-col gap-3.5">
      <PostCover post={post} className="aspect-[16/10] rounded-[14px]" />
      <div className="flex flex-col gap-2">
        <span className="text-[12.5px] font-semibold text-link">{categoryLabel(post.category)}</span>
        <h3 className="text-lg leading-[1.3] font-semibold tracking-[-0.01em] text-balance">
          {post.body ? (
            <Link
              href={`/blog/${post.slug}`}
              className="after:absolute after:inset-0 after:rounded-[14px] group-hover:underline group-hover:underline-offset-4"
            >
              {post.title}
            </Link>
          ) : (
            post.title
          )}
        </h3>
        <p className="text-sm leading-[1.55] text-body">{post.excerpt}</p>
        <PostMeta post={post} />
      </div>
    </article>
  )
}
