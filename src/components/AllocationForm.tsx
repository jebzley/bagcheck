"use client";
import { useContext, useEffect, useState } from "react";

import { CoinContext } from "@/context/CoinContext";
import { ActionKind } from "@/context/types";

import { FormItem } from "./FormItem";

export default function AllocationForm() {
  const [piss, setPiss] = useState(0);
  useEffect(() => {
    setPiss(piss + 1);
  }, []);
  const { state, dispatch } = useContext(CoinContext);
  //TODO: SOMETHING!!!
  const totalAmt = state.coins
    .map((coin) => Number(coin.price ?? 0) * Number(coin.amount ?? 0))
    .reduce((a, b) => a + b);
  if (state.isLoading) {
    return <p>Loading</p>;
  }

  return (
    <form className="w-96 h-full">
      <p>{piss}</p>
      {state.coins.map((item) => {
        return <FormItem key={item.id} id={item.id} />;
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
