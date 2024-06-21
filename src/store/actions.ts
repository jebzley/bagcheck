import type { Holding, HoldingsStore } from "@/store/types";
import { v4 as uuid } from "uuid";

export function handleAddHolding(state: HoldingsStore) {
  const updatedState = { ...state };
  updatedState.holdings = [
    ...updatedState.holdings,
    {
      id: uuid(),
      name: null,
      cgId: null,
      formSelection: null,
      amount: null,
      price: null,
      mcap: null,
    },
  ];
  return updatedState;
}

export function handleUpdateAmount(
  state: HoldingsStore,
  value: string | null,
  id: string
) {
  const checkedValue = Number(value) ? value : null;
  const i = state.holdings.findIndex((h) => h.id === id);
  if (i === -1) return { ...state };
  const updatedHoldings = [...state.holdings];
  updatedHoldings[i].amount = checkedValue;
  return { ...state, holdings: updatedHoldings };
}

export function handleRemoveHolding(state: HoldingsStore, id: string) {
  const updatedState = { ...state };
  updatedState.holdings = updatedState.holdings.filter((h) => h.id !== id);
  return updatedState;
}

export function handleSetAllHoldings(
  state: HoldingsStore,
  updatedHoldings: Holding[]
) {
  return { ...state, holdings: updatedHoldings };
}

export function handleUpdateHolding(
  state: HoldingsStore,
  id: string,
  selection: Holding["formSelection"],
  usd: number,
  mcap: number
) {
  const i = state.holdings.findIndex((h) => h.id === id);
  if (i === -1) return { ...state };
  const updatedHoldings = [...state.holdings];
  updatedHoldings[i] = {
    ...updatedHoldings[i],
    formSelection: selection,
    name: selection?.label ?? null,
    cgId: selection?.value ?? null,
    price: usd,
    mcap: mcap,
  };

  return { ...state, holdings: updatedHoldings };
}

export function handleSetHoldingsPrice(
  state: HoldingsStore,
  id: string,
  price: number,
  mcap: number
) {
  const i = state.holdings.findIndex((h) => h.id === id);
  if (i === -1) return { ...state };
  const updatedHoldings = [...state.holdings];
  updatedHoldings[i].price = price;
  updatedHoldings[i].mcap = mcap;
  return { ...state, holdings: updatedHoldings };
}
