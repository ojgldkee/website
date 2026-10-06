import Image from "next/image";
import Link from "next/link";
import { store } from "@/data/store";
import { PageIntro } from "@/components/ui";
export const metadata = { title: "Our standards" };
export default function Page() {
  return (
    <div className="container page-space">
      <PageIntro eyebrow="OUR APPROACH" title="Clarity, in every detail.">
        <p>Better information creates a better starting point.</p>
      </PageIntro>
      <div className="editorial-grid">
        <div className="editorial-image">
          <Image
            src={store.images.standards}
            alt="Illustrative laboratory glassware in a sunlit setting"
            fill
            sizes="(max-width:800px) 100vw, 50vw"
          />
        </div>
        <div className="editorial-copy">
          <h2>
            Built around
            <br />
            <em>the right questions.</em>
          </h2>
          {[
            [
              "01",
              "Product identity",
              "Each final listing should clearly identify the product, its specifications, and intended use. Sample listings are labeled until those details are available.",
            ],
            [
              "02",
              "Supporting documentation",
              "Available reports and product resources will be linked to the relevant product. No testing, certification or purity claims are made by this preview.",
            ],
            [
              "03",
              "A clear next step",
              "Shipping details, contact information and order updates should be easy to find. Live services will be enabled once they are ready.",
            ],
          ].map(([n, t, d]) => (
            <div className="standard-item" key={n}>
              <span>{n}</span>
              <div>
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            </div>
          ))}
          <Link className="text-link" href="/documentation">
            Visit the documentation center ↗
          </Link>
        </div>
      </div>
    </div>
  );
}
