"use client";
import { useCallback, useEffect, useRef, useState } from "react";

const EDGE_TOLERANCE = 4;

/**
 * Drives a native, scroll-snapping horizontal track with prev/next arrows.
 * `cardSelector` must match the slides inside the track so one click moves
 * exactly one card (plus the track gap).
 */
const useScrollSlider = (cardSelector: string) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const updateEdges = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > EDGE_TOLERANCE);
    setCanNext(
      el.scrollLeft + el.clientWidth < el.scrollWidth - EDGE_TOLERANCE
    );
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    updateEdges();
    el.addEventListener("scroll", updateEdges, { passive: true });
    const observer = new ResizeObserver(updateEdges);
    observer.observe(el);

    return () => {
      el.removeEventListener("scroll", updateEdges);
      observer.disconnect();
    };
  }, [updateEdges]);

  const scrollByCard = useCallback(
    (direction: 1 | -1) => {
      const el = trackRef.current;
      if (!el) return;
      const card = el.querySelector<HTMLElement>(cardSelector);
      const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
      const step = (card?.offsetWidth ?? el.clientWidth) + gap;
      el.scrollBy({ left: direction * step, behavior: "smooth" });
    },
    [cardSelector]
  );

  return { trackRef, canPrev, canNext, scrollByCard };
};

export default useScrollSlider;
