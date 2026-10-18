import Link from "next/link"

import { PageHero } from "@/components/site/page-hero"
import { TocNav } from "@/components/site/toc-nav"
import legal from "@/content/legal.json"
import { cn } from "@/lib/utils"

type LegalDocument = (typeof legal)[keyof typeof legal]

// Privacy policy and terms share one layout; the tabs are links so each document keeps its own URL.
export function LegalPage({ document }: { document: LegalDocument }) {
  const tocItems = document.sections.map((section, i) => ({ id: section.id, label: `${i + 1}. ${section.title}` }))

  return (
    <>
      <PageHero
        eyebrow="Legal"
        title={document.title}
        description={`Terakhir diperbarui ${document.updated}. ${document.description}`}
        align="left"
        className="lg:pt-[72px]"
      >
        <nav aria-label="Dokumen legal" className="mt-6 inline-flex gap-0.5 rounded-xl bg-chip p-1">
          {[legal.privacy, legal.terms].map((item) => (
            <Link
              key={item.path}
              href={item.path}
              aria-current={item.path === document.path ? "page" : undefined}
              className={cn(
                "inline-flex h-9 items-center rounded-[9px] px-4 text-sm font-semibold text-body transition-colors hover:text-foreground",
                "aria-[current=page]:bg-card aria-[current=page]:text-foreground aria-[current=page]:shadow-[0_1px_2px_rgba(0,0,0,0.1),0_0_0_1px_rgba(0,0,0,0.04)]"
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>
      </PageHero>

      <section className="bg-background">
        <div className="mx-auto flex max-w-[1200px] items-start gap-16 px-4 py-4 md:px-8 lg:py-8">
          <aside className="sticky top-[100px] hidden w-[260px] shrink-0 lg:block">
            <TocNav title="Daftar isi" items={tocItems} />
          </aside>
          <article className="flex max-w-[760px] min-w-0 flex-1 flex-col gap-6">
            {document.sections.map((section, i) => (
              <section
                key={section.id}
                aria-labelledby={section.id}
                className={cn("flex flex-col gap-2.5", i > 0 && "border-t border-line pt-6")}
              >
                <h2 id={section.id} className="scroll-mt-6 text-[19px] font-[650] tracking-[-0.02em] md:text-[22px]">
                  {tocItems[i].label}
                </h2>
                <p className="text-[15px] leading-[1.75] text-neutral-800 md:text-base dark:text-neutral-300">
                  {/* Body text may hold [label](/path) links. */}
                  {section.body.split(/(\[[^\]]+\]\([^)]+\))/).map((part, j) => {
                    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
                    return link ? (
                      <Link key={j} href={link[2]} className="font-medium text-link underline-offset-2 hover:underline">
                        {link[1]}
                      </Link>
                    ) : (
                      part
                    )
                  })}
                </p>
              </section>
            ))}
          </article>
        </div>
      </section>
    </>
  )
}
