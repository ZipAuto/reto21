import { useEffect, useState, type FormEvent } from "react";
import { ArrowUpRight, Mic, MessageSquare, Briefcase, Volume2, Network, Film, BookOpen, Target, Loader2, Send, CheckCircle2, X } from "lucide-react";
import speakingImg from "@/assets/initiative-speaking.jpg";
import debateImg from "@/assets/initiative-debate.jpg";
import movieImg from "@/assets/initiative-movie.jpg";
import { useT } from "@/lib/i18n";
import { submitToWebhook } from "@/lib/webhook";
import { Field, Select, TextArea } from "./forms/fields";

const meta = [
  { icon: Mic, img: speakingImg, color: "from-sky-500/40 to-blue-700/40" },
  { icon: MessageSquare, img: debateImg, color: "from-fuchsia-500/40 to-purple-700/40" },
  { icon: Briefcase, color: "from-emerald-500/40 to-teal-700/40" },
  { icon: Volume2, color: "from-orange-500/40 to-rose-700/40" },
  { icon: Network, color: "from-cyan-500/40 to-blue-700/40" },
  { icon: Film, img: movieImg, color: "from-indigo-500/40 to-violet-700/40" },
  { icon: BookOpen, color: "from-pink-500/40 to-rose-700/40" },
  { icon: Target, color: "from-amber-500/40 to-orange-700/40" },
] as const;

export function Initiatives() {
  const t = useT();
  const [selectedEventIndex, setSelectedEventIndex] = useState<number | null>(null);
  const selectedEvent = selectedEventIndex === null ? null : t.eventForms.events[selectedEventIndex];

  return (
    <section id="initiatives" className="relative py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs font-medium text-muted-foreground">
            {t.initiatives.badge}
          </span>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl">
            {t.initiatives.title1} <span className="text-gradient">{t.initiatives.title2}</span> {t.initiatives.title3}
          </h2>
          <p className="mt-4 text-muted-foreground">{t.initiatives.desc}</p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {t.initiatives.items.map((it, i) => {
            const m = meta[i];
            const Icon = m.icon;
            const img = "img" in m ? m.img : undefined;
            return (
              <article
                key={it.title}
                role="button"
                tabIndex={0}
                onClick={() => setSelectedEventIndex(i)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelectedEventIndex(i);
                  }
                }}
                className="group relative cursor-pointer overflow-hidden rounded-3xl glass-strong p-5 text-left transition hover:-translate-y-1 hover:shadow-elevated focus:outline-none focus:ring-2 focus:ring-primary/60"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className={`absolute inset-0 -z-10 bg-gradient-to-br ${m.color} opacity-0 transition group-hover:opacity-100`} />
                {img ? (
                  <div className="relative mb-4 h-40 overflow-hidden rounded-2xl">
                    <img src={img} alt={it.title} loading="lazy" width={1024} height={640} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
                  </div>
                ) : (
                  <div className="mb-4 grid h-40 place-items-center overflow-hidden rounded-2xl bg-gradient-to-br from-white/5 to-white/0">
                    <Icon className="h-12 w-12 text-primary/70" />
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-primary shadow-glow">
                    <Icon className="h-4 w-4 text-primary-foreground" />
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-primary">{it.tag}</span>
                </div>
                <h3 className="mt-3 font-display text-lg font-bold">{it.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{it.desc}</p>
                <div className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary/90">
                  <span>{t.initiatives.learnMore}</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {selectedEvent ? (
        <EventFormDialog
          event={selectedEvent}
          onClose={() => setSelectedEventIndex(null)}
        />
      ) : null}
    </section>
  );
}

function EventFormDialog({
  event,
  onClose,
}: {
  event: ReturnType<typeof useT>["eventForms"]["events"][number];
  onClose: () => void;
}) {
  const t = useT();
  const f = t.eventForms;
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    await submitToWebhook({
      form_type: event.formType,
      event_id: event.eventId,
      selected_initiative: event.initiative,
      event_tag: event.tag,
      ...data,
    });
    setLoading(false);
    setDone(true);
    e.currentTarget.reset();
  }

  return (
    <div
      className="fixed inset-0 z-[80] grid place-items-center bg-background/80 px-3 py-4 backdrop-blur-xl sm:px-4 sm:py-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="event-form-title"
      onClick={onClose}
    >
      <div
        className="relative flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl glass-strong shadow-elevated"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label={f.close}
          className="absolute right-4 top-4 z-20 grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/10 text-muted-foreground transition hover:bg-white/15 hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary/60"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="pointer-events-none absolute -right-14 -top-14 h-36 w-36 rounded-full bg-gradient-primary opacity-20 blur-3xl" />
        <div className="relative border-b border-white/10 p-5 pr-16 sm:p-6 sm:pr-20">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-primary">
            {event.tag}
          </span>
          <h3 id="event-form-title" className="mt-2 font-display text-2xl font-bold sm:text-3xl">
            {event.title}
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">{event.desc}</p>
        </div>

        <div className="overflow-y-auto p-5 sm:p-6">
          {done ? (
            <div className="relative rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gradient-primary shadow-glow">
                <CheckCircle2 className="h-7 w-7 text-primary-foreground" />
              </div>
              <h4 className="mt-4 font-display text-2xl font-bold">{f.doneTitle}</h4>
              <p className="mt-2 text-sm text-muted-foreground">{f.doneDesc}</p>
            </div>
          ) : (
            <form id="event-application-form" onSubmit={onSubmit} className="relative grid gap-3">
              <Field label={f.fullName} name="full_name" required placeholder={f.fullNamePh} />
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label={f.email} name="email" type="email" required placeholder={f.emailPh} />
                <Field label={f.phone} name="phone" required placeholder={f.phonePh} />
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <Select label={f.country} name="country" defaultValue="">
                  <option value="" disabled>{f.select}</option>
                  {t.countries.map((c) => <option key={c} value={c}>{c}</option>)}
                </Select>
                <Select label={f.level} name="english_level" defaultValue="">
                  <option value="" disabled>{f.select}</option>
                  {t.levels.map((l) => <option key={l} value={l}>{l}</option>)}
                </Select>
              </div>
              <TextArea label={f.goal} name="notes" placeholder={f.goalPh} />
              {event.requiresAgeConfirmation ? (
                <label className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-3 text-xs text-muted-foreground">
                  <input
                    name="age_confirmed"
                    type="checkbox"
                    required
                    value="yes"
                    className="mt-0.5 h-4 w-4 rounded border-white/20 bg-white/10 accent-primary"
                  />
                  <span>{f.ageConfirm}</span>
                </label>
              ) : null}
            </form>
          )}
        </div>

        <div className="relative z-10 grid gap-3 border-t border-white/10 bg-card/90 p-4 backdrop-blur-xl sm:flex sm:items-center sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-foreground transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-primary/60"
          >
            {done ? f.closeDone : f.cancel}
          </button>
          {!done ? (
            <button
              type="submit"
              form="event-application-form"
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition hover:brightness-110 disabled:opacity-70"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              {loading ? f.submitting : f.submit}
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
