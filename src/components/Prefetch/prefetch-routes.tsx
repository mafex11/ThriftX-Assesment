"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";

type PrefetchRoutesProps = {
  routes?: string[];
  delayMs?: number;
};

export default function PrefetchRoutes({
  routes = ["/about", "/work", "/blog", "/contact", "/login", "/signup"],
  delayMs = 500,
}: PrefetchRoutesProps) {
  const router = useRouter();
  useEffect(() => {
    const doPrefetch = () => {
      routes.forEach((r) => {
        try { router.prefetch(r); } catch {}
      });
    };

    // Prefer idle time, fallback to timeout
    // @ts-ignore
    const ric: ((cb: () => void) => number) | undefined = typeof window !== "undefined" ? window.requestIdleCallback : undefined;
    let idleId: number | null = null;
    const timeoutId = window.setTimeout(() => doPrefetch(), delayMs);
    if (ric) {
      idleId = ric(() => {
        window.clearTimeout(timeoutId);
        doPrefetch();
      }) as unknown as number;
    }
    return () => {
      window.clearTimeout(timeoutId);
      // @ts-ignore
      if (idleId && typeof window !== "undefined" && window.cancelIdleCallback) {
        // @ts-ignore
        window.cancelIdleCallback(idleId);
      }
    };
  }, [routes, delayMs, router]);

  return null;
}


