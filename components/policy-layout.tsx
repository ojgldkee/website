import Link from "next/link";
import { policies } from "@/data/policies";
import { PageIntro } from "./ui";
export function PolicyLayout({ slug }: { slug: string }) {
  const p = policies[slug];
  return (
    <div className="container page-space">
      <PageIntro eyebrow="STORE INFORMATION" title={p.title}>
        <p>{p.intro}</p>
      </PageIntro>
      <div className="policy-grid">
        <nav aria-label="Policy pages">
          {Object.entries(policies).map(([key, value]) => (
            <Link
              aria-current={key === slug ? "page" : undefined}
              key={key}
              href={`/${key}`}
            >
              {value.title}
            </Link>
          ))}
        </nav>
        <article className="policy-content">
          <div className="notice">
            <strong>Draft — legal review required before launch.</strong>
            <p>
              Business-specific details and final operating policies are not yet
              confirmed.
            </p>
          </div>
          {p.sections.map((s, i) => (
            <section key={s.title}>
              <p className="eyebrow">0{i + 1}</p>
              <h2>{s.title}</h2>
              <p>{s.body}</p>
            </section>
          ))}
          <Link className="text-link" href="/contact">
            Questions? Visit our contact page →
          </Link>
        </article>
      </div>
    </div>
  );
}
