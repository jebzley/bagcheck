import { humanListJoin } from "@/helpers/string";
import { Exposure, HoldingsInfo, RiskArea } from "./types";

export function formatExposureMessages(holdingsInfo: HoldingsInfo) {
  const riskAreas = [
    holdingsInfo.low,
    holdingsInfo.medium,
    holdingsInfo.high,
    holdingsInfo.gambling,
  ];

  const over: RiskArea[] = [];
  const under: RiskArea[] = [];
  const messages = [];

  if (riskAreas.every((area) => area.exposure === Exposure.InRange))
    return ["You've been managing your risk!"];

  for (const item of riskAreas) {
    switch (item.exposure) {
      case Exposure.Over:
        over.push(item);
        break;
      case Exposure.Under:
        under.push(item);
        break;
      default:
        break;
    }
  }

  for (const item of over) {
    let suggestion = "";
    if (under.length) {
      suggestion = `Consider closing a trade and adding to your ${humanListJoin(
        under.map((c) => c.title)
      )} investments.`;
    } else {
      suggestion = `Consider closing a trade.`;
    }
    messages.push(
      <p key={suggestion}>
        {"You are "}
        <b>{"overexposed"}</b>
        {` to ${item.title} investments. ${suggestion}`}
      </p>
    );
  }

  return messages;
}
