"use client";
import {
  Dispatch,
  ReactNode,
  createContext,
  useEffect,
  useReducer,
} from "react";
import { ActionKind, StateAction, State } from "./types";
import { stateReducer } from "./reducer";

const INITIAL_STATE: State = {
  isLoading: true,
  coins: [{ id: "init", formSelection: null, amount: null }],
};

export const CoinContext = createContext<{
  state: State;
  dispatch: Dispatch<StateAction>;
}>({
  state: INITIAL_STATE,
  dispatch: () => null,
});

export function CoinContextProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(stateReducer, INITIAL_STATE);

  useEffect(() => {
    dispatch({ type: ActionKind.SetIsLoading, payload: { isLoading: true } });
    const storedState = localStorage.getItem("holdings");
    if (storedState) {
      const storedCoins = (JSON.parse(storedState) as State).coins;
      dispatch({
        type: ActionKind.SetAllCoins,
        payload: { coins: storedCoins },
      });
    }
    dispatch({ type: ActionKind.SetIsLoading, payload: { isLoading: false } });
  }, []);

  useEffect(() => {
    if (state != INITIAL_STATE) {
      localStorage.setItem("holdings", JSON.stringify(state));
    }
  }, [state.coins]);

  return (
    <CoinContext.Provider value={{ state, dispatch }}>
      {children}
    </CoinContext.Provider>
  );
}
