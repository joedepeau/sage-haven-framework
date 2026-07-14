import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { submitApplication } from "@/lib/submit-application.functions";

export const Route = createFileRoute("/apply")({
  component: ApplyPage,
  head: () => ({
    meta: [
      { title: "Apply | Still Harbour Coaching" },
      { name: "description", content: "Apply for a coaching container with Still Harbour — a considered, multi-step intake to help us understand your intentions and design the right container together." },
      { name: "robots", content: "noindex, nofollow" },
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
  // Step 1 — General Info
  fullName: string;
  email: string;
  gender: string;
  pronouns: string;
  dob: string;
  generalHealth: string;
  supportNetwork: string;
  // Step 2 — Experience Baseline
  priorExperience: string;
  currentMicrodosing: string[];
  // Step 3 — Intention & Fit
  motivations: string[];
  goals: string;
  mentalHealthDescription: string;
  conditions: string[];
  
  // Later steps (placeholders retained for persistence)
  container: string;
  intention: string;
  practices: string[];
  currentSupport: string;
  medicalDisclosure: string;
  medications: string;
  nonPrescribedMedications: string;
  healthWellbeingPractices: string;
  timeCommitment: string;
  startTiming: string;
  hearAbout: string;
  additionalNotes: string;
  agreeTruthCompleteness: boolean;
  agreeSchedulingPayment: boolean;
  agreeRefundPolicy: boolean;
  agreeContraindications: boolean;
  agreeLegalDisclaimer: boolean;

  agreeHarmReduction: boolean;
  agreePrivacy: boolean;



};

const initialData: FormData = {
  fullName: "",
  email: "",
  gender: "",
  pronouns: "",
  dob: "",
  generalHealth: "",
  supportNetwork: "",
  priorExperience: "",
  currentMicrodosing: [],
  motivations: [],
  goals: "",
  mentalHealthDescription: "",
  conditions: [],
  
  container: "",
  intention: "",
  practices: [],
  currentSupport: "",
  medicalDisclosure: "",
  medications: "",
  nonPrescribedMedications: "",
  healthWellbeingPractices: "",
  timeCommitment: "",
  startTiming: "",
  hearAbout: "",
  additionalNotes: "",
  agreeTruthCompleteness: false,
  agreeSchedulingPayment: false,
  agreeRefundPolicy: false,
  agreeContraindications: false,
  agreeLegalDisclaimer: false,

  agreeHarmReduction: false,
  agreePrivacy: false,



};

const STEP_LABELS = [
  "General Info",
  "Experience Baseline",
  "Intention & Fit",
  "Wellbeing",
  "Agreements",
];

type Errors = Partial<Record<keyof FormData, string>>;

function validateStep(step: number, data: FormData): Errors {
  const e: Errors = {};
  if (step === 1) {
    if (!data.fullName.trim()) e.fullName = "Full name is required.";
    if (!data.email.trim()) {
      e.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
      e.email = "Please enter a valid email address.";
    }
    if (!data.gender) e.gender = "Please select an option.";
    if (!data.dob) {
      e.dob = "Date of birth is required.";
    } else {
      const birthDate = new Date(data.dob);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      if (age < 18 || Number.isNaN(age)) {
        e.dob = "You must be at least 18 years of age to use this coaching service";
      }
    }
    if (!data.generalHealth.trim()) e.generalHealth = "Please share a brief note on your general health.";
    if (!data.supportNetwork.trim()) e.supportNetwork = "Please describe your support network.";
  }
  if (step === 2) {
    if (!data.priorExperience) e.priorExperience = "Please select an option.";
    if (data.currentMicrodosing.length === 0) e.currentMicrodosing = "Please select at least one option.";
  }
  if (step === 3) {
    if (data.motivations.length === 0) e.motivations = "Please select at least one option.";
    if (!data.goals.trim()) e.goals = "Please share your goals in your own words.";
    if (!data.mentalHealthDescription.trim()) e.mentalHealthDescription = "Please describe your mental health.";
    if (data.conditions.length === 0) e.conditions = "Please select at least one option.";
  }
  if (step === 4) {
    if (!data.medications.trim()) e.medications = "Please list any prescribed medications.";
    if (!data.nonPrescribedMedications.trim()) e.nonPrescribedMedications = "Please list any non-prescribed medications or supplements.";
  }
  if (step === 5) {
    if (!data.agreeTruthCompleteness) e.agreeTruthCompleteness = "Please acknowledge to continue.";
    if (!data.agreeSchedulingPayment) e.agreeSchedulingPayment = "Please acknowledge to continue.";
    if (!data.agreeRefundPolicy) e.agreeRefundPolicy = "Please acknowledge to continue.";
    if (!data.agreeContraindications) e.agreeContraindications = "Please acknowledge to continue.";

    if (!data.agreeLegalDisclaimer) e.agreeLegalDisclaimer = "Please acknowledge to continue.";
    if (!data.agreeHarmReduction) e.agreeHarmReduction = "Please acknowledge to continue.";
    if (!data.agreePrivacy) e.agreePrivacy = "Please acknowledge to continue.";
  }



  return e;
}



function ApplyPage() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormData>(initialData);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [website, setWebsite] = useState(""); // honeypot
  const callSubmit = useServerFn(submitApplication);

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

  const update = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setData((d) => ({ ...d, [key]: value }));
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const { [key]: _removed, ...rest } = prev;
      return rest;
    });
  };

  const toggleArray = (key: "practices" | "currentMicrodosing" | "motivations" | "conditions", value: string) => {
    setData((d) => {
      const arr = d[key];
      const has = arr.includes(value);
      return { ...d, [key]: has ? arr.filter((v) => v !== value) : [...arr, value] };
    });
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const { [key]: _removed, ...rest } = prev;
      return rest;
    });
  };

  const next = () => {
    const stepErrors = validateStep(step, data);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    setErrors({});
    setStep((s) => Math.min(s + 1, TOTAL_STEPS));
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const back = () => {
    setErrors({});
    setStep((s) => Math.max(s - 1, 1));
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const stepErrors = validateStep(step, data);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    setSubmitError(null);
    setSubmitting(true);
    try {
      await callSubmit({ data: { ...data, website } });
      setSubmitted(true);
      try {
        window.localStorage.removeItem(STORAGE_KEY);
      } catch {
        /* ignore */
      }
    } catch (err) {
      const message =
        err instanceof Error && err.message
          ? err.message
          : "Something went wrong submitting your application. Please try again.";
      setSubmitError(message);
    } finally {
      setSubmitting(false);
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
              <span className="text-navy">info@stillharbour.uk</span> to arrange next steps.
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
        <Footer />
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

            <form onSubmit={submit} noValidate className="space-y-6">
              {step === 1 && <Step1 data={data} update={update} errors={errors} />}
              {step === 2 && (
                <Step2
                  data={data}
                  update={update}
                  errors={errors}
                  toggleMicrodosing={(v) => toggleArray("currentMicrodosing", v)}
                />
              )}
              {step === 3 && (
                <Step3
                  data={data}
                  update={update}
                  errors={errors}
                  toggleMotivation={(v) => toggleArray("motivations", v)}
                  toggleCondition={(v) => toggleArray("conditions", v)}
                />
              )}
              {step === 4 && <Step4 data={data} update={update} errors={errors} />}
              {step === 5 && <Step5 data={data} update={update} errors={errors} />}

              {/* Honeypot — hidden from real users */}
              <div aria-hidden="true" className="hidden">
                <label>
                  Website
                  <input
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                </label>
              </div>

              {submitError && (
                <p role="alert" className="rounded-md border border-red-300 bg-red-50 p-3 font-body text-sm text-red-800">
                  {submitError}
                </p>
              )}

              {/* Navigation */}
              <div className="flex flex-col-reverse gap-3 pt-4 sm:flex-row sm:justify-between">
                {step > 1 ? (
                  <Button
                    type="button"
                    onClick={back}
                    variant="outline"
                    disabled={submitting}
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
                    disabled={submitting}
                    className="h-14 w-full bg-ochre font-body text-base font-semibold text-navy shadow-none hover:bg-ochre/90 disabled:opacity-60 sm:w-auto sm:px-10"
                  >
                    {submitting ? "Submitting…" : "Submit Application"}
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
      <Footer />
    </div>
  );
}

/* ---------- Reusable field styles ---------- */

const labelCls = "font-body text-sm font-semibold text-navy";
const inputBase =
  "mt-2 block w-full rounded-lg border bg-cream/40 px-4 py-3 font-body text-base text-navy placeholder:text-slate/60 focus:outline-none focus:ring-2 focus:ring-navy/20";
const inputOk = "border-navy/20 focus:border-navy";
const inputErr = "border-red-500/70 focus:border-red-500";
const errorTextCls = "mt-1 font-body text-xs text-red-600";

function fieldCls(hasError?: boolean) {
  return `${inputBase} ${hasError ? inputErr : inputOk}`;
}

type StepProps = {
  data: FormData;
  update: <K extends keyof FormData>(key: K, value: FormData[K]) => void;
  errors: Errors;
};

function Step1({ data, update, errors }: StepProps) {
  const genderOpts = ["Female", "Male", "Non-binary", "Prefer to self-describe", "Prefer not to say"];
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-medium text-navy sm:text-3xl">General Info</h2>
        <p className="mt-1 font-body text-sm text-slate">A few details about you.</p>
      </div>

      {/* Full Name */}
      <div>
        <label className={labelCls} htmlFor="fullName">
          Full Name <span className="text-red-600">*</span>
        </label>
        <input
          id="fullName"
          type="text"
          autoComplete="name"
          value={data.fullName}
          onChange={(e) => update("fullName", e.target.value)}
          className={fieldCls(!!errors.fullName)}
          placeholder="Your full name"
          aria-invalid={!!errors.fullName}
        />
        {errors.fullName && <p className={errorTextCls}>{errors.fullName}</p>}
      </div>

      {/* Email Address */}
      <div>
        <label className={labelCls} htmlFor="email">
          Email Address <span className="text-red-600">*</span>
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          value={data.email}
          onChange={(e) => update("email", e.target.value)}
          className={fieldCls(!!errors.email)}
          placeholder="you@example.com"
          aria-invalid={!!errors.email}
        />
        {errors.email && <p className={errorTextCls}>{errors.email}</p>}
      </div>

      {/* Gender — radio */}
      <fieldset>
        <legend className={labelCls}>
          Gender <span className="text-red-600">*</span>
        </legend>
        <div className="mt-3 space-y-2">
          {genderOpts.map((opt) => (
            <label
              key={opt}
              className={`flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 font-body text-base text-navy hover:bg-cream/70 ${
                data.gender === opt ? "border-navy bg-cream/70" : "border-navy/15 bg-cream/40"
              }`}
            >
              <input
                type="radio"
                name="gender"
                value={opt}
                checked={data.gender === opt}
                onChange={(e) => update("gender", e.target.value)}
                className="h-5 w-5 accent-navy"
              />
              {opt}
            </label>
          ))}
        </div>
        {errors.gender && <p className={errorTextCls}>{errors.gender}</p>}
      </fieldset>

      {/* Pronouns */}
      <div>
        <label className={labelCls} htmlFor="pronouns">
          Pronouns <span className="font-normal text-slate">(optional)</span>
        </label>
        <input
          id="pronouns"
          value={data.pronouns}
          onChange={(e) => update("pronouns", e.target.value)}
          className={fieldCls(false)}
          placeholder="e.g. she/her, they/them"
          aria-invalid={false}
        />
      </div>

      {/* DOB */}
      <div>
        <label className={labelCls} htmlFor="dob">
          Date of Birth <span className="text-red-600">*</span>
        </label>
        <input
          id="dob"
          type="date"
          value={data.dob}
          onChange={(e) => update("dob", e.target.value)}
          className={fieldCls(!!errors.dob)}
          aria-invalid={!!errors.dob}
        />
        {errors.dob && <p className={errorTextCls}>{errors.dob}</p>}
      </div>

      {/* General Health */}
      <div>
        <label className={labelCls} htmlFor="generalHealth">
          General Health <span className="text-red-600">*</span>
        </label>
        <textarea
          id="generalHealth"
          rows={4}
          value={data.generalHealth}
          onChange={(e) => update("generalHealth", e.target.value)}
          className={fieldCls(!!errors.generalHealth)}
          placeholder="A brief overview of your physical and mental wellbeing."
          aria-invalid={!!errors.generalHealth}
        />
        {errors.generalHealth && <p className={errorTextCls}>{errors.generalHealth}</p>}
      </div>

      {/* Support Network */}
      <div>
        <label className={labelCls} htmlFor="supportNetwork">
          Support Network <span className="text-red-600">*</span>
        </label>
        <textarea
          id="supportNetwork"
          rows={4}
          value={data.supportNetwork}
          onChange={(e) => update("supportNetwork", e.target.value)}
          className={fieldCls(!!errors.supportNetwork)}
          placeholder="Who is around you day-to-day — partner, friends, therapist, community?"
          aria-invalid={!!errors.supportNetwork}
        />
        {errors.supportNetwork && <p className={errorTextCls}>{errors.supportNetwork}</p>}
      </div>

      {/* How did you hear about us */}
      <div>
        <label className={labelCls} htmlFor="hearAbout">
          How did you hear about us? <span className="font-normal text-slate">(optional)</span>
        </label>
        <input
          id="hearAbout"
          type="text"
          value={data.hearAbout}
          onChange={(e) => update("hearAbout", e.target.value)}
          className={fieldCls(false)}
          placeholder="e.g. a friend, podcast, referral"
        />
      </div>
    </div>
  );
}

function Step2({
  data,
  update,
  errors,
  toggleMicrodosing,
}: StepProps & { toggleMicrodosing: (v: string) => void }) {
  const priorOpts = [
    { value: "none", label: "None", desc: "I have no prior experience." },
    { value: "some", label: "Some", desc: "A handful of previous experiences." },
    { value: "moderate", label: "Moderate", desc: "Regular, considered use over time." },
    { value: "extensive", label: "Extensive", desc: "Long-standing, deep familiarity." },
  ];
  const microOpts = [
    "Not currently microdosing",
    "Exploring / researching",
    "Occasional (a few times a month)",
    "Structured protocol (e.g. Fadiman, Stamets)",
    "Daily or near-daily",
    "Prefer not to say",
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-medium text-navy sm:text-3xl">Experience Baseline</h2>
        <p className="mt-1 font-body text-sm text-slate">Helps us meet you where you are.</p>
      </div>

      {/* Prior experience — radio */}
      <fieldset>
        <legend className={labelCls}>
          Prior Experience With Psychoactive Substances (Microdose or High Dose)&nbsp;<span className="text-red-600">*</span>
        </legend>
        <div className="mt-3 space-y-3">
          {priorOpts.map((opt) => (
            <label
              key={opt.value}
              className={`flex cursor-pointer items-start gap-3 rounded-lg border px-4 py-4 hover:bg-cream/70 ${
                data.priorExperience === opt.value ? "border-navy bg-cream/70" : "border-navy/15 bg-cream/40"
              }`}
            >
              <input
                type="radio"
                name="priorExperience"
                value={opt.value}
                checked={data.priorExperience === opt.value}
                onChange={(e) => update("priorExperience", e.target.value)}
                className="mt-1 h-5 w-5 accent-navy"
              />
              <span>
                <span className="block font-body text-base font-semibold text-navy">{opt.label}</span>
                <span className="mt-1 block font-body text-sm text-slate">{opt.desc}</span>
              </span>
            </label>
          ))}
        </div>
        {errors.priorExperience && <p className={errorTextCls}>{errors.priorExperience}</p>}
      </fieldset>

      {/* Current microdosing — checkboxes */}
      <fieldset>
        <legend className={labelCls}>
          Currently Microdosing <span className="text-red-600">*</span>
        </legend>
        <p className="mt-1 font-body text-xs text-slate">Select all that apply.</p>
        <div className="mt-3 space-y-2">
          {microOpts.map((opt) => {
            const checked = data.currentMicrodosing.includes(opt);
            return (
              <label
                key={opt}
                className={`flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 font-body text-base text-navy hover:bg-cream/70 ${
                  checked ? "border-navy bg-cream/70" : "border-navy/15 bg-cream/40"
                }`}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleMicrodosing(opt)}
                  className="h-5 w-5 accent-navy"
                />
                {opt}
              </label>
            );
          })}
        </div>
        {errors.currentMicrodosing && <p className={errorTextCls}>{errors.currentMicrodosing}</p>}
      </fieldset>
    </div>
  );
}

function Step3({
  data,
  update,
  errors,
  toggleMotivation,
  toggleCondition,
}: StepProps & {
  toggleMotivation: (v: string) => void;
  toggleCondition: (v: string) => void;
}) {
  const motivationOpts = [
    "Emotional regulation",
    "Clarity & focus",
    "Creativity",
    "Spiritual exploration",
    "Relationship & connection",
    "Grief or life transition",
    "Habit change",
    "Curiosity",
    "Journey preparation",
    "Journey integration",
    "Improved Wellbeing",
    "Other",
  ];
  const conditionOpts = [
    "None of the below",
    "Anxiety",
    "Depression",
    "Neurodivergence",
    "Trauma / PTSD",
    "Chronic stress or burnout",
    "Hormonal Imbalance",
    "Chronic physical illness",
    "Disordered eating",
    "Disordered substance use",
    "Other",
    "Prefer not to say",
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-medium text-navy sm:text-3xl">Intention & Fit</h2>
        <p className="mt-1 font-body text-sm text-slate">
          Help us understand what&apos;s bringing you here and what to hold with care.
        </p>
      </div>

      {/* Motivations — checkboxes */}
      <fieldset>
        <legend className={labelCls}>
          Motivations for Microdosing&nbsp;<span className="text-red-600">*</span>
        </legend>
        <p className="mt-1 font-body text-xs text-slate">Select all that apply.</p>
        <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
          {motivationOpts.map((opt) => {
            const checked = data.motivations.includes(opt);
            return (
              <label
                key={opt}
                className={`flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 font-body text-base text-navy hover:bg-cream/70 ${
                  checked ? "border-navy bg-cream/70" : "border-navy/15 bg-cream/40"
                }`}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleMotivation(opt)}
                  className="h-5 w-5 accent-navy"
                />
                {opt}
              </label>
            );
          })}
        </div>
        {errors.motivations && <p className={errorTextCls}>{errors.motivations}</p>}
      </fieldset>

      {/* Goals */}
      <div>
        <label className={labelCls} htmlFor="goals">
          Goals in your own words <span className="text-red-600">*</span>
        </label>
        <textarea
          id="goals"
          rows={5}
          value={data.goals}
          onChange={(e) => update("goals", e.target.value)}
          className={fieldCls(!!errors.goals)}
          placeholder="What would a meaningful outcome from this container look like for you?"
          aria-invalid={!!errors.goals}
        />
        {errors.goals && <p className={errorTextCls}>{errors.goals}</p>}
      </div>

      {/* Mental Health Description */}
      <div>
        <label className={labelCls} htmlFor="mentalHealthDescription">
          Mental Health Description <span className="text-red-600">*</span>
        </label>
        <textarea
          id="mentalHealthDescription"
          rows={5}
          value={data.mentalHealthDescription}
          onChange={(e) => update("mentalHealthDescription", e.target.value)}
          className={fieldCls(!!errors.mentalHealthDescription)}
          placeholder="How would you describe your current and past mental and emotional landscape?"
          aria-invalid={!!errors.mentalHealthDescription}
        />
        {errors.mentalHealthDescription && (
          <p className={errorTextCls}>{errors.mentalHealthDescription}</p>
        )}
      </div>

      {/* Profiles / Conditions — checkboxes */}
      <fieldset>
        <legend className={labelCls}>
          Profiles / Conditions <span className="text-red-600">*</span>
        </legend>
        <p className="mt-1 font-body text-xs text-slate">Select all that apply. Kept strictly confidential.</p>
        <div className="mt-3 space-y-2">
          {conditionOpts.map((opt) => {
            const checked = data.conditions.includes(opt);
            return (
              <label
                key={opt}
                className={`flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 font-body text-base text-navy hover:bg-cream/70 ${
                  checked ? "border-navy bg-cream/70" : "border-navy/15 bg-cream/40"
                }`}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleCondition(opt)}
                  className="h-5 w-5 accent-navy"
                />
                {opt}
              </label>
            );
          })}
        </div>
        {errors.conditions && <p className={errorTextCls}>{errors.conditions}</p>}
      </fieldset>

    </div>
  );
}

function Step4({ data, update, errors }: StepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-medium text-navy sm:text-3xl">Wellbeing</h2>
        <p className="mt-1 font-body text-sm text-slate">A few questions about your current health and support.</p>
      </div>

      {/* Prescribed Medications */}
      <div>
        <label className={labelCls} htmlFor="medications">
          Prescribed Medications <span className="text-red-600">*</span>
        </label>
        <p className="mt-1 font-body text-xs text-slate">
          Please list all prescribed medications you currently take, along with the condition or symptoms they are used to treat.
        </p>
        <textarea
          id="medications"
          rows={4}
          value={data.medications}
          onChange={(e) => update("medications", e.target.value)}
          className={fieldCls(!!errors.medications)}
          placeholder="e.g. Sertraline 50mg for anxiety"
          aria-invalid={!!errors.medications}
        />
        {errors.medications && <p className={errorTextCls}>{errors.medications}</p>}
      </div>

      {/* Non-Prescribed Medications and Supplements */}
      <div>
        <label className={labelCls} htmlFor="nonPrescribedMedications">
          Non-Prescribed Medications and Supplements <span className="text-red-600">*</span>
        </label>
        <p className="mt-1 font-body text-xs text-slate">
          Please list all non-prescribed medications or supplements you currently take.
        </p>
        <textarea
          id="nonPrescribedMedications"
          rows={4}
          value={data.nonPrescribedMedications}
          onChange={(e) => update("nonPrescribedMedications", e.target.value)}
          className={fieldCls(!!errors.nonPrescribedMedications)}
          placeholder="e.g. magnesium, vitamin D, St John&apos;s Wort"
          aria-invalid={!!errors.nonPrescribedMedications}
        />
        {errors.nonPrescribedMedications && <p className={errorTextCls}>{errors.nonPrescribedMedications}</p>}
      </div>

      {/* Health, Wellbeing, and Spiritual Practices */}
      <div>
        <label className={labelCls} htmlFor="healthWellbeingPractices">
          Health, Wellbeing, and Spiritual Practices{" "}
          <span className="font-normal text-slate">(optional)</span>
        </label>
        <p className="mt-1 font-body text-xs text-slate">
          Do you have any regular exercise, nutrition, self-care, or spiritual practices?
        </p>
        <textarea
          id="healthWellbeingPractices"
          rows={4}
          value={data.healthWellbeingPractices}
          onChange={(e) => update("healthWellbeingPractices", e.target.value)}
          className={fieldCls(false)}
          placeholder="e.g. yoga twice a week, daily meditation, morning walks"
        />
      </div>

      {/* Additional Notes */}
      <div>
        <label className={labelCls} htmlFor="additionalNotes">
          Anything else you&apos;d like me to know?{" "}
          <span className="font-normal text-slate">(optional)</span>
        </label>
        <textarea
          id="additionalNotes"
          rows={4}
          value={data.additionalNotes}
          onChange={(e) => update("additionalNotes", e.target.value)}
          className={fieldCls(false)}
          placeholder="Anything else that feels important to share before we speak?  If you're interested in sliding-scale or pro-bono options, please note that here with some context."
        />
      </div>
    </div>
  );
}

function Step5({ data, update, errors }: StepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-medium text-navy sm:text-3xl">Agreements</h2>
        <p className="mt-1 font-body text-sm text-slate">
          A few final acknowledgements before you submit.
        </p>
      </div>

      {/* Truthfulness & Completeness Agreement */}
      <fieldset>
        <legend className={labelCls}>
          Truthfulness & Completeness <span className="text-red-600">*</span>
        </legend>
        <label
          className={`mt-3 flex cursor-pointer items-start gap-3 rounded-lg border px-4 py-3 font-body text-base text-navy hover:bg-cream/70 ${
            data.agreeTruthCompleteness ? "border-navy bg-cream/70" : "border-navy/15 bg-cream/40"
          }`}
        >
          <input
            type="checkbox"
            checked={data.agreeTruthCompleteness}
            onChange={(e) => update("agreeTruthCompleteness", e.target.checked)}
            className="mt-1 h-5 w-5 shrink-0 accent-navy"
            aria-invalid={!!errors.agreeTruthCompleteness}
          />
          <span className="font-body text-sm leading-relaxed text-navy">
            I confirm that the information I have provided in this intake form is complete and truthful.
          </span>
        </label>

        {errors.agreeTruthCompleteness && (
          <p className={errorTextCls}>{errors.agreeTruthCompleteness}</p>
        )}
      </fieldset>

      {/* Scheduling and Payment Agreement */}
      <fieldset>
        <legend className={labelCls}>
          Scheduling and Payment <span className="text-red-600">*</span>
        </legend>
        <label
          className={`mt-3 flex cursor-pointer items-start gap-3 rounded-lg border px-4 py-3 font-body text-base text-navy hover:bg-cream/70 ${
            data.agreeSchedulingPayment ? "border-navy bg-cream/70" : "border-navy/15 bg-cream/40"
          }`}
        >
          <input
            type="checkbox"
            checked={data.agreeSchedulingPayment}
            onChange={(e) => update("agreeSchedulingPayment", e.target.checked)}
            className="mt-1 h-5 w-5 shrink-0 accent-navy"
            aria-invalid={!!errors.agreeSchedulingPayment}
          />
          <span className="font-body text-sm leading-relaxed text-navy">
            I understand that a Discovery Session is required before entering into a Coaching Container. The
            price of a Discovery Session is £30 and will be paid in advance of the date of the call, and with
            sliding-scale and pro-bono pricing options offered based on availability and at the sole discretion of
            Still Harbour Coaching. The price of my Discovery Session will be deducted from the cost of my first
            scheduled Coaching Container. I understand that all sessions will be conducted online via Google Meet,
            in English, and that I will be emailed payment details and available call times following submission of
            this form.
          </span>
        </label>
        {errors.agreeSchedulingPayment && (
          <p className={errorTextCls}>{errors.agreeSchedulingPayment}</p>
        )}
      </fieldset>

      {/* Refund Policy Agreement */}
      <fieldset>
        <legend className={labelCls}>
          Refund Policy <span className="text-red-600">*</span>
        </legend>
        <label
          className={`mt-3 flex cursor-pointer items-start gap-3 rounded-lg border px-4 py-3 font-body text-base text-navy hover:bg-cream/70 ${
            data.agreeRefundPolicy ? "border-navy bg-cream/70" : "border-navy/15 bg-cream/40"
          }`}
        >
          <input
            type="checkbox"
            checked={data.agreeRefundPolicy}
            onChange={(e) => update("agreeRefundPolicy", e.target.checked)}
            className="mt-1 h-5 w-5 shrink-0 accent-navy"
            aria-invalid={!!errors.agreeRefundPolicy}
          />
          <span className="font-body text-sm leading-relaxed text-navy">
            I understand that I need to provide at least 48 hours notice when requesting a change to the
            date or time of a scheduled appointment, and that refunds will not be issued for missed
            appointments. On the rare occasion my coach needs to reschedule an appointment without at
            least 48 hours notice I will have the choice of priority replacement booking for a new date
            and time, or £100 (or the pro-rated sliding scale equivalent) towards my next Coaching Container
            purchase.
          </span>
        </label>
        {errors.agreeRefundPolicy && (
          <p className={errorTextCls}>{errors.agreeRefundPolicy}</p>
        )}
      </fieldset>

      {/* Contraindications Agreement */}

      <fieldset>
        <legend className={labelCls}>
          Contraindications <span className="text-red-600">*</span>
        </legend>
        <label
          className={`mt-3 flex cursor-pointer items-start gap-3 rounded-lg border px-4 py-3 font-body text-base text-navy hover:bg-cream/70 ${
            data.agreeContraindications ? "border-navy bg-cream/70" : "border-navy/15 bg-cream/40"
          }`}
        >
          <input
            type="checkbox"
            checked={data.agreeContraindications}
            onChange={(e) => update("agreeContraindications", e.target.checked)}
            className="mt-1 h-5 w-5 shrink-0 accent-navy"
            aria-invalid={!!errors.agreeContraindications}
          />
          <span className="font-body text-sm leading-relaxed text-navy">
            I confirm that <strong><em>none</em></strong> of the following profiles or conditions apply to me:
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Currently taking Lithium or Tramadol</li>
              <li>Currently pregnant, trying to get pregnant, or breastfeeding</li>
              <li>Current or prior diagnosis of Psychosis, Schizophrenia, or Bipolar I Disorder</li>
              <li>History of Psychosis, Schizophrenia, or Bipolar I Disorder in my immediate family.</li>
            </ul>
          </span>
        </label>
        {errors.agreeContraindications && (
          <p className={errorTextCls}>{errors.agreeContraindications}</p>
        )}
      </fieldset>

      {/* Legal Disclaimer Agreement */}
      <fieldset>
        <legend className={labelCls}>
          Legal Disclaimer <span className="text-red-600">*</span>
        </legend>
        <label
          className={`mt-3 flex cursor-pointer items-start gap-3 rounded-lg border px-4 py-3 font-body text-base text-navy hover:bg-cream/70 ${
            data.agreeLegalDisclaimer ? "border-navy bg-cream/70" : "border-navy/15 bg-cream/40"
          }`}
        >
          <input
            type="checkbox"
            checked={data.agreeLegalDisclaimer}
            onChange={(e) => update("agreeLegalDisclaimer", e.target.checked)}
            className="mt-1 h-5 w-5 shrink-0 accent-navy"
            aria-invalid={!!errors.agreeLegalDisclaimer}
          />
          <span className="font-body text-sm leading-relaxed text-navy">
            I understand that Still Harbour does not sell, assist with the purchase of, or encourage the use
            of illegal substances. I take responsibility for following all applicable laws in my country of
            residence.
          </span>
        </label>
        {errors.agreeLegalDisclaimer && (
          <p className={errorTextCls}>{errors.agreeLegalDisclaimer}</p>
        )}
      </fieldset>

      {/* Harm Reduction Agreement */}
      <fieldset>
        <legend className={labelCls}>
          Harm Reduction <span className="text-red-600">*</span>
        </legend>
        <label
          className={`mt-3 flex cursor-pointer items-start gap-3 rounded-lg border px-4 py-3 font-body text-base text-navy hover:bg-cream/70 ${
            data.agreeHarmReduction ? "border-navy bg-cream/70" : "border-navy/15 bg-cream/40"
          }`}
        >
          <input
            type="checkbox"
            checked={data.agreeHarmReduction}
            onChange={(e) => update("agreeHarmReduction", e.target.checked)}
            className="mt-1 h-5 w-5 shrink-0 accent-navy"
            aria-invalid={!!errors.agreeHarmReduction}
          />
          <span className="font-body text-sm leading-relaxed text-navy">
            I understand that Still Harbour offers coaching and peer support, not medical or
            psychiatric care. I take responsibility for my own choices and wellbeing, and agree to
            engage with honesty, care, and a harm-reduction approach throughout our work together.
          </span>
        </label>
        {errors.agreeHarmReduction && (
          <p className={errorTextCls}>{errors.agreeHarmReduction}</p>
        )}
      </fieldset>

      {/* Privacy Agreement */}
      <fieldset>
        <legend className={labelCls}>
          Privacy & Confidentiality <span className="text-red-600">*</span>
        </legend>
        <label
          className={`mt-3 flex cursor-pointer items-start gap-3 rounded-lg border px-4 py-3 font-body text-base text-navy hover:bg-cream/70 ${
            data.agreePrivacy ? "border-navy bg-cream/70" : "border-navy/15 bg-cream/40"
          }`}
        >
          <input
            type="checkbox"
            checked={data.agreePrivacy}
            onChange={(e) => update("agreePrivacy", e.target.checked)}
            className="mt-1 h-5 w-5 shrink-0 accent-navy"
            aria-invalid={!!errors.agreePrivacy}
          />
          <span className="font-body text-sm leading-relaxed text-navy">
            I have read the Still Harbour Coaching{" "}
            <Link
              to="/privacy"
              className="underline hover:text-navy/80 focus:outline-none focus:ring-2 focus:ring-navy/40 rounded-sm"
              onClick={(e) => e.stopPropagation()}
            >
              privacy policy
            </Link>
            .&nbsp; I consent to Still Harbour securely storing the information shared in this application
            for the purposes of reviewing my enquiry and shaping our work together. My details will
            be kept strictly confidential and never shared without my permission.
          </span>
        </label>
        {errors.agreePrivacy && <p className={errorTextCls}>{errors.agreePrivacy}</p>}
      </fieldset>
    </div>
  );
}
