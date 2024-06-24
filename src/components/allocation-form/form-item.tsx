import AsyncSelect from "react-select/async";
import { useShallow } from "zustand/react/shallow";
import { DEFAULT_COMBOBOX_OPTIONS } from "@/constants/form";
import { URL } from "@/constants/url";
import { useHoldingsStore } from "@/providers/store-provider";
import type { SearchCoinResponse } from "@/app/api/search/route";
import type { Holding, HoldingsStore } from "@/store/types";

type Props = {
  holding: Holding;
};

async function handleSearch(term?: string) {
  try {
    const route = [URL.API.BASE_ROUTE, URL.API.SEARCH, term ?? ""].join("");
    const response = await fetch(route);
    const result: SearchCoinResponse = await response.json();
    return result.coins.map((coin) => {
      return { value: coin.id, label: coin.name };
    });
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function fetchCoinPrice(e: Holding["formSelection"]) {
  try {
    const url = [
      URL.API.BASE_ROUTE,
      URL.API.COINS,
      `/${e?.value}`,
      URL.API.PRICE,
    ].join("");
    const response = await fetch(url);
    // TODO: this needs to be a type
    const result: { usd: number; mcap: number } = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}

const selectHolding = (state: HoldingsStore, holding: Holding) =>
  state.holdings.find((h) => h.id === holding.id);

export function FormItem({ holding }: Props) {
  const amount = useHoldingsStore(
    useShallow((state) => selectHolding(state, holding)?.amount)
  );
  const updateAmount = useHoldingsStore(
    useShallow((state) => state.actions.updateAmount)
  );
  const updateCoin = useHoldingsStore((state) => state.actions.update);
  const removeCoin = useHoldingsStore((state) => state.actions.remove);
  const setPrice = useHoldingsStore((state) => state.actions.setPrice);

  return (
    <div className="relative flex gap-6 mb-4">
      <input
        id={`amt-${holding.id}`}
        name={`amt-${holding.id}`}
        style={{ appearance: "textfield" }}
        type="number"
        className="w-20 border border-gray-300 rounded p-1 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500"
        placeholder={"0"}
        onChange={(e) => updateAmount(holding.id, e.target.value)}
        value={amount ?? ""}
        required
      />
      <AsyncSelect
        id={`val-${holding.id}`}
        name={`val-${holding.id}`}
        className="w-full"
        classNames={{ control: () => "!border-gray-300 rounded" }}
        required
        defaultOptions={DEFAULT_COMBOBOX_OPTIONS}
        loadOptions={(term) => handleSearch(term)}
        value={holding.formSelection}
        onChange={async (v) => {
          const res = await fetchCoinPrice(v);
          if (res) {
            setPrice(holding.id, res.usd, res.mcap);
            updateCoin(holding.id, v, res.usd, res.mcap);
          }
        }}
        placeholder="Investment"
      />
      <button
        aria-label="Delete item"
        type="button"
        className="absolute -right-6 h-full flex items-center"
        onClick={() => removeCoin(holding.id)}
      >
        ✕
      </button>
    </div>
  );
}
