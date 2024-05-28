"use client";
import { useContext } from "react";

import { URL } from "@/constants/url";
import { CoinContext } from "@/context/CoinContext";
import { ActionKind, CoinState } from "@/context/types";
import { SearchCoinResponse } from "@/app/api/search/route";

import { FormItem } from "./FormItem";

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

export default function AllocationForm() {
  const { state, dispatch } = useContext(CoinContext);
  //TODO: this should be in state
  const totalAmt = state.coins
    .map((coin) => Number(coin.price ?? 0) * Number(coin.amount ?? 0))
    .reduce((a, b) => a + b);
  if (state.isLoading) {
    return <p>Loading</p>;
  }

  return (
    <form className="w-96 h-full">
      {state.coins.map((item) => {
        return (
          <FormItem
            key={item.id}
            value={item.formSelection}
            onSearch={handleSearch}
            amount={item.amount}
            onDelete={() =>
              dispatch({
                type: ActionKind.RemoveCoin,
                payload: { id: item.id },
              })
            }
            onUpdateCoin={async (e) => {
              dispatch({
                type: ActionKind.ChangeCoin,
                payload: { id: item.id, selection: e },
              });
              const res = await fetchCoinPrice(e);
              if (res) {
                dispatch({
                  type: ActionKind.SetPrice,
                  payload: {
                    id: item.id,
                    price: res.usd,
                  },
                });
              }
            }}
            shouldEnableDelete={state.coins.length > 1}
            onUpdateAmount={(value) =>
              dispatch({
                type: ActionKind.ChangeAmount,
                payload: { amount: value, id: item.id },
              })
            }
          />
        );
      })}
      <div className="flex flex-col gap-4 w-full justify-center relative">
        <button
          type="button"
          className="bg-slate-300 rounded p-1 w-full"
          onClick={() => dispatch({ type: ActionKind.AddCoin })}
        >
          Add another investment
        </button>
        <button type="submit" className="bg-slate-300 rounded p-1 w-full">
          I'm done!
        </button>
        <p className="text-3xl">Porty value: ${totalAmt.toLocaleString()}</p>
      </div>
    </form>
  );
}
