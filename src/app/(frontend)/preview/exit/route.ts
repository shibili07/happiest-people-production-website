import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

/** Leaves preview mode and returns to the public site. */
export async function GET() {
  (await draftMode()).disable();
  redirect("/");
}
