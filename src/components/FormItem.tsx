import { SearchCoinResponse } from "@/app/api/search/route";
import { DEFAULT_COMBOBOX_OPTIONS } from "@/constants/coins";
import { URL } from "@/constants/url";
import { CoinContext } from "@/context/CoinContext";
import { ActionKind, CoinState } from "@/context/types";
import { useContext } from "react";
import AsyncSelect from "react-select/async";

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
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}

export function FormItem({ id }: FormItemProps) {
  const { state, dispatch } = useContext(CoinContext);
  const item = state.coins.find((coin) => coin.id === id) as CoinState;

  return (
    <div className="relative flex gap-6 mb-4">
      <input
        style={{ appearance: "textfield" }}
        type="number"
        value={item.amount ? item.amount : ""}
        className="w-20 border rounded p-1 text-right"
        placeholder={"0"}
        required
        onChange={(e) =>
          dispatch({
            type: ActionKind.ChangeAmount,
            payload: { id, amount: e.target.value },
          })
        }
      />
      <AsyncSelect
        className="w-full"
        required
        value={item.formSelection}
        defaultOptions={DEFAULT_COMBOBOX_OPTIONS}
        loadOptions={(term) => handleSearch(term)}
        placeholder="HarryPotterObamaSonic10Inu"
        onChange={async (e) => {
          dispatch({
            type: ActionKind.ChangeCoin,
            payload: { id, selection: e },
          });
          const res = await fetchCoinPrice(e);
          if (res) {
            dispatch({
              type: ActionKind.SetPrice,
              payload: {
                id,
                price: res.usd,
              },
            });
          }
        }}
      />
      {state.coins.length > 1 && (
        <button
          aria-label="Delete item"
          type="button"
          className="absolute -right-6 h-full flex items-center"
          onClick={() =>
            dispatch({
              type: ActionKind.RemoveCoin,
              payload: { id: id },
            })
          }
        >
          ✕
        </button>
      )}
    </div>
  );
}
