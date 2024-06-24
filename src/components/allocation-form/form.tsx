"use client";
import { useState } from "react";
import AsyncSelect from "react-select/async";
import { v4 as uuid } from "uuid";
import { debounce } from "lodash";

import { DEFAULT_COMBOBOX_OPTIONS } from "@/constants/form";
import { URL } from "@/constants/url";
import { ROUTES } from "@/constants/routes";
import { Button } from "@/components/button";
import { ButtonLink } from "@/components/button-link";
import { Holding } from "@/store/types";
import { useHoldingsStore } from "@/providers/store-provider";
import type { SearchCoinResponse } from "@/app/api/search/route";

async function handleSearch(term?: string) {
  try {
    const route = [URL.API.BASE_ROUTE, URL.API.SEARCH, term ?? ""].join("");
    const response = await fetch(route);
    const result: SearchCoinResponse = await response.json();
    return result.coins.map((coin) => {
      return { value: coin.id, label: coin.name };
    });
  } catch (error) {
    throw new Error("Error searching coins");
    return [];
  }
}

async function fetchCoinPrice(cgId: string) {
  try {
    const url = [
      URL.API.BASE_ROUTE,
      URL.API.COINS,
      `/${cgId}`,
      URL.API.PRICE,
    ].join("");
    const response = await fetch(url);
    // TODO: this needs to be a type
    const result: { usd: number; mcap: number } = await response.json();
    return result;
  } catch (error) {
    throw new Error("Could not fetch coin price");
  }
}

export function AllocationForm() {
  const [currentHolding, setCurrentHolding] = useState<Holding | null>(null);
  const [amount, setAmount] = useState("");
  const add = useHoldingsStore((state) => state.actions.add);
  const setPrice = useHoldingsStore((state) => state.actions.setPrice);
  const holdings = useHoldingsStore((state) => state.holdings);

  const alreadyHeld = holdings.some((h) => h.cgId === currentHolding?.cgId);
  const isValid =
    currentHolding &&
    currentHolding.amount &&
    !alreadyHeld &&
    currentHolding.amount > 0;

  const onSubmit = async () => {
    const tmpHolding = { ...currentHolding };
    isValid && add(currentHolding);
    setCurrentHolding(null);
    setAmount("");
    const res = await fetchCoinPrice(tmpHolding.cgId ?? "");
    if (res && tmpHolding.id) {
      setPrice(tmpHolding.id, res.usd, res.mcap);
    }
  };

  return (
    <form className="flex flex-col gap-4" action={onSubmit}>
      <div className="flex gap-4 relative">
        <div className="w-20 flex flex-col gap-2">
          <label htmlFor="amount">Amount</label>
          <input
            name="amount"
            id="amount"
            style={{ appearance: "textfield" }}
            type="number"
            className="w-20"
            placeholder={"0"}
            value={amount ? amount : ""}
            onChange={(e) => {
              setAmount(e.target.value);
              if (Number(e.target.value) && currentHolding) {
                setCurrentHolding({
                  ...currentHolding,
                  amount: Number(e.target.value),
                });
              }
            }}
            required
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label htmlFor="combobox-holding">Investment</label>
          <AsyncSelect
            name="combobox-holding"
            id="combobox-holding"
            value={currentHolding ? currentHolding?.formSelection : null}
            classNames={{ control: () => "!border-gray-300 rounded" }}
            required
            defaultOptions={DEFAULT_COMBOBOX_OPTIONS}
            loadOptions={debounce(handleSearch, 100)}
            onChange={(v) =>
              setCurrentHolding({
                id: uuid(),
                formSelection: v,
                cgId: v!.value,
                name: v!.label,
                amount: amount ? Number(amount) : null,
                price: null,
                mcap: null,
              })
            }
            placeholder="Investment"
          />
        </div>
        <Button
          invisible
          className="absolute -right-6 bottom-2 hover:font-bold"
        >
          ···
        </Button>
      </div>
      <div className="flex gap-4 w-full flex-grow">
        <Button type="submit" disabled={!isValid}>
          Add Investment
        </Button>
        <ButtonLink href={ROUTES.ASSESS} disabled={holdings.length === 0}>
          Next
        </ButtonLink>
      </div>
    </form>
  );
}
