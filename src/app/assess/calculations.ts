import { MARKET_CAP_BOUNDARIES } from "@/constants/classification";
import { Holding } from "@/store/types";

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

function calcPercentage(total: number, value: number) {
  return (value / total) * 100;
}

export function sortHoldings(holdings: Holding[]) {
  const total = calcTotal(holdings);
  const low = [],
    medium = [],
    high = [],
    gambling = [];

  for (const holding of holdings) {
    const value = calcHoldingValue(holding);
    const investment = {
      ...holding,
      value,
      percentage: calcPercentage(total, value),
    };

    if (!investment.mcap) continue;
    if (investment.mcap >= LARGE) low.push(investment);
    else if (investment.mcap >= MEDIUM) medium.push(investment);
    else if (investment.mcap >= SMALL) high.push(investment);
    else gambling.push(investment);
  }

  const lowTotal = calcTotal(low);
  const medTotal = calcTotal(medium);
  const highTotal = calcTotal(high);
  const gambTotal = calcTotal(gambling);

  return {
    total,
    low: {
      investments: low,
      total: lowTotal,
      percentage: calcPercentage(total, lowTotal),
    },
    medium: {
      investments: medium,
      total: medTotal,
      percentage: calcPercentage(total, medTotal),
    },
    high: {
      investments: high,
      total: highTotal,
      percentage: calcPercentage(total, highTotal),
    },
    gambling: {
      investments: gambling,
      total: gambTotal,
      percentage: calcPercentage(total, gambTotal),
    },
  };
}
