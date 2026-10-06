import { unavailable } from "@/lib/services";
export async function POST() {
  return unavailable("Payment webhooks are not configured.");
}
