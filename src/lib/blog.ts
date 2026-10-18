import blog from "@/content/blog.json"

export type PostCover =
  | { kind: "photo"; src: string; darkSrc: string; alt: string; position: string }
  | { kind: "face" }
  | { kind: "phone" }

export type PostBlock =
  | { type: "heading"; id: string; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "figure"; src: string; darkSrc: string; alt: string; caption: string }
  | { type: "tip"; title: string; text: string }

export type Post = {
  slug: string
  title: string
  excerpt: string
  category: string
  author: string
  date: string
  readMinutes: number
  featured?: boolean
  cover: PostCover
  related?: string[]
  // Only posts with a body have their own article page; the rest are listed as previews.
  body?: PostBlock[]
}

// Dummy content until the blog has a CMS; posts are kept newest first.
export const categories = blog.categories
export const posts = blog.posts as Post[]

export const categoryLabel = (slug: string) => categories.find((category) => category.slug === slug)?.label ?? slug

export const postDate = new Intl.DateTimeFormat("id-ID", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
})
