export type HoldingState = {
  id: string;
  formSelection: { value: string; label: string } | null;
  amount: string | null;
  price?: number;
  mcap?: number;
};

export type HoldingsActions = {
  add: () => void;
  update: (id: string, selection: HoldingState["formSelection"]) => void;
  remove: (id: string) => void;
  setAll: (coins: HoldingState[]) => void;
  updateAmount: (id: string, value: string | null) => void;
  setPrice: (id: string, usd: number) => void;
};

export type HoldingsStore = {
  holdings: HoldingState[];
  actions: HoldingsActions;
};
