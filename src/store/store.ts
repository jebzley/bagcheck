import { createStore } from "zustand/vanilla";
import {
  handleAddHolding,
  handleRemoveHolding,
  handleSetAllHoldings,
  handleSetHoldingsPrice,
  handleUpdateAmount,
  handleUpdateHolding,
} from "./actions";
import type { HoldingState, HoldingsStore } from "./types";

export const INITIAL_STATE: HoldingState[] = [
  { id: "init", formSelection: null, amount: null },
];

export const createHoldingsStore = (init: HoldingState[] = INITIAL_STATE) => {
  return createStore<HoldingsStore>()((set) => ({
    holdings: init,
    actions: {
      add: () => set((state) => handleAddHolding(state)),
      update: (id: string, selection: HoldingState["formSelection"]) =>
        set((state) => handleUpdateHolding(state, selection, id)),
      updateAmount: (id: string, value: string | null) =>
        set((state) => handleUpdateAmount(state, value, id)),
      remove: (id: string) => set((state) => handleRemoveHolding(state, id)),
      setAll: (coins: HoldingState[]) =>
        set((state) => handleSetAllHoldings(state, coins)),
      setPrice: (id: string, usd: number, mcap: number) =>
        set((state) => handleSetHoldingsPrice(state, id, usd, mcap)),
    },
  }));
};
