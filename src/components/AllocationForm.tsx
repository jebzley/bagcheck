"use client";
import { useContext } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { FormItem } from "./FormItem";
import { Action, CoinContext } from "./CoinContext";

export default function AllocationForm() {
  const { state, dispatch } = useContext(CoinContext);

  return (
    <form className="w-96 h-full">
      <TransitionGroup>
        {state.map((item, index) => {
          return (
            <CSSTransition key={item.id} classNames="form-item" timeout={200}>
              <FormItem
                key={item.id}
                amount={state[index].amount}
                onDelete={() =>
                  dispatch({
                    type: Action.RemoveCoin,
                    payload: { index },
                  })
                }
                onUpdateCoin={() => console.log("changed a coin")}
                shouldEnableDelete={state.length > 1}
                onUpdateAmount={(value) =>
                  dispatch({
                    type: Action.ChangeAmount,
                    payload: { amount: value, index },
                  })
                }
              />
            </CSSTransition>
          );
        })}
      </TransitionGroup>
      <div className="flex w-full justify-center relative">
        <button
          type="button"
          className="bg-slate-300 rounded p-1 w-24 absolute right-0"
          onClick={() => dispatch({ type: Action.AddCoin })}
        >
          +
        </button>
      </div>
    </form>
  );
}
