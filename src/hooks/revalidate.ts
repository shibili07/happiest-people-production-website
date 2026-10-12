import { revalidatePath } from "next/cache";
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
} from "payload";

/**
 * Pages are statically cached and re-generated on demand. Whenever an editor
 * saves or deletes content we invalidate the whole site so the change shows
 * up immediately. Outside of a Next.js request (e.g. the seed script) there is
 * no cache to invalidate, so the call is skipped.
 */
export const revalidateSite = () => {
  try {
    revalidatePath("/", "layout");
  } catch {
    /* not running inside Next.js */
  }
};

export const revalidateAfterChange: CollectionAfterChangeHook &
  GlobalAfterChangeHook = ({ doc }) => {
  revalidateSite();
  return doc;
};

export const revalidateAfterDelete: CollectionAfterDeleteHook = ({ doc }) => {
  revalidateSite();
  return doc;
};
