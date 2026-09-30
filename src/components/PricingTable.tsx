import { CONTACT, mailto } from "@/lib/site";
import { Button } from "./ui";

type Cell = boolean | string;

const PLANS = [
  { name: "Free", monthly: "£0", yearly: null },
  { name: "Starter", monthly: "£29", yearly: "£319" },
  { name: "Value", monthly: "£239", yearly: "£2,629" },
  { name: "Pro", monthly: "£409", yearly: "£4,499" },
];

const FEATURES: { label: string; values: Cell[] }[] = [
  { label: "Free app download", values: [true, true, true, true] },
  { label: "Free 30 day trial", values: [true, true, true, true] },
  { label: "24/7 tech support hotline", values: [true, true, true, true] },
  { label: "Access to desktop portal", values: [false, true, true, true] },
  { label: "On-site support (POA)", values: [false, true, true, true] },
  { label: "Unlimited geo-fencing", values: [false, true, true, true] },
  { label: "Photos (per tree)", values: ["3", "3", "5", "Unlimited"] },
  { label: "Users (per subscription)", values: ["1", "3", "10", "Unlimited"] },
  { label: "Map, label and save up to (trees)", values: ["30", "200", "1,000", "Unlimited"] },
  { label: "Embedded web map", values: [false, "POA", "POA", "POA"] },
];

function Value({ v }: { v: Cell }) {
  if (v === true)
    return (
      <svg viewBox="0 0 20 20" className="mx-auto size-5 text-leaf" aria-label="Included">
        <circle cx="10" cy="10" r="9" fill="currentColor" opacity="0.15" />
        <path d="M6 10.5l2.5 2.5L14 7.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  if (v === false) return <span className="text-stone/40" aria-label="Not included">—</span>;
  return <span className="font-semibold text-forest">{v}</span>;
}

export function PricingTable() {
  return (
    <div className="overflow-x-auto rounded-[28px] bg-white ring-1 ring-forest/10">
      <table className="w-full min-w-[720px] border-collapse text-center">
        <caption className="sr-only">Tremap standard web portal subscription plans</caption>
        <thead>
          <tr>
            <th scope="col" className="w-[28%] p-6 text-left align-bottom text-sm font-semibold uppercase tracking-[0.15em] text-stone">
              Features
            </th>
            {PLANS.map((p) => (
              <th key={p.name} scope="col" className="p-6 align-bottom">
                <span className="block font-display text-2xl font-normal text-forest">{p.name}</span>
                <span className="mt-2 block font-display text-3xl font-light text-ink">
                  {p.monthly}
                  {p.yearly && <span className="text-base text-stone">/month</span>}
                </span>
                <span className="mt-1 block text-sm text-stone">{p.yearly ? `or ${p.yearly}/year` : "Free forever"}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {FEATURES.map((f) => (
            <tr key={f.label} className="border-t border-forest/10">
              <th scope="row" className="px-6 py-4 text-left font-medium text-ink/85">
                {f.label}
              </th>
              {f.values.map((v, i) => (
                <td key={i} className="px-6 py-4">
                  <Value v={v} />
                </td>
              ))}
            </tr>
          ))}
          <tr className="border-t border-forest/10">
            <td />
            {PLANS.map((p) => (
              <td key={p.name} className="px-4 py-6">
                <Button href="https://portal.tremap.com/signin" variant={p.name === "Free" ? "outline" : "ember"} arrow={false} className="!px-5 !py-2.5 text-sm">
                  {p.name === "Free" ? "Start free" : "Start trial"}
                </Button>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export function PricingNote({ below = false, light = false }: { below?: boolean; light?: boolean }) {
  return (
    <p className={`text-lg leading-relaxed ${light ? "text-white/80" : "text-stone"}`}>
      {below ? "Pricing below is for" : "Pricing for"} the Tremap standard Web Portal. For Tremap
      GreenSpaces pricing information, please{" "}
      <a
        href={mailto(CONTACT.salesEmail, "Tremap GreenSpaces - Request for pricing info")}
        className={`font-semibold underline decoration-ember/60 underline-offset-4 hover:decoration-ember ${light ? "text-white" : "text-forest"}`}
      >
        contact our sales department
      </a>
      .
    </p>
  );
}
