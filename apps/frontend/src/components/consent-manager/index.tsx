import { fetchInitialData } from "@c15t/nextjs";
import type { ReactNode } from "react";
import ConsentManagerProvider from "./provider";

/**
 * Server-side consent management wrapper with SSR data prefetching.
 * @see https://c15t.com/docs/frameworks/nextjs/quickstart
 */
export function ConsentManager({ children }: { children: ReactNode }) {
  const ssrData = fetchInitialData({
    backendURL: process.env.NEXT_PUBLIC_C15T_URL!,
  });

  return (
    <ConsentManagerProvider ssrData={ssrData}>
      {children}
    </ConsentManagerProvider>
  );
}
