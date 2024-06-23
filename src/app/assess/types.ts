import type { Holding } from "@/store/types";
import type { RiskLevel } from "@/types/risk";

export enum Exposure {
  Under = "underexposed",
  Over = "overexposed",
  InRange = "in range",
}

export type HoldingInfo = {
  value: number;
  percentage: number;
} & Holding;

export type RiskArea = {
  type: RiskLevel;
  title: string;
  percentage: number;
  total: number;
  investments: HoldingInfo[];
  exposure: Exposure;
};

export type HoldingsInfo = {
  total: number;

  high: RiskArea;
  medium: RiskArea;
  low: RiskArea;
  gambling: RiskArea;
};
