function calculatePolygon(topBase: number, bottomBase: number): string {
  const topBaseOffset = (100 - topBase) / 2;
  const bottomBaseOffset = (100 - bottomBase) / 2;

  const topRule =
    topBaseOffset === 0
      ? "50% 0"
      : `${topBaseOffset}% 0%, ${100 - topBaseOffset}% 0%`;

  const bottomRule = `${
    100 - bottomBaseOffset
  }% 100%, ${bottomBaseOffset}% 100%`;

  return `polygon(${topRule}, ${bottomRule})`;
}

function calculateStyles(data: { value: number; title: string }[]) {
  const total = data.reduce((acc, entry) => acc + entry.value, 0);
  let acc = 0,
    prevSize = 0;

  const styles = data.map((item) => {
    acc += item.value;
    const ratio = acc / total;
    const size = Math.sqrt(ratio);
    const height = (size - prevSize) * 100;
    const path = calculatePolygon(prevSize * 100, size * 100);

    prevSize = size;

    return {
      clipPath: path,
      height: `${height}%`,
      width: "100%",
    };
  });

  return styles;
}

type Props = {
  data: { value: number; title: string }[];
};

export function Pyramid({ data }: Props) {
  const styles = calculateStyles(data);

  return (
    <div className="w-full h-full flex flex-col justify-center align-middle box-border">
      {data.map((entry, index) => {
        return (
          <div
            className="bg-red-500 odd:bg-orange-300 transition-all hover:ml-4 "
            key={entry.title}
            title={entry.title}
            style={{ ...styles[index] }}
          />
        );
      })}
    </div>
  );
}
