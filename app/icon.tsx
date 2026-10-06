import { ImageResponse } from "next/og";
import { store } from "@/data/store";
export const size = { width: 64, height: 64 };
export const contentType = "image/png";
export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        background: store.colors.forest,
        color: store.colors.cream,
        fontSize: 29,
        borderRadius: 12,
      }}
    >
      {store.monogram}
    </div>,
    size,
  );
}
