"use client";

import Link from "next/link";
import Script from "next/script";
import { useEffect, useState, useSyncExternalStore } from "react";

/**
 * Google Analytics, loaded only after the visitor agrees.
 *
 * Nothing from Google is requested and no cookie is set until "Accept" is
 * clicked. Without NEXT_PUBLIC_GA_ID the site sets no cookies at all, so no
 * notice is shown.
 */
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const STORAGE_KEY = "tremap-cookie-consent";
const OPEN_EVENT = "tremap:cookie-settings";
const CHANGE_EVENT = "tremap:cookie-choice";

// "unknown" = not read yet (server render and first paint): show nothing
type Choice = "granted" | "denied" | "undecided" | "unknown";

function readChoice(): Choice {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value === "granted" || value === "denied" ? value : "undecided";
  } catch {
    return "undecided";
  }
}

function subscribe(onChange: () => void) {
  window.addEventListener(CHANGE_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

function removeAnalyticsCookies() {
  const host = window.location.hostname;
  const domains = [host, `.${host}`, `.${host.split(".").slice(-2).join(".")}`];
  document.cookie.split(";").forEach((cookie) => {
    const name = cookie.split("=")[0].trim();
    if (!name.startsWith("_ga")) return;
    domains.forEach((domain) => {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${domain}`;
    });
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
  });
}

export function CookieConsent() {
  const choice = useSyncExternalStore<Choice>(subscribe, readChoice, () => "unknown");
  const [reopened, setReopened] = useState(false);

  useEffect(() => {
    const reopen = () => setReopened(true);
    window.addEventListener(OPEN_EVENT, reopen);
    return () => window.removeEventListener(OPEN_EVENT, reopen);
  }, []);

  // Analytics may write its cookies once more while the page is closing after
  // consent is withdrawn, so clear them again on every page while declined.
  useEffect(() => {
    if (choice === "denied") removeAnalyticsCookies();
  }, [choice]);

  if (!GA_ID) return null;

  const open = choice === "undecided" || reopened;

  const decide = (next: "granted" | "denied") => {
    const wasGranted = choice === "granted";
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Storage blocked: the notice will be shown again on the next page
    }
    window.dispatchEvent(new Event(CHANGE_EVENT));
    setReopened(false);
    if (next === "denied" && wasGranted) {
      removeAnalyticsCookies();
      // Reload so the already running analytics script stops
      window.location.reload();
    }
  };

  return (
    <>
      {choice === "granted" && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}', { anonymize_ip: true });`}
          </Script>
        </>
      )}

      {open && (
        <div
          role="dialog"
          aria-label="Cookie notice"
          className="fixed inset-x-4 bottom-4 z-[80] rounded-3xl bg-ink p-6 text-white shadow-2xl ring-1 ring-white/10 sm:inset-x-auto sm:left-6 sm:bottom-6 sm:max-w-md"
        >
          <p className="font-display text-xl">Cookies on tremap.com</p>
          <p className="mt-2 text-sm leading-relaxed text-white/75">
            We&rsquo;d like to use Google Analytics cookies to see how the site is used and improve it. They are only
            set if you accept. See our{" "}
            <Link href="/privacy-policy" className="underline underline-offset-2 hover:text-white">
              privacy policy
            </Link>
            .
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => decide("granted")}
              className="rounded-full bg-leaf px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-forest"
            >
              Accept
            </button>
            <button
              type="button"
              onClick={() => decide("denied")}
              className="rounded-full bg-white/10 px-6 py-2.5 text-sm font-semibold text-white ring-1 ring-white/20 transition-colors hover:bg-white/20"
            >
              Decline
            </button>
          </div>
        </div>
      )}
    </>
  );
}

/** Footer link that brings the cookie notice back so the choice can be changed. */
export function CookieSettingsButton({ className }: { className?: string }) {
  if (!GA_ID) return null;
  return (
    <button type="button" className={className} onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}>
      Cookie settings
    </button>
  );
}
