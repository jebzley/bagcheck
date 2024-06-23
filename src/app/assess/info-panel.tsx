import type { Holding } from "@/store/types";

type HoldingInfo = {
  value: number;
  percentage: number;
} & Holding;

type RiskArea = {
  title: string;
  percentage: number;
  total: number;
  investments: HoldingInfo[];
};

export function InfoPanel({ area }: { area: RiskArea }) {
  return (
    <div>
      <h2>{area.title}</h2>
      <p>This area takes up {area.percentage.toFixed(0)}% of your portfolio </p>
      <dl>
        {area.investments.map((investment) => {
          return (
            <>
              <dt key={`dt${investment.id}`}>{investment.name}</dt>
              <dd key={`dd${investment.id}`}>${investment.value.toFixed(2)}</dd>
            </>
          );
        })}
      </dl>
    </div>
  );
}
