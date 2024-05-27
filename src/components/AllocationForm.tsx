"use client";
import { useContext } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";

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

  return (
    <form className="w-96 h-full">
      <TransitionGroup>
        {state.map((item, index) => {
          return (
            <CSSTransition key={item.id} classNames="form-item" timeout={200}>
              <FormItem
                key={item.id}
                value={item.formSelection}
                onSearch={handleSearch}
                amount={state[index].amount}
                onDelete={() =>
                  dispatch({
                    type: ActionKind.RemoveCoin,
                    payload: { index },
                  })
                }
                onUpdateCoin={(e) =>
                  dispatch({
                    type: ActionKind.ChangeCoin,
                    payload: { index, selection: e },
                  })
                }
                shouldEnableDelete={state.length > 1}
                onUpdateAmount={(value) =>
                  dispatch({
                    type: ActionKind.ChangeAmount,
                    payload: { amount: value, index },
                  })
                }
              />
            </CSSTransition>
          );
        })}
      </TransitionGroup>
      <div className="flex w-full justify-center relative">
        <button
          type="button"
          className="bg-slate-300 rounded p-1 w-24 absolute right-0"
          onClick={() => dispatch({ type: ActionKind.AddCoin })}
        >
          +
        </button>
      </div>
    </form>
  );
}
