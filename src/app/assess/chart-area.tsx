"use client";
import { useHoldingsStore } from "@/providers/store-provider";
import { calcHoldings } from "./calculations";

export function ChartArea() {
  const holdings = useHoldingsStore((state) => state.holdings);

  const { total } = calcHoldings(holdings);
  return (
    <>
      <p>{`Total: ${total}`}</p>
      <p>thank you for using my app</p>
    </>
  );
}
