"use client";
import { useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";

interface FormItemProps {
  amount: string | null;
  onDelete: () => void;
  onUpdateAmount: (amount: string | null) => void;
  shouldEnableDelete: boolean;
}
function FormItem({
  amount,
  onDelete,
  onUpdateAmount,
  shouldEnableDelete,
}: FormItemProps) {
  return (
    <div className="relative flex gap-6 mb-4">
      <input
        style={{ appearance: "textfield" }}
        type="number"
        value={amount ? amount : ""}
        className="w-20 border rounded p-1 text-right"
        placeholder={"0"}
        required
        onChange={(e) => onUpdateAmount(e.target.value)}
      />
      <input
        className="w-full border rounded p-1"
        placeholder="HarryPotterObamaSonic10Inu"
      />
      {shouldEnableDelete && (
        <button
          aria-label="Delete item"
          type="button"
          className="absolute -right-6 h-full flex items-center"
          onClick={onDelete}
        >
          ✕
        </button>
      )}
    </div>
  );
}

export default function AllocationForm() {
  const INITIAL_STATE = [{ id: "initial", name: "", amount: null }];
  const [items, setItems] =
    useState<{ id: string; name: string; amount: string | null }[]>(
      INITIAL_STATE
    );

  function handleDelete(index: number) {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(() => newItems);
  }

  function handleUpdateAmount(index: number, value: string | null) {
    const numValue = !!Number(value) ? value : null;
    const newItems = [...items];
    newItems[index].amount = numValue;
    setItems(newItems);
  }

  return (
    <form className="w-96 h-full">
      <TransitionGroup>
        {items.map((item, index) => {
          return (
            <CSSTransition key={item.id} classNames="form-item" timeout={200}>
              <FormItem
                key={item.id}
                amount={items[index].amount}
                onDelete={() => handleDelete(index)}
                shouldEnableDelete={items.length > 1}
                onUpdateAmount={(value) => handleUpdateAmount(index, value)}
              />
            </CSSTransition>
          );
        })}
      </TransitionGroup>
      <div className="flex w-full justify-center relative">
        <button type="submit" className="bg-slate-300 rounded p-1 w-24">
          Done
        </button>
        <button
          type="button"
          className="bg-slate-300 rounded p-1 w-24 absolute right-0"
          onClick={(e) => {
            setItems([
              ...items,
              { id: `formitem${Math.random() * 100}`, name: "", amount: null },
            ]);
          }}
        >
          +
        </button>
      </div>
    </form>
  );
}
