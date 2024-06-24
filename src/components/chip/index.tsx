type Props = {
  text: string;
  color?: "green" | "red";
};

export function Chip({ text, color = "green" }: Props) {
  return (
    <span
      className={`px-2 py-1 w-fit border text-xs rounded-full ${
        color === "green"
          ? "border-green-700 text-green-700"
          : "border-red-700 text-red-700"
      }`}
    >
      {text}
    </span>
  );
}
