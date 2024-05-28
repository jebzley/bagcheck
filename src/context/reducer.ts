"use client";

import { ActionKind, StateAction, CoinState, State } from "./types";

function handleAddCoin(state: State) {
  const updatedState = { ...state };
  updatedState.coins = [
    ...updatedState.coins,
    {
      //TODO: this is a yucky way to generate ids
      id: `formitem${Math.random() * 100}`,
      formSelection: null,
      amount: null,
    },
  ];
  return updatedState;
}

function handleUpdateAmount(state: State, value: string | null, id: string) {
  const checkedValue = !!Number(value) ? value : null;
  const coinIndex = state.coins.findIndex((coin) => coin.id === id);
  if (coinIndex === -1) return { ...state };
  const updatedCoins = [...state.coins];
  updatedCoins[coinIndex].amount = checkedValue;
  return { ...state, coins: updatedCoins };
}

function handleRemoveCoin(state: State, id: string) {
  const updatedState = { ...state };
  updatedState.coins = updatedState.coins.filter((coin) => coin.id !== id);
  return updatedState;
}

function handleSetAllCoins(state: State, updatedCoins: CoinState[]) {
  const updatedState = { ...state };
  updatedState.coins = updatedCoins;
  return updatedState;
}

function handleChangeCoin(
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

function handleSetIsLoading(state: State, isLoading: boolean) {
  return { ...state, isLoading };
}

function handleSetCoinPrice(state: State, id: string, price: number) {
  const coinIndex = state.coins.findIndex((coin) => coin.id === id);
  if (coinIndex === -1) return { ...state };
  const updatedCoins = [...state.coins];
  updatedCoins[coinIndex].price = price;
  return { ...state, coins: updatedCoins };
}

export function stateReducer(state: State, action: StateAction) {
  switch (action.type) {
    case ActionKind.AddCoin:
      return handleAddCoin(state);
    case ActionKind.ChangeAmount:
      return handleUpdateAmount(
        state,
        action.payload.amount,
        action.payload.id
      );
    case ActionKind.RemoveCoin:
      return handleRemoveCoin(state, action.payload.id);
    case ActionKind.ChangeCoin:
      return handleChangeCoin(
        state,
        action.payload.selection,
        action.payload.id
      );
    case ActionKind.SetAllCoins:
      return handleSetAllCoins(state, action.payload.coins);
    case ActionKind.SetIsLoading:
      return handleSetIsLoading(state, action.payload.isLoading);
    case ActionKind.SetPrice:
      return handleSetCoinPrice(state, action.payload.id, action.payload.price);
  }
}
