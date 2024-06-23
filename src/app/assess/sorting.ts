import {
  MARKET_CAP_BOUNDARIES,
  SUGGESTED_RANGES,
} from "@/constants/classification";
import { percent } from "@/helpers/math";
import type { Holding } from "@/store/types";
import type { RiskLevel } from "@/types/risk";

import { Exposure, HoldingInfo } from "./types";

const { LARGE, MEDIUM, SMALL } = MARKET_CAP_BOUNDARIES;
function calcHoldingValue(holding: Holding) {
  if (holding.amount && holding.price) {
    return holding.amount * holding.price;
  }
  return 0;
}

function calcTotal(holdings: Holding[]) {
  let total = 0;
  for (const holding of holdings) {
    total += calcHoldingValue(holding);
  }
  return total;
}

function getExposureLevel(type: RiskLevel, percentage: number): Exposure {
  const range = SUGGESTED_RANGES[type];
  if (percentage > range.upper) {
    return Exposure.Over;
  } else if (percentage < range.lower) {
    return Exposure.Under;
  } else return Exposure.InRange;
}

function sortHoldings(holdings: Holding[], total: number) {
  const low: HoldingInfo[] = [],
    medium: HoldingInfo[] = [],
    high: HoldingInfo[] = [],
    gambling: HoldingInfo[] = [];

  for (const holding of holdings) {
    const value = calcHoldingValue(holding);
    const investment = {
      ...holding,
      value,
      percentage: percent(total, value),
    };

    // some tokens have no mcap information on cg
    // as this uses mcap to approximate risk there
    // is nothing we can do with that
    if (!investment.mcap) continue;
    else if (investment.mcap >= LARGE) low.push(investment);
    else if (investment.mcap >= MEDIUM) medium.push(investment);
    else if (investment.mcap >= SMALL) high.push(investment);
    else gambling.push(investment);
  }

  return { low, medium, high, gambling };
}

export function createHoldingsInfo(holdings: Holding[]) {
  const total = calcTotal(holdings);
  const { low, medium, high, gambling } = sortHoldings(holdings, total);

  const lowTotal = calcTotal(low);
  const medTotal = calcTotal(medium);
  const highTotal = calcTotal(high);
  const gambTotal = calcTotal(gambling);
  const lowPercent = percent(total, lowTotal);
  const medPercent = percent(total, medTotal);
  const highPercent = percent(total, highTotal);
  const gambPercent = percent(total, gambTotal);

  return {
    total,
    low: {
      type: "low" as RiskLevel,
      title: "Low Risk",
      investments: low,
      total: lowTotal,
      percentage: lowPercent,
      exposure: getExposureLevel("low", lowPercent),
    },
    medium: {
      type: "medium" as RiskLevel,
      title: "Medium Risk",
      investments: medium,
      total: medTotal,
      percentage: medPercent,
      exposure: getExposureLevel("medium", medPercent),
    },
    high: {
      type: "high" as RiskLevel,
      title: "High Risk",
      investments: high,
      total: highTotal,
      percentage: highPercent,
      exposure: getExposureLevel("medium", highPercent),
    },
    gambling: {
      type: "gambling" as RiskLevel,
      title: "Gambling",
      investments: gambling,
      total: gambTotal,
      percentage: gambPercent,
      exposure: getExposureLevel("gambling", gambPercent),
    },
  };
}
