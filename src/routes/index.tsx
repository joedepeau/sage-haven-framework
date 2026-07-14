import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Anchor, Compass, Lamp } from "lucide-react";
import { LighthouseIcon } from "@/components/icons/LighthouseIcon";
import heroBg from "@/assets/hero-bg.jpg";
import coachPortrait from "@/assets/coach-portrait.jpg.asset.json";
import badgeAsset from "@/assets/badge-cropped.png.asset.json";
import logoAsset from "@/assets/logo.png.asset.json";

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
      <section
        className="relative bg-cover bg-center bg-no-repeat px-6 py-28 sm:px-8 sm:py-36 lg:px-12 lg:py-48"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-cream/65" />
        <div className="relative mx-auto max-w-5xl">
          <div className="text-center">
            <h1 className="font-display text-4xl font-medium leading-[1.15] tracking-tight text-navy sm:text-5xl lg:text-6xl xl:text-7xl">
              <span className="block sm:inline">Be anchored.</span>{" "}
              <span className="block sm:inline">Navigate mindfully.</span>{" "}
              <span className="block sm:inline">Live intentionally.</span>
            </h1>
            <p className="mx-auto mt-8 max-w-2xl font-body text-base leading-relaxed text-slate sm:text-lg md:mt-10 md:text-xl">
              A safe and supportive coaching container for seekers, explorers, and sailors of the inner seas looking to bridge profound insights with lasting transformation.
            </p>
            <div className="mx-auto mt-10 flex w-full max-w-md flex-col gap-4 sm:max-w-none sm:flex-row sm:justify-center md:mt-12">
              <Link to="/apply" className="w-full sm:w-auto">
                <Button className="h-14 w-full bg-ochre px-8 font-body text-sm font-semibold text-navy shadow-none hover:bg-ochre/90 sm:w-auto sm:text-base">
                  Book a Discovery Session
                </Button>
              </Link>
              <Link to="/about">
                <Button
                  variant="outline"
                  className="h-14 w-full border-navy/25 bg-cream/60 px-6 font-body text-sm font-medium text-navy backdrop-blur-sm hover:bg-cream/80 hover:text-navy sm:w-auto sm:text-base"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="bg-cream px-6 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 sm:grid-cols-1 md:grid-cols-2 md:gap-16 lg:gap-24">
            <div className="flex flex-col justify-center">
              <h2 className="font-display text-3xl font-medium leading-snug text-navy sm:text-4xl lg:text-5xl">
                Exploring New Horizons Shouldn&apos;t Mean Feeling Adrift.
              </h2>
            </div>
            <div className="flex flex-col justify-center">
              <div className="border-t border-navy/10 py-6">
                <p className="font-body text-base leading-relaxed text-slate sm:text-lg">
                  Feeling overwhelmed by raw emotion, shifting priorities, or complex changes and need a safe, non-judgemental professional to talk to?
                </p>
              </div>
              <div className="border-t border-navy/10 py-6">
                <p className="font-body text-base leading-relaxed text-slate sm:text-lg">
                  Looking to bring more presence, space, clarity, joy, or creativity into your life - but don't feel like you have the right tools?
                </p>
              </div>
              <div className="border-t border-navy/10 py-6">
                <p className="font-body text-base leading-relaxed text-slate sm:text-lg">
                  Lacking a clear, structured framework to integrate insights from meaningful experiences?
                </p>
              </div>
              <div className="border-t border-b border-navy/10 py-6">
                <p className="font-body text-base leading-relaxed text-slate sm:text-lg">
                  Worked with microdosing before, and want to turn it into a deeper and more impactful practice in your daily life?
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Three Pillars Section */}
      <section className="bg-cream px-6 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-3">
            {[
              {
                icon: Anchor,
                title: "01 / Be Anchored",
                desc: "We establish your baseline safety, set clear boundaries, and build a solid foundation of supportive practices.",
              },
              {
                icon: Compass,
                title: "02 / Navigate Mindfully",
                desc: "We embrace your experiences with deep curiosity, trusting your inner compass and gracefully adjusting course.",
              },
              {
                icon: LighthouseIcon,
                title: "03 / Live Intentionally",
                desc: "We identify actionable habits to turn fleeting breakthrough moments into lasting, purposeful transformation.",
              },
            ].map((card, i) => (
              <div
                key={i}
                className="flex flex-col items-center rounded-xl border border-navy/5 bg-white p-8 text-center shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-navy/10 bg-cream">
                  <card.icon className="h-6 w-6 text-navy" strokeWidth={1.5} />
                </div>
                <h3 className="mb-4 font-display text-xl font-medium text-navy">
                  {card.title}
                </h3>
                <p className="font-body text-sm leading-relaxed text-slate">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Intro / About Section */}
      <section className="bg-sage px-6 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 md:grid-cols-5 md:gap-16 lg:gap-20">
            <div className="md:col-span-2 space-y-6">
              <div className="relative overflow-hidden rounded-2xl bg-navy/10 shadow-sm">
                <img
                  src={coachPortrait.url}
                  alt="Portrait of the integration coach"
                  width={768}
                  height={1024}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="relative overflow-hidden rounded-2xl bg-white shadow-sm">
                <img
                  src={badgeAsset.url}
                  alt="Microdosing Institute Certified Facilitator badge"
                  width={499}
                  height={134}
                  loading="lazy"
                  className="w-full"
                />
              </div>
            </div>
            <div className="flex flex-col justify-center md:col-span-3">
              <p className="mb-3 font-body text-xs font-semibold uppercase tracking-widest text-slate">
                About the Practice
              </p>
              <h2 className="font-display text-3xl font-medium leading-snug text-navy sm:text-4xl">
                A supportive companion for your life voyage
              </h2>
              <div className="mt-6 space-y-5 font-body text-base leading-relaxed text-slate sm:text-lg">
                <p>
                  I&apos;m an accredited microdosing coach with training in trauma-informed care, cultural and neurodiversity awareness, harm reduction, and integration. My work sits at the intersection of professional rigour and deep human presence.
                </p>
                <p>
                  Client safety is the foundation of everything I do. Before any exploration, we build clear agreements and a shared map of the journey ahead, so you always know where you are and what comes next.
                </p>
                <p>
                  Sessions draw on established microdosing frameworks, including preparation and intention setting, embodied reflection, curious exploration, meaning-making dialogue, and habit design - so profound moments can become durable change in daily life.
                </p>
              </div>
              <div className="mt-8">
                <Link to="/about">
                  <Button className="h-12 bg-ochre px-6 font-body text-sm font-semibold text-navy shadow-none hover:bg-ochre/90 sm:text-base">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-navy/[0.04] px-6 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="mb-14 text-center">
            <p className="mb-3 font-body text-xs font-semibold uppercase tracking-widest text-slate">
              How We Work Together
            </p>
            <h2 className="font-display text-3xl font-medium text-navy sm:text-4xl">
              Coaching Services
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 md:gap-8">
            <div className="flex flex-col rounded-2xl border border-navy/10 bg-white p-8 shadow-sm sm:p-10">
              <p className="mb-3 font-body text-xs font-semibold uppercase tracking-widest text-slate">
                Start Here
              </p>
              <h3 className="mb-4 font-display text-2xl font-medium text-navy sm:text-3xl">
                The Discovery Session
              </h3>
              <p className="mb-8 flex-1 font-body text-base leading-relaxed text-slate">
                A single 45-minute session to explore where you are, what you&apos;re hoping to achieve, and whether working together is the right fit. You&apos;ll leave with clarity on next steps and honest guidance, whether or not we continue.
              </p>
              <Link to="/apply">
                <Button className="h-14 w-full bg-navy px-8 font-body text-sm font-semibold text-cream shadow-none hover:bg-navy/90 sm:text-base">
                  Apply Now
                </Button>
              </Link>
            </div>
            <div className="relative flex flex-col rounded-2xl border-2 border-ochre bg-white p-8 shadow-md sm:p-10">
              <span className="absolute -top-3 left-8 rounded-full bg-ochre px-4 py-1 font-body text-xs font-semibold uppercase tracking-widest text-navy">
                MICRODOSING CONTAINER
              </span>
              <p className="mb-3 font-body text-xs font-semibold uppercase tracking-widest text-slate">
                Deep Work
              </p>
              <h3 className="mb-4 font-display text-2xl font-medium text-navy sm:text-3xl">
                1-on-1 Coaching Container
                <span className="mt-1 block font-body text-base font-normal text-slate">
                  4-8 Weeks
                </span>
              </h3>
              <p className="mb-8 flex-1 font-body text-base leading-relaxed text-slate">
                A held container of four 50-minute sessions, between-session practices, and text or voice-note support throughout. We move through preparation, exploration and deepening, embodied integration, and habit design, so insights become the way you actually live, work, and relate.
              </p>
              <Link to="/apply">
                <Button className="h-14 w-full bg-ochre px-8 font-body text-sm font-semibold text-navy shadow-none hover:bg-ochre/90 sm:text-base">
                  Apply Now
                </Button>
              </Link>
            </div>
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
            {[
              { title: "This is your process", desc: "You are, and will always be, our North Star" },
              { title: "You have full agency", desc: "We go at your pace and respect your boundaries" },
              { title: "Science + Wisdom", desc: "We respect both scientific findings and traditional wisdom" },
              { title: "Complete confidentiality", desc: "We create a safe and private container together, just for you" }
            ].map((principle, i) => (
              <div key={i} className="text-center">
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-ochre/30">
                  <span className="font-display text-lg font-semibold text-ochre">0{i + 1}</span>
                </div>
                <h3 className="mb-2 font-display text-lg font-medium text-cream">
                  {principle.title}
                </h3>
                <p className="font-body text-sm leading-relaxed text-cream/80">
                  {principle.desc}
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
              Words from those who have sailed these waters
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                text: "“With his caring and attentive presence, Joe offered space for me to express emotions without needing to fix them. He helped me to remain curious about my experience and reconnect to my resilience and creativity, even in the face of unexpected challenges. His support made a huge difference in the way I was able to integrate lessons and changes into my life.”",
                name: "Jyoti G.",
                info: "She/Her / Portugal"
              }
            ].map((testimonial, i) => (
              <div
                key={i}
                className="rounded-xl bg-cream/10 p-8 backdrop-blur-sm"
              >
                <p className="mb-6 font-body text-base leading-relaxed text-cream/90 italic">
                  {testimonial.text}
                </p>
                <div>
                  <p className="font-body text-sm font-semibold text-cream">{testimonial.name}</p>
                  <p className="font-body text-xs text-cream/60">{testimonial.info}</p>
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
            Ready to dive in?
          </h2>
          <p className="mx-auto mt-6 max-w-xl font-body text-base leading-relaxed text-slate sm:text-lg">
            Take the first step toward a more aligned and purposeful life. Schedule a discovery call to explore how we can work together.
          </p>
          <div className="mt-10">
            <Button className="h-12 bg-ochre px-10 font-body text-sm font-semibold text-navy shadow-none hover:bg-ochre/90 sm:text-base">
              Schedule Your Call
            </Button>
          </div>
        </div>
      </section>

      {/* Safety & Harm-Reduction Section */}
      <section className="bg-sage/60 px-6 py-20 sm:px-8 sm:py-24 lg:px-12">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-3 font-body text-xs font-semibold uppercase tracking-widest text-slate">
            Our Commitment
          </p>
          <h2 className="font-display text-3xl font-medium leading-snug text-navy sm:text-4xl">
            A Safe and Non-Judgmental Space for Personal Growth
          </h2>
          <div className="mx-auto mt-8 max-w-2xl space-y-5 font-body text-base leading-relaxed text-slate sm:text-lg">
            <p>
              This work is coaching and personal development. It is not psychotherapy, medical care, or clinical treatment, and it does not diagnose, prescribe, or replace advice from a licensed physician or mental health professional.
            </p>
            <p>
              We hold your experience with confidentiality, without judgment, and through a harm-reduction lens, focused on your safety, agency, and long-term wellbeing. If clinical support is what you need, we will say so, honestly, and help you find appropriate care.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-navy/10 bg-cream px-6 py-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div className="flex items-center gap-2">
              <img src={logoAsset.url} alt="Still Harbour logo" className="h-9 w-9 object-contain" />
              <span className="font-display text-base font-medium text-navy">
                Still Harbour Coaching
              </span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
              <Link
                to="/privacy"
                className="font-body text-sm text-slate underline underline-offset-2 transition-colors hover:text-navy"
              >
                Privacy Policy
              </Link>
              <p className="font-body text-sm text-slate">
                &copy; {new Date().getFullYear()} Still Harbour. All rights reserved.
              </p>
            </div>
          </div>
          <div className="mt-8 border-t border-navy/10 pt-6">
            <p className="font-body text-xs leading-relaxed text-slate/80">
              <span className="font-semibold text-slate">Disclaimer:</span> Still Harbour Coaching provides educational and peer-support coaching services only. The information on this website is for educational and harm-reduction purposes and is not a substitute for professional medical advice, diagnosis, or treatment. We do not provide, sell, or encourage the use of illegal substances.
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}
