import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Check,
  Github,
  LayoutDashboard,
  LockKeyhole,
  Database,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { LandingNavbar } from "@/components/layout/landing-navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const features = [
  { icon: ShieldCheck, title: "Auth that is ready", text: "Email/password, OAuth callbacks, sessions, verification, and recovery are already wired." },
  { icon: LayoutDashboard, title: "A clear product shell", text: "Responsive client and admin spaces give your product a reliable place to grow." },
  { icon: Database, title: "Appwrite at the core", text: "Use Appwrite for users, databases, storage, and server-side operations without glue code." },
  { icon: LockKeyhole, title: "Secure by default", text: "Protected routes, role checks, validated actions, and session management keep access intentional." },
];

const steps = ["Clone the starter", "Add your Appwrite environment", "Ship your product"];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <LandingNavbar />

      <section className="relative border-b border-border/60">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_76%_12%,color-mix(in_oklab,var(--primary)_18%,transparent),transparent_34%),linear-gradient(135deg,transparent_35%,color-mix(in_oklab,var(--accent)_35%,transparent))]" />
        <div className="relative mx-auto grid max-w-7xl gap-16 px-6 pb-24 pt-20 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:px-8 lg:pb-32 lg:pt-28">
          <div className="max-w-2xl">
            <Badge variant="outline" className="mb-7 gap-2 rounded-full border-primary/30 bg-primary/10 px-3 py-1 text-primary">
              <span className="size-1.5 rounded-full bg-primary" /> Next.js + Appwrite, refined
            </Badge>
            <h1 className="text-balance text-5xl font-semibold tracking-[-0.06em] sm:text-6xl lg:text-7xl">
              Your product deserves a <span className="text-primary">stronger start.</span>
            </h1>
            <p className="mt-7 max-w-xl text-pretty text-lg leading-8 text-muted-foreground">
              Skip the setup maze. Start with a production-minded Next.js foundation that includes Appwrite auth, protected workspaces, role-aware access, and a polished UI system.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="h-12 rounded-md px-6 shadow-[0_0_36px_color-mix(in_oklab,var(--primary)_30%,transparent)]">
                <Link href="/signup">Start building <ArrowRight data-icon="inline-end" /></Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12 rounded-md border-border/80 bg-card/40 px-6">
                <Link href="https://github.com/Alaric-senpai/nextjs-appwrite-starter" target="_blank" rel="noreferrer"><Github data-icon="inline-start" /> View source</Link>
              </Button>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted-foreground">
              {["Type-safe", "Appwrite-powered", "Dark-mode ready"].map((item) => <span key={item} className="flex items-center gap-2"><Check className="size-4 text-primary" />{item}</span>)}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl rounded-2xl border border-white/10 bg-[#080b21] p-3 shadow-2xl shadow-primary/20 lg:rotate-2">
            <div className="rounded-xl border border-white/10 bg-[#0d112d] p-4 sm:p-6">
              <div className="mb-7 flex items-center justify-between"><div><p className="text-xs text-slate-400">Workspace / Overview</p><p className="mt-2 text-lg font-medium text-white">Good morning, builder</p></div><div className="size-9 rounded-full bg-primary/25 ring-4 ring-primary/10" /></div>
              <div className="grid grid-cols-3 gap-3">{[["32", "Open tasks"], ["67%", "Goal reached"], ["18", "Courses"]].map(([value, label]) => <div key={label} className="rounded-lg border border-white/10 bg-white/[0.03] p-3"><p className="text-xl font-medium text-white">{value}</p><p className="mt-1 text-[10px] text-slate-500">{label}</p></div>)}</div>
              <div className="mt-5 rounded-lg border border-white/10 bg-white/[0.03] p-4"><div className="flex items-center justify-between"><p className="text-sm font-medium text-white">Product progress</p><BarChart3 className="size-4 text-primary" /></div><div className="mt-5 h-2 rounded-full bg-white/10"><div className="h-full w-2/3 rounded-full bg-primary" /></div><div className="mt-3 flex justify-between text-[10px] text-slate-500"><span>Keep shipping</span><span>67%</span></div></div>
              <div className="mt-4 grid grid-cols-2 gap-3">{["Account security", "Team workspace"].map((label) => <div key={label} className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] p-3 text-xs text-slate-300"><span className="flex size-6 items-center justify-center rounded bg-primary/20"><Check className="size-3 text-primary" /></span>{label}</div>)}</div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="max-w-2xl"><p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">The foundation</p><h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">Less scaffolding. More shipping.</h2><p className="mt-4 text-muted-foreground">The repetitive parts are organized, tested, and ready to extend so your first meaningful feature arrives sooner.</p></div>
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">{features.map(({ icon: Icon, title, text }) => <article key={title} className="rounded-xl border border-border/70 bg-card/40 p-6 transition-colors hover:border-primary/50"><div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary"><Icon className="size-5" /></div><h3 className="mt-5 font-medium">{title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{text}</p></article>)}</div>
      </section>

      <section className="border-y border-border/60 bg-card/30"><div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[0.7fr_1fr] lg:px-8"><div><Sparkles className="size-5 text-primary" /><h2 className="mt-5 text-2xl font-semibold tracking-tight">A calm path from idea to launch.</h2></div><div className="grid gap-4 sm:grid-cols-3">{steps.map((step, index) => <div key={step} className="border-l border-border pl-4"><p className="text-xs text-primary">0{index + 1}</p><p className="mt-2 text-sm font-medium">{step}</p></div>)}</div></div></section>
      <footer className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between lg:px-8"><span>Next Appwrite Starter</span><Link href="/login" className="transition-colors hover:text-foreground">Already have an account? Sign in</Link></footer>
    </main>
  );
  }

