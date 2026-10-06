import { CartPage } from "@/components/cart";
import { PageIntro } from "@/components/ui";
export const metadata = { title: "Cart" };
export default function Page() {
  return (
    <div className="container page-space">
      <PageIntro eyebrow="A CLOSER LOOK" title="Your selection." />
      <CartPage />
    </div>
  );
}
