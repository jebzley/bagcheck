"use client";
import { Dispatch, ReactNode, createContext, useReducer } from "react";

interface Coin {
  id: string;
  selection: { value: string; label: string } | null;
  amount: string | null;
}

export enum Action {
  AddCoin = "ADD_COIN",
  RemoveCoin = "REMOVE_COIN",
  ChangeCoin = "CHANGE_COIN",
  ChangeAmount = "CHANGE_AMOUNT",
}

interface ChangeAmountAction {
  type: Action.ChangeAmount;
  payload: { amount: string | null; index: number };
}

interface AddCoinAction {
  type: Action.AddCoin;
}

interface ChangeCoinAction {
  type: Action.ChangeCoin;
  payload: {
    selection: Coin["selection"];
    index: number;
  };
}

interface RemoveCoinAction {
  type: Action.RemoveCoin;
  payload: {
    index: number;
  };
}

type TAction =
  | AddCoinAction
  | ChangeAmountAction
  | RemoveCoinAction
  | ChangeCoinAction;

const INITIAL_STATE: Coin[] = [{ id: "init", selection: null, amount: null }];

export const CoinContext = createContext<{
  state: Coin[];
  dispatch: Dispatch<TAction>;
}>({
  state: INITIAL_STATE,
  dispatch: () => null,
});

function handleAddCoin(state: Coin[]) {
  return [
    ...state,
    { id: `formitem${Math.random() * 100}`, selection: null, amount: null },
  ];
}

function handleUpdateAmount(
  state: Coin[],
  value: string | null,
  index: number
) {
  const checkedValue = !!Number(value) ? value : null;
  const updatedState = [...state];
  updatedState[index].amount = checkedValue;
  return updatedState;
}

function handleRemoveCoin(state: Coin[], index: number) {
  const updatedState = [...state];
  updatedState.splice(index, 1);
  return updatedState;
}

function handleChangeCoin(
  state: Coin[],
  selection: Coin["selection"],
  index: number
) {
  const updatedState = [...state];
  updatedState[index].selection = selection;
  return updatedState;
}
function reducer(state: Coin[], action: TAction) {
  switch (action.type) {
    case Action.AddCoin:
      return handleAddCoin(state);
    case Action.ChangeAmount:
      return handleUpdateAmount(
        state,
        action.payload.amount,
        action.payload.index
      );
    case Action.RemoveCoin:
      return handleRemoveCoin(state, action.payload.index);
    case Action.ChangeCoin:
      return handleChangeCoin(
        state,
        action.payload.selection,
        action.payload.index
      );
  }
}

export function CoinContextProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  return (
    <CoinContext.Provider value={{ state, dispatch }}>
      {children}
    </CoinContext.Provider>
  );
}
