import { RiskArea } from "./types";

export function InfoPanel({ area }: { area: RiskArea }) {
  return (
    <div>
      <h2>{area.title}</h2>
      <p>This area takes up {area.percentage.toFixed(0)}% of your portfolio </p>
      <dl>
        {area.investments.map((investment) => {
          return (
            <div key={investment.id}>
              <dt>{investment.name}</dt>
              <dd>
                ${investment.value.toFixed(2)} -{" "}
                {investment.percentage.toFixed(0)}%
              </dd>
            </div>
          );
        })}
      </dl>
    </div>
  );
}
