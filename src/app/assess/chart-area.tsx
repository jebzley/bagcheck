"use client";
import { useHoldingsStore } from "@/providers/store-provider";

export function ChartArea() {
  const holdings = useHoldingsStore((state) => state.holdings);
  return (
    <ul>
      {holdings.map((holding) => {
        return <li key={holding.id}>{holding.formSelection?.label}</li>;
      })}
    </ul>
  );
}
