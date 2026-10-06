import Link from "next/link";
import { ArrowUpRight, Plus } from "lucide-react";
import { faqs } from "@/data/faq";
export function SectionHeading({
  eyebrow,
  title,
  description,
  href,
  linkText = "Explore all products",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  href?: string;
  linkText?: string;
}) {
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        {description && <p className="muted">{description}</p>}
      </div>
      {href && (
        <Link className="text-link" href={href}>
          {linkText}
          <ArrowUpRight size={17} />
        </Link>
      )}
    </div>
  );
}
export function FAQAccordion({ items = faqs }: { items?: typeof faqs }) {
  return (
    <div className="accordions">
      {items.map((f) => (
        <details key={f.question}>
          <summary>
            {f.question}
            <Plus size={18} />
          </summary>
          <p>{f.answer}</p>
        </details>
      ))}
    </div>
  );
}
export function PageIntro({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="page-intro">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      {children && <div className="intro-copy">{children}</div>}
    </div>
  );
}
