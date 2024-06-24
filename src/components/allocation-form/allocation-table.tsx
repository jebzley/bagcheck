"use client";
import { useHoldingsStore } from "@/providers/store-provider";
import { Button } from "../button";

export function AllocationTable() {
  const holdings = useHoldingsStore((state) => state.holdings);
  const remove = useHoldingsStore((state) => state.actions.remove);

  return (
    <table>
      <thead>
        <tr>
          <th>Amount</th>
          <th>Investment</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {holdings.map((holding) => {
          return (
            <tr key={holding.id} className="animate-[appear_250ms]">
              <td>{holding.amount}</td>
              <td>{holding.name}</td>
              <td>
                <Button destructive onClick={() => remove(holding.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
