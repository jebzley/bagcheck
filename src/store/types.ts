export type CoinState = {
  id: string;
  formSelection: { value: string; label: string } | null;
  amount: string | null;
  price?: number;
};

export type State = {
  isLoading: boolean;
  coins: CoinState[];
};

export type StateAction = {
  addCoin: () => void;
  updateCoin: (id: string, selection: CoinState["formSelection"]) => void;
  updateAmount: (id: string, value: string | null) => void;
  removeCoin: (id: string) => void;
  setAllCoins: (coins: CoinState[]) => void;
  setPrice: (id: string, usd: number) => void;
  setIsLoading: (isLoading: boolean) => void;
};

export type Store = State & StateAction;
