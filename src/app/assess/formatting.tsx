import { humanListJoin } from "@/helpers/string";
import { Exposure, HoldingsInfo, RiskArea } from "./types";
import { SUGGESTED_RANGES } from "@/constants/classification";

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
    return [<p key="lgtm">LGTM!</p>];

  for (const item of riskAreas) {
    if (!item.investments.length) {
      messages.push(
        <p className="animate-[appear_250ms]">
          You have <b>no exposure</b> to {item.title.toLowerCase()} investments.
          <br />
          Consider getting exposure to investments in this risk profile.
        </p>
      );
    }
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
        under.map((c) => c.title.toLowerCase())
      )} investments.`;
    } else {
      suggestion = `Consider closing a trade.`;
    }
    messages.push(
      <p key={suggestion} className="animate-[appear_250ms]">
        {"You are "}
        <b>{"overexposed"}</b>
        {` to ${item.title.toLowerCase()} investments. ${suggestion}`}
        <br />
        It is suggested that {item.title.toLowerCase()} investments should take
        up{" "}
        <b>
          {SUGGESTED_RANGES[item.type].lower}% to{" "}
          {SUGGESTED_RANGES[item.type].upper}%
        </b>{" "}
        of your portfolio.
      </p>
    );
  }

  return messages;
}
