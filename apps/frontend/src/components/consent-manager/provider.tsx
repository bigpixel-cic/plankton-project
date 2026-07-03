"use client";

import {
  ConsentDialog,
  ConsentManagerProvider,
  ConsentBanner,
} from "@c15t/nextjs";
import type { ConsentManagerProps } from "@c15t/nextjs";
import { DevTools } from "@c15t/dev-tools/react";
import { theme } from "./theme";
/**
 * Client-side consent manager provider.
 * @see https://c15t.com/docs/frameworks/nextjs/quickstart
 */
export default function ConsentManagerClient({
  children,
  ssrData,
}: ConsentManagerProps) {
  const C15TURL = process.env.NEXT_PUBLIC_C15T_URL!;

  if (!C15TURL) {
    throw new Error("NEXT_PUBLIC_C15T_URL is not set");
  }

  return (
    <ConsentManagerProvider
      options={{
        mode: "hosted",
        backendURL: C15TURL,
        ssrData,
        theme,
        ...(process.env.NODE_ENV === "development" && {
          overrides: { country: "GB" },
        }),
        // Add your scripts here:
        // import { googleTagManager } from '@c15t/scripts/google-tag-manager';
        // scripts: [
        //   googleTagManager({ id: 'GTM-XXXXXX' }),
        // ],
      }}
    >
      {children}
      <ConsentBanner />
      <ConsentDialog />
      <DevTools disabled={process.env.NODE_ENV === "production"} />
    </ConsentManagerProvider>
  );
}
