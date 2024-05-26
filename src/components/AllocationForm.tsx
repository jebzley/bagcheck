"use client";
import { useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { FormItem } from "./FormItem";

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
