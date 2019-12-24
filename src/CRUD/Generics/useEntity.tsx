
import React, { createContext, useContext, useReducer, Dispatch } from 'react';
import { IEntityState } from './types';
import { reducer } from './reducer';
import { EntityActions } from './actions';


const initialState: IEntityState = { 
	entities: [],
	loading: false,
	formMode: 'display',
	canEdit: true
};


interface IContext {
	state: IEntityState;
	dispatch: Dispatch<EntityActions>;
 }

// The standard way to create context. It takes an initial value object

let EntityContext: React.Context<IContext>;

interface IProps {
	children: React.ReactNode
}

export const EntityProvider: React.FC<IProps> = ({ children }) => {
	const [state, dispatch] = useReducer<React.Reducer<IEntityState, EntityActions>>(reducer, initialState);

	if (EntityContext === undefined)
		EntityContext = createContext<IContext>({ state, dispatch })

  	return (
   	<EntityContext.Provider value={{ state, dispatch }}>
   		{children}
   	</EntityContext.Provider>
  	)
}

export const useEntity = () => {
	return useContext(EntityContext);
}