import { unavailable } from "@/lib/services";
export async function POST() {
  return unavailable(
    "Newsletter signup is not open yet. Your email was not saved.",
  );
}
