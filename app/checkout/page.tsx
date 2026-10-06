import { Checkout } from "@/components/checkout";
import { PageIntro } from "@/components/ui";
export const metadata = { title: "Checkout" };
export default function Page() {
  return (
    <div className="container page-space">
      <PageIntro eyebrow="CHECKOUT PREVIEW" title="The final details." />
      <Checkout />
    </div>
  );
}
