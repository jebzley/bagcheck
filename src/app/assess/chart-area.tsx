"use client";
import { useState } from "react";

import { useHoldingsStore } from "@/providers/store-provider";
import { Pyramid } from "@/components/pyramid";
import type { RiskLevel } from "@/types/risk";
import { Delayed } from "@/components/effects/delayed";

import { createHoldingsInfo } from "./sorting";
import { formatExposureMessages } from "./formatting";
import { HoldingsInfo } from "./types";
import { InfoPanel } from "./info-panel";

export function ChartArea() {
  const [hoveredItem, setHoveredItem] = useState<RiskLevel | null>(null);
  const holdings = useHoldingsStore((state) => state.holdings);

  const holdingsInfo: HoldingsInfo = createHoldingsInfo(holdings);
  const { gambling, high, medium, low } = holdingsInfo;
  const messages = formatExposureMessages(holdingsInfo);
  const pyramidItems: { type: RiskLevel; title: string; value: number }[] = [
    { type: "gambling", title: "Gambling", value: gambling.total },
    { type: "high", title: "High risk", value: high.total },
    { type: "medium", title: "Medium Risk", value: medium.total },
    { type: "low", title: "Low risk", value: low.total },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
      <div className="w-full p-16 lg:p-32 flex flex-col flex-grow">
        <Pyramid
          data={pyramidItems}
          onHover={(level) => setHoveredItem(level ? level : null)}
        />
      </div>
      <div className="w-full flex flex-col gap-8">
        <InfoPanel area={hoveredItem ? holdingsInfo[hoveredItem] : null} />
        {messages?.map((message, i) => (
          <Delayed key={message.toString()} delayMs={i * 450}>
            {message}
          </Delayed>
        ))}
      </div>
    </div>
  );
}
