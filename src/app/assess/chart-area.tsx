"use client";
import { useState } from "react";

import { useHoldingsStore } from "@/providers/store-provider";
import { Pyramid } from "@/components/pyramid";
import type { RiskLevel } from "@/types/risk";

import { sortHoldings } from "./calculations";
import { InfoPanel } from "./info-panel";

export function ChartArea() {
  const [hoveredItem, setHoveredItem] = useState<RiskLevel | null>(null);
  const holdings = useHoldingsStore((state) => state.holdings);

  const sortedHoldings = sortHoldings(holdings);
  const { total, gambling, high, medium, low } = sortedHoldings;

  const pyramidItems: { type: RiskLevel; title: string; value: number }[] = [
    { type: "gambling", title: "Gambling", value: gambling.total },
    { type: "high", title: "High risk", value: high.total },
    { type: "medium", title: "Medium Risk", value: medium.total },
    { type: "low", title: "Low risk", value: low.total },
  ];

  return (
    <div className="grid grid-cols-2 w-full h-full">
      <section className="p-16">
        <Pyramid data={pyramidItems} onHover={(type) => setHoveredItem(type)} />
      </section>
      <section>
        <p>{`Total: $${total.toLocaleString()}`}</p>
        {hoveredItem && <InfoPanel area={sortedHoldings[hoveredItem]} />}
      </section>
    </div>
  );
}
