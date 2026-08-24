import { chromium } from "playwright"

const [url, out] = process.argv.slice(2)
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
await page.goto(url, { waitUntil: "networkidle", timeout: 60000 }).catch(() => {})
await page.waitForTimeout(2000)
// scroll through the page to trigger scroll-reveal animations
await page.evaluate(async () => {
  const step = 600
  for (let y = 0; y < document.body.scrollHeight; y += step) {
    window.scrollTo(0, y)
    await new Promise((r) => setTimeout(r, 150))
  }
  window.scrollTo(0, 0)
})
await page.waitForTimeout(1500)
await page.screenshot({ path: out, fullPage: true })
await browser.close()
console.log("saved", out)
