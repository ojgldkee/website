import { Tracking } from "@/components/tracking";
import { PageIntro } from "@/components/ui";
export const metadata = { title: "Track Order" };
export default function Page() {
  return (
    <div className="container page-space">
      <PageIntro eyebrow="ORDER TRACKING" title="Every step, in view." />
      <Tracking />
    </div>
  );
}
