import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useSpring, useMotionValueEvent } from "motion/react";
import { Toaster, toast } from "sonner";
import {
  ArrowRight, Play, Sparkles, ShieldCheck, Zap, Building2, Factory, Users, FileText,
  BrainCircuit, ScanFace, Fingerprint, ClipboardCheck, BarChart3, Bot, LineChart,
  CheckCircle2, XCircle, ChevronDown, Phone, Mail, MapPin, Linkedin, Instagram,
  Facebook, Menu, X, Rocket, Award, Cloud, MessageCircle, Calendar, Briefcase,
  Wallet, Fingerprint as FP, Scale, Clock, HeartPulse, GraduationCap, Store,
  BadgeIndianRupee, FileCheck2, Landmark, TrendingUp, Layers, Cpu, Smartphone,
  Bell, QrCode, Camera, MapPinned, Send, Sun, Moon, Pause,
} from "lucide-react";
import mascot from "@/assets/hero-mascot.png";

/* ---------------- Scroll Progress Bar ---------------- */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 20, mass: 0.2 });
  return (
    <motion.div
      style={{ scaleX, transformOrigin: "0% 50%" }}
      className="fixed left-0 right-0 top-0 z-[60] h-[3px] bg-gradient-brand shadow-glow"
    />
  );
}

export const Route = createFileRoute("/")({
  head: () => ({
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "SWIFT",
          applicationCategory: "BusinessApplication",
          description:
            "AI Powered HR, Payroll, Compliance & Factory Management Platform. Powered by Creatons.",
          operatingSystem: "Web, iOS, Android",
          offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
          publisher: { "@type": "Organization", name: "Creatons", url: "https://www.creatons.in" },
        }),
      },
    ],
  }),
  component: Landing,
});

/* ---------------- Theme (light/dark) ---------------- */
function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  useEffect(() => {
    setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");
  }, []);
  const toggle = () => {
    const next = document.documentElement.classList.contains("dark") ? "light" : "dark";
    document.documentElement.classList.toggle("dark", next === "dark");
    try { localStorage.setItem("swift-theme", next); } catch {}
    setTheme(next);
  };
  return { theme, toggle };
}
function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className={`glass grid h-9 w-9 place-items-center rounded-xl hover:scale-105 transition ${className}`}
    >
      {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}

/* ---------------- Cursor Glow (throttled via rAF) ---------------- */
function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const el = ref.current;
    if (!el) return;
    let x = 0, y = 0, raf = 0, pending = false;
    const onMove = (e: MouseEvent) => {
      x = e.clientX; y = e.clientY;
      if (!pending) {
        pending = true;
        raf = requestAnimationFrame(() => {
          el.style.transform = `translate3d(${x - 250}px, ${y - 250}px, 0)`;
          pending = false;
        });
      }
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => { window.removeEventListener("pointermove", onMove); cancelAnimationFrame(raf); };
  }, []);
  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[1] hidden md:block h-[500px] w-[500px] rounded-full opacity-60 blur-3xl will-change-transform"
      style={{
        background:
          "radial-gradient(circle, oklch(0.82 0.13 200 / 0.35) 0%, oklch(0.82 0.14 20 / 0.15) 40%, transparent 70%)",
      }}
    />
  );
}

/* ---------------- Brand Mark ---------------- */
function Brand({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative h-9 w-9 rounded-xl bg-gradient-brand shadow-glow grid place-items-center">
        <span className="text-white font-display font-bold text-lg">S</span>
        <div className="absolute inset-0 rounded-xl shine opacity-40" />
      </div>
      <div className="leading-tight">
        <div className="font-display font-bold text-lg tracking-tight">SWIFT</div>
        <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          Talent Intelligence
        </div>
      </div>
    </div>
  );
}

/* ---------------- Nav ---------------- */
function Nav() {
  const [open, setOpen] = useState(false);
  const links = [
    ["Mobile", "#mobile"],
    ["Demo", "#demo"],
    ["Platform", "#ecosystem"],
    ["AI", "#ai"],
    ["Modules", "#modules"],
    ["Compliance", "#compliance"],
    ["Pricing", "#pricing"],
    ["FAQ", "#faq"],
  ];
  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed inset-x-0 top-4 z-50 mx-auto max-w-6xl px-4"
    >
      <div className="glass-strong flex items-center justify-between rounded-2xl px-4 py-2.5">
        <a href="#top"><Brand /></a>
        <nav className="hidden md:flex items-center gap-1">
          {links.map(([l, h]) => (
            <a key={l} href={h} className="px-3 py-2 text-sm text-foreground/80 hover:text-foreground rounded-lg hover:bg-white/60 transition">
              {l}
            </a>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-2">
          <ThemeToggle />
          <a href="#contact" className="text-sm px-3 py-2 rounded-lg hover:bg-white/60 dark:hover:bg-white/10">Sign in</a>
          <a href="#contact" className="group relative inline-flex items-center gap-1.5 rounded-xl bg-gradient-brand text-white text-sm font-medium px-4 py-2 shadow-glow">
            Request Demo <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button className="p-2" onClick={() => setOpen(!open)} aria-label="menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="glass-strong mt-2 rounded-2xl p-3 md:hidden">
            {links.map(([l, h]) => (
              <a key={l} href={h} onClick={() => setOpen(false)} className="block px-3 py-2 rounded-lg hover:bg-white/60">{l}</a>
            ))}
            <a href="#contact" onClick={() => setOpen(false)} className="mt-2 block text-center rounded-xl bg-gradient-brand text-white px-4 py-2">Request Demo</a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

/* ---------------- Floating hologram cards around mascot ---------------- */
const heroChips = [
  { icon: Users, label: "Employees", value: "2,481", tone: "teal" },
  { icon: Clock, label: "Attendance", value: "98.4%", tone: "cyan" },
  { icon: Wallet, label: "Payroll", value: "₹1.2 Cr", tone: "coral" },
  { icon: ShieldCheck, label: "Compliance", value: "AAA", tone: "violet" },
  { icon: Factory, label: "Factory Audit", value: "12 / 12", tone: "teal" },
  { icon: FileCheck2, label: "Gov Forms", value: "1,024", tone: "cyan" },
] as const;

function HeroCard({
  icon: Icon, label, value, className = "", delay = 0,
}: { icon: any; label: string; value: string; className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.6 }}
      className={`glass-strong absolute rounded-2xl px-3 py-2.5 shadow-soft animate-float ${className}`}
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="flex items-center gap-2.5">
        <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-brand text-white">
          <Icon className="h-4 w-4" />
        </div>
        <div className="leading-tight">
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
          <div className="text-sm font-semibold">{value}</div>
        </div>
      </div>
    </motion.div>
  );
}

/* ---------------- HERO ---------------- */
function Hero() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.2], [0, -80]);
  return (
    <section id="top" className="relative isolate overflow-hidden pt-28 pb-12 md:pt-32 md:pb-16">
      {/* aurora bg */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-aurora" />
      <div className="pointer-events-none absolute -top-40 -left-40 -z-10 h-[560px] w-[560px] rounded-full bg-teal/30 blur-3xl animate-blob" />
      <div className="pointer-events-none absolute -top-20 right-0 -z-10 h-[500px] w-[500px] rounded-full bg-coral/25 blur-3xl animate-blob" style={{ animationDelay: "6s" }} />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.35] [background-image:linear-gradient(to_right,oklch(0.85_0.02_220/.4)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0.85_0.02_220/.4)_1px,transparent_1px)] [background-size:44px_44px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_75%)]" />

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-4 lg:grid-cols-12 lg:gap-10">
        {/* LEFT — mascot */}
        <motion.div style={{ y }} className="relative lg:col-span-6 order-2 lg:order-1">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[420px] sm:max-w-[520px] lg:max-w-[560px]">
            <div className="absolute inset-4 rounded-[40px] bg-gradient-to-br from-white/70 to-white/30 backdrop-blur-2xl shadow-soft" />
            <img
              src={mascot}
              alt="SWIFT AI HR consultant holding a floating holographic dashboard"
              width={1280}
              height={1600}
              className="relative z-10 h-full w-full object-contain drop-shadow-[0_30px_60px_rgba(20,140,160,0.25)]"
            />
            {/* floating cards */}
            <HeroCard icon={Users} label="Employees" value="2,481" className="left-[-6px] sm:left-[-14px] top-[6%]" delay={0.1} />
            <HeroCard icon={Clock} label="Attendance" value="98.4%" className="right-[-4px] sm:right-[-8px] top-[16%]" delay={0.25} />
            <HeroCard icon={Wallet} label="Payroll" value="₹1.24 Cr" className="right-[-8px] sm:right-[-24px] top-[52%]" delay={0.45} />
            <HeroCard icon={ShieldCheck} label="Compliance" value="AAA" className="left-[-8px] sm:left-[-24px] top-[46%]" delay={0.55} />
            <HeroCard icon={FileCheck2} label="Gov Forms" value="1,024" className="left-[4%] bottom-[6%]" delay={0.65} />
            <HeroCard icon={Factory} label="Factory Audit" value="12 / 12" className="right-[4%] bottom-[2%]" delay={0.75} />

            {/* mini phone — hidden on mobile to prevent overlap */}
            <motion.div
              initial={{ opacity: 0, y: 30, rotate: -6 }}
              animate={{ opacity: 1, y: 0, rotate: -6 }}
              transition={{ delay: 0.9, duration: 0.7 }}
              className="absolute -right-6 bottom-16 z-20 hidden h-56 w-28 rounded-[26px] border border-white/70 bg-gradient-to-b from-white to-white/70 p-1.5 shadow-soft animate-float-slow sm:block"
            >
              <div className="relative h-full w-full overflow-hidden rounded-[20px] bg-gradient-to-br from-teal/20 via-cyan/10 to-coral/20">
                <div className="p-2 text-[8px] font-semibold text-ink/70">SWIFT · Mobile</div>
                <div className="mx-1.5 rounded-lg bg-white/80 p-1.5 shadow-sm">
                  <div className="text-[8px] text-muted-foreground">Today</div>
                  <div className="text-[10px] font-semibold">Checked in · 09:02</div>
                </div>
                <div className="mx-1.5 mt-1 rounded-lg bg-gradient-brand p-1.5 text-[8px] text-white">
                  Payroll ready · Nov
                </div>
                <div className="mx-1.5 mt-1 h-10 rounded-lg bg-white/80 p-1.5">
                  <svg viewBox="0 0 100 30" className="h-full w-full">
                    <polyline fill="none" stroke="oklch(0.72 0.11 195)" strokeWidth="2" points="0,20 15,10 30,14 45,6 60,12 75,4 100,10" />
                  </svg>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* RIGHT — copy */}
        <div className="lg:col-span-6 order-1 lg:order-2">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-teal" />
            </span>
            AI Powered · Powered by <a className="underline underline-offset-2" href="https://www.creatons.in" target="_blank" rel="noreferrer">Creatons</a>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="mt-4 font-display text-[2.5rem] font-bold leading-[1.02] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Run your <span className="text-gradient">entire HR</span><br />
            from your <span className="text-gradient">pocket.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="mt-5 max-w-xl text-[15px] leading-relaxed text-muted-foreground md:text-lg"
          >
            SWIFT is India's first mobile-first, AI-native HR operating system. Attendance, Payroll, Compliance,
            Factory Audits and 1000+ Government Forms — all managed from a single intelligent app.
          </motion.p>


          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="mt-7 flex flex-wrap items-center gap-3"
          >
            <a href="#contact" className="group inline-flex items-center gap-2 rounded-xl bg-gradient-brand px-5 py-3 text-sm font-semibold text-white shadow-glow transition hover:-translate-y-0.5">
              <Rocket className="h-4 w-4" /> Start Free Trial
            </a>
            <a href="#contact" className="glass-strong inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold hover:-translate-y-0.5 transition">
              <Calendar className="h-4 w-4" /> Request Live Demo
            </a>
            <a href="#ai" className="inline-flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-foreground/80 hover:text-foreground">
              <Play className="h-4 w-4" /> Explore AI Features
            </a>
          </motion.div>

          {/* stats */}
          <div className="mt-8 grid max-w-xl grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              ["500+", "Modules"],
              ["1000+", "Gov Forms"],
              ["AI", "Powered"],
              ["100%", "Paperless"],
            ].map(([v, l]) => (
              <div key={l} className="glass rounded-xl p-3 text-center">
                <div className="text-gradient font-display text-xl font-bold">{v}</div>
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{l}</div>
              </div>
            ))}
          </div>

          {/* trust chips */}
          <div className="mt-5 flex flex-wrap gap-2">
            {["AI Ready", "Payroll Ready", "Compliance Ready", "Factory Ready", "PF · ESI", "Tamil Nadu Ready", "Cloud Based"].map((t) => (
              <span key={t} className="glass rounded-full px-3 py-1 text-xs text-foreground/80">
                <CheckCircle2 className="mr-1 inline h-3 w-3 text-teal" />{t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Trusted Marquee ---------------- */
function Trusted() {
  const items = ["Manufacturing", "Factories", "Textiles", "Hospitals", "Schools", "Construction", "Engineering", "Corporate Offices", "Retail", "Warehouses", "Hotels"];
  return (
    <section className="relative py-14">
      <div className="mx-auto max-w-7xl px-4">
        <p className="text-center text-xs uppercase tracking-[0.25em] text-muted-foreground">
          Trusted across industries
        </p>
        <div className="mt-6 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex w-max animate-marquee gap-10">
            {[...items, ...items].map((t, i) => (
              <div key={i} className="flex items-center gap-2 text-lg font-display font-semibold text-foreground/50">
                <Sparkles className="h-4 w-4 text-teal" /> {t}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Section shell ---------------- */
function SectionTitle({ kicker, title, sub }: { kicker: string; title: React.ReactNode; sub?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto max-w-3xl text-center"
    >
      <div className="glass mx-auto inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs">
        <Sparkles className="h-3.5 w-3.5 text-teal" /> {kicker}
      </div>
      <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">{title}</h2>
      {sub && <p className="mt-4 text-sm text-muted-foreground md:text-base">{sub}</p>}
    </motion.div>
  );
}

/* ---------------- Mobile-First USP (cinematic scroll) ---------------- */
const phoneScreens = [
  {
    tag: "Face + Geo Attendance",
    icon: ScanFace,
    color: "from-teal to-cyan",
    body: (
      <>
        <div className="mx-auto mt-3 grid h-24 w-24 place-items-center rounded-full border-4 border-teal/40 bg-gradient-to-br from-teal/20 to-cyan/20">
          <ScanFace className="h-10 w-10 text-teal" />
        </div>
        <div className="mt-3 text-center text-[10px] font-semibold text-ink">Face verified · 09:02 AM</div>
        <div className="mt-1 flex items-center justify-center gap-1 text-[9px] text-muted-foreground">
          <MapPinned className="h-2.5 w-2.5" /> Hosur Plant · Geo-fenced
        </div>
        <div className="mt-3 grid grid-cols-2 gap-1.5">
          <div className="rounded-lg bg-teal/10 p-1.5 text-center text-[9px] font-medium text-teal">Checked In</div>
          <div className="rounded-lg bg-white/80 p-1.5 text-center text-[9px]">Break</div>
        </div>
      </>
    ),
  },
  {
    tag: "One-tap Payroll",
    icon: Wallet,
    color: "from-cyan to-coral",
    body: (
      <>
        <div className="mt-2 text-[9px] uppercase tracking-wider text-muted-foreground">November payroll</div>
        <div className="font-display text-2xl font-bold text-ink">₹1.24 Cr</div>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
          <div className="h-full w-[86%] bg-gradient-brand" />
        </div>
        <div className="mt-1 text-[9px] text-teal">86% validated by AI</div>
        <div className="mt-3 space-y-1">
          {["PF challan · ready", "ESI · auto-filed", "Bonus · calculated"].map((s) => (
            <div key={s} className="flex items-center gap-1.5 rounded-md bg-white/80 px-2 py-1 text-[9px]">
              <CheckCircle2 className="h-2.5 w-2.5 text-teal" /> {s}
            </div>
          ))}
        </div>
        <button className="mt-3 w-full rounded-lg bg-gradient-brand py-1.5 text-[10px] font-semibold text-white">
          Run Payroll
        </button>
      </>
    ),
  },
  {
    tag: "AI Compliance Score",
    icon: ShieldCheck,
    color: "from-violet to-teal",
    body: (
      <>
        <div className="mx-auto mt-2 grid h-24 w-24 place-items-center rounded-full bg-gradient-brand text-white shadow-glow">
          <div className="text-center">
            <div className="font-display text-2xl font-bold">AAA</div>
            <div className="text-[8px] opacity-90">Risk grade</div>
          </div>
        </div>
        <div className="mt-3 space-y-1">
          {[
            ["Factory Act", "98%"],
            ["PF · ESI", "100%"],
            ["Shops & Estab.", "94%"],
          ].map(([l, v]) => (
            <div key={l} className="flex items-center justify-between rounded-md bg-white/80 px-2 py-1 text-[9px]">
              <span>{l}</span><span className="font-semibold text-teal">{v}</span>
            </div>
          ))}
        </div>
      </>
    ),
  },
  {
    tag: "AI Chat Assistant",
    icon: Bot,
    color: "from-teal to-violet",
    body: (
      <>
        <div className="mt-2 space-y-1.5">
          <div className="ml-6 rounded-2xl rounded-tr-sm bg-gradient-brand p-2 text-[9px] text-white">
            How many employees on leave today?
          </div>
          <div className="mr-6 rounded-2xl rounded-tl-sm bg-white/90 p-2 text-[9px] text-ink shadow-sm">
            <span className="font-semibold text-teal">12 employees</span> — 4 sick, 6 casual, 2 earned. Auto-approvals suggested for 8.
          </div>
          <div className="mr-6 rounded-2xl rounded-tl-sm bg-white/90 p-2 text-[9px] text-ink shadow-sm">
            Form 22 for TN is due in 3 days. Shall I draft?
          </div>
        </div>
        <div className="mt-3 flex items-center gap-1.5 rounded-full border border-border bg-white/80 px-2 py-1.5">
          <Sparkles className="h-3 w-3 text-teal" />
          <span className="text-[9px] text-muted-foreground">Ask SWIFT anything…</span>
          <Send className="ml-auto h-3 w-3 text-teal" />
        </div>
      </>
    ),
  },
];

function MobileUSP() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ["start start", "end end"] });
  const [active, setActive] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(phoneScreens.length - 1, Math.max(0, Math.floor(v * phoneScreens.length)));
    setActive(idx);
  });

  return (
    <section id="mobile" className="relative py-16 md:py-24">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-aurora opacity-60" />
      <div className="mx-auto max-w-7xl px-4">
        <SectionTitle
          kicker="Mobile-First · Our USP"
          title={<>Your entire HR, <span className="text-gradient">in one thumb.</span></>}
          sub="Every module. Every workflow. Every compliance check. SWIFT AI Intelligence puts the full HR operating system inside your phone — for HR heads, plant managers and employees alike."
        />

        {/* Sticky cinematic scroll */}
        <div ref={wrapRef} className="relative mt-12 md:mt-16" style={{ height: `${phoneScreens.length * 90}vh` }}>
          <div className="sticky top-20 grid grid-cols-1 items-center gap-10 md:top-24 lg:grid-cols-2">
            {/* LEFT — feature list */}
            <div className="order-2 space-y-3 lg:order-1">
              {phoneScreens.map((s, i) => {
                const on = active === i;
                return (
                  <motion.div
                    key={s.tag}
                    animate={{ opacity: on ? 1 : 0.4, x: on ? 0 : -8, scale: on ? 1 : 0.98 }}
                    transition={{ duration: 0.4 }}
                    className={`glass-strong flex items-start gap-4 rounded-2xl p-4 md:p-5 ${on ? "shadow-glow" : ""}`}
                  >
                    <div className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${s.color} text-white shadow-glow`}>
                      <s.icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-display text-base font-semibold md:text-lg">{s.tag}</div>
                      <p className="mt-1 text-xs text-muted-foreground md:text-sm">
                        {i === 0 && "Contactless check-ins with face recognition + geo-fencing across every plant & branch."}
                        {i === 1 && "Run payroll for thousands in minutes. AI catches errors before the money moves."}
                        {i === 2 && "Live compliance grade across acts, states, plants — with the exact next action to take."}
                        {i === 3 && "Ask anything. Draft anything. SWIFT AI is a HR co-pilot in your pocket."}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
              <div className="mt-4 flex flex-wrap gap-2">
                {["iOS", "Android", "Offline-first", "Face + Geo", "Push Alerts", "AI Chat"].map((t) => (
                  <span key={t} className="glass rounded-full px-3 py-1 text-[11px] text-foreground/80">
                    <CheckCircle2 className="mr-1 inline h-3 w-3 text-teal" />{t}
                  </span>
                ))}
              </div>
            </div>

            {/* RIGHT — phone */}
            <div className="order-1 flex items-center justify-center lg:order-2">
              <div className="relative">
                {/* halo */}
                <div className="absolute inset-0 -z-10 bg-gradient-brand blur-3xl opacity-30 animate-pulse-ring rounded-full" />
                <div className="relative h-[520px] w-[260px] rounded-[44px] border-[6px] border-ink/80 bg-ink shadow-soft md:h-[580px] md:w-[290px]">
                  {/* notch */}
                  <div className="absolute left-1/2 top-2 z-20 h-5 w-24 -translate-x-1/2 rounded-full bg-black" />
                  <div className="relative h-full w-full overflow-hidden rounded-[36px] bg-gradient-to-br from-white via-white to-cyan/10">
                    {/* status bar */}
                    <div className="flex items-center justify-between px-5 pt-4 text-[9px] font-semibold text-ink/70">
                      <span>9:41</span>
                      <span className="flex items-center gap-1"><Bell className="h-2.5 w-2.5" /> SWIFT</span>
                    </div>
                    {/* rotating screens */}
                    <div className="relative mt-2 h-[calc(100%-32px)] px-3">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={active}
                          initial={{ opacity: 0, y: 20, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -20, scale: 0.96 }}
                          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                          className="h-full"
                        >
                          <div className="flex items-center gap-2 rounded-xl bg-gradient-brand px-3 py-2 text-white">
                            {(() => { const I = phoneScreens[active].icon; return <I className="h-3.5 w-3.5" />; })()}
                            <div className="text-[10px] font-semibold">{phoneScreens[active].tag}</div>
                            <Sparkles className="ml-auto h-3 w-3 opacity-80" />
                          </div>
                          <div className="mt-2 rounded-2xl bg-white/70 p-3 shadow-sm backdrop-blur">
                            {phoneScreens[active].body}
                          </div>
                          {/* bottom nav */}
                          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-around rounded-2xl bg-ink/95 px-3 py-2 text-white">
                            {[Users, Clock, Wallet, ShieldCheck, Bot].map((I, i) => (
                              <div key={i} className={`grid h-7 w-7 place-items-center rounded-lg ${i === active % 5 ? "bg-gradient-brand" : ""}`}>
                                <I className="h-3.5 w-3.5" />
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
                {/* progress dots */}
                <div className="mt-4 flex justify-center gap-1.5">
                  {phoneScreens.map((_, i) => (
                    <div key={i} className={`h-1.5 rounded-full transition-all ${i === active ? "w-6 bg-gradient-brand" : "w-1.5 bg-muted"}`} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


/* ---------------- Cinematic Mobile Demo Video (scripted, with captions) ---------------- */
const demoScenes = [
  {
    caption: "Employee opens SWIFT and taps to check in.",
    icon: Smartphone,
    render: (t: number) => (
      <div className="flex h-full flex-col items-center justify-center">
        <div className="text-[10px] uppercase tracking-widest text-white/60">Good morning</div>
        <div className="mt-1 font-display text-lg font-bold text-white">Ravi Kumar</div>
        <motion.button
          animate={{ scale: [1, 1.06, 1] }} transition={{ duration: 1.6, repeat: Infinity }}
          className="mt-6 grid h-24 w-24 place-items-center rounded-full bg-gradient-brand text-white shadow-glow"
        >
          <Fingerprint className="h-9 w-9" />
        </motion.button>
        <div className="mt-4 text-[10px] text-white/60">Tap to check in</div>
      </div>
    ),
  },
  {
    caption: "Face verified in under a second — geo-fenced to the Hosur plant.",
    icon: ScanFace,
    render: () => (
      <div className="flex h-full flex-col items-center justify-center">
        <div className="relative">
          <motion.div initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }} className="grid h-28 w-28 place-items-center rounded-full border-4 border-teal/60 bg-teal/10">
            <ScanFace className="h-12 w-12 text-teal" />
          </motion.div>
          <motion.div initial={{ y: -50 }} animate={{ y: 50 }} transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", repeatType: "reverse" }} className="absolute left-0 right-0 top-1/2 h-0.5 bg-teal shadow-glow" />
        </div>
        <div className="mt-4 text-center text-[11px] font-semibold text-white">Face verified · 09:02 AM</div>
        <div className="mt-1 flex items-center gap-1 text-[10px] text-white/60">
          <MapPinned className="h-3 w-3" /> Hosur Plant · Geo-fenced
        </div>
      </div>
    ),
  },
  {
    caption: "HR runs November payroll for 2,481 employees with one tap.",
    icon: Wallet,
    render: () => (
      <div className="flex h-full flex-col p-1">
        <div className="text-[9px] uppercase tracking-wider text-white/60">November payroll</div>
        <div className="font-display text-2xl font-bold text-white">₹1.24 Cr</div>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/15">
          <motion.div initial={{ width: 0 }} animate={{ width: "92%" }} transition={{ duration: 2, ease: "easeOut" }} className="h-full bg-gradient-brand" />
        </div>
        <div className="mt-1 text-[10px] text-teal">AI validated · 92%</div>
        <div className="mt-3 space-y-1.5">
          {["PF challan · generated", "ESI · auto-filed", "Bonus · calculated", "TDS · reconciled"].map((s, i) => (
            <motion.div key={s} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + i * 0.15 }} className="flex items-center gap-2 rounded-md bg-white/10 px-2 py-1.5 text-[10px] text-white">
              <CheckCircle2 className="h-3 w-3 text-teal" /> {s}
            </motion.div>
          ))}
        </div>
        <div className="mt-auto rounded-lg bg-gradient-brand py-2 text-center text-[10px] font-semibold text-white">Payroll Complete</div>
      </div>
    ),
  },
  {
    caption: "AI reviews compliance across every act and plant in real time.",
    icon: ShieldCheck,
    render: () => (
      <div className="flex h-full flex-col items-center p-1">
        <motion.div initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="mt-2 grid h-24 w-24 place-items-center rounded-full bg-gradient-brand text-white shadow-glow">
          <div className="text-center">
            <div className="font-display text-2xl font-bold">AAA</div>
            <div className="text-[8px] opacity-90">Risk grade</div>
          </div>
        </motion.div>
        <div className="mt-3 w-full space-y-1.5">
          {[["Factory Act", 98], ["PF · ESI", 100], ["Shops & Estab.", 94], ["Contract Labour", 96]].map(([l, v], i) => (
            <div key={l as string} className="flex items-center gap-2 rounded-md bg-white/10 px-2 py-1.5 text-[10px] text-white">
              <span className="w-24">{l}</span>
              <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/15">
                <motion.div initial={{ width: 0 }} animate={{ width: `${v}%` }} transition={{ delay: 0.1 + i * 0.1, duration: 0.8 }} className="h-full bg-gradient-brand" />
              </div>
              <span className="font-semibold text-teal">{v}%</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    caption: "Ask SWIFT anything. Your HR co-pilot answers instantly.",
    icon: Bot,
    render: () => (
      <div className="flex h-full flex-col p-1">
        <div className="space-y-2">
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="ml-6 rounded-2xl rounded-tr-sm bg-gradient-brand p-2 text-[10px] text-white">
            How many employees are on leave today?
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="mr-6 rounded-2xl rounded-tl-sm bg-white/95 p-2 text-[10px] text-ink shadow-sm">
            <span className="font-semibold text-teal">12 employees</span> — 4 sick, 6 casual, 2 earned. Auto-approvals suggested for 8.
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4 }} className="mr-6 rounded-2xl rounded-tl-sm bg-white/95 p-2 text-[10px] text-ink shadow-sm">
            Form 22 for TN is due in 3 days. Shall I draft?
          </motion.div>
        </div>
        <div className="mt-auto flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-2 text-white/70">
          <Sparkles className="h-3 w-3 text-teal" />
          <span className="text-[10px]">Ask SWIFT anything…</span>
          <Send className="ml-auto h-3 w-3 text-teal" />
        </div>
      </div>
    ),
  },
];

function MobileDemoVideo() {
  const SCENE_MS = 3800;
  const [idx, setIdx] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!playing) return;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / SCENE_MS);
      setProgress(p);
      if (p >= 1) {
        setIdx((i) => (i + 1) % demoScenes.length);
        setProgress(0);
      } else {
        raf = requestAnimationFrame(tick);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing, idx]);

  const scene = demoScenes[idx];

  return (
    <section id="demo" className="perf-section relative py-16 md:py-24">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-aurora opacity-50" />
      <div className="mx-auto max-w-7xl px-4">
        <SectionTitle
          kicker="Cinematic Demo · 20s watch"
          title={<>Watch SWIFT <span className="text-gradient">run your HR.</span></>}
          sub="A 5-scene, fully captioned walkthrough of the mobile experience — from face check-in to AI payroll to compliance."
        />

        <div className="mx-auto mt-12 grid max-w-6xl items-center gap-8 lg:grid-cols-12">
          {/* PHONE / VIDEO CANVAS */}
          <div className="order-1 lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }}
              className="glass-strong relative overflow-hidden rounded-3xl p-4 md:p-6 shadow-soft"
            >
              {/* video top bar */}
              <div className="mb-3 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-red-400" />
                <span className="text-[10px] font-semibold uppercase tracking-widest text-foreground/70">Live · SWIFT Mobile</span>
                <span className="ml-auto text-[10px] tabular-nums text-muted-foreground">
                  Scene {idx + 1} / {demoScenes.length}
                </span>
              </div>

              <div className="relative mx-auto flex aspect-[16/10] w-full items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-ink via-ink to-[oklch(0.18_0.05_240)]">
                {/* soft grid */}
                <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(to_right,oklch(1_0_0/.06)_1px,transparent_1px),linear-gradient(to_bottom,oklch(1_0_0/.06)_1px,transparent_1px)] [background-size:32px_32px]" />
                <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_40%,oklch(0.35_0.15_200/.35),transparent_70%)]" />

                {/* Device */}
                <div className="relative z-10 h-[92%] w-[180px] rounded-[34px] border-[5px] border-black/80 bg-black shadow-glow md:w-[220px]">
                  <div className="absolute left-1/2 top-1.5 z-20 h-4 w-16 -translate-x-1/2 rounded-full bg-black" />
                  <div className="relative h-full w-full overflow-hidden rounded-[28px] bg-gradient-to-b from-[oklch(0.16_0.03_240)] to-[oklch(0.22_0.05_220)] p-3">
                    <div className="flex items-center justify-between text-[9px] font-semibold text-white/60">
                      <span>9:41</span>
                      <span className="flex items-center gap-1"><Bell className="h-2.5 w-2.5" /> SWIFT</span>
                    </div>
                    <div className="mt-2 flex items-center gap-2 rounded-xl bg-gradient-brand px-2.5 py-1.5 text-white">
                      <scene.icon className="h-3.5 w-3.5" />
                      <div className="text-[10px] font-semibold">{`Step ${idx + 1}`}</div>
                      <Sparkles className="ml-auto h-3 w-3 opacity-80" />
                    </div>
                    <div className="mt-3 h-[calc(100%-88px)]">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -12 }}
                          transition={{ duration: 0.4 }}
                          className="h-full"
                        >
                          {scene.render(progress)}
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div>
                </div>

                {/* Caption overlay */}
                <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black/80 to-transparent px-4 pb-4 pt-10">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.35 }}
                      className="mx-auto max-w-md text-center text-[13px] font-medium text-white md:text-sm"
                    >
                      <span className="rounded-md bg-black/40 px-2 py-1 backdrop-blur-sm">{scene.caption}</span>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Controls + timeline */}
              <div className="mt-4 flex items-center gap-3">
                <button
                  onClick={() => setPlaying((p) => !p)}
                  className="grid h-10 w-10 place-items-center rounded-full bg-gradient-brand text-white shadow-glow"
                  aria-label={playing ? "Pause demo" : "Play demo"}
                >
                  {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </button>
                <div className="flex flex-1 items-center gap-1.5">
                  {demoScenes.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => { setIdx(i); setProgress(0); }}
                      className="group relative h-1.5 flex-1 overflow-hidden rounded-full bg-foreground/10"
                      aria-label={`Go to scene ${i + 1}`}
                    >
                      <div
                        className="h-full bg-gradient-brand transition-[width] duration-150"
                        style={{ width: i < idx ? "100%" : i === idx ? `${progress * 100}%` : "0%" }}
                      />
                    </button>
                  ))}
                </div>
                <span className="text-[10px] tabular-nums text-muted-foreground">
                  {String(Math.floor((idx * SCENE_MS + progress * SCENE_MS) / 1000)).padStart(2, "0")}s
                </span>
              </div>
            </motion.div>
          </div>

          {/* SIDE — scene list */}
          <div className="order-2 space-y-2 lg:col-span-5">
            {demoScenes.map((s, i) => {
              const on = i === idx;
              return (
                <button
                  key={i}
                  onClick={() => { setIdx(i); setProgress(0); }}
                  className={`glass w-full rounded-2xl p-3 text-left transition ${on ? "shadow-glow ring-1 ring-teal/40" : "hover:-translate-y-0.5"}`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg ${on ? "bg-gradient-brand text-white" : "bg-foreground/5 text-foreground/70"}`}>
                      <s.icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-[11px] uppercase tracking-wider text-muted-foreground">Scene {i + 1}</div>
                      <div className="truncate text-sm font-medium">{s.caption}</div>
                    </div>
                    <span className="text-[10px] tabular-nums text-muted-foreground">0:0{Math.round((i * SCENE_MS) / 1000)}</span>
                  </div>
                </button>
              );
            })}
            <div className="mt-2 flex flex-wrap gap-2">
              {["Captioned", "Auto-play", "Loop", "60fps", "Reduced-motion aware"].map((t) => (
                <span key={t} className="glass rounded-full px-3 py-1 text-[11px]">
                  <CheckCircle2 className="mr-1 inline h-3 w-3 text-teal" />{t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


function ProblemSolution() {
  const pains = ["Manual Attendance", "Excel Payroll", "Paper Files", "Compliance Risk", "Audit Problems", "PF Errors", "ESI Delays", "Factory Inspection Chaos", "Government Forms", "No Reports", "Endless Manual Work"];
  const wins = ["Automated Attendance", "One-click Payroll", "Live Factory Ops", "AI Compliance Score", "Auto Government Forms", "Smart Reports & Analytics", "AI Recommendations", "Instant PF & ESI", "Face + Geo Attendance", "Digital Signatures", "Everything paperless"];
  return (
    <section className="relative py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <SectionTitle kicker="Before vs After" title={<>The end of <span className="text-gradient">spreadsheet HR</span></>} sub="Ditch the manual, paper and Excel chaos. Move to an AI operating system built for modern factories and enterprises." />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="glass rounded-3xl p-6 border-destructive/10">
            <div className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-destructive">
              <XCircle className="h-4 w-4" /> Traditional HR
            </div>
            <ul className="space-y-3">
              {pains.map((p) => (
                <li key={p} className="flex items-start gap-3 rounded-xl bg-destructive/5 px-3 py-2.5 text-sm">
                  <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-destructive/70" /> {p}
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="glass-strong rounded-3xl p-6 shadow-glow">
            <div className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-teal">
              <Sparkles className="h-4 w-4" /> SWIFT AI
            </div>
            <ul className="space-y-3">
              {wins.map((p) => (
                <li key={p} className="flex items-start gap-3 rounded-xl bg-gradient-to-r from-teal/10 to-cyan/10 px-3 py-2.5 text-sm">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal" /> {p}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Ecosystem ---------------- */
const ecoNodes = [
  { icon: Users, label: "HR" }, { icon: Wallet, label: "Payroll" }, { icon: Clock, label: "Attendance" },
  { icon: Calendar, label: "Leave" }, { icon: Briefcase, label: "Recruitment" }, { icon: MessageCircle, label: "CRM" },
  { icon: Layers, label: "Assets" }, { icon: ShieldCheck, label: "Compliance" }, { icon: Factory, label: "Factory" },
  { icon: Store, label: "Shops" }, { icon: BadgeIndianRupee, label: "PF · ESI · PT" }, { icon: Award, label: "Bonus & Gratuity" },
  { icon: ClipboardCheck, label: "Audit" }, { icon: BarChart3, label: "Reports" }, { icon: LineChart, label: "Analytics" },
  { icon: Wallet, label: "Payments" }, { icon: FileText, label: "Documents" }, { icon: BrainCircuit, label: "AI Engine" },
  { icon: Landmark, label: "Gov Portal" },
];
function Ecosystem() {
  return (
    <section id="ecosystem" className="relative py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <SectionTitle kicker="Interactive Ecosystem" title={<>One platform. <span className="text-gradient">Every workflow.</span></>} sub="From attendance to audit, PF to payments — SWIFT unifies the entire people, factory and compliance stack around a single AI engine." />
        <div className="relative mt-14">
          {/* orbit */}
          <div className="relative mx-auto grid max-w-5xl grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-5">
            {ecoNodes.map((n, i) => (
              <motion.div
                key={n.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
                whileHover={{ y: -4, scale: 1.03 }}
                className="glass group cursor-pointer rounded-2xl p-4 text-center transition"
              >
                <div className="mx-auto grid h-11 w-11 place-items-center rounded-xl bg-gradient-brand text-white shadow-glow transition group-hover:scale-110">
                  <n.icon className="h-5 w-5" />
                </div>
                <div className="mt-2.5 text-sm font-medium">{n.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- AI features ---------------- */
const aiFeatures = [
  { icon: FileText, t: "AI Document Generator", d: "Auto-draft letters, offers, appointments." },
  { icon: ShieldCheck, t: "AI Compliance Assistant", d: "Real-time gaps and next actions." },
  { icon: ClipboardCheck, t: "AI Audit Assistant", d: "From observation to CAPA in minutes." },
  { icon: FileCheck2, t: "AI Policy Generator", d: "Draft policies tuned to your industry." },
  { icon: Wallet, t: "AI Payroll Validation", d: "Catch errors before payroll runs." },
  { icon: Clock, t: "AI Attendance Insights", d: "Detect anomalies and shift patterns." },
  { icon: ScanFace, t: "AI Face Recognition", d: "Contactless attendance, geo-fenced." },
  { icon: BrainCircuit, t: "AI Recommendation Engine", d: "Guides HR with next best actions." },
  { icon: TrendingUp, t: "AI Compliance Risk Score", d: "Live risk grade per plant / branch." },
  { icon: Zap, t: "AI Smart Alerts", d: "Priority alerts that actually matter." },
  { icon: Cpu, t: "AI OCR + Form Filling", d: "Scan, extract, fill government forms." },
  { icon: Bot, t: "AI Chat Assistant", d: "Ask anything about your workforce." },
];
function AISection() {
  return (
    <section id="ai" className="relative py-16 md:py-24">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-aurora opacity-70" />
      <div className="mx-auto max-w-7xl px-4">
        <SectionTitle kicker="AI Engine" title={<>Not just HR software. <br /><span className="text-gradient">An AI operating system.</span></>} sub="A layer of intelligence across every module — quietly automating the busywork and elevating the humans." />
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {aiFeatures.map((f, i) => (
            <motion.div
              key={f.t}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03 }}
              whileHover={{ y: -4 }}
              className="glass-strong group relative overflow-hidden rounded-2xl p-5"
            >
              <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-brand opacity-0 blur-3xl transition group-hover:opacity-40" />
              <div className="relative flex items-start gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-brand text-white shadow-glow">
                  <f.icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-display font-semibold">{f.t}</div>
                  <p className="mt-1 text-sm text-muted-foreground">{f.d}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Dashboard mockup ---------------- */
function DashboardPreview() {
  return (
    <section className="relative py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <SectionTitle kicker="Interactive Product" title={<>See SWIFT <span className="text-gradient">in motion.</span></>} sub="A calm, precise interface built for CHROs, plant heads and compliance officers." />
        <motion.div
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="mx-auto mt-14 max-w-6xl"
        >
          <div className="glass-strong rounded-3xl p-3 shadow-soft">
            <div className="rounded-2xl bg-white">
              <div className="flex items-center gap-1.5 border-b border-border/60 px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
                <div className="mx-auto rounded-md bg-muted px-3 py-1 text-xs text-muted-foreground">app.swift.hr / dashboard</div>
              </div>
              <div className="grid grid-cols-12 gap-3 p-4">
                <div className="col-span-3 hidden md:block">
                  <div className="glass rounded-xl p-3 space-y-1.5">
                    {["Overview", "Attendance", "Payroll", "Compliance", "Factory", "Reports", "AI Assistant"].map((s, i) => (
                      <div key={s} className={`rounded-lg px-3 py-2 text-sm ${i === 0 ? "bg-gradient-brand text-white" : "text-foreground/70 hover:bg-white/70"}`}>{s}</div>
                    ))}
                  </div>
                </div>
                <div className="col-span-12 md:col-span-9 space-y-3">
                  <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                    {[
                      ["Employees", "2,481", "+3.2%"],
                      ["Attendance", "98.4%", "+1.1%"],
                      ["Payroll", "₹1.24 Cr", "on-time"],
                      ["Risk Score", "AAA", "low"],
                    ].map(([l, v, d]) => (
                      <div key={l} className="glass rounded-xl p-3">
                        <div className="text-[11px] uppercase text-muted-foreground">{l}</div>
                        <div className="mt-1 font-display text-xl font-bold">{v}</div>
                        <div className="text-[11px] text-teal">{d}</div>
                      </div>
                    ))}
                  </div>
                  <div className="glass rounded-xl p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <div className="text-sm font-semibold">Workforce Trend</div>
                      <div className="text-xs text-muted-foreground">Last 30 days</div>
                    </div>
                    <svg viewBox="0 0 600 160" className="h-40 w-full">
                      <defs>
                        <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
                          <stop offset="0%" stopColor="oklch(0.78 0.13 210)" stopOpacity="0.5" />
                          <stop offset="100%" stopColor="oklch(0.78 0.13 210)" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path d="M0,120 C60,80 120,110 180,70 C240,30 300,90 360,60 C420,30 480,80 540,40 L600,50 L600,160 L0,160 Z" fill="url(#g1)" />
                      <path d="M0,120 C60,80 120,110 180,70 C240,30 300,90 360,60 C420,30 480,80 540,40 L600,50" fill="none" stroke="oklch(0.72 0.11 195)" strokeWidth="2.5" />
                    </svg>
                  </div>
                  <div className="grid gap-3 md:grid-cols-2">
                    <div className="glass rounded-xl p-4">
                      <div className="text-sm font-semibold">AI Recommendations</div>
                      <ul className="mt-2 space-y-2 text-sm">
                        {["Renew Factory License · 12 days", "Submit Form 22 · Tamil Nadu", "3 late-marking anomalies", "PF challan due 15th"].map((r) => (
                          <li key={r} className="flex items-start gap-2"><Sparkles className="mt-0.5 h-4 w-4 text-teal" />{r}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="glass rounded-xl p-4">
                      <div className="text-sm font-semibold">Compliance Heatmap</div>
                      <div className="mt-2 grid grid-cols-12 gap-1">
                        {Array.from({ length: 84 }).map((_, i) => (
                          <div key={i} className="h-3 rounded-sm" style={{ background: `oklch(${0.7 + (i % 5) * 0.05} 0.11 ${180 + (i % 4) * 10} / ${0.3 + (i % 6) * 0.1})` }} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------- Modules ---------------- */
const modules = [
  ["Company Setup", Building2], ["Employee", Users], ["Attendance", Clock], ["Geo Fencing", MapPin],
  ["Face Recognition", ScanFace], ["Payroll", Wallet], ["Recruitment", Briefcase], ["CRM", MessageCircle],
  ["Assets", Layers], ["Compliance", ShieldCheck], ["Factory", Factory], ["Shops", Store],
  ["PF", BadgeIndianRupee], ["ESI", HeartPulse], ["Professional Tax", Scale], ["Bonus", Award],
  ["Gratuity", Award], ["LWF", HeartPulse], ["Performance", TrendingUp], ["Letters", FileText],
  ["Training", GraduationCap], ["Visitor", Users], ["Vendor", Briefcase], ["Contractor", Users],
  ["Meetings", Calendar], ["Projects", ClipboardCheck], ["Finance", BadgeIndianRupee], ["Billing", Wallet],
  ["Reports", BarChart3], ["Analytics", LineChart], ["Settings", Cpu], ["Audit", FileCheck2],
] as const;
function Modules() {
  return (
    <section id="modules" className="relative py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <SectionTitle kicker="500+ Modules" title={<><span className="text-gradient">Everything</span> your enterprise needs</>} sub="One product. Every module. Rolled out in weeks — not years." />
        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {modules.map(([name, Icon], i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.02 }}
              whileHover={{ y: -3 }}
              className="glass group flex items-center gap-3 rounded-xl p-3.5"
            >
              <div className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-brand text-white shadow-glow">
                <Icon className="h-4 w-4" />
              </div>
              <div className="text-sm font-medium">{name}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Compliance timeline ---------------- */
const compliance = [
  ["Factory Act", "Registers, returns, licenses"],
  ["Shops & Establishment", "State-wise forms B–T"],
  ["Provident Fund (PF)", "ECR, KYC, challans, UAN"],
  ["ESI", "Contribution, benefits, Form 5"],
  ["Professional Tax", "Monthly / annual returns"],
  ["Labour Welfare Fund", "State returns and challans"],
  ["Bonus Act", "Auto calc, Form C/D"],
  ["Gratuity Act", "Nominations, Form F/L/N"],
  ["Maternity Act", "Register, benefits, filings"],
  ["Standing Orders", "Model orders, certification"],
  ["Contract Labour", "Licensing, muster, wages"],
  ["Building & Other Workers", "Cess, licensing, returns"],
];
function Compliance() {
  return (
    <section id="compliance" className="relative py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <SectionTitle kicker="Compliance" title={<>Every act. <span className="text-gradient">Every register.</span></>} sub="1000+ government forms across central and state acts — with AI form-filling and audit trails." />
        <div className="relative mt-14">
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-teal via-cyan to-coral md:block" />
          <div className="space-y-6">
            {compliance.map(([t, d], i) => (
              <motion.div
                key={t}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`relative md:w-1/2 ${i % 2 ? "md:ml-auto md:pl-10" : "md:pr-10"}`}
              >
                <div className="glass-strong rounded-2xl p-5">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-teal" />
                    <div className="font-display font-semibold">{t}</div>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{d}</p>
                </div>
                <div className="absolute top-6 hidden h-3 w-3 rounded-full bg-gradient-brand shadow-glow md:block"
                  style={{ [i % 2 ? "left" : "right"]: "-6px" } as any} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Factory Audit Flow ---------------- */
const auditSteps = ["Factory", "Inspection", "Observation", "AI Recommendation", "Document Generation", "Assign CAPA", "Evidence Upload", "Approval", "Government Submission", "Archive"];
function AuditFlow() {
  return (
    <section className="relative py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <SectionTitle kicker="Factory Audit" title={<>From inspection to <span className="text-gradient">government submission.</span></>} sub="A single guided flow — with AI assisting every step." />
        <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {auditSteps.map((s, i) => (
            <motion.div
              key={s}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="glass-strong relative rounded-2xl p-4"
            >
              <div className="text-[11px] uppercase tracking-wider text-muted-foreground">Step {i + 1}</div>
              <div className="mt-1 font-display font-semibold">{s}</div>
              {i < auditSteps.length - 1 && (
                <ArrowRight className="absolute -right-4 top-1/2 hidden h-4 w-4 -translate-y-1/2 text-teal lg:block" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Government forms ---------------- */
const govForms = [
  ["Factory Forms 1–26", "All registers and returns under Factories Act"],
  ["Shops Forms B–T", "State-wise formats and periodicity"],
  ["PF Forms", "Form 2, 5, 10, 11, 19, 10C, 10D + ECR"],
  ["ESI Forms", "Form 1, 5, 6, accident/maternity"],
  ["Professional Tax", "Monthly, annual returns, enrollment"],
  ["Labour Welfare Fund", "Contributions and returns"],
  ["Bonus & Gratuity", "Form A/B/C/D, F/L/N"],
  ["Inspection Registers", "Health, accident, leave, wages, muster"],
  ["Contract Labour", "Licensing, agreements, muster & wages"],
];
function GovForms() {
  const [open, setOpen] = useState(0);
  return (
    <section className="relative py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <SectionTitle kicker="Government Forms" title={<>1000+ forms. <span className="text-gradient">Auto-filled.</span></>} />
        <div className="mx-auto mt-12 max-w-3xl space-y-2">
          {govForms.map(([t, d], i) => (
            <div key={t} className="glass-strong overflow-hidden rounded-2xl">
              <button onClick={() => setOpen(open === i ? -1 : i)} className="flex w-full items-center justify-between px-5 py-4 text-left">
                <span className="font-medium">{t}</span>
                <ChevronDown className={`h-4 w-4 transition ${open === i ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-5 pb-4 text-sm text-muted-foreground">
                    {d}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Testimonials ---------------- */
const testimonials = [
  { q: "SWIFT collapsed 8 tools into one. Our payroll runs in minutes and compliance is finally boring.", n: "CHRO", c: "Leading Textile Group, Tamil Nadu" },
  { q: "The AI compliance score is a game changer. We saw factory risk drop across 4 plants in a quarter.", n: "Plant Head", c: "Auto Components, Hosur" },
  { q: "Best HR investment we've ever made. Feels like Notion for factories.", n: "Managing Director", c: "Engineering Firm, Chennai" },
];
function Testimonials() {
  return (
    <section className="relative py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <SectionTitle kicker="Loved by operators" title={<>Trusted by <span className="text-gradient">India's best teams.</span></>} />
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="glass-strong rounded-3xl p-6">
              <div className="text-teal">★★★★★</div>
              <p className="mt-3 text-[15px] leading-relaxed">"{t.q}"</p>
              <div className="mt-5 flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-brand text-white font-semibold">{t.n[0]}</div>
                <div>
                  <div className="text-sm font-semibold">{t.n}</div>
                  <div className="text-xs text-muted-foreground">{t.c}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Pricing ---------------- */
const plans = [
  { n: "Starter", p: "₹49", u: "/ emp / mo", d: "For growing teams", f: ["Core HR", "Attendance", "Payroll", "Leave", "Basic reports"], cta: "Start Free Trial" },
  { n: "Professional", p: "₹99", u: "/ emp / mo", d: "For scaling companies", f: ["Everything in Starter", "Compliance & PF/ESI", "AI Assistant", "Face + Geo", "Advanced analytics"], cta: "Book Demo", popular: true },
  { n: "Enterprise", p: "Custom", u: "", d: "Multi-plant, multi-state", f: ["Everything in Professional", "Factory Audit + CAPA", "Government Portal", "SSO / SAML", "Dedicated success"], cta: "Talk to Sales" },
  { n: "Government", p: "Custom", u: "", d: "PSU & compliance-first", f: ["On-prem / VPC", "Custom forms", "Digital signatures", "Audit trails", "24×7 support"], cta: "Contact" },
];
function Pricing() {
  return (
    <section id="pricing" className="relative py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <SectionTitle kicker="Pricing" title={<>Simple. <span className="text-gradient">Predictable.</span></>} sub="Start free. Scale as you grow. Enterprise-ready from day one." />
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {plans.map((pl) => (
            <motion.div key={pl.n} whileHover={{ y: -4 }} className={`relative rounded-3xl p-6 ${pl.popular ? "bg-gradient-brand text-white shadow-glow" : "glass-strong"}`}>
              {pl.popular && <div className="absolute -top-3 left-6 rounded-full bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-teal shadow">Most popular</div>}
              <div className="font-display text-lg font-bold">{pl.n}</div>
              <div className={`text-xs ${pl.popular ? "text-white/80" : "text-muted-foreground"}`}>{pl.d}</div>
              <div className="mt-4 flex items-end gap-1">
                <div className="font-display text-4xl font-bold">{pl.p}</div>
                <div className={`text-xs pb-1 ${pl.popular ? "text-white/80" : "text-muted-foreground"}`}>{pl.u}</div>
              </div>
              <ul className="mt-5 space-y-2 text-sm">
                {pl.f.map((x) => (
                  <li key={x} className="flex items-start gap-2">
                    <CheckCircle2 className={`mt-0.5 h-4 w-4 shrink-0 ${pl.popular ? "text-white" : "text-teal"}`} /> {x}
                  </li>
                ))}
              </ul>
              <a href="#contact" className={`mt-6 inline-flex w-full items-center justify-center gap-1 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${pl.popular ? "bg-white text-ink hover:bg-white/90" : "bg-gradient-brand text-white shadow-glow"}`}>
                {pl.cta} <ArrowRight className="h-4 w-4" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- FAQ ---------------- */
const faq = [
  ["Is SWIFT suitable for factories and manufacturing?", "Yes. Factory audit, CAPA, inspections, registers and Tamil Nadu / all-state government forms are built in."],
  ["Can we migrate from Excel or another HRMS?", "We handle guided migrations from Excel, Zoho, Keka, GreytHR and legacy systems in 2–4 weeks."],
  ["Does SWIFT support PF, ESI, PT and LWF?", "Full support with automated calculations, challans, ECR and returns."],
  ["Is it cloud based? Do you offer on-prem?", "Cloud by default. VPC and on-prem available for Enterprise and Government plans."],
  ["How is AI used in SWIFT?", "AI powers compliance scoring, document generation, audit assistance, payroll validation, form filling and smart alerts."],
];
function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="relative py-16 md:py-24">
      <div className="mx-auto max-w-4xl px-4">
        <SectionTitle kicker="FAQ" title={<>Questions, <span className="text-gradient">answered.</span></>} />
        <div className="mt-12 space-y-2">
          {faq.map(([q, a], i) => (
            <div key={q} className="glass-strong overflow-hidden rounded-2xl">
              <button onClick={() => setOpen(open === i ? -1 : i)} className="flex w-full items-center justify-between px-5 py-4 text-left">
                <span className="font-medium">{q}</span>
                <ChevronDown className={`h-4 w-4 transition ${open === i ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-5 pb-4 text-sm text-muted-foreground">{a}</motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Lead Form (multi-step) ---------------- */
const industries = ["Manufacturing", "Textile", "Hospital", "School", "Construction", "Engineering", "Retail", "Warehouse", "Hotel", "Other"];
const needs = ["Attendance", "Payroll", "Compliance", "Factory", "Shops", "HRMS", "Audit", "Documents", "AI"];
function LeadForm() {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [data, setData] = useState<any>({ needs: [] as string[] });
  const pct = ((step + 1) / 3) * 100;

  const set = (k: string, v: any) => setData((d: any) => ({ ...d, [k]: v }));
  const toggleNeed = (n: string) =>
    setData((d: any) => ({ ...d, needs: d.needs.includes(n) ? d.needs.filter((x: string) => x !== n) : [...d.needs, n] }));

  const submit = () => {
    setDone(true);
    toast.success("Request received — we'll reach out within one business day.");
  };

  if (done) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-strong rounded-3xl p-10 text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }} className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-gradient-brand text-white shadow-glow">
          <CheckCircle2 className="h-8 w-8" />
        </motion.div>
        <h3 className="mt-5 font-display text-2xl font-bold">You're on the list.</h3>
        <p className="mt-2 text-muted-foreground">Our team will reach out within one business day. Powered by Creatons.</p>
      </motion.div>
    );
  }

  return (
    <div className="glass-strong rounded-3xl p-6 md:p-8">
      {/* progress */}
      <div className="mb-6">
        <div className="mb-2 flex justify-between text-xs text-muted-foreground">
          <span>Step {step + 1} of 3</span>
          <span>{Math.round(pct)}%</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
          <motion.div className="h-full bg-gradient-brand" animate={{ width: `${pct}%` }} />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="grid gap-3 md:grid-cols-2">
            <Field label="Company Name"><input className={inputCls} value={data.company || ""} onChange={(e) => set("company", e.target.value)} /></Field>
            <Field label="Industry">
              <select className={inputCls} value={data.industry || ""} onChange={(e) => set("industry", e.target.value)}>
                <option value="">Select</option>
                {industries.map((i) => <option key={i}>{i}</option>)}
              </select>
            </Field>
            <Field label="Employees"><input className={inputCls} value={data.employees || ""} onChange={(e) => set("employees", e.target.value)} placeholder="e.g. 250" /></Field>
            <Field label="State"><input className={inputCls} value={data.state || ""} onChange={(e) => set("state", e.target.value)} /></Field>
            <Field label="City" full><input className={inputCls} value={data.city || ""} onChange={(e) => set("city", e.target.value)} /></Field>
          </motion.div>
        )}
        {step === 1 && (
          <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <div className="mb-2 text-sm font-medium">What do you need?</div>
            <div className="flex flex-wrap gap-2">
              {needs.map((n) => {
                const on = data.needs.includes(n);
                return (
                  <button key={n} type="button" onClick={() => toggleNeed(n)} className={`rounded-full px-4 py-2 text-sm transition ${on ? "bg-gradient-brand text-white shadow-glow" : "glass hover:bg-white/70"}`}>{n}</button>
                );
              })}
            </div>
          </motion.div>
        )}
        {step === 2 && (
          <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="grid gap-3 md:grid-cols-2">
            <Field label="Name"><input className={inputCls} value={data.name || ""} onChange={(e) => set("name", e.target.value)} /></Field>
            <Field label="Designation"><input className={inputCls} value={data.designation || ""} onChange={(e) => set("designation", e.target.value)} /></Field>
            <Field label="Phone"><input className={inputCls} value={data.phone || ""} onChange={(e) => set("phone", e.target.value)} /></Field>
            <Field label="Email"><input type="email" className={inputCls} value={data.email || ""} onChange={(e) => set("email", e.target.value)} /></Field>
            <Field label="Preferred Demo Date"><input type="date" className={inputCls} value={data.date || ""} onChange={(e) => set("date", e.target.value)} /></Field>
            <Field label="Budget"><input className={inputCls} value={data.budget || ""} onChange={(e) => set("budget", e.target.value)} /></Field>
            <Field label="Current Software" full><input className={inputCls} value={data.current || ""} onChange={(e) => set("current", e.target.value)} /></Field>
            <Field label="Message" full><textarea rows={3} className={inputCls} value={data.message || ""} onChange={(e) => set("message", e.target.value)} /></Field>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-6 flex items-center justify-between">
        <button disabled={step === 0} onClick={() => setStep(step - 1)} className="rounded-xl px-4 py-2.5 text-sm disabled:opacity-40 hover:bg-white/70">Back</button>
        {step < 2 ? (
          <button onClick={() => setStep(step + 1)} className="inline-flex items-center gap-1 rounded-xl bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-white shadow-glow">Continue <ArrowRight className="h-4 w-4" /></button>
        ) : (
          <button onClick={submit} className="inline-flex items-center gap-1 rounded-xl bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-white shadow-glow">Request Demo <ArrowRight className="h-4 w-4" /></button>
        )}
      </div>
    </div>
  );
}
const inputCls = "w-full rounded-xl border border-border bg-white/70 px-3 py-2.5 text-sm outline-none transition focus:border-teal focus:ring-2 focus:ring-teal/30";
function Field({ label, children, full }: { label: string; children: React.ReactNode; full?: boolean }) {
  return (
    <label className={`block ${full ? "md:col-span-2" : ""}`}>
      <div className="mb-1 text-xs font-medium text-foreground/70">{label}</div>
      {children}
    </label>
  );
}

/* ---------------- CTA + Contact ---------------- */
function Contact() {
  return (
    <section id="contact" className="relative py-16 md:py-24">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-aurora opacity-60" />
      <div className="mx-auto max-w-7xl px-4">
        <SectionTitle kicker="Get started" title={<>Ready to transform <span className="text-gradient">your workforce?</span></>} sub="Request a demo, start a free trial or talk to a compliance specialist." />
        <div className="mt-14 grid gap-8 lg:grid-cols-5">
          <div className="lg:col-span-2 space-y-3">
            {[
              { i: Phone, l: "Call", v: "+91 · Contact via Creatons" },
              { i: Mail, l: "Email", v: "hello@creatons.in" },
              { i: MapPin, l: "Address", v: "Creatons · Hosur / Chennai, Tamil Nadu, India" },
              { i: Cloud, l: "Website", v: "www.creatons.in" },
            ].map((c) => (
              <a key={c.l} href="#" className="glass-strong flex items-center gap-3 rounded-2xl p-4 transition hover:-translate-y-0.5">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-brand text-white"><c.i className="h-5 w-5" /></div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">{c.l}</div>
                  <div className="text-sm font-semibold">{c.v}</div>
                </div>
              </a>
            ))}
            <div className="glass rounded-2xl p-4 text-xs text-muted-foreground">
              Powered by <a className="text-teal underline" href="https://www.creatons.in" target="_blank" rel="noreferrer">Creatons</a> — a leading HR management firm delivering compliance, training, PMS and recruitment across India.
            </div>
          </div>
          <div className="lg:col-span-3">
            <LeadForm />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Footer ---------------- */
function Footer() {
  return (
    <footer className="relative border-t border-border/60 py-14">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <Brand />
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">
              AI Powered HR, Payroll, Compliance & Factory Management. Powered by <a className="text-teal" href="https://www.creatons.in" target="_blank" rel="noreferrer">Creatons</a>.
            </p>
            <div className="mt-4 flex gap-2">
              {[Linkedin, Instagram, Facebook].map((I, i) => (
                <a key={i} href="#" className="glass grid h-9 w-9 place-items-center rounded-lg hover:-translate-y-0.5 transition"><I className="h-4 w-4" /></a>
              ))}
            </div>
          </div>
          {[
            ["Product", ["Platform", "Modules", "AI", "Pricing"]],
            ["Company", ["About Creatons", "Blog", "Careers", "Contact"]],
            ["Resources", ["Documentation", "Support", "Privacy", "Terms"]],
          ].map(([h, items]) => (
            <div key={h as string}>
              <div className="font-display font-semibold">{h as string}</div>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {(items as string[]).map((x) => <li key={x}><a href="#" className="hover:text-foreground">{x}</a></li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-border/60 pt-6 text-xs text-muted-foreground md:flex-row">
          <div>© {new Date().getFullYear()} SWIFT · Powered by Creatons</div>
          <div>People. Performance. Progress.</div>
        </div>
      </div>
      {/* floating WhatsApp */}
      <a href="#" aria-label="WhatsApp" className="fixed bottom-5 right-5 z-40 grid h-12 w-12 place-items-center rounded-full bg-gradient-brand text-white shadow-glow animate-pulse-ring">
        <MessageCircle className="h-5 w-5" />
      </a>
    </footer>
  );
}

/* ---------------- Boot animation ---------------- */
function BootLogo({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 1600);
    return () => clearTimeout(t);
  }, [onDone]);
  return (
    <motion.div
      initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}
      className="fixed inset-0 z-[100] grid place-items-center bg-background"
    >
      <div className="flex flex-col items-center">
        <motion.div initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.7 }} className="relative grid h-20 w-20 place-items-center rounded-3xl bg-gradient-brand shadow-glow">
          <span className="text-3xl font-display font-bold text-white">S</span>
          <div className="absolute inset-0 rounded-3xl shine opacity-40" />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mt-4 font-display text-2xl font-bold tracking-tight">
          SWIFT
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          Talent Intelligence
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ---------------- Landing ---------------- */
function Landing() {
  const [booted, setBooted] = useState(false);
  return (
    <div className="relative">
      <Toaster position="top-center" richColors />
      <ScrollProgress />
      <AnimatePresence>{!booted && <BootLogo onDone={() => setBooted(true)} />}</AnimatePresence>
      <CursorGlow />
      <Nav />
      <main>
        <Hero />
        <Trusted />
        <MobileUSP />
        <MobileDemoVideo />
        <ProblemSolution />
        <Ecosystem />
        <AISection />
        <DashboardPreview />
        <Modules />
        <Compliance />
        <AuditFlow />
        <GovForms />
        <Testimonials />
        <Pricing />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
