import { Copy, Share2, Check } from "lucide-react";
import { useState } from "react";
import { WHATSAPP_LINK } from "@/lib/webhook";
import { useT } from "@/lib/i18n";

export function Share() {
  const t = useT();
  const [copied, setCopied] = useState(false);
  const shareUrl = typeof window !== "undefined" ? window.location.origin : "https://reto21.com";
  const text = encodeURIComponent(t.share.waText);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  return (
    <section className="relative py-20">
      <div className="mx-auto max-w-5xl px-4">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-primary p-1 shadow-elevated">
          <div className="rounded-[1.85rem] bg-card/90 p-8 md:p-12">
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs font-medium text-muted-foreground">
                  <Share2 className="h-3.5 w-3.5" /> {t.share.badge}
                </span>
                <h3 className="mt-3 font-display text-3xl font-bold md:text-4xl">
                  {t.share.title1} <span className="text-gradient">{t.share.title2}</span>
                </h3>
                <p className="mt-2 max-w-lg text-muted-foreground">{t.share.desc}</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <a
                  href={`https://wa.me/?text=${text}%20${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-[oklch(0.72_0.17_150)] px-4 py-3 text-sm font-semibold text-[oklch(0.12_0.05_150)]"
                >
                  {t.share.shareWa}
                </a>
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl glass-strong px-4 py-3 text-sm font-semibold"
                >
                  {t.share.joinCommunity}
                </a>
                <button
                  onClick={copy}
                  className="inline-flex items-center gap-2 rounded-xl glass px-4 py-3 text-sm font-semibold"
                >
                  {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                  {copied ? t.share.copied : t.share.copy}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
