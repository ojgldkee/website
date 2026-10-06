import { home } from "@/data/home";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Package,
  FileText,
  Headphones,
  MoveUpRight,
} from "lucide-react";
import { store } from "@/data/store";
import { products, categories } from "@/data/products";
import { ProductGrid } from "@/components/products";
import { SectionHeading, FAQAccordion } from "@/components/ui";
import { faqs } from "@/data/faq";
export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="small-dot" /> {home.hero.eyebrow}
          </p>
          <h1>
            {home.hero.headline}
            <br />
            <em>{home.hero.emphasis}</em>
          </h1>
          <p className="hero-description">{home.hero.description}</p>
          <div className="hero-buttons">
            <Link className="button" href="/collections">
              {home.hero.primary} <ArrowRight size={18} />
            </Link>
            <Link className="text-link" href="/standards">
              {home.hero.secondary} <ArrowUpRight size={17} />
            </Link>
          </div>
          <div className="hero-bottom">
            <span>01 — THE COLLECTION</span>
            <span>RESEARCH, CONSIDERED.</span>
          </div>
        </div>
        <div className="hero-art">
          <Image
            src={store.images.hero}
            alt="Illustrative glass vessels on sculptural green and cream display blocks"
            fill
            priority
            sizes="(max-width: 800px) 100vw, 50vw"
          />
          <span className="hero-art-label">{home.hero.imageLabel}</span>
          <Link
            className="hero-art-link"
            href="/collections"
            aria-label="Discover the collection"
          >
            <MoveUpRight size={28} />
          </Link>
          <span className="art-footnote">
            Collection preview · illustrative packaging
          </span>
        </div>
      </section>
      <div className="trust-strip container">
        <div>
          <FileText size={21} />
          <span>
            Information, made clear<small>Explore product details</small>
          </span>
        </div>
        <div>
          <Package size={22} />
          <span>
            Every step, considered<small>Shipping & order information</small>
          </span>
        </div>
        <div>
          <Headphones size={21} />
          <span>
            A human connection<small>Questions are welcome</small>
          </span>
        </div>
      </div>
      <section className="section container">
        <SectionHeading
          eyebrow={home.featured.eyebrow}
          title={home.featured.title}
          description={home.featured.description}
          href="/collections"
        />
        <ProductGrid products={products.slice(0, 4)} />
        <p className="catalog-note">
          Preview collection — sample products and pricing.
        </p>
      </section>
      <section className="section collections-section">
        <div className="container">
          <SectionHeading
            eyebrow={home.collections.eyebrow}
            title={home.collections.title}
          />
          <div className="collection-grid">
            {categories.map((c, i) => (
              <Link
                className="collection-card"
                href={`/collections?category=${encodeURIComponent(c.name)}`}
                key={c.name}
              >
                <Image
                  src={c.image}
                  alt={`${c.name} illustrative still life`}
                  fill
                  sizes="(max-width: 650px) 100vw, 33vw"
                />
                <span className="collection-number">0{i + 1}</span>
                <div>
                  <p>{c.description}</p>
                  <h3>
                    {c.name}
                    <ArrowUpRight size={23} />
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="standards-section container section">
        <div className="standards-image">
          <Image
            src={store.images.standards}
            alt="Architectural laboratory glassware illustration in soft natural light"
            fill
            sizes="(max-width: 800px) 100vw, 50vw"
          />
          <span>THE DETAILS MAKE THE DIFFERENCE.</span>
        </div>
        <div className="standards-copy">
          <p className="eyebrow">{home.approach.eyebrow}</p>
          <h2>
            {home.approach.title}
            <br />
            <em>{home.approach.emphasis}</em>
          </h2>
          {home.approach.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <Link className="button outline" href="/standards">
            Discover our standards <ArrowUpRight size={18} />
          </Link>
          <div className="standards-caption">
            <span>01 / CLARITY</span>
            <span>02 / CARE</span>
            <span>03 / CURIOSITY</span>
          </div>
        </div>
      </section>
      <section className="values-section">
        <div className="container">
          <p className="eyebrow">THOUGHTFUL BY DESIGN</p>
          <h2>
            Less noise.
            <br />
            <em>More perspective.</em>
          </h2>
          <div className="values-grid">
            {home.values.map(([n, t, d]) => (
              <div key={n}>
                <span>{n}</span>
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section container home-faq">
        <div>
          <p className="eyebrow">A LITTLE MORE CLARITY</p>
          <h2>
            Good questions.
            <br />
            Straightforward answers.
          </h2>
          <p className="muted">Start here. We’ll help you find your way.</p>
          <Link className="text-link" href="/faq">
            Visit the FAQ <ArrowUpRight size={17} />
          </Link>
        </div>
        <FAQAccordion items={faqs.slice(0, 4)} />
      </section>
    </>
  );
}
