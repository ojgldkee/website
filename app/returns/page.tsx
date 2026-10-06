import { PolicyLayout } from "@/components/policy-layout";
import { policies } from "@/data/policies";
export const metadata = { title: policies["returns"].title };
export default function Page() {
  return <PolicyLayout slug="returns" />;
}
