"use client";
import { useState } from "react";

import { useHoldingsStore } from "@/providers/store-provider";
import { Pyramid } from "@/components/pyramid";
import type { RiskLevel } from "@/types/risk";
import { Delayed } from "@/components/effects/delayed";

import { createHoldingsInfo } from "./sorting";
import { formatExposureMessages } from "./formatting";
import { InfoPanel } from "./info-panel";
import { HoldingsInfo } from "./types";

export function ChartArea() {
  const [hoveredItem, setHoveredItem] = useState<RiskLevel | null>(null);
  const holdings = useHoldingsStore((state) => state.holdings);

  const holdingsInfo: HoldingsInfo = createHoldingsInfo(holdings);
  const { total, gambling, high, medium, low } = holdingsInfo;
  const messages = formatExposureMessages(holdingsInfo);
  const pyramidItems: { type: RiskLevel; title: string; value: number }[] = [
    { type: "gambling", title: "Gambling", value: gambling.total },
    { type: "high", title: "High risk", value: high.total },
    { type: "medium", title: "Medium Risk", value: medium.total },
    { type: "low", title: "Low risk", value: low.total },
  ];

  return (
    <div className="grid grid-cols-2 w-full h-full">
      <section className="p-16 animate-[appear_250ms]">
        <Pyramid data={pyramidItems} onHover={(type) => setHoveredItem(type)} />
      </section>
      <section className="flex flex-col justify-between">
        <div className="flex flex-col gap-8">
          <p>{`Total: $${total.toFixed(2)}`}</p>
          {messages?.map((message, i) => (
            <Delayed key={message.toString()} delayMs={i * 450}>
              {message}
            </Delayed>
          ))}
        </div>

        <InfoPanel area={hoveredItem ? holdingsInfo[hoveredItem] : null} />
      </section>
    </div>
  );
}
