import Image from "next/image";
import Link from "next/link";
import { store } from "@/data/store";
import { PageIntro } from "@/components/ui";
export const metadata = { title: "About us" };
export default function Page() {
  return (
    <div className="container page-space">
      <PageIntro
        eyebrow="OUR PERSPECTIVE"
        title="Curiosity is a good beginning."
      >
        <p>
          We’re creating a more thoughtful way to explore research essentials.
        </p>
      </PageIntro>
      <div className="editorial-grid">
        <div className="editorial-image">
          <Image
            src={store.images.about}
            alt="Illustrative glassware study"
            fill
            sizes="(max-width:800px) 100vw, 50vw"
          />
        </div>
        <div className="editorial-copy">
          <p className="eyebrow">INTRODUCING {store.name}</p>
          <h2>
            Space to think.
            <br />
            <em>Details to explore.</em>
          </h2>
          <p>
            Our starting point is simple: a store should make it easier to
            understand what you’re looking at. Clear product pages. Accessible
            information. An experience that respects your attention.
          </p>
          <p>
            This is our first chapter. Our collection, company details, and
            supporting documentation are being prepared for launch.
          </p>
          <Link className="button outline" href="/standards">
            Explore our approach →
          </Link>
        </div>
      </div>
    </div>
  );
}
