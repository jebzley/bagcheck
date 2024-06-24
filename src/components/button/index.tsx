import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

type Props = {
  invisible?: boolean;
  destructive?: boolean;
  className?: string;
} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export function Button({
  invisible = false,
  destructive = false,
  className = "",
  ...props
}: Props) {
  return (
    <button
      className={
        invisible
          ? `${className}`
          : `rounded border transition-colors ${
              destructive && "!border-red-600 text-red-600"
            } border-black w-full p-1 ${className} disabled:border-gray-300 disabled:text-gray-300 disabled:cursor-not-allowed`
      }
      {...props}
    />
  );
}
