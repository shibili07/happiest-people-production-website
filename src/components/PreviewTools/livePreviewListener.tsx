"use client";
import { RefreshRouteOnSave } from "@payloadcms/live-preview-react";
import { useRouter } from "next/navigation";

/**
 * Re-renders the page whenever the editor saves or autosaves in the admin.
 * Only mounted while draft mode is on (see the frontend layout).
 */
const LivePreviewListener = () => {
  const router = useRouter();

  return (
    <RefreshRouteOnSave
      refresh={() => router.refresh()}
      serverURL={process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000"}
    />
  );
};

export default LivePreviewListener;
