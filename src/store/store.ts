import { createStore } from "zustand/vanilla";
import {
  handleAddCoin,
  handleChangeCoin,
  handleRemoveCoin,
  handleSetAllCoins,
  handleSetCoinPrice,
  handleSetIsLoading,
  handleUpdateAmount,
} from "./actions";
import { CoinState, State, Store } from "./types";

export const INITIAL_STATE: State = {
  isLoading: true,
  coins: [{ id: "init", formSelection: null, amount: null }],
};

export const createCoinStore = (init: State = INITIAL_STATE) => {
  return createStore<Store>()((set) => ({
    ...init,
    addCoin: () => set((state) => handleAddCoin(state)),
    updateCoin: (id: string, selection: CoinState["formSelection"]) =>
      set((state) => handleChangeCoin(state, selection, id)),
    updateAmount: (id: string, value: string | null) =>
      set((state) => handleUpdateAmount(state, value, id)),
    removeCoin: (id: string) => set((state) => handleRemoveCoin(state, id)),
    setAllCoins: (coins: CoinState[]) =>
      set((state) => handleSetAllCoins(state, coins)),
    setPrice: (id: string, usd: number) =>
      set((state) => handleSetCoinPrice(state, id, usd)),
    setIsLoading: (isLoading: boolean) =>
      set((state) => handleSetIsLoading(state, isLoading)),
  }));
};
