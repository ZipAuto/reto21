import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { Initiatives } from "@/components/site/Initiatives";
import { Reto21 } from "@/components/site/Reto21";
import { Sessions } from "@/components/site/Sessions";
import { Community } from "@/components/site/Community";
import { Share } from "@/components/site/Share";
import { Faq } from "@/components/site/Faq";
import { Footer } from "@/components/site/Footer";
import { WhatsAppFab } from "@/components/site/WhatsAppFab";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "RETO 21 — Transform Your English in 21 Days" },
      {
        name: "description",
        content:
          "Join RETO 21, the premium English-speaking community with monthly initiatives, a 21-day gamified challenge and 1-on-1 coaching. Become fluent, fearless, globally connected.",
      },
      { property: "og:title", content: "RETO 21 — Transform Your English in 21 Days" },
      {
        property: "og:description",
        content:
          "Premium English community, monthly initiatives, gamified 21-day challenge and personalized 1-on-1 sessions.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "/" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@500;600;700;800&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "RETO 21",
          url: "/",
          description:
            "Premium English-speaking community with monthly initiatives, 21-day challenge and 1-on-1 coaching.",
        }),
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <Initiatives />
      <Reto21 />
      <Sessions />
      <Community />
      <Share />
      <Faq />
      <Footer />
      <WhatsAppFab />
    </main>
  );
}
