const marqueeGyms = [
  "/images/gym/gym-rack.jpg",
  "/images/gym/yoga.jpg",
  "/images/gym/boxing.jpg",
  "/images/gym/gym-floor.jpg",
  "/images/gym/coaching.jpg",
]

function CardText({ title, body }: { title: string; body: string }) {
  return (
    <div className="px-6 pb-6 pt-[18px]">
      <h3 className="text-[1.05rem] font-medium tracking-[-0.01em] text-[#131316]">
        {title}
      </h3>
      <p className="mt-1.5 max-w-[42ch] text-[0.92rem] leading-[1.5] text-[#6b7180]">
        {body}
      </p>
    </div>
  )
}

export function DesignedBento() {
  return (
    <section
      id="designed"
      className="relative overflow-hidden bg-white"
      aria-labelledby="dbento-title"
    >
      <div
        className="bento-glow pointer-events-none absolute -bottom-[6%] -left-[10%] -right-[10%] -top-[6%]"
        aria-hidden="true"
      />
      <div className="relative z-[1] mx-auto w-full max-w-[1240px] px-5 py-14 md:px-[50px] md:py-20">
        <div className="mb-11 text-center">
          <h2
            id="dbento-title"
            className="text-[clamp(32px,6vw,48px)] font-medium leading-[1.2] text-[#131316]"
          >
            Not just software. A growth engine.
          </h2>
          <p className="mx-auto mt-4 max-w-[560px] text-[clamp(0.95rem,1.2vw,1.05rem)] leading-relaxed text-[#4b5160]">
            Migios helps you manage members, schedule classes, automate
            billing, control access, and understand performance across every
            location.
          </p>
        </div>
        <div className="mx-auto grid max-w-[460px] grid-cols-1 gap-5 [grid-auto-rows:minmax(260px,auto)] md:max-w-none md:grid-cols-12 md:[grid-auto-rows:minmax(300px,auto)]">
          <article className="col-span-1 flex flex-col overflow-hidden rounded-[22px] bg-[#f5f3f1] md:col-span-7">
            <div className="relative flex min-h-0 flex-1 flex-col items-stretch justify-start overflow-hidden">
              <img
                className="block size-full flex-1 object-cover"
                src="/images/gym/training.jpg"
                loading="lazy"
                alt="A coach reviewing a member's plan on the gym floor"
              />
            </div>
            <CardText
              title="Member management"
              body="Profiles, plans, attendance, and payment history in one place."
            />
          </article>
          <article className="col-span-1 flex flex-col overflow-hidden rounded-[22px] bg-[#f5f3f1] md:col-span-5">
            <div className="relative flex min-h-0 flex-1 flex-col items-stretch justify-start overflow-hidden">
              <img
                className="block size-full flex-1 object-cover"
                src="/images/gym/workout.jpg"
                loading="lazy"
                alt="A group class in session"
              />
            </div>
            <CardText
              title="Class scheduling"
              body="Timetables, bookings, waitlists, and trainer assignments."
            />
          </article>
          <article className="col-span-1 flex flex-col overflow-hidden rounded-[22px] bg-[#f5f3f1] md:col-span-4">
            <div className="relative flex min-h-0 flex-1 flex-col items-stretch justify-start overflow-hidden">
              <img
                className="block size-full flex-1 object-cover"
                src="/images/gym/dumbbells.jpg"
                loading="lazy"
                alt="Dumbbells on a rack"
              />
            </div>
            <CardText
              title="Billing & payments"
              body="Recurring dues, invoices, and failed-payment recovery."
            />
          </article>
          <article className="col-span-1 flex flex-col overflow-hidden rounded-[22px] bg-[#f5f3f1] md:col-span-8">
            <div className="relative flex min-h-0 flex-1 flex-col items-stretch justify-start overflow-hidden">
              <div
                className="bento-marquee h-full min-h-[200px] w-full flex-1"
                aria-label="Locations running on Migios"
              >
                <div className="bento-track">
                  {marqueeGyms.map((src) => (
                    <img
                      key={src}
                      className="bento-vid object-cover"
                      src={src}
                      loading="lazy"
                      alt=""
                    />
                  ))}
                  {marqueeGyms.map((src) => (
                    <img
                      key={`${src}-dup`}
                      className="bento-vid object-cover"
                      src={src}
                      loading="lazy"
                      alt=""
                      aria-hidden="true"
                    />
                  ))}
                </div>
              </div>
            </div>
            <CardText
              title="Built for multi-gym"
              body="Switch between locations, compare performance, and standardize operations."
            />
          </article>
        </div>
      </div>
    </section>
  )
}
