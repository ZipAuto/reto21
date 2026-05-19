import { MessageCircle } from "lucide-react";
import { WHATSAPP_LINK } from "@/lib/webhook";
import { useT } from "@/lib/i18n";

export function WhatsAppFab() {
  const t = useT();
  return (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-[oklch(0.72_0.17_150)] px-4 py-3 font-semibold text-[oklch(0.12_0.05_150)] shadow-elevated transition hover:brightness-110 animate-pulse-glow"
      aria-label={t.whatsapp.aria}
    >
      <MessageCircle className="h-5 w-5" />
      <span className="hidden sm:inline">{t.whatsapp.label}</span>
    </a>
  );
}
