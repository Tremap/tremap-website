import { CONTACT } from "@/lib/site";

type Payload = {
  firstName?: string;
  lastName?: string;
  email?: string;
  organisation?: string;
  message?: string;
  topic?: string;
  page?: string;
  website?: string; // honeypot
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  // Bots fill the hidden field; pretend success so they don't retry.
  if (clean(body.website, 200)) return Response.json({ ok: true });

  const data = {
    firstName: clean(body.firstName, 100),
    lastName: clean(body.lastName, 100),
    email: clean(body.email, 200),
    organisation: clean(body.organisation, 200),
    message: clean(body.message, 5000),
    topic: clean(body.topic, 200) || "General enquiry",
    page: clean(body.page, 300),
  };

  if (!EMAIL_RE.test(data.email)) {
    return Response.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM;
  const to = process.env.CONTACT_TO ?? CONTACT.email;
  if (!apiKey || !from) {
    return Response.json(
      { error: `Our form is being set up. Please email us at ${CONTACT.email}.` },
      { status: 503 },
    );
  }

  const name = [data.firstName, data.lastName].filter(Boolean).join(" ") || "Website visitor";
  const rows: [string, string][] = [
    ["Name", name],
    ["Email", data.email],
    ["Organisation", data.organisation],
    ["Topic", data.topic],
    ["Page", data.page],
    ["Message", data.message],
  ];
  const html = rows
    .filter(([, v]) => v)
    .map(([k, v]) => `<p><strong>${k}:</strong><br>${escapeHtml(v).replace(/\n/g, "<br>")}</p>`)
    .join("");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: data.email,
      subject: `[tremap.com] ${data.topic} — ${name}`,
      html,
    }),
  });

  if (!res.ok) {
    return Response.json(
      { error: `Something went wrong. Please email us at ${CONTACT.email}.` },
      { status: 502 },
    );
  }
  return Response.json({ ok: true });
}
