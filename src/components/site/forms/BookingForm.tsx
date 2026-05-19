import { useState, type FormEvent } from "react";
import { CheckCircle2, Loader2, CalendarCheck } from "lucide-react";
import { submitToWebhook } from "@/lib/webhook";
import { Field, Select, TextArea } from "./fields";
import { useT } from "@/lib/i18n";

export function BookingForm() {
  const t = useT();
  const f = t.bookingForm;
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    await submitToWebhook({ form_type: "session_booking", ...data });
    setLoading(false);
    setDone(true);
  }

  if (done) {
    return (
      <div className="rounded-3xl glass-strong p-8 text-center shadow-elevated">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gradient-primary shadow-glow">
          <CheckCircle2 className="h-7 w-7 text-primary-foreground" />
        </div>
        <h3 className="mt-4 font-display text-2xl font-bold">{f.doneTitle}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{f.doneDesc}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-3xl glass-strong p-6 shadow-elevated">
      <h3 className="font-display text-2xl font-bold">{f.title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
      <div className="mt-5 grid gap-3">
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
        <Select label={f.sessionType} name="selected_initiative" defaultValue="">
          <option value="" disabled>{f.sessionTypePh}</option>
          {f.sessionTypes.map((s) => <option key={s} value={s}>{s}</option>)}
        </Select>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label={f.date} name="preferred_date" type="date" />
          <Field label={f.time} name="preferred_time" type="time" />
        </div>
        <TextArea label={f.goal} name="notes" placeholder={f.goalPh} />
        <button
          type="submit"
          disabled={loading}
          className="mt-2 inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-primary px-5 py-3.5 font-semibold text-primary-foreground shadow-glow transition hover:brightness-110 disabled:opacity-70"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <CalendarCheck className="h-4 w-4" />}
          {loading ? f.submitting : f.submit}
        </button>
      </div>
    </form>
  );
}
