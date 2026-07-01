import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Integration Coaching | Find Clarity & Purpose" },
      { name: "description", content: "Professional integration coaching to help you align your life, work, and values with clarity and confidence." },
      { property: "og:title", content: "Integration Coaching | Find Clarity & Purpose" },
      { property: "og:description", content: "Professional integration coaching to help you align your life, work, and values with clarity and confidence." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function Index() {
  return (
    <div className="min-h-screen bg-cream">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-cream px-6 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-36">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 font-body text-xs font-semibold uppercase tracking-widest text-slate sm:text-sm">
              Integration Coaching Practice
            </p>
            <h1 className="font-display text-4xl font-medium leading-tight text-navy sm:text-5xl lg:text-6xl">
              Align your life with intention
            </h1>
            <p className="mx-auto mt-6 max-w-xl font-body text-base leading-relaxed text-slate sm:text-lg">
              Discover clarity, purpose, and sustainable growth through personalized coaching that honors every part of who you are.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button className="h-12 w-full bg-ochre px-8 font-body text-sm font-semibold text-navy shadow-none hover:bg-ochre/90 sm:w-auto sm:text-base">
                Book a Discovery Call
              </Button>
              <Button
                variant="outline"
                className="h-12 w-full border-navy/20 bg-transparent px-8 font-body text-sm font-medium text-navy hover:bg-navy/5 sm:w-auto sm:text-base"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Intro / About Section */}
      <section className="bg-sage px-6 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 sm:grid-cols-1 md:grid-cols-2 md:gap-16 lg:gap-24">
            <div className="flex flex-col justify-center">
              <p className="mb-3 font-body text-xs font-semibold uppercase tracking-widest text-slate">
                About the Practice
              </p>
              <h2 className="font-display text-3xl font-medium leading-snug text-navy sm:text-4xl">
                A space for meaningful transformation
              </h2>
            </div>
            <div className="flex flex-col justify-center">
              <p className="font-body text-base leading-relaxed text-slate sm:text-lg">
                [Your practice description goes here. Share your philosophy, approach, and what clients can expect when working with you.]
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-cream px-6 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 text-center">
            <p className="mb-3 font-body text-xs font-semibold uppercase tracking-widest text-slate">
              How I Can Help
            </p>
            <h2 className="font-display text-3xl font-medium text-navy sm:text-4xl">
              Coaching Services
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex flex-col rounded-xl border border-navy/5 bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="mb-6 h-12 w-12 rounded-lg bg-sage" />
                <h3 className="mb-3 font-display text-xl font-medium text-navy">
                  Service Title {i}
                </h3>
                <p className="flex-1 font-body text-sm leading-relaxed text-slate">
                  [Brief description of this service offering. What clients receive, duration, and key outcomes.]
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Approach / Values Section */}
      <section className="bg-navy px-6 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 text-center">
            <p className="mb-3 font-body text-xs font-semibold uppercase tracking-widest text-slate">
              The Approach
            </p>
            <h2 className="font-display text-3xl font-medium text-cream sm:text-4xl">
              Guided by core principles
            </h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="text-center">
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-ochre/30">
                  <span className="font-display text-lg font-semibold text-ochre">0{i}</span>
                </div>
                <h3 className="mb-2 font-display text-lg font-medium text-cream">
                  Principle {i}
                </h3>
                <p className="font-body text-sm leading-relaxed text-slate">
                  [Short description of this guiding principle.]
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-slate px-6 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 text-center">
            <p className="mb-3 font-body text-xs font-semibold uppercase tracking-widest text-cream/60">
              Client Stories
            </p>
            <h2 className="font-display text-3xl font-medium text-cream sm:text-4xl">
              Words from those who walked the path
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-xl bg-cream/10 p-8 backdrop-blur-sm"
              >
                <p className="mb-6 font-body text-base leading-relaxed text-cream/90 italic">
                  &ldquo;[Client testimonial placeholder. A meaningful quote about their experience and transformation.]&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-cream/20" />
                  <div>
                    <p className="font-body text-sm font-semibold text-cream">Client Name</p>
                    <p className="font-body text-xs text-cream/60">Title / Location</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA / Contact Section */}
      <section className="bg-cream px-6 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 font-body text-xs font-semibold uppercase tracking-widest text-slate">
            Begin Your Journey
          </p>
          <h2 className="font-display text-3xl font-medium text-navy sm:text-4xl lg:text-5xl">
            Ready to integrate?
          </h2>
          <p className="mx-auto mt-6 max-w-xl font-body text-base leading-relaxed text-slate sm:text-lg">
            Take the first step toward a more aligned and purposeful life. Schedule a complimentary discovery call to explore how we can work together.
          </p>
          <div className="mt-10">
            <Button className="h-12 bg-ochre px-10 font-body text-sm font-semibold text-navy shadow-none hover:bg-ochre/90 sm:text-base">
              Schedule Your Call
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-navy/5 bg-cream px-6 py-12 sm:px-8 lg:px-12">
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
        </div>
      </footer>
    </div>
  );
}
