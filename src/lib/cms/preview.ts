import { draftMode } from "next/headers";

/** True when an editor opened the page through the admin's Live Preview. */
export const isPreview = async (): Promise<boolean> => {
  try {
    return (await draftMode()).isEnabled;
  } catch {
    // Outside of a request (e.g. scripts) there is no draft mode.
    return false;
  }
};
