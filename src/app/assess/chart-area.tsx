"use client";
import { useHoldingsStore } from "@/providers/store-provider";
import { sortHoldings } from "./calculations";
import { Pyramid } from "@/components/pyramid";

export function ChartArea() {
  const holdings = useHoldingsStore((state) => state.holdings);

  const { total, low, medium, high, gambling } = sortHoldings(holdings);

  const pyramidItems = [
    { title: "Low risk", value: low.total },
    { title: "Medium Risk", value: medium.total },
    { title: "High risk", value: high.total },
    { title: "Dogshit", value: gambling.total },
  ].reverse();
  console.log(holdings);
  console.log(low);
  console.log(medium);
  return (
    <>
      <p>{`Total: ${total}`}</p>
      <p>thank you for using my app</p>
      <div className="h-96 w-96">
        <Pyramid data={pyramidItems} />
      </div>
    </>
  );
}
