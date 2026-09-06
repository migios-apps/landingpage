import { BranchMergeAnimation } from "@/components/BranchMergeAnimation"

const carries = [
  "Centralized member database",
  "Cross-branch check-in",
  "Consolidated billing",
  "Per-branch reporting",
  "Unlimited locations",
]

function Check() {
  return (
    <svg
      className="size-3.5 flex-none text-[#fc8c04]"
      width={14}
      height={14}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5 12.5l4.2 4.2L19 7"
        stroke="currentColor"
        strokeWidth={2.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function BranchIntegration() {
  return (
    <section
      id="branches"
      className="overflow-hidden bg-white px-5 pb-[60px] pt-16 dark:bg-[#0b0b0b] md:px-6 md:pb-20 md:pt-24"
      aria-labelledby="branches-title"
    >
      <div className="mx-auto flex max-w-[1000px] flex-col items-center text-center">
        <h2
          id="branches-title"
          className="max-w-[700px] text-[clamp(32px,4.5vw,52px)] font-medium leading-[1.15] text-[#131316] dark:text-white"
        >
          Every branch. One platform.
        </h2>
        <p className="mx-auto mt-[18px] max-w-[520px] text-[clamp(0.9rem,1.15vw,1rem)] leading-[1.65] text-[#5f6470] dark:text-white/60">
          Running a multi-branch gym or club? Connect every location to
          Migios and manage members, schedules, billing, and access from a
          single dashboard, while members train at any branch with one
          membership.
        </p>
        <div
          className="relative mx-auto mt-11 flex w-full items-center justify-center pb-7 pt-5"
          aria-hidden="true"
        >
          <BranchMergeAnimation />
        </div>
        <ul
          className="flex flex-wrap justify-center gap-x-6 gap-y-1"
          aria-label="What you get across branches"
        >
          {carries.map((item) => (
            <li
              key={item}
              className="inline-flex items-center gap-[7px] whitespace-nowrap text-[0.88rem] font-medium text-[#4b5160] dark:text-white/65"
            >
              <Check />
              {item}
            </li>
          ))}
        </ul>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <a className="mfy-btn bg-[#0d0d0d] text-white hover:bg-[#2e2e2e] dark:bg-white dark:text-[#0d0d0d]" href="/branches">
            Connect your branches
          </a>
          <a className="mfy-btn bg-white text-[#0d0d0d] hover:bg-[#f1f1f1] dark:border dark:border-white/10 dark:bg-white/[0.07] dark:text-white" href="/demo">
            See Migios in action
          </a>
        </div>
      </div>
    </section>
  )
}
