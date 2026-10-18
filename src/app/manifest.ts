import type { MetadataRoute } from "next"

import { siteDescription, siteTitle } from "@/lib/site"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteTitle,
    short_name: "Migios",
    description: siteDescription,
    lang: "id",
    start_url: "/",
    display: "standalone",
    // The app icons are the white backoffice mark, so the splash screen needs a dark ground.
    background_color: "#0a0a0a",
    theme_color: "#f54a00",
    icons: [
      { src: "/icons/migios-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/migios-512.png", sizes: "512x512", type: "image/png" },
    ],
  }
}
