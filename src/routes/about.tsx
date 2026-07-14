import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import coachPortrait from "@/assets/coach-portrait.jpg.asset.json";
import logoAsset from "@/assets/logo.png.asset.json";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About | Integration Coaching" },
      { name: "description", content: "Learn about the practice behind Integration Coaching — steady guidance for intentional journeys." },
      { property: "og:title", content: "About | Integration Coaching" },
      { property: "og:description", content: "Learn about the practice behind Integration Coaching — steady guidance for intentional journeys." },
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
                  src={coachPortrait.url}
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
                Steady Guidance for Intentional Journeys.
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

      {/* Philosophy Section */}
      <section className="bg-sage/20 px-6 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-36">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-display text-3xl font-medium text-navy sm:text-4xl">
            The Importance of a Steady Helm.
          </h2>
          <p className="mt-8 font-body text-base leading-relaxed text-slate sm:text-lg">
            True transformation rarely arrives in a single, blinding insight. More often, it begins with a quiet decision to show up for yourself - again and again. The real work happens not in the peak moment, but in the patient, structured habits that follow: the morning movement or meditation practice, the honest conversation, the kind act, the gentle return to centre when life pulls you off course.
          </p>
          <p className="mt-6 font-body text-base leading-relaxed text-slate sm:text-lg">
            Lasting change is built in the small, repeated choices we make when no one is watching. It is the steady helm that keeps the ship on course through both calm seas and sudden storms. My role is to help you identify, design, and hold those daily structures, so that insight becomes embodied wisdom and intention becomes lived reality.
          </p>
        </div>
      </section>

      {/* Credentials Section */}
      <section className="border-t border-navy/10 px-6 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-36">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 md:grid-cols-3">
            <div>
              <h3 className="font-display text-xl font-medium text-navy">Certified Frameworks</h3>
              <ul className="mt-6 list-disc space-y-3 pl-5 font-body text-base text-slate">
                <li>Integrative Coaching Certification (ICF-aligned)</li>
                <li>Trauma-Informed Care Specialist</li>
                <li>Harm-Reduction &amp; Safety Protocols</li>
                <li>Somatic Grounding Practitioner</li>
              </ul>
            </div>
            <div>
              <h3 className="font-display text-xl font-medium text-navy">Where we can work together</h3>
              <ul className="mt-6 list-disc space-y-3 pl-5 font-body text-base text-slate">
                <li>Managing Daily Pressures</li>
                <li>Breaking the Exhaustion Cycle</li>
                <li>Calming the Nervous System</li>
                <li>Rewriting Habitual Loops</li>
                <li>Sharpening Mental Clarity</li>
                <li>Unlocking Creative Flow</li>
                <li>Sustaining Deep Focus</li>
                <li>Anchoring in the Present</li>
                <li>Reconnecting With Meaning</li>
                <li>Reclaiming Personal Momentum</li>
              </ul>
            </div>
            <div>
              <h3 className="font-display text-xl font-medium text-navy">Professional Background</h3>
              <ul className="mt-6 list-disc space-y-3 pl-5 font-body text-base text-slate">
                <li>Graduate degree in Psychology / Counseling</li>
                <li>Former Director of Wellness Programs</li>
                <li>Published work in behavioral health integration</li>
                <li>Guest faculty at integrative health institutes</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="bg-cream px-6 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-36">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <h2 className="font-display text-3xl font-medium text-navy sm:text-4xl">
              Investing in Your Personal Journey
            </h2>
            <p className="mx-auto mt-6 max-w-3xl font-body text-base leading-relaxed text-slate sm:text-lg">
              Clear, structured containers designed to provide measurable progress, stability, and presence.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {/* Discovery Session Card */}
            <div className="flex flex-col rounded-xl border border-navy/20 bg-white p-8 sm:p-10">
              <h3 className="font-display text-xl font-medium text-navy">
                The Discovery & Alignment Session
              </h3>
              <p className="mt-3 font-body text-base text-slate">
                Baseline assessment, grounding framework creation, and initial course setting.
              </p>
              <ul className="mt-6 list-disc space-y-2 pl-5 font-body text-base text-slate">
                <li>1 x 45-minute deep-dive session</li>
                <li>Your questions answered and any concerns addressed</li>
                <li>Direct email support follow-up</li>
                <li>Cost deducted from your first Microdosing Journey Container booking</li>
              </ul>
              <p className="mt-8 font-display text-2xl font-medium text-navy">
                Investment: £30
              </p>
              <div className="mt-8">
                <Link to="/apply">
                  <Button
                    variant="outline"
                    className="h-14 w-full border-navy/30 font-body text-base font-semibold text-navy hover:bg-navy/5"
                  >
                    Book Discovery Session
                  </Button>
                </Link>
              </div>
            </div>


            {/* Signature Container Card */}
            <div className="flex flex-col rounded-xl border-2 border-navy bg-white p-8 shadow-lg sm:p-10">
              <h3 className="font-display text-xl font-medium text-navy">
                The Microdosing Journey Container
              </h3>
              <p className="mt-3 font-body text-base text-slate">
                Comprehensive 1-on-1 partnership for deep mindset shifts and sustained transformation, working with microdosing as part of our toolkit.
              </p>
              <ul className="mt-6 list-disc space-y-2 pl-5 font-body text-base text-slate">
                <li>Four 1-on-1 coaching sessions (4-8 week container, or one microdosing cycle)</li>
                <li>Text and voice note support between sessions</li>
                <li>Sliding-scale and pro-bono options available for qualifying individuals</li>
              </ul>
              <p className="mt-8 font-display text-2xl font-medium text-navy">
                Investment: £400
              </p>
              <div className="mt-8">
                <Link to="/apply">
                  <Button className="h-14 w-full bg-ochre font-body text-base font-semibold text-navy shadow-none hover:bg-ochre/90">
                    Apply for the Container
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Approach Section */}
      <section className="px-6 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-36">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-3xl font-medium text-navy sm:text-4xl">
            What to Expect in Our Container
          </h2>
          <p className="mt-8 font-body text-base leading-relaxed text-slate sm:text-lg">
            Our work together is built on a single principle: You Are Our North Star. This means you will be met with active, attuned listening - not problem-solving from a distance, but a genuine, co-created space where your experience is heard and honoured.
          </p>
          <p className="mt-6 font-body text-base leading-relaxed text-slate sm:text-lg">
            Everything shared within our sessions is held in strict confidentiality. My role is to serve as a steady co-navigator, offering an anchored perspective and practical tools without judgment or agenda. The container we build is one of safety, self-care, and mutual respect - so you can show up fully, explore honestly, and move forward with clarity.
          </p>
        </div>
      </section>

      {/* Compliance Callout Box */}
      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-4xl rounded-xl border border-navy/20 bg-cream p-6 shadow-sm sm:p-8 lg:p-10">
            <p className="font-body text-sm leading-relaxed text-slate sm:text-base">
            <span className="font-semibold text-navy">Professional Boundaries & Harm Reduction:</span>{" "}
            Please note that my practice operates strictly within a coaching framework. I am a coach - not a psychotherapist, medical doctor, or mental health clinician. I do not provide medical advice, diagnosis, treatment, or therapy. Furthermore, I operate strictly under harm-reduction principles; I do not distribute, sell, recommend, or facilitate the sourcing of illegal or controlled substances.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-navy/10 bg-cream px-6 py-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div className="flex items-center gap-2">
              <img src={logoAsset.url} alt="Still Harbour logo" className="h-9 w-9 object-contain" />
              <span className="font-display text-base font-medium text-navy">
                Still Harbour
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
              <span className="font-semibold text-slate">Disclaimer:</span> Still Harbour provides educational and peer-support coaching services only. The information on this website is for educational and harm-reduction purposes and is not a substitute for professional medical advice, diagnosis, or treatment. I do not provide, sell, or encourage the use of illegal substances.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
