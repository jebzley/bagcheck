"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface IProps {
  text: string;
  href: string;
}
export function NavigationLink({ text, href }: IProps) {
  const pathname = usePathname();
  const isCurrentRoute = pathname === href;

  return (
    <Link
      className={`group/navlink relative flex flex-col ${
        isCurrentRoute ? "text-black" : "text-gray-500"
      } hover:text-black transition-all`}
      href={href}
    >
      {text}
      <span
        className={`h-full transition-all border-b border-gray-500 ${
          isCurrentRoute ? "border-black w-full" : "border-gray-500 w-0"
        } group-hover/navlink:w-full group-hover/navlink:border-black`}
      ></span>
    </Link>
  );
}
