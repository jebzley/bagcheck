import { createStore } from "zustand/vanilla";
import {
  handleAddHolding,
  handleRemoveHolding,
  handleSetAllHoldings,
  handleSetHoldingsPrice,
  handleUpdateAmount,
  handleUpdateHolding,
} from "./actions";
import type { Holding, HoldingsStore } from "./types";

export const createHoldingsStore = () => {
  return createStore<HoldingsStore>()((set) => ({
    holdings: [],
    actions: {
      add: (holding: Holding) =>
        set((state) => handleAddHolding(state, holding)),
      update: (
        id: string,
        selection: Holding["formSelection"],
        usd: number,
        mcap: number
      ) => set((state) => handleUpdateHolding(state, id, selection, usd, mcap)),
      updateAmount: (id: string, value: string | null) =>
        set((state) => handleUpdateAmount(state, value, id)),
      remove: (id: string) => set((state) => handleRemoveHolding(state, id)),
      setAll: (coins: Holding[]) =>
        set((state) => handleSetAllHoldings(state, coins)),
      setPrice: (id: string, usd: number, mcap: number) =>
        set((state) => handleSetHoldingsPrice(state, id, usd, mcap)),
    },
  }));
};
