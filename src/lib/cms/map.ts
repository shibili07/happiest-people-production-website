/**
 * Turns whatever an editor typed into a Google Maps embed URL.
 *
 * Accepts a place name or address ("Happiest People Productions, Kechery"),
 * a "lat,lng" pair, a full embed link, or the whole <iframe> snippet that
 * Google Maps gives under Share → Embed a map.
 */
export function buildMapEmbedUrl(input: string): string {
  const value = input.trim();

  const iframeSrc = value.match(/<iframe[^>]*\ssrc=["']([^"']+)["']/i)?.[1];
  const candidate = iframeSrc ?? value;

  if (/^https:\/\/www\.google\.[a-z.]+\/maps\/embed/i.test(candidate)) {
    return candidate;
  }

  return `https://www.google.com/maps?q=${encodeURIComponent(candidate)}&z=17&output=embed`;
}
