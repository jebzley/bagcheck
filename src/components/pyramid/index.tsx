import type { RiskLevel } from "@/types/risk";

import { calculatePyramidStyles } from "./style-helpers";

type Props = {
  data: { value: number; title: string; type: RiskLevel }[];
  onHover: (level: RiskLevel | null) => void;
};

const bgColors = {
  low: "bg-violet-300",
  medium: "bg-amber-300",
  high: "bg-lime-300",
  gambling: "bg-yellow-200",
};

export function Pyramid({ data, onHover }: Props) {
  const styles = calculatePyramidStyles(data);

  return (
    <div className="group max-h-96 w-full aspect-square flex flex-col justify-center align-middle box-border">
      {data.map((entry, index) => {
        return (
          <div
            className={`${
              bgColors[entry.type]
            } transition-all hover:ml-4 active:ml-4 group-active:opacity-70 group-hover:opacity-70 hover:!opacity-100 active:!opacity-100`}
            key={entry.title}
            title={entry.title}
            style={{ ...styles[index] }}
            onMouseOver={() => onHover(entry.type)}
            onTouchStart={() => onHover(entry.type)}
            onTouchEnd={() => onHover(null)}
            onMouseLeave={() => onHover(null)}
          />
        );
      })}
    </div>
  );
}
