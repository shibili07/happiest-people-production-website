import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { getPayload } from "payload";
import config from "@payload-config";

/**
 * Entry point for the admin's Live Preview. Only signed-in editors can turn on
 * draft mode, which makes the site render unpublished (autosaved) content.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const path = searchParams.get("path") ?? "/";

  // Only allow internal paths, never an open redirect.
  if (!path.startsWith("/") || path.startsWith("//")) {
    return new Response("Invalid preview path", { status: 400 });
  }

  const payload = await getPayload({ config });
  const { user } = await payload.auth({ headers: request.headers });

  if (!user) {
    return new Response("Sign in to the admin panel to use preview.", {
      status: 403,
    });
  }

  (await draftMode()).enable();
  redirect(path);
}
