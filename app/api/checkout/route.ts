import { unavailable } from "@/lib/services";
export async function POST() {
  return unavailable(
    "Payments are not connected yet. No order was created and no payment was taken.",
  );
}
