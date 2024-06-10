"use client";
// some added complexity to using zustand with next.js
// https://docs.pmnd.rs/zustand/guides/nextjs

import { type ReactNode, createContext, useRef, useContext } from "react";
import { type StoreApi, useStore } from "zustand";

import { createCoinStore, INITIAL_STATE } from "@/store/store";

import type { Store } from "@/store/types";

export const StoreContext = createContext<StoreApi<Store> | null>(null);

export interface StoreProviderProps {
  children: ReactNode;
}

export const StoreProvider = ({ children }: StoreProviderProps) => {
  const storeRef = useRef<StoreApi<Store>>();
  if (!storeRef.current) {
    storeRef.current = createCoinStore(INITIAL_STATE);
  }

  return (
    <StoreContext.Provider value={storeRef.current}>
      {children}
    </StoreContext.Provider>
  );
};

export const useCoinStore = <T,>(selector: (store: Store) => T): T => {
  const storeContext = useContext(StoreContext);

  if (!storeContext) {
    throw new Error(`useCoinStore must be use within StoreProvider`);
  }

  return useStore(storeContext, selector);
};
