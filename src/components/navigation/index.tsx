"use client";
import { ROUTES } from "@/constants/routes";
import { NavigationLink } from "./navigation-link";
import { useHoldingsStore } from "@/providers/store-provider";

export default function Navigation() {
  const holdings = useHoldingsStore((state) => state.holdings);
  const hasHoldings = holdings.length > 0;
  return (
    <nav className="w-full p-4">
      <ul className="flex gap-4 justify-center">
        <li>
          <NavigationLink href={ROUTES.HOME} text="> allocate" />
        </li>
        <li>
          {hasHoldings ? (
            <NavigationLink href={"ROUTES.ASSESS"} text="> assess" />
          ) : (
            <p
              aria-label="Disabled link: assess"
              className="text-gray-400 cursor-not-allowed"
            >
              {"> assess"}
            </p>
          )}
        </li>
      </ul>
    </nav>
  );
}
