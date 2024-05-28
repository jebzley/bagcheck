"use client";

import { ActionKind, StateAction, CoinState, State } from "./types";

function handleAddCoin(state: State) {
  const updatedState = { ...state };
  updatedState.coins = [
    ...updatedState.coins,
    {
      id: `formitem${Math.random() * 100}`,
      formSelection: null,
      amount: null,
    },
  ];
  return updatedState;
}

function handleUpdateAmount(state: State, value: string | null, index: number) {
  const checkedValue = !!Number(value) ? value : null;
  const updatedState = { ...state };
  updatedState.coins[index].amount = checkedValue;
  return updatedState;
}

function handleRemoveCoin(state: State, index: number) {
  const updatedState = { ...state };
  updatedState.coins.splice(index, 1);
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
  index: number
) {
  const updatedState = { ...state };
  updatedState.coins[index].formSelection = selection;
  return updatedState;
}

function handleSetIsLoading(state: State, isLoading: boolean) {
  return { ...state, isLoading };
}

export function stateReducer(state: State, action: StateAction) {
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
      return handleSetAllCoins(state, action.payload.coins);
    case ActionKind.SetIsLoading:
      return handleSetIsLoading(state, action.payload.isLoading);
  }
}
