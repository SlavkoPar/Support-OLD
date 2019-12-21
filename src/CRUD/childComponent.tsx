import React from "react";
import { useStore } from "./store"
import { EntityActionTypes } from "./actions";

export const ChildComponent = () => {
  const {state, dispatch} = useStore();

  return (
    <div>
      {state.count}
      <button onClick={() => dispatch!({type: EntityActionTypes.INCREMENT, message: "Incremented"})}>+</button>

      <button onClick={() => dispatch!({type: EntityActionTypes.INCREMENT, message: "Decremented"})}>-</button>
      <button onClick={() => dispatch!({type: EntityActionTypes.INCREMENT, message: "Reset"})}>Reset</button>
      {state.message}
    </div>
  )
}