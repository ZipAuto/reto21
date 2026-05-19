import { useEffect, useState } from "react";
import { Flame, Menu, X, Languages } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export function Navbar() {
  const { t, lang, toggle } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#initiatives", label: t.nav.links.initiatives },
    { href: "#reto21", label: t.nav.links.reto21 },
    { href: "#sessions", label: t.nav.links.sessions },
    { href: "#community", label: t.nav.links.community },
    { href: "#faq", label: t.nav.links.faq },
  ];

  const LangToggle = (
    <button
      onClick={toggle}
      aria-label={t.nav.switchLang}
      className="inline-flex items-center gap-1.5 rounded-xl glass px-3 py-2 text-xs font-semibold uppercase tracking-wider text-foreground transition hover:bg-white/10"
    >
      <Languages className="h-4 w-4" />
      {lang === "en" ? "ES" : "EN"}
    </button>
  );

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? "py-2" : "py-4"}`}
    >
      <div className="mx-auto max-w-7xl px-4">
        <div
          className={`flex items-center justify-between rounded-2xl px-4 py-3 transition-all ${
            scrolled ? "glass-strong shadow-card" : ""
          }`}
        >
          <a href="#top" className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-primary shadow-glow">
              <Flame className="h-5 w-5 text-primary-foreground" />
            </span>
            <span className="font-display text-lg font-bold tracking-tight">
              RETO<span className="text-gradient"> 21</span>
            </span>
          </a>

          <nav className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition hover:bg-white/5 hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            {LangToggle}
            <a
              href="#sessions"
              className="rounded-xl px-4 py-2 text-sm font-medium text-foreground/90 transition hover:text-foreground"
            >
              {t.nav.book}
            </a>
            <a
              href="#reto21"
              className="rounded-xl bg-gradient-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-glow transition hover:brightness-110"
            >
              {t.nav.join}
            </a>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            {LangToggle}
            <button
              className="grid h-10 w-10 place-items-center rounded-xl glass"
              onClick={() => setOpen((v) => !v)}
              aria-label={t.nav.toggleMenu}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {open && (
          <div className="mt-2 rounded-2xl glass-strong p-4 md:hidden animate-fade-up">
            <div className="flex flex-col gap-1">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-white/5 hover:text-foreground"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#reto21"
                onClick={() => setOpen(false)}
                className="mt-2 rounded-xl bg-gradient-primary px-4 py-2 text-center text-sm font-semibold text-primary-foreground"
              >
                {t.nav.join}
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
