"use client";
import { useShallow } from "zustand/react/shallow";
import { FormItem } from "./FormItem";
import { useCoinStore } from "@/providers/store-provider";

export default function AllocationForm() {
  const ids = useCoinStore(useShallow((state) => state.coins.map((e) => e.id)));
  const addCoin = useCoinStore(useShallow((state) => state.addCoin));
  return (
    <form className="w-96 h-full">
      {ids.map((id) => {
        return <FormItem key={id} id={id} />;
      })}
      <div className="flex flex-col gap-4 w-full justify-center relative">
        <button
          type="button"
          className="bg-slate-300 rounded p-1 w-full"
          onClick={addCoin}
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
