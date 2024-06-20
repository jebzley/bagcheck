import { CoinState, State } from "@/store/types";
import { v4 as uuid } from "uuid";

export function handleAddCoin(state: State) {
  const updatedState = { ...state };
  updatedState.coins = [
    ...updatedState.coins,
    {
      id: uuid(),
      formSelection: null,
      amount: null,
    },
  ];
  return updatedState;
}

export function handleUpdateAmount(
  state: State,
  value: string | null,
  id: string
) {
  const checkedValue = !!Number(value) ? value : null;
  const coinIndex = state.coins.findIndex((coin) => coin.id === id);
  if (coinIndex === -1) return { ...state };
  const updatedCoins = [...state.coins];
  updatedCoins[coinIndex].amount = checkedValue;
  return { ...state, coins: updatedCoins };
}

export function handleRemoveCoin(state: State, id: string) {
  const updatedState = { ...state };
  updatedState.coins = updatedState.coins.filter((coin) => coin.id !== id);
  return updatedState;
}

export function handleSetAllCoins(state: State, updatedCoins: CoinState[]) {
  const updatedState = { ...state };
  updatedState.coins = updatedCoins;
  return updatedState;
}

export function handleChangeCoin(
  state: State,
  selection: CoinState["formSelection"],
  id: string
) {
  const coinIndex = state.coins.findIndex((coin) => coin.id === id);
  if (coinIndex === -1) return { ...state };
  const updatedCoins = [...state.coins];
  updatedCoins[coinIndex] = {
    ...updatedCoins[coinIndex],
    formSelection: selection,
  };

  return { ...state, coins: updatedCoins };
}

export function handleSetIsLoading(state: State, isLoading: boolean) {
  return { ...state, isLoading };
}

export function handleSetCoinPrice(state: State, id: string, price: number) {
  const coinIndex = state.coins.findIndex((coin) => coin.id === id);
  if (coinIndex === -1) return { ...state };
  const updatedCoins = [...state.coins];
  updatedCoins[coinIndex].price = price;
  return { ...state, coins: updatedCoins };
}
