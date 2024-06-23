import type { Holding } from "@/store/types";
import type { RiskLevel } from "@/types/risk";

export enum Exposure {
  Under,
  Over,
  InRange,
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
