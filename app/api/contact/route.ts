import { unavailable } from "@/lib/services";
export async function POST() {
  return unavailable(
    "Support is not connected yet. Your message was not submitted.",
  );
}
