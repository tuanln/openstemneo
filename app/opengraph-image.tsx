import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt =
  "OpenStemNeo — Đi lại con đường của nhà khoa học theo cách của mình";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background:
            "linear-gradient(135deg, #f8fafc 0%, #e0e7ff 50%, #fef3c7 100%)",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top: logo + brand */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div
            style={{
              width: "72px",
              height: "72px",
              borderRadius: "16px",
              background: "#5b5bd6",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "40px",
            }}
          >
            🔬
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "42px",
              fontWeight: 800,
              color: "#1e1b4b",
              letterSpacing: "-0.02em",
            }}
          >
            OpenStemNeo
          </div>
        </div>

        {/* Middle: tagline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              fontSize: "64px",
              fontWeight: 800,
              color: "#0f172a",
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              maxWidth: "1000px",
              gap: "0 18px",
            }}
          >
            <span>Đi lại con đường của nhà khoa học</span>
            <span style={{ color: "#5b5bd6" }}>theo cách của mình</span>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "30px",
              color: "#475569",
              lineHeight: 1.4,
              maxWidth: "900px",
            }}
          >
            Nền tảng học K12 tiếng Việt theo mô hình phenomenon-based. Việt hóa từ OpenSciEd.
          </div>
        </div>

        {/* Bottom: phenomenon icons + OER badge */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <div style={{ display: "flex", gap: "24px", fontSize: "64px" }}>
            <span>💡</span>
            <span>🌧️</span>
            <span>🧲</span>
            <span>🌋</span>
            <span>🦴</span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "12px 24px",
              borderRadius: "999px",
              background: "rgba(91, 91, 214, 0.1)",
              fontSize: "22px",
              fontWeight: 600,
              color: "#5b5bd6",
            }}
          >
            <span>Mở · Miễn phí · OER</span>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
