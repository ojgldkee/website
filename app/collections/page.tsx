import { Suspense } from "react";
import { Catalog } from "@/components/catalog";
import { PageIntro } from "@/components/ui";
export const metadata = {
  title: "The collection",
  description:
    "Explore our sample collection by category, price, and product details.",
};
export default function Page() {
  return (
    <div className="container page-space">
      <PageIntro eyebrow="THE COLLECTION" title="Find your focus.">
        <p>
          Research essentials, thoughtfully presented.
          <br />
          Explore the details. Discover your next starting point.
        </p>
      </PageIntro>
      <Suspense fallback={<p role="status">Loading collection…</p>}>
        <Catalog />
      </Suspense>
    </div>
  );
}
