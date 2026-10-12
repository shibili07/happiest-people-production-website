// Runs in the browser before React hydrates.
//
// Some browser extensions (e.g. ColorZilla) stamp an attribute onto <body>
// while the page loads. React then reports "A tree hydrated but some
// attributes of the server rendered HTML didn't match" in development. The
// Payload admin renders its own <body>, so the usual suppressHydrationWarning
// can't be set there; removing the attribute up front avoids the mismatch.
const EXTENSION_ATTRIBUTES = ["cz-shortcut-listen"];

const strip = () => {
  for (const name of EXTENSION_ATTRIBUTES) {
    document.body?.removeAttribute(name);
  }
};

if (typeof document !== "undefined") {
  strip();
  new MutationObserver(strip).observe(document.documentElement, {
    attributes: true,
    attributeFilter: EXTENSION_ATTRIBUTES,
    subtree: true,
  });
}

// Marks the file as an ES module; package.json has "type": "module".
export {};
