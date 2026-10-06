import { faqs } from "@/data/faq";
import { FAQAccordion, PageIntro } from "@/components/ui";
import Link from "next/link";
export const metadata = { title: "Frequently asked questions" };
export default function Page() {
  return (
    <div className="container page-space">
      <PageIntro eyebrow="HELP & INFORMATION" title="A little more clarity.">
        <p>From the first question to the finer details.</p>
      </PageIntro>
      <div className="faq-layout">
        <nav aria-label="FAQ categories">
          {faqs.map((f, i) => (
            <a key={f.category} href={`#faq-${i}`}>
              {f.category}
            </a>
          ))}
        </nav>
        <div>
          {faqs.map((f, i) => (
            <section className="faq-category" id={`faq-${i}`} key={f.category}>
              <p className="eyebrow">{f.category}</p>
              <FAQAccordion items={[f]} />
            </section>
          ))}
          <div className="callout">
            <h2>Still have a question?</h2>
            <Link className="button" href="/contact">
              Get in touch →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
