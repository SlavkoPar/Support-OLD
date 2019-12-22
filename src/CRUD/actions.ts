export enum EntityActionTypes {
  INCREMENT = 'INCREMENT',
  DECREMENT = 'DECREMENT',
  RESET = 'RESET'
}

// Interface for Get All Action Type
export interface IIncrement {
	type: EntityActionTypes.INCREMENT;
	message: string;
}

export interface IDecrement {
	type: EntityActionTypes.DECREMENT;
	message: string;
}


export interface IReset {
	type: EntityActionTypes.RESET;
	message: string;
}

// Combine the action types with a union (we assume there are more)
export type EntityActions = IIncrement | IDecrement | IReset;


export const increment = () : IIncrement => { 
	return { 
		type: EntityActionTypes.INCREMENT,
		message: "Incremented"
	}
}

export const decrement = () : IDecrement => { 
	return { 
		type: EntityActionTypes.DECREMENT,
		message: "Decremented"
	}
}

export const reset = () : IReset => { 
	return { 
		type: EntityActionTypes.RESET,
		message: "Reset"
	}
}


