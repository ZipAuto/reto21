import { useEffect, useState } from "react";
import { Quote, Globe2, Clock4, Users2 } from "lucide-react";
import { useT } from "@/lib/i18n";

const statIcons = [Users2, Globe2, Clock4];

export function Community() {
  const t = useT();
  const testimonials = t.community.testimonials;
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % testimonials.length), 4500);
    return () => clearInterval(id);
  }, [testimonials.length]);

  return (
    <section id="community" className="relative py-24">
      <div className="absolute inset-x-0 top-20 -z-10 mx-auto h-72 max-w-5xl rounded-full bg-gradient-primary opacity-10 blur-3xl" />
      <div className="mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs font-medium text-muted-foreground">
            {t.community.badge}
          </span>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl">
            {t.community.title1} <span className="text-gradient">{t.community.title2}</span>
          </h2>
          <p className="mt-4 text-muted-foreground">{t.community.desc}</p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {t.community.stats.map((s, idx) => {
            const Icon = statIcons[idx] ?? Users2;
            return (
              <div key={s.l} className="rounded-3xl glass-strong p-6 text-center shadow-card">
                <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-gradient-primary shadow-glow">
                  <Icon className="h-5 w-5 text-primary-foreground" />
                </div>
                <div className="mt-4 font-display text-4xl font-bold text-gradient">{s.v}</div>
                <div className="text-sm text-muted-foreground">{s.l}</div>
              </div>
            );
          })}
        </div>

        <div className="relative mt-14 overflow-hidden rounded-3xl glass-strong p-8 shadow-elevated md:p-12">
          <Quote className="absolute right-6 top-6 h-16 w-16 text-primary/20" />
          <div key={i} className="animate-fade-up">
            <p className="font-display text-2xl leading-snug md:text-3xl">
              “{testimonials[i].text}”
            </p>
            <div className="mt-6 flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-full bg-gradient-primary font-bold text-primary-foreground">
                {testimonials[i].name[0]}
              </div>
              <div>
                <div className="font-semibold">{testimonials[i].name}</div>
                <div className="text-xs text-muted-foreground">{testimonials[i].country}</div>
              </div>
            </div>
          </div>
          <div className="mt-6 flex items-center gap-1.5">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setI(idx)}
                aria-label={`Testimonial ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all ${idx === i ? "w-8 bg-gradient-primary" : "w-4 bg-white/15"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
