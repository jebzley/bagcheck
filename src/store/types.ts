export type Holding = {
  id: string;
  formSelection: { value: string; label: string } | null;
  cgId: string | null;
  name: string | null;
  amount: number | null;
  price: number | null;
  mcap: number | null;
};

export type HoldingsActions = {
  add: (holding: Holding) => void;
  update: (
    id: string,
    selection: Holding["formSelection"],
    usd: number,
    mcap: number
  ) => void;
  remove: (id: string) => void;
  setAll: (coins: Holding[]) => void;
  updateAmount: (id: string, value: string | null) => void;
  setPrice: (id: string, usd: number, mcap: number) => void;
};

export type HoldingsStore = {
  holdings: Holding[];
  actions: HoldingsActions;
};
