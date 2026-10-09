import { ImageResponse } from "next/og";

// Preview image shown when a page is shared (LinkedIn, WhatsApp, X…).
// Used by every page that does not set its own image, e.g. blog posts do.
export const alt = "Tremap — Global Tree Database for everyone";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "linear-gradient(135deg, #1f3a2a 0%, #4d834f 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", fontSize: 44, fontWeight: 700, letterSpacing: -1 }}>
          <div style={{ width: 28, height: 28, borderRadius: 14, background: "#ec7332", marginRight: 18 }} />
          Tremap
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2 }}>
            The global tree map.
          </div>
          <div style={{ marginTop: 28, fontSize: 36, opacity: 0.85 }}>
            Global Tree Database for everyone
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 28, opacity: 0.7 }}>www.tremap.com</div>
      </div>
    ),
    size,
  );
}
