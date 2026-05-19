import { Flame, Instagram, Twitter, Youtube, MessageCircle, Mail } from "lucide-react";
import { NewsletterForm } from "./forms/NewsletterForm";
import { WHATSAPP_LINK } from "@/lib/webhook";
import { useT } from "@/lib/i18n";

export function Footer() {
  const t = useT();
  return (
    <footer className="relative border-t border-white/10 bg-card/40 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 py-14">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-primary shadow-glow">
                <Flame className="h-5 w-5 text-primary-foreground" />
              </span>
              <span className="font-display text-lg font-bold">
                RETO<span className="text-gradient"> 21</span>
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">{t.footer.tagline}</p>
            <div className="mt-5">
              <p className="mb-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                {t.footer.newsletter}
              </p>
              <NewsletterForm />
            </div>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-sm font-semibold">{t.footer.explore}</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><a href="#initiatives" className="hover:text-foreground">{t.footer.exploreLinks.initiatives}</a></li>
              <li><a href="#reto21" className="hover:text-foreground">{t.footer.exploreLinks.reto21}</a></li>
              <li><a href="#sessions" className="hover:text-foreground">{t.footer.exploreLinks.sessions}</a></li>
              <li><a href="#community" className="hover:text-foreground">{t.footer.exploreLinks.community}</a></li>
              <li><a href="#faq" className="hover:text-foreground">{t.footer.exploreLinks.faq}</a></li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <h4 className="text-sm font-semibold">{t.footer.contact}</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4 text-primary" />
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
                  WhatsApp: +57 323 811 9340
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <a href="mailto:hello@reto21.com" className="hover:text-foreground">hello@reto21.com</a>
              </li>
            </ul>
            <div className="mt-4 flex items-center gap-2">
              {[Instagram, Twitter, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="grid h-9 w-9 place-items-center rounded-xl glass transition hover:bg-white/10" aria-label="social">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} RETO 21 Community. {t.footer.rights}</p>
          <p>{t.footer.built}</p>
        </div>
      </div>
    </footer>
  );
}
