import { SearchCoinResponse } from "@/app/api/search/route";
import { DEFAULT_COMBOBOX_OPTIONS } from "@/constants/coins";
import { URL } from "@/constants/url";
import { CoinState } from "@/store/types";
import { useCoinStore } from "@/providers/store-provider";
import AsyncSelect from "react-select/async";
import { useShallow } from "zustand/react/shallow";

interface FormItemProps {
  id: string;
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

async function fetchCoinPrice(e: CoinState["formSelection"]) {
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

export function FormItem({ id }: FormItemProps) {
  const coin = useCoinStore(
    useShallow((state) => state.coins.find((c) => c.id === id)?.formSelection)
  );

  const amount = useCoinStore(
    useShallow((state) => state.coins.find((c) => c.id === id)?.amount)
  );
  const updateAmount = useCoinStore(useShallow((state) => state.updateAmount));
  const updateCoin = useCoinStore(useShallow((state) => state.updateCoin));
  const removeCoin = useCoinStore(useShallow((state) => state.removeCoin));
  const setPrice = useCoinStore(useShallow((state) => state.setPrice));

  return (
    <div className="relative flex gap-6 mb-4">
      <input
        style={{ appearance: "textfield" }}
        type="number"
        className="w-20 border rounded p-1 text-right"
        placeholder={"0"}
        value={amount ? amount : "0"}
        onChange={(e) => updateAmount(id, e.target.value)}
        required
      />
      <AsyncSelect
        className="w-full"
        required
        defaultOptions={DEFAULT_COMBOBOX_OPTIONS}
        loadOptions={(term) => handleSearch(term)}
        value={coin}
        onChange={async (v) => {
          updateCoin(id, v);
          const price = await fetchCoinPrice(
            coin as CoinState["formSelection"]
          );
          if (price) {
            setPrice(id, price.usd);
          }
        }}
        placeholder="HarryPotterObamaSonic10Inu"
      />

      <button
        aria-label="Delete item"
        type="button"
        className="absolute -right-6 h-full flex items-center"
        onClick={() => removeCoin(id)}
      >
        ✕
      </button>
    </div>
  );
}
