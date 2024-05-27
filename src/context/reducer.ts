"use client";

import { ActionKind, StateAction, CoinState } from "./types";

function handleAddCoin(state: CoinState[]) {
  const updatedState = [
    ...state,
    { id: `formitem${Math.random() * 100}`, formSelection: null, amount: null },
  ];
  return updatedState;
}

function handleUpdateAmount(
  state: CoinState[],
  value: string | null,
  index: number
) {
  const checkedValue = !!Number(value) ? value : null;
  const updatedState = [...state];
  updatedState[index].amount = checkedValue;
  return updatedState;
}

function handleRemoveCoin(state: CoinState[], index: number) {
  const updatedState = [...state];
  updatedState.splice(index, 1);
  return updatedState;
}

function handleSetAllCoins(coins: CoinState[]) {
  return coins;
}

function handleChangeCoin(
  state: CoinState[],
  selection: CoinState["formSelection"],
  index: number
) {
  const updatedState = [...state];
  updatedState[index].formSelection = selection;
  return updatedState;
}

export function stateReducer(state: CoinState[], action: StateAction) {
  switch (action.type) {
    case ActionKind.AddCoin:
      return handleAddCoin(state);
    case ActionKind.ChangeAmount:
      return handleUpdateAmount(
        state,
        action.payload.amount,
        action.payload.index
      );
    case ActionKind.RemoveCoin:
      return handleRemoveCoin(state, action.payload.index);
    case ActionKind.ChangeCoin:
      return handleChangeCoin(
        state,
        action.payload.selection,
        action.payload.index
      );
    case ActionKind.SetAllCoins:
      return handleSetAllCoins(action.payload.coins);
  }
}
