"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => undefined;

export function useHydrated() {
  return useSyncExternalStore(subscribe, () => true, () => false);
}

export function useReducedMotionPreference() {
  return useSyncExternalStore(
    (callback) => {
      const media = window.matchMedia("(prefers-reduced-motion: reduce)");
      media.addEventListener("change", callback);
      return () => media.removeEventListener("change", callback);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
}
