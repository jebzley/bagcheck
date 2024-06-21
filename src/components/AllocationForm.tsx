"use client";
import { useShallow } from "zustand/react/shallow";
import { FormItem } from "./FormItem";
import { useHoldingsStore } from "@/providers/store-provider";

export default function AllocationForm() {
  const holdings = useHoldingsStore(useShallow((state) => state.holdings));
  const addHolding = useHoldingsStore(useShallow((state) => state.actions.add));
  return (
    <form className="w-96 h-full">
      {holdings.map((holding) => {
        return <FormItem key={holding.id} holding={holding} />;
      })}
      <div className="flex flex-col gap-4 w-full justify-center relative">
        <button
          type="button"
          className="bg-slate-300 rounded p-1 w-full"
          onClick={addHolding}
        >
          Add another investment
        </button>
        <button type="submit" className="bg-slate-300 rounded p-1 w-full">
          I'm done!
        </button>
        <p className="text-3xl">Porty value: ${0}</p>
      </div>
    </form>
  );
}
