import { useEffect, useState } from "react";
import { Check, Flame, Trophy, Zap, Calendar, Target } from "lucide-react";
import { Reto21Form } from "./forms/Reto21Form";
import { useT } from "@/lib/i18n";

function useCountdown(target: Date) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, target.getTime() - now);
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff / 3600000) % 24);
  const m = Math.floor((diff / 60000) % 60);
  const s = Math.floor((diff / 1000) % 60);
  return { d, h, m, s };
}

const milestoneIcons = [Zap, Flame, Target, Trophy];

export function Reto21() {
  const t = useT();
  const next = new Date();
  next.setDate(next.getDate() + 7);
  next.setHours(20, 0, 0, 0);
  const { d, h, m, s } = useCountdown(next);

  return (
    <section id="reto21" className="relative py-24">
      <div className="absolute inset-x-0 top-0 -z-10 h-[600px] bg-gradient-accent opacity-10 blur-3xl" />
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid items-start gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs font-medium text-muted-foreground">
              <Flame className="h-3.5 w-3.5 text-primary" /> {t.reto21.badge}
            </span>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-6xl">
              <span className="text-gradient">{t.reto21.title1}</span> {t.reto21.title2}<br className="hidden md:block" /> {t.reto21.title3}
            </h2>
            <p className="mt-5 max-w-xl text-lg text-muted-foreground">{t.reto21.desc}</p>

            <div className="mt-8 rounded-3xl glass-strong p-5 shadow-card">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4 text-primary" /> {t.reto21.countdown}
              </div>
              <div className="mt-3 grid grid-cols-4 gap-2 sm:gap-4">
                {[
                  { v: d, l: t.reto21.days },
                  { v: h, l: t.reto21.hours },
                  { v: m, l: t.reto21.min },
                  { v: s, l: t.reto21.sec },
                ].map((x) => (
                  <div key={x.l} className="rounded-2xl bg-gradient-primary p-[1px]">
                    <div className="rounded-2xl bg-card/80 px-2 py-3 text-center">
                      <div className="font-display text-3xl font-bold tabular-nums md:text-4xl">{String(x.v).padStart(2, "0")}</div>
                      <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{x.l}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10">
              <h3 className="font-display text-xl font-semibold">{t.reto21.roadmap}</h3>
              <div className="relative mt-5">
                <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-primary via-accent to-transparent md:left-1/2" />
                <ul className="space-y-6">
                  {t.reto21.milestones.map((mi, i) => {
                    const Icon = milestoneIcons[i] ?? Zap;
                    const left = i % 2 === 0;
                    return (
                      <li key={mi.day} className="relative md:grid md:grid-cols-2 md:gap-8">
                        <div className={`flex items-start gap-4 ${left ? "md:justify-end md:pr-10 md:text-right" : "md:col-start-2 md:pl-10"}`}>
                          <div className={`order-2 ${left ? "md:order-1" : ""}`}>
                            <div className="text-xs uppercase tracking-widest text-primary">{mi.day}</div>
                            <div className="font-semibold">{mi.title}</div>
                          </div>
                          <span className={`order-1 grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-primary shadow-glow ${left ? "md:order-2" : ""}`}>
                            <Icon className="h-4 w-4 text-primary-foreground" />
                          </span>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            <ul className="mt-10 grid gap-3 sm:grid-cols-2">
              {t.reto21.benefits.map((b) => (
                <li key={b} className="flex items-center gap-3 rounded-xl glass px-4 py-3 text-sm">
                  <span className="grid h-6 w-6 place-items-center rounded-md bg-gradient-primary">
                    <Check className="h-3.5 w-3.5 text-primary-foreground" />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <Reto21Form />
          </div>
        </div>
      </div>
    </section>
  );
}
