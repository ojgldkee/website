import Link from "next/link";
import { LockKeyhole, ArrowUpRight } from "lucide-react";
import { store, footerGroups } from "@/data/store";
import { Brand } from "./header";
import { Newsletter } from "./newsletter";
export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div>
            <Brand />
            <h2>
              Better questions.
              <br />
              <em>New possibilities.</em>
            </h2>
            <p>{store.footer.about}</p>
          </div>
          <Newsletter />
        </div>
        <div className="footer-links">
          {footerGroups.map((g) => (
            <div key={g.title}>
              <h3>{g.title}</h3>
              {g.links.map(([label, href]) => (
                <Link key={label} href={href}>
                  {label}
                </Link>
              ))}
            </div>
          ))}
          <div className="footer-note">
            <span className="eyebrow">A considered approach</span>
            <p>
              Explore with curiosity.
              <br />
              Choose with clarity.
            </p>
            <Link className="text-link" href="/standards">
              Discover our approach <ArrowUpRight size={16} />
            </Link>
            {store.socialLinks.map((s) => (
              <a key={s.href} href={s.href} rel="noopener noreferrer">
                {s.label}
              </a>
            ))}
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} {store.name}
          </span>
          <span>{store.currency} · English</span>
          <span>
            <LockKeyhole size={13} />
            {store.footer.secureText}
          </span>
        </div>
        {store.demoMode && (
          <p className="preview-note">
            Store preview. Sample products and draft policies. Orders and
            payments are not yet available.
          </p>
        )}
      </div>
    </footer>
  );
}
