import { SearchCoinResponse } from "@/app/api/search/route";
import { DEFAULT_COMBOBOX_OPTIONS } from "@/constants/coins";
import { URL } from "@/constants/url";
import { HoldingState, HoldingsStore } from "@/store/types";
import { useHoldingsStore } from "@/providers/store-provider";
import AsyncSelect from "react-select/async";
import { useShallow } from "zustand/react/shallow";

interface FormItemProps {
  holding: HoldingState;
}

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

async function fetchCoinPrice(e: HoldingState["formSelection"]) {
  try {
    const url = [
      URL.API.BASE_ROUTE,
      URL.API.COINS,
      `/${e?.value}`,
      URL.API.PRICE,
    ].join("");
    const response = await fetch(url);
    // TODO: this needs to be a type
    const result: { usd: number } = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}

const selectAmount = (state: HoldingsStore, holding: HoldingState) =>
  state.holdings.find((h) => h.id === holding.id)?.amount;

export function FormItem({ holding }: FormItemProps) {
  const amount = useHoldingsStore(
    useShallow((state) => selectAmount(state, holding))
  );
  const updateAmount = useHoldingsStore(
    useShallow((state) => state.actions.updateAmount)
  );
  const updateCoin = useHoldingsStore(
    useShallow((state) => state.actions.update)
  );
  const removeCoin = useHoldingsStore(
    useShallow((state) => state.actions.remove)
  );
  const setPrice = useHoldingsStore(
    useShallow((state) => state.actions.setPrice)
  );

  return (
    <div className="relative flex gap-6 mb-4">
      <input
        style={{ appearance: "textfield" }}
        type="number"
        className="w-20 border rounded p-1 text-right"
        placeholder={"0"}
        onChange={(e) => updateAmount(holding.id, e.target.value)}
        value={amount ?? ""}
        required
      />
      <AsyncSelect
        className="w-full"
        required
        defaultOptions={DEFAULT_COMBOBOX_OPTIONS}
        loadOptions={(term) => handleSearch(term)}
        value={holding.formSelection}
        onChange={async (v) => {
          updateCoin(holding.id, v);
          const price = await fetchCoinPrice(v);
          if (price) {
            setPrice(holding.id, price.usd);
          }
        }}
        placeholder="HarryPotterObamaSonic10Inu"
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
