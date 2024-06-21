"use client";
import { useShallow } from "zustand/react/shallow";
import { FormItem } from "@/components/FormItem";
import { useHoldingsStore } from "@/providers/store-provider";
import { useRouter } from "next/navigation";

export function AllocationForm() {
  const router = useRouter();
  const holdings = useHoldingsStore(useShallow((state) => state.holdings));
  const addHolding = useHoldingsStore(useShallow((state) => state.actions.add));

  const onSubmit = () => router.push("/assess");

  return (
    <form className="w-96 h-full" action={"/assess"}>
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
        <button
          type="submit"
          className="bg-slate-300 rounded p-1 w-full"
          onSubmit={onSubmit}
        >
          {"I'm done!"}
        </button>
      </div>
    </form>
  );
}
