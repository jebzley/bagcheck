export interface CoinState {
  id: string;
  formSelection: { value: string; label: string } | null;
  amount: string | null;
}

export interface State {
  isLoading: boolean;
  coins: CoinState[];
}

export enum ActionKind {
  AddCoin = "ADD_COIN",
  SetAllCoins = "SET_ALL_COINS",
  RemoveCoin = "REMOVE_COIN",
  ChangeCoin = "CHANGE_COIN",
  ChangeAmount = "CHANGE_AMOUNT",
  SetIsLoading = "SET_IS_LOADING",
}

interface ChangeAmountAction {
  type: ActionKind.ChangeAmount;
  payload: { amount: string | null; id: string };
}

interface AddCoinAction {
  type: ActionKind.AddCoin;
}

interface ChangeCoinAction {
  type: ActionKind.ChangeCoin;
  payload: {
    selection: CoinState["formSelection"];
    id: string;
  };
}

interface RemoveCoinAction {
  type: ActionKind.RemoveCoin;
  payload: {
    id: string;
  };
}

interface SetAllCoinsAction {
  type: ActionKind.SetAllCoins;
  payload: {
    coins: CoinState[];
  };
}

interface SetIsLoadingAction {
  type: ActionKind.SetIsLoading;
  payload: {
    isLoading: boolean;
  };
}

export type StateAction =
  | AddCoinAction
  | ChangeAmountAction
  | RemoveCoinAction
  | ChangeCoinAction
  | SetAllCoinsAction
  | SetIsLoadingAction;
