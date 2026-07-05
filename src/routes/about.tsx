import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import coachPortrait from "@/assets/coach-portrait.jpg";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About | Integration Coaching" },
      { name: "description", content: "Learn about the practice behind Integration Coaching — grounded guidance for intentional journeys." },
      { property: "og:title", content: "About | Integration Coaching" },
      { property: "og:description", content: "Learn about the practice behind Integration Coaching — grounded guidance for intentional journeys." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function AboutPage() {
  return (
    <div className="min-h-screen bg-cream">
      <Navbar />

      {/* About Hero */}
      <section className="bg-sage/30 px-6 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-36">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-12 md:grid-cols-5 md:gap-16 lg:gap-20">
            {/* Left — Headshot Placeholder */}
            <div className="md:col-span-2">
              <div className="relative overflow-hidden rounded-2xl bg-navy/10 shadow-sm">
                <img
                  src={coachPortrait}
                  alt="Portrait of the coach"
                  width={768}
                  height={1024}
                  loading="eager"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            {/* Right — Text */}
            <div className="flex flex-col justify-center md:col-span-3">
              <h1 className="font-display text-3xl font-medium leading-snug text-navy sm:text-4xl lg:text-5xl">
                Grounded Guidance for Intentional Journeys.
              </h1>
              <p className="mt-6 font-body text-base leading-relaxed text-slate sm:text-lg">
                Meet [Your Name], your partner in psychological grounding, mindset alignment, and integration coaching.
              </p>
              <p className="mt-6 font-body text-base leading-relaxed text-slate italic sm:text-lg">
                A steady, attentive partnership designed to help you anchor your mind, navigate your choices, and live with total intent.
              </p>
              <div className="mt-10">
                <Link to="/">
                  <Button className="h-12 bg-ochre px-8 font-body text-sm font-semibold text-navy shadow-none hover:bg-ochre/90 sm:text-base">
                    Back to Home
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-navy/10 bg-cream px-6 py-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div className="flex items-center gap-2">
              <div className="grid h-8 w-8 place-items-center rounded-full bg-navy">
                <span className="font-display text-xs font-semibold text-cream">IC</span>
              </div>
              <span className="font-display text-base font-medium text-navy">
                Integration Coaching
              </span>
            </div>
            <p className="font-body text-sm text-slate">
              &copy; {new Date().getFullYear()} Integration Coaching. All rights reserved.
            </p>
          </div>
          <div className="mt-8 border-t border-navy/10 pt-6">
            <p className="font-body text-xs leading-relaxed text-slate/80">
              <span className="font-semibold text-slate">Disclaimer:</span> Integration Coaching provides educational and peer-support coaching services only. The information on this website is for educational purposes and is not a substitute for professional medical advice, diagnosis, or treatment.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
