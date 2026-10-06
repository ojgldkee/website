import { PolicyLayout } from "@/components/policy-layout";
import { policies } from "@/data/policies";
export const metadata = { title: policies["disclaimer"].title };
export default function Page() {
  return <PolicyLayout slug="disclaimer" />;
}
