"use client";

import { usePathname } from "next/navigation";
import { useId, useState, type FormEvent } from "react";
import { Arrow } from "./ui";

type Props = {
  topic: string;
  submitLabel?: string;
  successText?: string;
  withMessage?: boolean;
  withOrganisation?: boolean;
  dark?: boolean;
};

export function ContactForm({
  topic,
  submitLabel = "Send",
  successText = "Thanks for submitting!",
  withMessage = true,
  withOrganisation = false,
  dark = false,
}: Props) {
  const pathname = usePathname();
  const uid = useId();
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const values = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, topic, page: pathname }),
      });
      const data: { error?: string } = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Something went wrong.");
      setStatus("sent");
      form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }

  const field = `w-full rounded-2xl px-5 py-4 outline-none transition-shadow ${
    dark
      ? "bg-white/10 text-white placeholder:text-white/50 ring-1 ring-white/15 focus:ring-2 focus:ring-sage"
      : "bg-white text-ink placeholder:text-stone/60 ring-1 ring-forest/10 focus:ring-2 focus:ring-leaf"
  }`;
  const label = `mb-2 block text-sm font-medium ${dark ? "text-white/75" : "text-stone"}`;

  if (status === "sent") {
    return (
      <div className={`rounded-3xl p-8 ${dark ? "bg-white/10 ring-1 ring-white/15" : "bg-sage/60"}`} role="status">
        <p className={`font-display text-2xl ${dark ? "text-white" : "text-forest"}`}>{successText}</p>
        <p className={`mt-2 ${dark ? "text-white/70" : "text-stone"}`}>We&apos;ll get back to you soon.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
      <div>
        <label htmlFor={`${uid}-first`} className={label}>First name</label>
        <input id={`${uid}-first`} name="firstName" autoComplete="given-name" className={field} />
      </div>
      <div>
        <label htmlFor={`${uid}-last`} className={label}>Last name</label>
        <input id={`${uid}-last`} name="lastName" autoComplete="family-name" className={field} />
      </div>
      <div className={withOrganisation ? "" : "sm:col-span-2"}>
        <label htmlFor={`${uid}-email`} className={label}>Email *</label>
        <input id={`${uid}-email`} name="email" type="email" required autoComplete="email" className={field} />
      </div>
      {withOrganisation && (
        <div>
          <label htmlFor={`${uid}-org`} className={label}>Organisation</label>
          <input id={`${uid}-org`} name="organisation" autoComplete="organization" className={field} />
        </div>
      )}
      {withMessage && (
        <div className="sm:col-span-2">
          <label htmlFor={`${uid}-msg`} className={label}>Message</label>
          <textarea id={`${uid}-msg`} name="message" rows={4} className={`${field} resize-y`} />
        </div>
      )}
      {/* Honeypot — hidden from people, filled by bots */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
        <button
          type="submit"
          disabled={status === "sending"}
          className="group inline-flex items-center gap-2 rounded-full bg-ember px-7 py-3.5 font-semibold text-white transition-colors hover:bg-[#d9652a] disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : submitLabel}
          <Arrow className="transition-transform group-hover:translate-x-1" />
        </button>
        {status === "error" && (
          <p role="alert" className={dark ? "text-ember-soft" : "text-[#b4481a]"}>
            {error}
          </p>
        )}
      </div>
    </form>
  );
}
