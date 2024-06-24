"use client";
// some added complexity to using zustand with next.js
// https://docs.pmnd.rs/zustand/guides/nextjs

import { type ReactNode, createContext, useRef, useContext } from "react";
import { type StoreApi, useStore } from "zustand";

import { createHoldingsStore } from "@/store/store";

import type { HoldingsStore } from "@/store/types";

export const StoreContext = createContext<StoreApi<HoldingsStore> | null>(null);

export interface StoreProviderProps {
  children: ReactNode;
}

export const StoreProvider = ({ children }: StoreProviderProps) => {
  const storeRef = useRef<StoreApi<HoldingsStore>>();
  if (!storeRef.current) {
    storeRef.current = createHoldingsStore();
  }

  return (
    <StoreContext.Provider value={storeRef.current}>
      {children}
    </StoreContext.Provider>
  );
};

export const useHoldingsStore = <T,>(
  selector: (store: HoldingsStore) => T
): T => {
  const storeContext = useContext(StoreContext);

  if (!storeContext) {
    throw new Error(`useHoldingsStore must be use within StoreProvider`);
  }

  return useStore(storeContext, selector);
};
