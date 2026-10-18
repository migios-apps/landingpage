import type { MetadataRoute } from "next"

import { posts } from "@/lib/blog"
import { siteUrl } from "@/lib/site"

const updated = new Date("2026-10-18")

export default function sitemap(): MetadataRoute.Sitemap {
  const page = (path: string, changeFrequency: "weekly" | "monthly" | "yearly", priority: number) => ({
    url: `${siteUrl}${path}`,
    lastModified: updated,
    changeFrequency,
    priority,
  })

  return [
    {
      url: siteUrl,
      lastModified: updated,
      changeFrequency: "weekly",
      priority: 1,
      images: [`${siteUrl}/images/dashboard.webp`, `${siteUrl}/images/jadwal-kalender.webp`],
    },
    page("/harga", "monthly", 0.9),
    page("/blog", "weekly", 0.8),
    ...posts
      .filter((post) => post.body)
      .map((post) => ({
        url: `${siteUrl}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: "monthly" as const,
        priority: 0.6,
        images: post.cover.kind === "photo" ? [`${siteUrl}${post.cover.src}`] : undefined,
      })),
    page("/bantuan", "monthly", 0.7),
    page("/kontak", "yearly", 0.6),
    page("/tentang", "yearly", 0.5),
    page("/kebijakan-privasi", "yearly", 0.3),
    page("/syarat-dan-ketentuan", "yearly", 0.3),
  ]
}
