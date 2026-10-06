import Link from "next/link";
export default function NotFound() {
  return (
    <div className="container empty-state page-space">
      <p className="eyebrow">404 — A DIFFERENT DIRECTION</p>
      <h1>This page is still undiscovered.</h1>
      <p>Let’s take you somewhere familiar.</p>
      <Link className="button" href="/collections">
        Explore the collection →
      </Link>
    </div>
  );
}
