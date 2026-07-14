import { google } from "googleapis";
import nodemailer from "nodemailer";

export type ApplicationPayload = {
  fullName: string;
  email: string;
  gender: string;
  pronouns: string;
  dob: string;
  generalHealth: string;
  supportNetwork: string;
  priorExperience: string;
  currentMicrodosing: string[];
  motivations: string[];
  goals: string;
  mentalHealthDescription: string;
  conditions: string[];
  additionalConditions: string;
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
  agreeContraindications: boolean;
  agreeLegalDisclaimer: boolean;
  agreeHarmReduction: boolean;
  agreePrivacy: boolean;
};

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

function getGoogleAuth() {
  const raw = requireEnv("GOOGLE_SERVICE_ACCOUNT_JSON");
  const credentials = JSON.parse(raw);
  return new google.auth.GoogleAuth({
    credentials,
    scopes: [
      "https://www.googleapis.com/auth/drive",
      "https://www.googleapis.com/auth/documents",
    ],
  });
}

function fmt(label: string, value: string): string {
  return `${label}\n${value?.toString().trim() || "—"}\n\n`;
}

function fmtList(label: string, values: string[]): string {
  const body = values && values.length ? values.map((v) => `• ${v}`).join("\n") : "—";
  return `${label}\n${body}\n\n`;
}

function fmtBool(label: string, value: boolean): string {
  return `${label}\n${value ? "Yes" : "No"}\n\n`;
}

function buildDocumentText(data: ApplicationPayload, receivedAt: string): string {
  return (
    `Still Harbour — Application\n\n` +
    `Received: ${receivedAt}\n\n` +
    `— Step 1: General Info —\n\n` +
    fmt("Full Name", data.fullName) +
    fmt("Email", data.email) +
    fmt("Gender", data.gender) +
    fmt("Pronouns", data.pronouns) +
    fmt("Date of Birth", data.dob) +
    fmt("General Health", data.generalHealth) +
    fmt("Support Network", data.supportNetwork) +
    `— Step 2: Experience Baseline —\n\n` +
    fmt("Prior Experience", data.priorExperience) +
    fmtList("Current Microdosing", data.currentMicrodosing) +
    `— Step 3: Intention & Fit —\n\n` +
    fmtList("Motivations", data.motivations) +
    fmt("Goals", data.goals) +
    fmt("Mental Health Description", data.mentalHealthDescription) +
    fmtList("Conditions", data.conditions) +
    fmt("Additional Conditions", data.additionalConditions) +
    `— Step 4: Wellbeing —\n\n` +
    fmt("Container", data.container) +
    fmt("Intention", data.intention) +
    fmtList("Practices", data.practices) +
    fmt("Current Support", data.currentSupport) +
    fmt("Medical Disclosure", data.medicalDisclosure) +
    fmt("Prescribed Medications", data.medications) +
    fmt("Non-Prescribed Medications / Supplements", data.nonPrescribedMedications) +
    fmt("Health & Wellbeing Practices", data.healthWellbeingPractices) +
    fmt("Time Commitment", data.timeCommitment) +
    fmt("Start Timing", data.startTiming) +
    fmt("How They Heard About Us", data.hearAbout) +
    fmt("Additional Notes", data.additionalNotes) +
    `— Step 5: Agreements —\n\n` +
    fmtBool("Truth & Completeness", data.agreeTruthCompleteness) +
    fmtBool("Contraindications", data.agreeContraindications) +
    fmtBool("Legal Disclaimer", data.agreeLegalDisclaimer) +
    fmtBool("Harm Reduction", data.agreeHarmReduction) +
    fmtBool("Privacy", data.agreePrivacy)
  );
}

export async function writeApplicationToDrive(
  data: ApplicationPayload,
): Promise<{ docId: string; webViewLink: string; title: string }> {
  const folderId = requireEnv("GOOGLE_DRIVE_FOLDER_ID");
  const auth = getGoogleAuth();
  const drive = google.drive({ version: "v3", auth });
  const docs = google.docs({ version: "v1", auth });

  const receivedAt = new Date().toISOString().replace("T", " ").slice(0, 16) + " UTC";
  const shortId = Math.random().toString(36).slice(2, 8);
  const title = `Application — ${receivedAt} — ${shortId}`;

  const createRes = await drive.files.create({
    requestBody: {
      name: title,
      mimeType: "application/vnd.google-apps.document",
      parents: [folderId],
    },
    fields: "id, webViewLink",
    supportsAllDrives: true,
  });

  const docId = createRes.data.id;
  if (!docId) throw new Error("Google Drive did not return a document ID.");

  const body = buildDocumentText(data, receivedAt);
  await docs.documents.batchUpdate({
    documentId: docId,
    requestBody: {
      requests: [{ insertText: { location: { index: 1 }, text: body } }],
    },
  });

  const webViewLink =
    createRes.data.webViewLink ?? `https://docs.google.com/document/d/${docId}/edit`;

  return { docId, webViewLink, title };
}

export async function sendNotificationEmail(params: {
  title: string;
  webViewLink: string;
}): Promise<void> {
  const user = requireEnv("GMAIL_USER");
  const pass = requireEnv("GMAIL_APP_PASSWORD");
  const to = requireEnv("NOTIFY_TO");

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user, pass },
  });

  const text =
    `A new application has been received.\n\n` +
    `Document: ${params.title}\n` +
    `Link: ${params.webViewLink}\n\n` +
    `(No personal information is included in this notification. Open the document in Google Drive to review.)\n`;

  await transporter.sendMail({
    from: `Still Harbour Applications <${user}>`,
    to,
    subject: "New Still Harbour application received",
    text,
  });
}
