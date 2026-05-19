import { Check, Star } from "lucide-react";
import coachImg from "@/assets/coach.jpg";
import { BookingForm } from "./forms/BookingForm";
import { useT } from "@/lib/i18n";

export function Sessions() {
  const t = useT();
  return (
    <section id="sessions" className="relative py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid items-start gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <span className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs font-medium text-muted-foreground">
              {t.sessions.badge}
            </span>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl">
              {t.sessions.title1} <span className="text-gradient">{t.sessions.title2}</span>
            </h2>
            <p className="mt-4 max-w-xl text-muted-foreground">{t.sessions.desc}</p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl glass-strong p-1 shadow-card">
                <img
                  src={coachImg}
                  alt={t.sessions.coachAlt}
                  loading="lazy"
                  width={1024}
                  height={1280}
                  className="h-64 w-full rounded-[1.4rem] object-cover sm:h-72"
                />
              </div>
              <div className="space-y-4">
                <div className="rounded-2xl glass p-4">
                  <div className="flex items-center gap-1 text-amber-300">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-current" />
                    ))}
                    <span className="ml-2 text-xs text-muted-foreground">{t.sessions.rating}</span>
                  </div>
                  <p className="mt-2 text-sm">{t.sessions.testimonial}</p>
                </div>
                <ul className="space-y-2">
                  {t.sessions.perks.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-sm">
                      <span className="mt-0.5 grid h-5 w-5 place-items-center rounded-md bg-gradient-primary">
                        <Check className="h-3 w-3 text-primary-foreground" />
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <BookingForm />
          </div>
        </div>
      </div>
    </section>
  );
}
