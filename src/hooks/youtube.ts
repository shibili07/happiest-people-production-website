import type { FieldHook } from "payload";

const YOUTUBE_ID = /^[\w-]{11}$/;

/**
 * Editors can paste a plain video ID or any YouTube URL
 * (watch, share, embed or shorts links); we store just the ID.
 */
export const normalizeYoutubeId: FieldHook = ({ value }) => {
  if (typeof value !== "string") return value;
  const input = value.trim();
  if (!input || YOUTUBE_ID.test(input)) return input;

  try {
    const url = new URL(input);
    const fromQuery = url.searchParams.get("v");
    if (fromQuery && YOUTUBE_ID.test(fromQuery)) return fromQuery;

    const last = url.pathname.split("/").filter(Boolean).pop();
    if (last && YOUTUBE_ID.test(last)) return last;
  } catch {
    /* not a URL, fall through */
  }
  return input;
};
