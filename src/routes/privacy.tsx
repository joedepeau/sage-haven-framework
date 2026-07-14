import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import logoAsset from "@/assets/logo.png.asset.json";

export const Route = createFileRoute("/privacy")({
  component: PrivacyPage,
  head: () => ({
    meta: [
      { title: "Privacy Policy | Still Harbour Coaching" },
      { name: "description", content: "Privacy Policy for Still Harbour Coaching — our commitment to client confidentiality, data minimization, and secure digital communication." },
      { property: "og:title", content: "Privacy Policy | Still Harbour Coaching" },
      { property: "og:description", content: "Privacy Policy for Still Harbour Coaching — our commitment to client confidentiality, data minimization, and secure digital communication." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function PrivacyPage() {
  return (
    <div className="min-h-screen bg-cream">
      <Navbar />

      {/* Hero */}
      <section className="bg-navy px-6 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-36">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="font-display text-3xl font-medium leading-snug text-cream sm:text-4xl lg:text-5xl">
            Your Privacy is Our Anchor.
          </h1>
          <p className="mx-auto mt-6 max-w-3xl font-body text-base leading-relaxed text-cream/80 sm:text-lg">
            This policy details our uncompromising commitment to client confidentiality, data minimization, and secure digital communication.
          </p>
          <p className="mt-6 font-body text-sm text-cream/60 sm:text-base">
            Last Updated: July 2026
          </p>
        </div>
      </section>

      {/* Policy Body */}
      <section className="px-6 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-36">
        <div className="mx-auto max-w-4xl space-y-16">
          <div>
            <h2 className="font-display text-2xl font-medium text-navy sm:text-3xl">
              Who We Are
            </h2>
            <p className="mt-4 font-body text-base leading-relaxed text-slate sm:text-lg">
              This privacy policy applies to Still Harbour Coaching, a United Kingdom-based integration coaching practice. We are the data controller for the personal information collected through our website and coaching services. This page is maintained by Still Harbour Coaching to answer common privacy questions about our practice.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-medium text-navy sm:text-3xl">
              What Data We Collect
            </h2>
            <p className="mt-4 font-body text-base leading-relaxed text-slate sm:text-lg">
              We collect only the information necessary to provide safe, effective coaching. This may include your name, email address, phone number, intake form responses, and session notes. We do not collect sensitive personal data beyond what you voluntarily share within the coaching container.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-medium text-navy sm:text-3xl">
              How We Use Your Data
            </h2>
            <p className="mt-4 font-body text-base leading-relaxed text-slate sm:text-lg">
              Your information is used solely to deliver coaching services, communicate with you about sessions, and maintain accurate records of our work together. We do not use your data for marketing, profiling, or automated decision-making. We do not sell or share your personal information with third parties for commercial purposes.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-medium text-navy sm:text-3xl">
              Confidentiality & Storage
            </h2>
            <p className="mt-4 font-body text-base leading-relaxed text-slate sm:text-lg">
              All session notes and client communications are stored securely using encrypted platforms and access-controlled systems. Our coaching agreements include strict confidentiality clauses, and we treat every client interaction with the highest level of professional discretion.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-medium text-navy sm:text-3xl">
              Data Retention & Deletion
            </h2>
            <p className="mt-4 font-body text-base leading-relaxed text-slate sm:text-lg">
              We retain personal data only for as long as necessary to fulfil the purpose for which it was collected, or as required by applicable UK law. After this period, your data is securely deleted or anonymised. You may request deletion of your personal data at any time by contacting us directly.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-medium text-navy sm:text-3xl">
              Your Rights
            </h2>
            <p className="mt-4 font-body text-base leading-relaxed text-slate sm:text-lg">
              Under UK data protection law, you have the right to access, correct, or delete your personal data; to restrict or object to processing; and to request a copy of your information in a portable format. To exercise any of these rights, please contact us using the details below.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-medium text-navy sm:text-3xl">
              Cookies & Analytics
            </h2>
            <p className="mt-4 font-body text-base leading-relaxed text-slate sm:text-lg">
              Our website uses minimal cookies necessary for functionality and security. We do not use invasive tracking or behavioural advertising. Any analytics we employ are anonymised and used only to improve website performance.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-medium text-navy sm:text-3xl">
              Contact Us
            </h2>
            <p className="mt-4 font-body text-base leading-relaxed text-slate sm:text-lg">
              If you have any questions about this privacy policy, or wish to exercise your data rights, please contact our data controller at{" "}
              <a
                href="mailto:datacontroller@stillharbour.uk"
                className="text-navy underline underline-offset-2 hover:text-ochre"
              >
                datacontroller@stillharbour.uk
              </a>
              .
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
              <span className="font-semibold text-slate">Disclaimer:</span> Still Harbour provides educational and peer-support integration coaching services only. The information on this website is for educational and harm-reduction purposes and is not a substitute for professional medical advice, diagnosis, or treatment. We do not provide, sell, or encourage the use of illegal substances.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
