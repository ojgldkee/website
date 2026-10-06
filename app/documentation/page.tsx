import Link from "next/link";
import { FileText, ArrowUpRight } from "lucide-react";
import { products } from "@/data/products";
import { PageIntro } from "@/components/ui";
export const metadata = { title: "Quality & documentation" };
export default function Page() {
  return (
    <div className="container page-space">
      <PageIntro eyebrow="THE FINER DETAILS" title="Information within reach.">
        <p>Product documentation, organized in one place.</p>
      </PageIntro>
      <div className="notice">
        Documents are not yet available. Sample listings do not represent
        certified or tested products.
      </div>
      <div className="documentation-list">
        {products.map((p) => (
          <div key={p.id}>
            <FileText size={25} />
            <div>
              <h2>{p.name}</h2>
              <p>{p.category}</p>
            </div>
            <span className="badge">Pending</span>
            <Link href={`/products/${p.slug}`} aria-label={`View ${p.name}`}>
              <ArrowUpRight size={23} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
