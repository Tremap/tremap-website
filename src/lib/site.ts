export const SITE_URL = "https://www.tremap.com";
export const PORTAL_URL = "https://portal.tremap.com";
export const PORTAL_SIGNIN_URL = "https://portal.tremap.com/signin";
export const API_MAP = "https://clusters.tremap.com/api";

export const CONTACT = {
  email: "help@tremap.com",
  infoEmail: "info@tremap.com",
  salesEmail: "richardmaxwell@tremap.com",
  phone: "+44 (0) 20 3982 2216",
  phoneHref: "tel:+442039822216",
  address: ["Tremap, OurHQ, Nanpean", "Cornwall, PL26 7XR", "United Kingdom"],
};

export function mailto(to: string, subject: string) {
  return `mailto:${to}?subject=${encodeURIComponent(subject)}`;
}

export const APP_LINKS = {
  ios: "https://apps.apple.com/us/app/tremap/id1669477980",
  android: "https://play.google.com/store/apps/details?id=com.twiggers.tremap",
};

export const SOCIALS = [
  { label: "YouTube", href: "https://www.youtube.com/@tremapminiclips/featured" },
  { label: "Facebook", href: "https://www.facebook.com/tremapeverytree" },
  { label: "X", href: "https://twitter.com/tremap3" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/tremap/" },
  { label: "Instagram", href: "https://www.instagram.com/tremapeverytree" },
];

export type NavLink = { label: string; href: string; description?: string };
export type NavItem = NavLink | { label: string; children: NavLink[] };

export const NAV: NavItem[] = [
  {
    label: "Solutions",
    children: [
      { label: "All solutions", href: "/solutions", description: "Tremap for every kind of tree work" },
      { label: "GreenSpaces", href: "/greenspaces", description: "Urban tree & green space management" },
      { label: "Digital labelling", href: "/labelling", description: "No-cost, permanent, eco-friendly" },
      { label: "Traceability", href: "/traceabilityaddedvalue", description: "QR codes from product to tree" },
      { label: "Creative Connect", href: "/creativeconnect", description: "Attach art and music to trees" },
      { label: "Pricing", href: "/pricing", description: "Web portal subscription plans" },
    ],
  },
  {
    label: "Species",
    children: [
      { label: "Species Sponsors", href: "/speciessponsors", description: "Map iconic, rare and endangered trees" },
      { label: "The Global Tea Forest", href: "/the-global-tea-forest", description: "Mapping Camellia sinensis worldwide" },
      { label: "Heathrow Black Poplars", href: "/heathrow-black-poplars", description: "Britain's rarest native tree" },
      { label: "GHL Cork Oak", href: "/ghl-cork-oak", description: "Nature's most versatile survivor" },
      { label: "The Nare Magnolia campbellii", href: "/the-nare-magnolia-campbellii", description: "The “flamingo of flowers”" },
      { label: "The Garden of Peace Zaragoza", href: "/gopzaragoza", description: "Partner garden in Spain" },
    ],
  },
  { label: "GreenSpaces", href: "/greenspaces" },
  {
    label: "Company",
    children: [
      { label: "About", href: "/about", description: "Our journey and our team" },
      { label: "Partners", href: "/partners", description: "Funders, pilots and collaborators" },
      { label: "News & press", href: "/news", description: "Press releases, media and press kit" },
      { label: "Blog", href: "/blog", description: "All posts and stories" },
      { label: "Contact", href: "/contact", description: "Get in touch with the team" },
    ],
  },
];

// Shown when the backend is unreachable at build time
const FALLBACK_TREE_COUNT = 15_641_279;

export async function getTreeCount(): Promise<number> {
  try {
    const res = await fetch(`${API_MAP}/treeCount`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return FALLBACK_TREE_COUNT;
    const data: { count?: number } = await res.json();
    return typeof data.count === "number" ? data.count : FALLBACK_TREE_COUNT;
  } catch {
    return FALLBACK_TREE_COUNT;
  }
}
