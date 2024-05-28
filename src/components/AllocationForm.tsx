"use client";
import { useContext } from "react";

import { URL } from "@/constants/url";
import { CoinContext } from "@/context/CoinContext";
import { ActionKind } from "@/context/types";
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

export default function AllocationForm() {
  const { state, dispatch } = useContext(CoinContext);

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
            onUpdateCoin={(e) =>
              dispatch({
                type: ActionKind.ChangeCoin,
                payload: { id: item.id, selection: e },
              })
            }
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
      <div className="flex w-full justify-center relative">
        <button
          type="button"
          className="bg-slate-300 rounded p-1 w-full absolute right-0"
          onClick={() => dispatch({ type: ActionKind.AddCoin })}
        >
          Add another investment
        </button>
      </div>
    </form>
  );
}
