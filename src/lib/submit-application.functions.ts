import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const payloadSchema = z.object({
  fullName: z.string().trim().min(1).max(200),
  email: z.string().trim().email().max(320),
  gender: z.string().max(100).default(""),
  pronouns: z.string().max(100).default(""),
  dob: z.string().max(20).default(""),
  generalHealth: z.string().max(5000).default(""),
  supportNetwork: z.string().max(5000).default(""),
  priorExperience: z.string().max(200).default(""),
  currentMicrodosing: z.array(z.string().max(200)).max(50).default([]),
  motivations: z.array(z.string().max(200)).max(50).default([]),
  goals: z.string().max(5000).default(""),
  mentalHealthDescription: z.string().max(5000).default(""),
  conditions: z.array(z.string().max(200)).max(100).default([]),
  additionalConditions: z.string().max(5000).default(""),
  container: z.string().max(200).default(""),
  intention: z.string().max(5000).default(""),
  practices: z.array(z.string().max(200)).max(50).default([]),
  currentSupport: z.string().max(5000).default(""),
  medicalDisclosure: z.string().max(5000).default(""),
  medications: z.string().max(5000).default(""),
  nonPrescribedMedications: z.string().max(5000).default(""),
  healthWellbeingPractices: z.string().max(5000).default(""),
  timeCommitment: z.string().max(200).default(""),
  startTiming: z.string().max(200).default(""),
  hearAbout: z.string().max(500).default(""),
  additionalNotes: z.string().max(5000).default(""),
  agreeTruthCompleteness: z.boolean(),
  agreeSchedulingPayment: z.boolean(),
  agreeContraindications: z.boolean(),
  agreeLegalDisclaimer: z.boolean(),
  agreeHarmReduction: z.boolean(),
  agreePrivacy: z.boolean(),
  // Honeypot — must be empty
  website: z.string().max(0).optional(),
});

export const submitApplication = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => payloadSchema.parse(input))
  .handler(async ({ data }) => {
    // Silently succeed on honeypot fill to avoid signaling bots.
    if (data.website && data.website.length > 0) {
      return { ok: true } as const;
    }

    if (
      !data.agreeTruthCompleteness ||
      !data.agreeSchedulingPayment ||
      !data.agreeContraindications ||
      !data.agreeLegalDisclaimer ||
      !data.agreeHarmReduction ||
      !data.agreePrivacy
    ) {
      throw new Error("All agreements must be accepted.");
    }

    const { writeApplicationToDrive, sendNotificationEmail } = await import(
      "./submit-application.server"
    );

    try {
      const { title, webViewLink } = await writeApplicationToDrive(data);
      await sendNotificationEmail({ title, webViewLink });
      return { ok: true } as const;
    } catch (err) {
      console.error("submitApplication failed:", err);
      throw new Error(
        "We were unable to record your application right now. Please try again shortly or email info@stillharbour.uk.",
      );
    }
  });
