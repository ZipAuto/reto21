import { useState, type FormEvent } from "react";
import { Loader2, Send, Check } from "lucide-react";
import { submitToWebhook } from "@/lib/webhook";
import { useT } from "@/lib/i18n";

export function NewsletterForm() {
  const t = useT();
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    await submitToWebhook({ form_type: "newsletter_signup", ...data });
    setLoading(false);
    setDone(true);
  }

  return (
    <form onSubmit={onSubmit} className="flex w-full max-w-md gap-2">
      <input
        name="email"
        type="email"
        required
        placeholder={t.newsletter.ph}
        className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/30"
      />
      <button
        type="submit"
        disabled={loading || done}
        className="inline-flex items-center gap-2 rounded-xl bg-gradient-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition hover:brightness-110 disabled:opacity-70"
      >
        {done ? <Check className="h-4 w-4" /> : loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        {done ? t.newsletter.joined : t.newsletter.join}
      </button>
    </form>
  );
}
