import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/apply")({
  component: ApplyPage,
  head: () => ({
    meta: [
      { title: "Apply | Still Harbour Coaching" },
      { name: "description", content: "Apply for a coaching container with Still Harbour — a considered, multi-step intake to help us understand your intentions and design the right container together." },
      { property: "og:title", content: "Apply | Still Harbour Coaching" },
      { property: "og:description", content: "A thoughtful application process for those ready to begin integration coaching." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

const STORAGE_KEY = "stillharbour_apply_draft_v1";
const TOTAL_STEPS = 5;

type FormData = {
  fullName: string;
  email: string;
  phone: string;
  pronouns: string;
  ageRange: string;
  container: string;
  intention: string;
  experience: string;
  practices: string[];
  currentSupport: string;
  medicalDisclosure: string;
  medications: string;
  timeCommitment: string;
  startTiming: string;
  hearAbout: string;
  additionalNotes: string;
  agreeHarmReduction: boolean;
  agreePrivacy: boolean;
};

const initialData: FormData = {
  fullName: "",
  email: "",
  phone: "",
  pronouns: "",
  ageRange: "",
  container: "",
  intention: "",
  experience: "",
  practices: [],
  currentSupport: "",
  medicalDisclosure: "",
  medications: "",
  timeCommitment: "",
  startTiming: "",
  hearAbout: "",
  additionalNotes: "",
  agreeHarmReduction: false,
  agreePrivacy: false,
};

const STEP_LABELS = [
  "About You",
  "Your Intention",
  "Experience & Practice",
  "Wellbeing & Fit",
  "Agreements",
];

function ApplyPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormData>(initialData);
  const [submitted, setSubmitted] = useState(false);

  // Load persisted draft
  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null;
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed?.data) setData({ ...initialData, ...parsed.data });
        if (parsed?.step && typeof parsed.step === "number") {
          setStep(Math.min(Math.max(parsed.step, 1), TOTAL_STEPS));
        }
      }
    } catch {
      /* ignore */
    }
  }, []);

  // Persist on change
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ step, data }));
    } catch {
      /* ignore */
    }
  }, [step, data]);

  const update = <K extends keyof FormData>(key: K, value: FormData[K]) =>
    setData((d) => ({ ...d, [key]: value }));

  const togglePractice = (value: string) => {
    setData((d) => {
      const has = d.practices.includes(value);
      return { ...d, practices: has ? d.practices.filter((p) => p !== value) : [...d.practices, value] };
    });
  };

  const next = () => {
    setStep((s) => Math.min(s + 1, TOTAL_STEPS));
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const back = () => {
    setStep((s) => Math.max(s - 1, 1));
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  };

  const progressPct = (step / TOTAL_STEPS) * 100;

  if (submitted) {
    return (
      <div className="min-h-screen bg-cream">
        <Navbar />
        <section className="px-6 py-24 sm:px-8 sm:py-32 lg:px-12">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="font-display text-3xl font-medium text-navy sm:text-4xl lg:text-5xl">
              Thank you for applying.
            </h1>
            <p className="mt-6 font-body text-base leading-relaxed text-slate sm:text-lg">
              Your application has been received. We&apos;ll review it thoughtfully and reply within 3 business days from{" "}
              <span className="text-navy">hello@stillharbour.uk</span> to arrange next steps.
            </p>
            <div className="mt-10">
              <Link to="/">
                <Button className="h-12 bg-navy px-8 font-body text-sm font-semibold text-cream shadow-none hover:bg-navy/90 sm:text-base">
                  Return Home
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />

      {/* Hero */}
      <section className="bg-navy px-6 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <p className="font-body text-xs font-semibold uppercase tracking-widest text-ochre">
            Application
          </p>
          <h1 className="mt-4 font-display text-3xl font-medium leading-snug text-cream sm:text-4xl lg:text-5xl">
            Begin Your Application.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl font-body text-base leading-relaxed text-cream/80 sm:text-lg">
            A short, considered intake so we can understand your intentions and design the right container together.
          </p>
        </div>
      </section>

      {/* Form Wizard */}
      <section className="px-6 py-16 sm:px-8 sm:py-20 lg:px-12">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-2xl border border-navy/10 bg-white p-6 shadow-sm sm:p-10">
            {/* Progress Tracker */}
            <div className="mb-8">
              <div className="mb-3 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <p className="font-body text-xs font-semibold uppercase tracking-widest text-slate">
                  Step {step} of {TOTAL_STEPS}
                </p>
                <p className="font-body text-sm text-navy">
                  {STEP_LABELS[step - 1]}
                </p>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-navy/10">
                <div
                  className="h-full rounded-full bg-navy transition-all duration-500 ease-out"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
              <ol className="mt-4 hidden grid-cols-5 gap-2 sm:grid" aria-label="Progress steps">
                {STEP_LABELS.map((label, i) => {
                  const idx = i + 1;
                  const active = idx === step;
                  const done = idx < step;
                  return (
                    <li
                      key={label}
                      className={`text-center font-body text-[11px] ${
                        active ? "text-navy font-semibold" : done ? "text-slate" : "text-slate/60"
                      }`}
                    >
                      {label}
                    </li>
                  );
                })}
              </ol>
            </div>

            <form onSubmit={submit} className="space-y-6">
              {step === 1 && (
                <Step1 data={data} update={update} />
              )}
              {step === 2 && (
                <Step2 data={data} update={update} />
              )}
              {step === 3 && (
                <Step3 data={data} update={update} togglePractice={togglePractice} />
              )}
              {step === 4 && (
                <Step4 data={data} update={update} />
              )}
              {step === 5 && (
                <Step5 data={data} update={update} />
              )}

              {/* Navigation */}
              <div className="flex flex-col-reverse gap-3 pt-4 sm:flex-row sm:justify-between">
                {step > 1 ? (
                  <Button
                    type="button"
                    onClick={back}
                    variant="outline"
                    className="h-14 w-full border-navy/30 font-body text-base font-semibold text-navy hover:bg-navy/5 sm:w-auto sm:px-8"
                  >
                    Back
                  </Button>
                ) : (
                  <Link to="/" className="w-full sm:w-auto">
                    <Button
                      type="button"
                      variant="outline"
                      className="h-14 w-full border-navy/30 font-body text-base font-semibold text-navy hover:bg-navy/5 sm:w-auto sm:px-8"
                    >
                      Cancel
                    </Button>
                  </Link>
                )}

                {step < TOTAL_STEPS ? (
                  <Button
                    type="button"
                    onClick={next}
                    className="h-14 w-full bg-navy font-body text-base font-semibold text-cream shadow-none hover:bg-navy/90 sm:w-auto sm:px-10"
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={!data.agreeHarmReduction || !data.agreePrivacy}
                    className="h-14 w-full bg-ochre font-body text-base font-semibold text-navy shadow-none hover:bg-ochre/90 disabled:opacity-50 sm:w-auto sm:px-10"
                  >
                    Submit Application
                  </Button>
                )}
              </div>
            </form>
          </div>

          <p className="mt-6 text-center font-body text-xs text-slate">
            Your progress is saved automatically on this device.
          </p>
        </div>
      </section>
    </div>
  );
}

/* ---------- Reusable field styles ---------- */

const inputCls =
  "mt-2 block w-full rounded-lg border border-navy/20 bg-cream/40 px-4 py-3 font-body text-base text-navy placeholder:text-slate/60 focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy/20";
const labelCls = "font-body text-sm font-semibold text-navy";
const helpCls = "mt-1 font-body text-xs text-slate";

type StepProps = {
  data: FormData;
  update: <K extends keyof FormData>(key: K, value: FormData[K]) => void;
};

function Step1({ data, update }: StepProps) {
  return (
    <div className="space-y-5">
      <h2 className="font-display text-2xl font-medium text-navy sm:text-3xl">About You</h2>
      <div>
        <label className={labelCls} htmlFor="fullName">Full Name</label>
        <input id="fullName" required value={data.fullName} onChange={(e) => update("fullName", e.target.value)} className={inputCls} placeholder="Your full name" />
      </div>
      <div>
        <label className={labelCls} htmlFor="email">Email</label>
        <input id="email" type="email" required value={data.email} onChange={(e) => update("email", e.target.value)} className={inputCls} placeholder="you@example.com" />
      </div>
      <div>
        <label className={labelCls} htmlFor="phone">Phone (optional)</label>
        <input id="phone" type="tel" value={data.phone} onChange={(e) => update("phone", e.target.value)} className={inputCls} placeholder="+44 ..." />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelCls} htmlFor="pronouns">Pronouns (optional)</label>
          <input id="pronouns" value={data.pronouns} onChange={(e) => update("pronouns", e.target.value)} className={inputCls} placeholder="e.g. she/her" />
        </div>
        <div>
          <label className={labelCls}>Age Range</label>
          <div className="mt-2 space-y-2">
            {["18–29", "30–39", "40–49", "50+"].map((opt) => (
              <label key={opt} className="flex cursor-pointer items-center gap-3 rounded-lg border border-navy/15 bg-cream/40 px-4 py-3 font-body text-base text-navy hover:bg-cream/70">
                <input
                  type="radio"
                  name="ageRange"
                  value={opt}
                  checked={data.ageRange === opt}
                  onChange={(e) => update("ageRange", e.target.value)}
                  className="h-5 w-5 accent-navy"
                />
                {opt}
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Step2({ data, update }: StepProps) {
  const containers = [
    { value: "discovery", title: "Discovery Session", desc: "A single 45-minute session (£50)." },
    { value: "full-journey", title: "Full Journey Container", desc: "4–8 week 1-on-1 container (£320)." },
    { value: "unsure", title: "Not sure yet", desc: "Help me decide what fits best." },
  ];
  return (
    <div className="space-y-5">
      <h2 className="font-display text-2xl font-medium text-navy sm:text-3xl">Your Intention</h2>
      <div>
        <p className={labelCls}>Which container are you applying for?</p>
        <div className="mt-3 space-y-3">
          {containers.map((c) => (
            <label key={c.value} className={`flex cursor-pointer items-start gap-3 rounded-lg border px-4 py-4 hover:bg-cream/70 ${data.container === c.value ? "border-navy bg-cream/70" : "border-navy/15 bg-cream/40"}`}>
              <input
                type="radio"
                name="container"
                value={c.value}
                checked={data.container === c.value}
                onChange={(e) => update("container", e.target.value)}
                className="mt-1 h-5 w-5 accent-navy"
              />
              <span>
                <span className="block font-body text-base font-semibold text-navy">{c.title}</span>
                <span className="mt-1 block font-body text-sm text-slate">{c.desc}</span>
              </span>
            </label>
          ))}
        </div>
      </div>
      <div>
        <label className={labelCls} htmlFor="intention">What&apos;s drawing you to this work right now?</label>
        <textarea id="intention" rows={5} value={data.intention} onChange={(e) => update("intention", e.target.value)} className={inputCls} placeholder="Share what you're hoping to explore or integrate." />
        <p className={helpCls}>A few sentences is plenty.</p>
      </div>
    </div>
  );
}

function Step3({ data, update, togglePractice }: StepProps & { togglePractice: (v: string) => void }) {
  const practices = ["Meditation", "Breathwork", "Somatic movement", "Journaling", "Therapy", "Yoga", "None yet"];
  return (
    <div className="space-y-5">
      <h2 className="font-display text-2xl font-medium text-navy sm:text-3xl">Experience & Practice</h2>
      <div>
        <label className={labelCls} htmlFor="experience">Previous experience with integration or coaching work</label>
        <textarea id="experience" rows={4} value={data.experience} onChange={(e) => update("experience", e.target.value)} className={inputCls} placeholder="Briefly describe any prior coaching, therapy, or personal practice." />
      </div>
      <div>
        <p className={labelCls}>Current grounding practices (select any that apply)</p>
        <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
          {practices.map((p) => {
            const checked = data.practices.includes(p);
            return (
              <label key={p} className={`flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 font-body text-base text-navy hover:bg-cream/70 ${checked ? "border-navy bg-cream/70" : "border-navy/15 bg-cream/40"}`}>
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => togglePractice(p)}
                  className="h-5 w-5 accent-navy"
                />
                {p}
              </label>
            );
          })}
        </div>
      </div>
      <div>
        <label className={labelCls} htmlFor="currentSupport">Are you currently working with a therapist or other practitioner?</label>
        <textarea id="currentSupport" rows={3} value={data.currentSupport} onChange={(e) => update("currentSupport", e.target.value)} className={inputCls} placeholder="Optional — helpful for context." />
      </div>
    </div>
  );
}

function Step4({ data, update }: StepProps) {
  return (
    <div className="space-y-5">
      <h2 className="font-display text-2xl font-medium text-navy sm:text-3xl">Wellbeing & Fit</h2>
      <div>
        <label className={labelCls} htmlFor="medicalDisclosure">Any relevant physical or mental health considerations?</label>
        <textarea id="medicalDisclosure" rows={4} value={data.medicalDisclosure} onChange={(e) => update("medicalDisclosure", e.target.value)} className={inputCls} placeholder="Kept strictly confidential. Share only what feels right." />
      </div>
      <div>
        <label className={labelCls} htmlFor="medications">Current medications (optional)</label>
        <input id="medications" value={data.medications} onChange={(e) => update("medications", e.target.value)} className={inputCls} placeholder="e.g. SSRIs, others" />
      </div>
      <div>
        <p className={labelCls}>How much weekly time can you commit to practice between sessions?</p>
        <div className="mt-3 space-y-2">
          {["Less than 1 hr", "1–3 hrs", "3–5 hrs", "5+ hrs"].map((opt) => (
            <label key={opt} className="flex cursor-pointer items-center gap-3 rounded-lg border border-navy/15 bg-cream/40 px-4 py-3 font-body text-base text-navy hover:bg-cream/70">
              <input
                type="radio"
                name="timeCommitment"
                value={opt}
                checked={data.timeCommitment === opt}
                onChange={(e) => update("timeCommitment", e.target.value)}
                className="h-5 w-5 accent-navy"
              />
              {opt}
            </label>
          ))}
        </div>
      </div>
      <div>
        <label className={labelCls} htmlFor="startTiming">When are you hoping to begin?</label>
        <input id="startTiming" value={data.startTiming} onChange={(e) => update("startTiming", e.target.value)} className={inputCls} placeholder="e.g. Within 2 weeks, next month" />
      </div>
    </div>
  );
}

function Step5({ data, update }: StepProps) {
  return (
    <div className="space-y-5">
      <h2 className="font-display text-2xl font-medium text-navy sm:text-3xl">Agreements</h2>
      <div>
        <label className={labelCls} htmlFor="hearAbout">How did you hear about Still Harbour? (optional)</label>
        <input id="hearAbout" value={data.hearAbout} onChange={(e) => update("hearAbout", e.target.value)} className={inputCls} placeholder="A friend, podcast, search…" />
      </div>
      <div>
        <label className={labelCls} htmlFor="additionalNotes">Anything else you&apos;d like us to know?</label>
        <textarea id="additionalNotes" rows={4} value={data.additionalNotes} onChange={(e) => update("additionalNotes", e.target.value)} className={inputCls} placeholder="Optional — questions, context, anything at all." />
      </div>

      <div className="rounded-xl border border-navy/20 bg-cream/60 p-5">
        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            checked={data.agreeHarmReduction}
            onChange={(e) => update("agreeHarmReduction", e.target.checked)}
            className="mt-1 h-5 w-5 accent-navy"
          />
          <span className="font-body text-sm leading-relaxed text-navy">
            I understand that Still Harbour Coaching operates under strict harm-reduction principles and does not provide medical advice, therapy, diagnosis, or facilitate the sourcing of any controlled substances.
          </span>
        </label>
      </div>

      <div className="rounded-xl border border-navy/20 bg-cream/60 p-5">
        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            checked={data.agreePrivacy}
            onChange={(e) => update("agreePrivacy", e.target.checked)}
            className="mt-1 h-5 w-5 accent-navy"
          />
          <span className="font-body text-sm leading-relaxed text-navy">
            I have read and agree to the{" "}
            <Link to="/privacy" className="underline underline-offset-2 hover:text-slate">
              Privacy Policy
            </Link>
            , and consent to the confidential handling of the information provided above.
          </span>
        </label>
      </div>
    </div>
  );
}
