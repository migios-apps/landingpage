export function FinalCta() {
  return (
    <section id="cta" className="bg-white pt-16">
      <div className="mx-auto w-full max-w-[1240px] px-5 md:px-[50px]">
        <div className="relative overflow-hidden rounded-[20px] px-6 py-16 text-center md:px-10 md:py-[100px]">
          <img
            src="/images/cta-gradient-bg.webp"
            alt=""
            aria-hidden="true"
            width={1600}
            height={663}
            className="absolute inset-0 z-0 size-full object-cover"
          />
          <div className="relative z-[1]">
            <h2 className="mb-3 text-[clamp(2rem,5vw,2.5rem)] font-medium leading-[1.2] text-white">
              Ready to grow your gyms?
            </h2>
            <p className="mb-9 text-base text-white/75">
              Bring one gym or your whole chain, Migios scales with you...
            </p>
            <a className="mfy-btn mfy-btn--primary" href="/dashboard">
              Start free trial
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
