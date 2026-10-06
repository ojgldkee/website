import { ImageResponse } from "next/og";
import { store } from "@/data/store";
export const alt = "Research, considered";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "85px",
        background: store.colors.forest,
        color: store.colors.cream,
      }}
    >
      <div style={{ fontSize: 25, letterSpacing: 3, marginBottom: 65 }}>
        {store.name}
      </div>
      <div style={{ fontSize: 94, lineHeight: 1.05 }}>Research,</div>
      <div style={{ fontSize: 94, lineHeight: 1.05, color: store.colors.sage }}>
        considered.
      </div>
      <div style={{ fontSize: 18, marginTop: 50 }}>
        A new perspective on research essentials.
      </div>
    </div>,
    size,
  );
}
