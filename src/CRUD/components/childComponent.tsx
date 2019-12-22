import React from "react";
import { useStore } from "../store"
import { increment, decrement, reset } from "../actions";

export const ChildComponent = () => {
  const { state, dispatch } = useStore();

	return (
   	<div>
			{state.count}
			<button onClick={() => dispatch(increment())}>+</button>
			<button onClick={() => dispatch(decrement())}>-</button>
			<button onClick={() => dispatch(reset())}>Reset</button>
			{state.message}
		</div>
  )
}