import React from "react";

/** Small pill shown only in preview mode so editors know drafts are visible. */
const PreviewBanner = () => (
  <div
    role="status"
    className="fixed bottom-4 left-4 z-[3000] flex items-center gap-3 rounded-full border border-white/15 bg-black/85 px-4 py-2 text-xs text-white shadow-lg backdrop-blur"
  >
    <span className="size-2 rounded-full bg-primary" aria-hidden="true" />
    <span>Preview mode: showing unpublished changes</span>
    {/* A plain link: this route is a redirect, not a page navigation. */}
    {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
    <a href="/preview/exit" className="underline underline-offset-2">
      Exit
    </a>
  </div>
);

export default PreviewBanner;
