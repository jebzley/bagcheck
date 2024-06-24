import { RiskArea } from "./types";

type Props = {
  area: RiskArea | null;
};

export function InfoPanel({ area }: Props) {
  const sortedInvestments = area
    ? area.investments.sort((a, b) => b.percentage - a.percentage)
    : [];
  return (
    <article className="h-56 w-full overflow-scroll border p-4 rounded">
      {area ? (
        <>
          <h2>{area.title}</h2>
          <p>
            <b>{area.exposure.toUpperCase()}</b>
          </p>
          <p>
            This area takes up {area.percentage.toFixed(0)}% of your portfolio{" "}
          </p>
          <dl>
            {sortedInvestments.map((investment) => {
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
        </>
      ) : (
        <p>Hover over a section of the pyramid chart to learn more</p>
      )}
    </article>
  );
}
