import { MigiosLogo } from "@/components/MigiosLogo"

const linkCls = "fx-link text-[0.9375rem] text-[#222] no-underline dark:text-[#e5e5e5]"
const headCls = "mb-4 text-[0.8125rem] font-medium text-[#999] dark:text-white/45"

export function Footer() {
  return (
    <footer
      id="footer"
      className="bg-[url('/images/footer-bg.jpg')] bg-cover bg-top bg-no-repeat px-4 py-8 dark:bg-[#080808] dark:bg-none md:px-8 md:py-12"
    >
        <div className="mx-auto w-full max-w-[1240px] overflow-hidden rounded-[32px] bg-white shadow-[0_18px_50px_rgba(19,19,22,0.10)] dark:bg-[#121212] dark:shadow-[0_18px_60px_rgba(0,0,0,0.4)]">
          <div className="px-6 md:px-[50px]">
            <div className="flex flex-col gap-12 pb-10 pt-8">
              <div className="flex flex-col gap-4">
                <a href="/" aria-label="Migios home" className="inline-block">
                  <MigiosLogo className="h-10" />
                </a>
                <p className="max-w-[560px] text-[0.9375rem] leading-relaxed text-[#444] dark:text-white/60">
                  Migios — Multi Gym In One Solution. The all-in-one platform
                  for gym memberships, class schedules, billing, and access
                  control, built for multi-location fitness businesses.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-x-12 gap-y-8 md:grid-cols-3 lg:grid-cols-5">
                <div>
                  <p className={headCls}>Platform</p>
                  <div className="flex flex-col gap-2">
                    <a href="/" className={linkCls}>Home</a>
                    <a href="/member-crm" className={linkCls}>Member CRM</a>
                    <a href="/scheduling" className={linkCls}>Scheduling</a>
                    <a href="/billing" className={linkCls}>Billing</a>
                    <a href="/access-control" className={linkCls}>Access control</a>
                    <a href="/pricing" className={linkCls}>Pricing</a>
                    <a href="/dashboard" className={linkCls}>Start free trial</a>
                  </div>
                  <hr className="my-4 h-px w-full border-0 bg-[#ececec] dark:bg-white/10" />
                  <div className="flex flex-col gap-2">
                    <a href="/compare" className={linkCls}>Compare</a>
                    <a href="/compare/migios-vs-spreadsheets" className={linkCls}>Migios vs spreadsheets</a>
                    <a href="/compare/migios-vs-legacy" className={linkCls}>Migios vs legacy software</a>
                  </div>
                </div>
                <div>
                  <p className={headCls}>Solutions</p>
                  <div className="flex flex-col gap-2">
                    <a href="/solutions" className={linkCls}>All solutions</a>
                    <a href="/gym-owners" className={linkCls}>Gym owners</a>
                    <a href="/franchise" className={linkCls}>Franchise operators</a>
                    <a href="/studio-managers" className={linkCls}>Studio managers</a>
                    <a href="/trainers" className={linkCls}>Personal trainers</a>
                    <a href="/front-desk" className={linkCls}>Front desk</a>
                    <a href="/sales" className={linkCls}>Sales teams</a>
                    <a href="/finance" className={linkCls}>Finance</a>
                    <a href="/fitness-centers" className={linkCls}>Fitness centers</a>
                    <a href="/studios" className={linkCls}>Studios & boxes</a>
                  </div>
                </div>
                <div>
                  <p className={headCls}>Resources</p>
                  <div className="flex flex-col gap-2">
                    <a href="/insights" className={linkCls}>Insights</a>
                    <a href="/guides" className={linkCls}>Guides</a>
                    <a href="/faqs" className={linkCls}>FAQs</a>
                    <a href="/integrations" className={linkCls}>Integrations</a>
                    <a href="/api" className={linkCls}>API docs</a>
                    <a href="/community" className={linkCls}>Community</a>
                  </div>
                  <hr className="my-4 h-px w-full border-0 bg-[#ececec] dark:bg-white/10" />
                  <div className="flex flex-col gap-2">
                    <a href="/directory" className={linkCls}>Gym directory</a>
                    <a href="/directory/united-states" className={linkCls}>Gyms in the US</a>
                    <a href="/directory/united-kingdom" className={linkCls}>Gyms in the UK</a>
                  </div>
                </div>
                <div>
                  <p className={headCls}>Follow us</p>
                  <div className="flex flex-col gap-2">
                    <a href="https://x.com" className={linkCls} target="_blank" rel="noopener noreferrer">X / Twitter</a>
                    <a href="https://discord.com" className={linkCls} target="_blank" rel="noopener noreferrer">Discord</a>
                    <a href="https://linkedin.com" className={linkCls} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                    <a href="https://youtube.com" className={linkCls} target="_blank" rel="noopener noreferrer">YouTube</a>
                    <a href="https://instagram.com" className={linkCls} target="_blank" rel="noopener noreferrer">Instagram</a>
                    <a href="https://threads.com" className={linkCls} target="_blank" rel="noopener noreferrer">Threads</a>
                    <a href="https://facebook.com" className={linkCls} target="_blank" rel="noopener noreferrer">Facebook</a>
                  </div>
                </div>
                <div>
                  <p className={headCls}>Legal</p>
                  <div className="flex flex-col gap-2">
                    <a href="/contact" className={linkCls}>Contact</a>
                    <a href="/legal/privacy-policy" className={linkCls}>Privacy Policy</a>
                    <a href="/legal/terms" className={linkCls}>Terms of Service</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="h-0.5 w-full bg-[linear-gradient(to_right,#fe3200,#fc8c04,#fcdbaf,#a855f7,#3b82f6)]" />
          <div className="px-6 py-5 text-sm text-[#999] dark:text-white/40 md:px-[50px]">
            © 2026 Migios. All rights reserved.
          </div>
        </div>
    </footer>
  )
}
