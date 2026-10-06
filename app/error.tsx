"use client";
export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="container empty-state page-space">
      <h1>Something interrupted the view.</h1>
      <p>Please try again in a moment.</p>
      <button className="button" onClick={reset}>
        Try again
      </button>
    </div>
  );
}
