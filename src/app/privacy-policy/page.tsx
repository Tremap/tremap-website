import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "The most open sourced and sharable tree knowledge takes privacy seriously.",
};

export default function PrivacyPolicyPage() {
  return <LegalPage file="privacy.md" title="Privacy policy" />;
}
