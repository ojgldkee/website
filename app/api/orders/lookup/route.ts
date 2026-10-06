import { unavailable } from "@/lib/services";
export async function POST() {
  return unavailable(
    "Live order lookup is not connected yet. Use the example order to preview tracking.",
  );
}
