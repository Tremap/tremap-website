import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: "Tremap website and app terms and conditions of use.",
};

export default function TermsPage() {
  return <LegalPage file="terms.md" title="Terms and conditions" />;
}
