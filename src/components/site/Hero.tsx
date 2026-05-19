import { ArrowRight, Calendar, Sparkles, Users } from "lucide-react";
import heroImg from "@/assets/hero-community.jpg";
import { useT } from "@/lib/i18n";

export function Hero() {
  const t = useT();
  return (
    <section id="top" className="relative overflow-hidden pt-28 md:pt-36">
      <div className="absolute inset-0 -z-10 bg-hero" />
      <div className="absolute inset-0 -z-10 grid-bg opacity-50" />
      <div className="absolute -top-40 left-1/2 -z-10 h-[600px] w-[1100px] -translate-x-1/2 rounded-full bg-gradient-accent opacity-20 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 pb-20">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-muted-foreground animate-fade-up">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              {t.hero.badge}
            </div>

            <h1
              className="mt-5 font-display text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl animate-fade-up"
              style={{ animationDelay: "60ms" }}
            >
              {t.hero.title1} <br />
              {t.hero.title2} <span className="text-gradient">{t.hero.title3}</span>
            </h1>

            <p
              className="mt-6 max-w-xl text-lg text-muted-foreground md:text-xl animate-fade-up"
              style={{ animationDelay: "120ms" }}
            >
              {t.hero.desc}
            </p>

            <div
              className="mt-8 flex flex-wrap items-center gap-3 animate-fade-up"
              style={{ animationDelay: "180ms" }}
            >
              <a
                href="#reto21"
                className="group inline-flex items-center gap-2 rounded-2xl bg-gradient-primary px-6 py-3.5 font-semibold text-primary-foreground shadow-glow transition hover:brightness-110"
              >
                {t.hero.cta1}
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </a>
              <a
                href="#sessions"
                className="inline-flex items-center gap-2 rounded-2xl glass-strong px-6 py-3.5 font-semibold text-foreground transition hover:bg-white/10"
              >
                <Calendar className="h-4 w-4" />
                {t.hero.cta2}
              </a>
            </div>

            <div
              className="mt-10 grid grid-cols-3 gap-4 max-w-lg animate-fade-up"
              style={{ animationDelay: "240ms" }}
            >
              {t.hero.stats.map((s) => (
                <div key={s.l} className="rounded-2xl glass px-4 py-3">
                  <div className="font-display text-2xl font-bold text-gradient">{s.v}</div>
                  <div className="text-xs text-muted-foreground">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative lg:col-span-5">
            <div className="relative rounded-[2rem] glass-strong p-3 shadow-elevated">
              <img
                src={heroImg}
                alt={t.hero.heroAlt}
                width={1536}
                height={1024}
                className="h-[420px] w-full rounded-3xl object-cover md:h-[520px]"
              />
              <div className="pointer-events-none absolute inset-3 rounded-3xl ring-1 ring-inset ring-white/10" />
            </div>

            <div className="absolute -left-4 top-10 hidden rounded-2xl glass-strong p-3 shadow-card animate-float md:flex md:items-center md:gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-primary">
                <Sparkles className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">{t.hero.floatStreak}</div>
                <div className="text-sm font-semibold">{t.hero.floatXp}</div>
              </div>
            </div>

            <div
              className="absolute -bottom-4 -right-2 hidden rounded-2xl glass-strong p-3 shadow-card animate-float md:flex md:items-center md:gap-3"
              style={{ animationDelay: "1.2s" }}
            >
              <div className="flex -space-x-2">
                {["from-sky-400 to-blue-600", "from-fuchsia-400 to-purple-600", "from-emerald-400 to-teal-600"].map((g) => (
                  <div key={g} className={`h-9 w-9 rounded-full bg-gradient-to-br ${g} ring-2 ring-card`} />
                ))}
              </div>
              <div>
                <div className="text-xs text-muted-foreground">{t.hero.floatSpeaking}</div>
                <div className="flex items-center gap-1 text-sm font-semibold">
                  <Users className="h-4 w-4 text-primary" /> {t.hero.floatOnline}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <p className="text-center text-xs uppercase tracking-widest text-muted-foreground">
            {t.hero.trust}
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground/80">
            {["🇨🇴 Colombia", "🇲🇽 México", "🇦🇷 Argentina", "🇪🇸 España", "🇵🇪 Perú", "🇨🇱 Chile", "🇺🇸 USA", "🇧🇷 Brasil"].map((c) => (
              <span key={c} className="rounded-full glass px-3 py-1.5">{c}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
