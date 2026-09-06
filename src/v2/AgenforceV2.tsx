import { useEffect, useRef, useState, type ReactNode } from "react"
import { motion, useInView, useReducedMotion } from "motion/react"
import { BuildAnything } from "@/components/sections/BuildAnything"
import { Platform } from "@/components/sections/Platform"
import { ScrollReveal } from "@/components/ui/ScrollReveal"
import {
  IconAdjustmentsHorizontal,
  IconArrowUpRight,
  IconBook2,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandTwitter,
  IconCheck,
  IconCircleCheckFilled,
  IconCommand,
  IconDatabase,
  IconFileText,
  IconLayoutSidebar,
  IconLock,
  IconMenu2,
  IconMessage,
  IconMinus,
  IconMoon,
  IconNetwork,
  IconPlus,
  IconRipple,
  IconRobot,
  IconSend,
  IconSettings2,
  IconShieldCheck,
  IconSun,
  IconUserCheck,
  IconX,
} from "@tabler/icons-react"
import "./v2.css"

const ease = [0.22, 1, 0.36, 1] as const

const revealVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease } },
}

const blurVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease },
  },
}

const staggerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const artworkVariants = {
  hidden: { opacity: 0, y: -100 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease },
  },
}

const microVariants = {
  hidden: { opacity: 0, y: 14, scale: 0.985 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.42, ease },
  },
}

function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduceMotion = useReducedMotion()
  return (
    <motion.div
      initial={reduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        ...revealVariants,
        visible: {
          ...revealVariants.visible,
          transition: { ...revealVariants.visible.transition, delay },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function AgenforceMark() {
  return (
    <a href="/v2" className="v2-brand" aria-label="Migios home">
      <span className="v2-brand-mark">10</span>
      <span>Migios</span>
    </a>
  )
}

function ThemeToggle() {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains("dark"))

  const toggleTheme = () => {
    const next = !dark
    document.documentElement.classList.toggle("dark", next)
    document.documentElement.style.colorScheme = next ? "dark" : "light"
    localStorage.setItem("theme", next ? "dark" : "light")
    setDark(next)
  }

  return (
    <button type="button" className="v2-icon-button" onClick={toggleTheme} aria-label={dark ? "Use light theme" : "Use dark theme"}>
      {dark ? <IconSun size={16} /> : <IconMoon size={16} />}
    </button>
  )
}

function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="v2-navbar">
      <div className="v2-container v2-navbar-inner">
        <AgenforceMark />
        <nav className="v2-nav-links" aria-label="Primary navigation">
          <a href="#features">Features</a>
          <a href="#product">Platform</a>
          <a href="#faq">FAQs</a>
          <a href="#pricing">Pricing</a>
        </nav>
        <div className="v2-nav-actions">
          <a href="#login" className="v2-nav-login">Login</a>
          <a href="#pricing" className="v2-button v2-button-primary v2-button-compact">Sign up</a>
          <button type="button" className="v2-mobile-menu" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-label="Toggle navigation">
            {open ? <IconX size={20} /> : <IconMenu2 size={20} />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="v2-mobile-nav" aria-label="Mobile navigation">
          <a href="#features" onClick={() => setOpen(false)}>Features</a>
          <a href="#product" onClick={() => setOpen(false)}>Platform</a>
          <a href="#faq" onClick={() => setOpen(false)}>FAQs</a>
          <a href="#pricing" onClick={() => setOpen(false)}>Pricing</a>
          <a href="#login" onClick={() => setOpen(false)}>Login</a>
        </nav>
      )}
    </header>
  )
}

function Hero() {
  const reduceMotion = useReducedMotion()

  return (
    <section className="v2-hero">
      <div className="v2-container">
        <motion.div
          initial={reduceMotion ? false : "hidden"}
          animate="visible"
          variants={staggerVariants}
          className="v2-hero-copy"
        >
          <motion.h1 variants={revealVariants}>One platform for every gym<br />Every location under control.</motion.h1>
          <motion.p variants={revealVariants}>
            Migios connects memberships, payments, schedules, access, staff, and reporting—so every branch runs better from one workspace.
          </motion.p>
          <motion.div variants={revealVariants} className="v2-action-row">
            <motion.a whileHover={reduceMotion ? undefined : { y: -2 }} whileTap={reduceMotion ? undefined : { scale: 0.98 }} href="#pricing" className="v2-button v2-button-primary">
              Start your free trial
            </motion.a>
            <motion.a whileHover={reduceMotion ? undefined : { y: -2 }} whileTap={reduceMotion ? undefined : { scale: 0.98 }} href="#product" className="v2-button v2-button-secondary">
              Book a product tour
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease }}
          className="v2-hero-scene"
        >
          <motion.div
            whileHover={reduceMotion ? undefined : { y: -8 }}
            transition={{ duration: 0.3, ease }}
            className="v2-hero-motion v2-hero-motion-left"
          >
            <img src="/v2/images/product/screenshot-4.jpg" alt="Migios gym operations dashboard" className="v2-hero-plane v2-hero-plane-left" />
          </motion.div>
          <motion.div
            whileHover={reduceMotion ? undefined : { y: -8 }}
            transition={{ duration: 0.3, ease }}
            className="v2-hero-motion v2-hero-motion-right"
          >
            <img src="/v2/images/product/screenshot-3.jpg" alt="Migios multi-location management dashboard" className="v2-hero-plane v2-hero-plane-right" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

const logos = [
  ["OpenAI", "/v2/images/logos/openai.png"],
  ["Hello Patient", "/v2/images/logos/hello-patient.png"],
  ["Granola", "/v2/images/logos/granola.png"],
  ["Character AI", "/v2/images/logos/characterai.png"],
  ["Oracle", "/v2/images/logos/oracle.png"],
  ["Portola", "/v2/images/logos/portola.png"],
]

function TrustRow() {
  return (
    <section className="v2-trust">
      <Reveal className="v2-container">
        <h2>Built for independent gyms and growing fitness networks.<br />From one location to every branch.</h2>
        <div className="v2-logo-row">
          {logos.map(([name, src]) => <img key={name} src={src} alt={name} />)}
        </div>
      </Reveal>
    </section>
  )
}

const featureCards = [
  {
    title: "Memberships Built Around Your Business",
    icon: IconLayoutSidebar,
    visual: "agents",
  },
  {
    title: "Automated Billing, Scheduling, and Follow-Ups",
    icon: IconRipple,
    visual: "pipeline",
  },
  {
    title: "Access, Roles, and Operations You Can Trust",
    icon: IconShieldCheck,
    visual: "shield",
  },
]

function FeatureVisual({ type }: { type: string }) {
  const index = type === "agents" ? 1 : type === "pipeline" ? 2 : 3
  const reduceMotion = useReducedMotion()
  return (
    <motion.div
      initial={reduceMotion ? false : "hidden"}
      whileInView="visible"
      whileHover={reduceMotion ? undefined : { y: -5, scale: 1.012 }}
      viewport={{ once: true, amount: 0.35 }}
      variants={microVariants}
      transition={{ duration: 0.3, ease }}
      className={`v2-feature-reference v2-feature-reference-${index}`}
    >
      <img src={`/v2/images/features/feature-${index}-light.png`} alt="" className="v2-feature-art v2-feature-art-light" />
      <img src={`/v2/images/features/feature-${index}-dark.png`} alt="" className="v2-feature-art v2-feature-art-dark" />
      {index === 2 && (
        <>
          <img src="/v2/images/features/feature-2-light-hover.png" alt="" className="v2-feature-art v2-feature-art-light v2-feature-art-hover" />
          <img src="/v2/images/features/feature-2-dark-hover.png" alt="" className="v2-feature-art v2-feature-art-dark v2-feature-art-hover" />
        </>
      )}
    </motion.div>
  )
}

function FeatureGrid() {
  return (
    <section id="features" className="v2-section">
      <div className="v2-container">
        <div className="v2-split-heading">
          <Reveal><h2>Everything Your Gym Needs<br />To Run and Grow.</h2></Reveal>
          <Reveal delay={0.08}><p>Manage members, payments, classes, staff, and access from one connected platform. Every branch follows the same process while keeping the flexibility to operate locally.</p></Reveal>
        </div>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={staggerVariants} className="v2-feature-grid">
          {featureCards.map(({ title, icon: Icon, visual }, index) => (
            <motion.article
              key={title}
              variants={revealVariants}
              className={`v2-feature-card v2-feature-card-${index + 1}`}
            >
              <div className="v2-feature-visual"><FeatureVisual type={visual} /></div>
              <div className="v2-feature-title">
                <Icon size={20} stroke={1.7} aria-hidden="true" />
                <h3>{title}</h3>
                <span><IconPlus size={18} /></span>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

const capabilities = [
  ["Member Management", "Keep profiles, memberships, attendance, and progress connected in one place.", IconRipple],
  ["Billing and Renewals", "Track invoices, payments, renewals, and revenue across every location.", IconDatabase],
  ["Staff and Access", "Give every role the right access without slowing daily gym operations.", IconUserCheck],
] as const

function AgentStudioVisual() {
  const reduceMotion = useReducedMotion()
  return (
    <motion.div
      initial={reduceMotion ? false : "hidden"}
      whileInView="visible"
      whileHover={reduceMotion ? undefined : { y: -5, scale: 1.01 }}
      viewport={{ once: true, amount: 0.3 }}
      variants={microVariants}
      className="v2-product-reference v2-product-reference-agent"
    >
      <img src="/v2/images/product-details/agent-studio-light.png" alt="" className="v2-product-reference-art v2-reference-light" />
      <img src="/v2/images/product-details/agent-studio-dark.png" alt="" className="v2-product-reference-art v2-reference-dark" />
    </motion.div>
  )
}

function OrchestrationVisual() {
  const reduceMotion = useReducedMotion()
  const visualRef = useRef<HTMLDivElement>(null)
  const inView = useInView(visualRef, { amount: 0.35 })

  return (
    <motion.div
      ref={visualRef}
      initial={reduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={microVariants}
      className="v2-orchestration-shell"
    >
      <motion.div
        animate={inView && !reduceMotion ? { y: [0, -4, 0], rotateZ: [0, -0.35, 0] } : { y: 0, rotateZ: 0 }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="v2-product-reference v2-product-reference-orchestration"
      >
        <img src="/v2/images/product-details/orchestration-light.png" alt="Multi-agent orchestration integrations and workflow cards" className="v2-product-reference-art v2-reference-light" />
        <img src="/v2/images/product-details/orchestration-dark.png" alt="Multi-agent orchestration integrations and workflow cards" className="v2-product-reference-art v2-reference-dark" />
      </motion.div>
    </motion.div>
  )
}

function ProductScale() {
  const reduceMotion = useReducedMotion()
  return (
    <section id="product" className="v2-section v2-product-section">
      <div className="v2-dashboard-showcase">
        <div className="v2-container">
          <Reveal>
            <h2 className="v2-display-heading">Built for Daily Operations<br />Designed for Multi-Gym Scale</h2>
            <p className="v2-heading-copy">Run memberships, billing, classes, check-ins, staff, and reporting from one platform built for every stage of your gym business.</p>
          </Reveal>
          <div className="v2-product-canvas">
            <div className="v2-dashboard-stage">
              <motion.div
                initial={reduceMotion ? false : "hidden"}
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                variants={artworkVariants}
                className="v2-product-motion v2-product-motion-left"
              >
                <img src="/v2/images/product/screenshot-3.jpg" alt="Migios gym operations interface" className="v2-product-plane v2-product-plane-left" />
              </motion.div>
              <motion.div
                initial={reduceMotion ? false : "hidden"}
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                variants={{
                  ...artworkVariants,
                  visible: {
                    ...artworkVariants.visible,
                    transition: { ...artworkVariants.visible.transition, delay: 0.12 },
                  },
                }}
                className="v2-product-motion v2-product-motion-right"
              >
                <img src="/v2/images/product/screenshot-4.jpg" alt="Migios multi-location operations interface" className="v2-product-plane v2-product-plane-right" />
              </motion.div>
            </div>
          </div>
        </div>
        <div className="v2-showcase-cover" />
      </div>
      <div className="v2-container">
        <div className="v2-product-headings">
          <Reveal className="v2-product-detail"><h3>Gym Operations Hub</h3><p>Bring member data, schedules, billing, staff, and day-to-day activity into one focused workspace.</p><AgentStudioVisual /></Reveal>
          <Reveal className="v2-product-detail" delay={0.08}><h3>Multi-Location Control</h3><p>Coordinate every branch with shared standards, live visibility, and location-level flexibility.</p><OrchestrationVisual /></Reveal>
        </div>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={staggerVariants} className="v2-capability-grid">
          {capabilities.map(([title, description, Icon], index) => (
            <motion.div key={title} variants={microVariants}>
              <motion.article whileHover={reduceMotion ? undefined : { y: -4 }} className="v2-capability">
                <Icon size={18} />
                <h3>{title}</h3>
                <p>{description}</p>
              </motion.article>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function AgentOperations() {
  const reduceMotion = useReducedMotion()

  return (
    <section className="v2-section v2-agent-operations">
      <div className="v2-container">
        <Reveal className="v2-operations-heading">
          <span>Gym Operations</span>
          <h2>One system for every<br />member journey.</h2>
          <p>Connect member data, automate daily routines, and keep every branch aligned from one focused workspace.</p>
        </Reveal>

        <motion.div
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
          variants={staggerVariants}
          className="v2-operations-grid"
        >
          <motion.article variants={microVariants} whileHover={reduceMotion ? undefined : { y: -4 }} className="v2-operation-card v2-operation-context">
            <div className="v2-context-map">
              <motion.div
                initial={reduceMotion ? false : { scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, ease }}
                className="v2-context-node"
              >
                <IconNetwork size={28} stroke={1.7} />
              </motion.div>
              {[0, 1, 2, 3].map((line) => (
                <motion.span
                  key={line}
                  initial={reduceMotion ? false : { scaleX: 0, opacity: 0 }}
                  whileInView={{ scaleX: 1, opacity: 1 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.55, delay: 0.16 + line * 0.08, ease }}
                  className={`v2-context-line v2-context-line-${line + 1}`}
                />
              ))}
              <span className="v2-context-label">Live Member Data</span>
            </div>
            <div className="v2-context-copy">
              <h3>Member data that stays<br />connected</h3>
              <p>Bring profiles, memberships, visits, payments, and progress into every interaction without rebuilding your workflow.</p>
            </div>
            <div className="v2-operation-footer">
              <motion.button whileTap={reduceMotion ? undefined : { scale: 0.97 }} type="button"><IconAdjustmentsHorizontal size={17} />Manage</motion.button>
              <motion.span initial={reduceMotion ? false : { scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ type: "spring", bounce: 0.35, delay: 0.48 }}><IconCheck size={19} /></motion.span>
            </div>
          </motion.article>

          <motion.article variants={microVariants} whileHover={reduceMotion ? undefined : { y: -4 }} className="v2-operation-card v2-operation-sources">
            <div>
              <h3>Operations connected</h3>
              <p>3 live business streams</p>
            </div>
            <motion.div variants={staggerVariants} className="v2-source-icons">
              {[IconFileText, IconDatabase, IconMessage].map((Icon, index) => (
                <motion.span key={index} variants={microVariants} whileHover={reduceMotion ? undefined : { y: -3, scale: 1.06 }}><Icon size={20} stroke={1.6} /></motion.span>
              ))}
            </motion.div>
          </motion.article>

          <motion.article variants={microVariants} whileHover={reduceMotion ? undefined : { y: -4 }} className="v2-operation-card v2-operation-resolution">
            <div className="v2-resolution-title">
              <div><h3>Renewal performance</h3><p>Last 30 days</p></div>
              <span>+14.8%</span>
            </div>
            <motion.div initial={reduceMotion ? false : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.24, ease }} className="v2-resolution-value">68<span>%</span></motion.div>
            <div className="v2-resolution-track"><motion.span initial={reduceMotion ? false : { scaleX: 0 }} whileInView={{ scaleX: 0.68 }} viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.25, ease }} /></div>
            <div className="v2-resolution-meta"><span>Memberships renewed</span><strong>1,842 / 2,709</strong></div>
          </motion.article>

          <motion.article variants={microVariants} whileHover={reduceMotion ? undefined : { y: -4 }} className="v2-operation-card v2-operation-grounded">
            <div className="v2-grounded-dots" aria-hidden="true" />
            <motion.div initial={reduceMotion ? false : { opacity: 0, scale: 0.88 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.65, delay: 0.18, ease }} className="v2-grounded-value">12k</motion.div>
            <div className="v2-grounded-copy">
              <span><IconBook2 size={21} /></span>
              <h3>Decisions grounded in your<br />business</h3>
              <p>Every insight traces back to live gym data, with the source ready whenever your team needs it.</p>
            </div>
          </motion.article>

          <motion.article variants={microVariants} whileHover={reduceMotion ? undefined : { y: -3 }} className="v2-operation-card v2-operation-handoff">
            <span className="v2-handoff-icon"><IconRobot size={20} /></span>
            <div><h3>Keep every branch handoff fully informed</h3><p>The right teammate gets the member context, status, and suggested next action.</p></div>
            <span className="v2-handoff-shortcut"><IconCommand size={15} /> H <IconArrowUpRight size={16} /></span>
          </motion.article>
        </motion.div>
      </div>
    </section>
  )
}

function GovernanceReference({ name }: { name: string }) {
  const reduceMotion = useReducedMotion()
  return (
    <motion.div
      initial={reduceMotion ? false : "hidden"}
      whileInView="visible"
      whileHover={reduceMotion ? undefined : { y: -5, scale: 1.008 }}
      viewport={{ once: true, amount: 0.3 }}
      variants={microVariants}
      className="v2-governance-reference"
    >
      <img src={`/v2/images/governance/${name}-light.png`} alt="" className="v2-governance-reference-art v2-reference-light" />
      <img src={`/v2/images/governance/${name}-dark.png`} alt="" className="v2-governance-reference-art v2-reference-dark" />
    </motion.div>
  )
}

function ActivityPanel() {
  return <GovernanceReference name="audit" />
}

function AvatarCluster() {
  return <GovernanceReference name="access" />
}

function ApprovalDiagram() {
  return <GovernanceReference name="approval" />
}

function GuardrailPanel() {
  return <GovernanceReference name="guardrail" />
}

function Governance() {
  const reduceMotion = useReducedMotion()
  return (
    <section className="v2-section v2-governance">
      <div className="v2-dashboard-showcase">
        <div className="v2-container">
          <Reveal>
            <h2 className="v2-display-heading">One Standard,<br />Every Location</h2>
            <p className="v2-heading-copy">Set clear roles, approval flows, operating rules, and activity records. Every branch stays visible, accountable, and consistent.</p>
          </Reveal>
          <div className="v2-governance-canvas">
            <div className="v2-dashboard-stage">
              <motion.div
                initial={reduceMotion ? false : "hidden"}
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                variants={artworkVariants}
                className="v2-governance-motion v2-governance-motion-left"
              >
                <img src="/v2/images/product/screenshot-5.jpg" alt="Migios multi-gym analytics dashboard" />
              </motion.div>
              <motion.div
                initial={reduceMotion ? false : "hidden"}
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                variants={{
                  ...artworkVariants,
                  visible: {
                    ...artworkVariants.visible,
                    transition: { ...artworkVariants.visible.transition, delay: 0.12 },
                  },
                }}
                className="v2-governance-motion v2-governance-motion-right"
              >
                <img src="/v2/images/product/screenshot-6.jpg" alt="Migios gym analytics dashboard detail" />
              </motion.div>
            </div>
          </div>
        </div>
        <div className="v2-showcase-cover" />
      </div>
      <div className="v2-container">
        <div className="v2-governance-grid">
          <Reveal className="v2-governance-cell">
            <h3>Activity History</h3>
            <p>Tracks important staff actions, operational changes, and timestamps across locations.</p>
            <ActivityPanel />
          </Reveal>
          <Reveal className="v2-governance-cell" delay={0.08}>
            <h3>Role-Based Access</h3>
            <p>Controls who can view, operate, approve, or manage each part of the gym.</p>
            <AvatarCluster />
          </Reveal>
          <Reveal className="v2-governance-cell">
            <h3>Approval Workflows</h3>
            <p>Routes sensitive operational changes to the right reviewer before they take effect.</p>
            <ApprovalDiagram />
          </Reveal>
          <Reveal className="v2-governance-cell" delay={0.08}>
            <h3>Business Rules</h3>
            <p>Applies membership, access, billing, and operating policies consistently.</p>
            <GuardrailPanel />
          </Reveal>
        </div>
      </div>
    </section>
  )
}

const pricing = [
  { price: "$10", label: "Perfect for independent gyms ready to simplify daily operations.", action: "Start your free trial", features: ["1 Gym Location", "Membership and Billing", "Class Scheduling", "7 Day activity history"] },
  { price: "$60", label: "Ideal for growing gym networks that need control at every location.", action: "Contact Sales", features: ["Up to 5 Gym Locations", "Centralized Operations", "Advanced Access Roles", "30 Day activity history", "Business Analytics"] },
]

function Pricing() {
  const reduceMotion = useReducedMotion()
  return (
    <section id="pricing" className="v2-section v2-pricing">
      <div className="v2-container v2-pricing-layout">
        <Reveal className="v2-pricing-copy">
          <span>Built for growing fitness businesses</span>
          <h2>Simple pricing.<br />Ready to scale.</h2>
          <p>Start with one gym, add locations as you grow, and unlock centralized operations, deeper reporting, and stronger access control when you are ready.</p>
          <ul>
            <li><IconCheck size={16} /> Memberships and Billing</li>
            <li><IconCheck size={16} /> Multi-Location Management</li>
            <li><IconCheck size={16} /> Role-Based Access</li>
          </ul>
        </Reveal>
        <div className="v2-price-stack">
          {pricing.map((plan, index) => (
            <motion.article
              key={plan.price}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={blurVariants}
              whileHover={reduceMotion ? undefined : { y: -4 }}
              className="v2-price-card"
            >
              <div className="v2-price-main"><h3>{plan.price}<small>/mo</small></h3><p>{plan.label}</p><a href="#login" className="v2-button v2-button-primary">{plan.action}</a></div>
              <ul>{plan.features.map((feature) => <li key={feature}><IconCircleCheckFilled size={17} />{feature}</li>)}</ul>
              {index === 1 && <span className="v2-price-badge">Scale</span>}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

const faqs = [
  ["What is Migios?", "Migios is a multi-gym management platform for memberships, billing, schedules, access, staff, and reporting."],
  ["Who is Migios built for?", "Migios is designed for independent gyms, studios, fitness clubs, and growing multi-location operators."],
  ["Can Migios manage multiple gym locations?", "Yes. Owners can monitor every location centrally while each branch manages its own daily operations."],
  ["Does Migios support billing and renewals?", "Yes. Migios helps teams manage invoices, payments, membership renewals, and revenue visibility."],
  ["What kind of support do you provide?", "Support is available through chat, email, onboarding guidance, and product documentation."],
]

function Faq() {
  const [active, setActive] = useState<number | null>(null)
  return (
    <section id="faq" className="v2-section v2-faq">
      <div className="v2-container v2-faq-container">
        <Reveal>
          <span className="v2-faq-icon">
            <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M18.2031 46C24.2783 46 29.2031 41.0751 29.2031 35C29.2031 28.9249 24.2783 24 18.2031 24C12.128 24 7.20312 28.9249 7.20312 35C7.20312 41.0751 12.128 46 18.2031 46Z" fill="currentColor" />
              <path d="M18.2058 50C9.97778 50 2.72178 55.248 0.149781 63.064C-0.150219 63.98 0.00578082 64.98 0.569781 65.76C1.13378 66.54 2.03778 67 2.99778 67H33.4058C34.3658 67 35.2738 66.54 35.8338 65.76C36.3938 64.98 36.5578 63.98 36.2538 63.064C33.6858 55.248 26.4338 50 18.1978 50H18.2058Z" fill="currentColor" />
              <path opacity="0.2" d="M63 0H41C36.04 0 32 4.036 32 9V23C32 27.624 35.508 31.444 40 31.944V41C40 42.236 40.756 43.348 41.916 43.796C42.268 43.932 42.636 44 43 44C43.824 44 44.632 43.66 45.212 43.028L55.32 32H63C67.96 32 72 27.964 72 23V9C72 4.036 67.96 0 63 0Z" fill="currentColor" />
            </svg>
          </span>
          <h2>Frequently Asked Questions</h2>
        </Reveal>
        <div className="v2-faq-list">
          {faqs.map(([question, answer], index) => {
            const open = active === index
            return (
              <div className={`v2-faq-item ${open ? "is-open" : ""}`} key={question}>
                <button type="button" onClick={() => setActive(open ? null : index)} aria-expanded={open}>
                  <span>{question}</span>
                  <span className="v2-faq-control">{open ? <IconPlus size={18} /> : <IconMinus size={18} />}</span>
                </button>
                <motion.div initial={false} animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }} transition={{ duration: 0.3, ease }} className="v2-faq-answer">
                  <p>{answer}</p>
                </motion.div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="v2-footer">
      <div className="v2-footer-grid" aria-hidden="true" />
      <div className="v2-container v2-footer-layout">
        <div className="v2-footer-brand"><AgenforceMark /><p>Multi Gym In One Solution</p><a href="#pricing" className="v2-button v2-button-primary">Start your free trial</a></div>
        <div><h3>Platform</h3><a href="#product">Member CRM</a><a href="#product">Class Scheduling</a><a href="#product">Billing and Payments</a><a href="#product">Access Control</a><a href="#product">Analytics Dashboard</a></div>
        <div><h3>Company</h3><a href="#about">About Us</a><a href="#careers">Careers</a><a href="#press">Press</a><a href="#contact">Contact</a><a href="#blog">Blog</a></div>
        <div><h3>Newsletter</h3><div className="v2-newsletter"><input type="email" placeholder="Your email" aria-label="Email address" /><button type="button" aria-label="Subscribe"><IconSend size={16} /></button></div><p>Get practical gym growth insights and the latest Migios product updates.</p></div>
      </div>
      <div className="v2-container v2-footer-bottom">
        <span>© 2026 Migios. All rights reserved.</span>
        <div><a href="#privacy">Privacy Policy</a><a href="#terms">Terms of Service</a></div>
        <div className="v2-socials"><ThemeToggle /><a href="#twitter" aria-label="Twitter"><IconBrandTwitter size={17} /></a><a href="#instagram" aria-label="Instagram"><IconBrandInstagram size={17} /></a><a href="#linkedin" aria-label="LinkedIn"><IconBrandLinkedin size={17} /></a></div>
      </div>
    </footer>
  )
}

export function AgenforceV2() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="v2-page">
      <Navbar />
      <main>
        <Hero />
        <TrustRow />
        <FeatureGrid />
        <div className="v2-main-copy-sections">
          <ScrollReveal>
            <BuildAnything />
          </ScrollReveal>
          <ScrollReveal>
            <Platform />
          </ScrollReveal>
        </div>
        <ProductScale />
        <AgentOperations />
        <Governance />
        <Pricing />
        <Faq />
      </main>
      <Footer />
    </div>
  )
}
