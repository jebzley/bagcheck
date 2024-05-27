"use client";
import {
  Dispatch,
  ReactNode,
  createContext,
  useEffect,
  useReducer,
} from "react";
import { CoinState, ActionKind, StateAction } from "./types";
import { stateReducer } from "./reducer";

const INITIAL_STATE: CoinState[] = [
  { id: "init", formSelection: null, amount: null },
];

export const CoinContext = createContext<{
  state: CoinState[];
  dispatch: Dispatch<StateAction>;
}>({
  state: INITIAL_STATE,
  dispatch: () => null,
});

export function CoinContextProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(stateReducer, INITIAL_STATE);

  useEffect(() => {
    const coins = localStorage.getItem("holdings");
    if (coins) {
      dispatch({
        type: ActionKind.SetAllCoins,
        payload: { coins: JSON.parse(coins) },
      });
    }
  }, []);

  useEffect(() => {
    if (state != INITIAL_STATE) {
      localStorage.setItem("holdings", JSON.stringify(state));
    }
  }, [state]);

  return (
    <CoinContext.Provider value={{ state, dispatch }}>
      {children}
    </CoinContext.Provider>
  );
}
