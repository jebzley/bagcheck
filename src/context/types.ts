export interface CoinState {
  id: string;
  formSelection: { value: string; label: string } | null;
  amount: string | null;
  price?: number;
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
  SetPrice = "SET_COIN_PRICE",
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

interface SetCoinPriceAction {
  type: ActionKind.SetPrice;
  payload: {
    id: string;
    price: number;
  };
}

export type StateAction =
  | AddCoinAction
  | ChangeAmountAction
  | RemoveCoinAction
  | ChangeCoinAction
  | SetAllCoinsAction
  | SetIsLoadingAction
  | SetCoinPriceAction;
