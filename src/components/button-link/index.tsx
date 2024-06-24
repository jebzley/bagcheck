import Link, { LinkProps } from "next/link";

type Props = {
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
} & LinkProps;
export function ButtonLink({
  children,
  disabled = false,
  className = "",
  ...props
}: Props) {
  return (
    <div className={`w-full ${disabled && "cursor-not-allowed"}`}>
      <Link
        {...props}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : 1}
        className={`flex justify-center align-middle rounded border transition-colors border-black w-full p-1 ${
          disabled && "border-gray-300 text-gray-300 pointer-events-none"
        } ${className}`}
      >
        {children}
      </Link>
    </div>
  );
}
