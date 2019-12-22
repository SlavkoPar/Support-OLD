
import React, { createContext, useContext, useReducer, Dispatch } from 'react';
import { IEntityState } from './types';
import { reducer } from './reducer';
import { EntityActions } from './actions';


const initialState: IEntityState = { count: 0, message: "" };

interface IContext {
	state: IEntityState;
	dispatch: Dispatch<EntityActions>;
 }

// The standard way to create context. It takes an initial value object
let StoreContext: React.Context<IContext>

interface IProps {
	children: React.ReactNode
}

export const StoreProvider: React.FC<IProps> = ({ children }) => {

  const [state, dispatch] = useReducer<React.Reducer<IEntityState, EntityActions>>(reducer, initialState);
  StoreContext = createContext<IContext>( {state, dispatch })

  return (
    <StoreContext.Provider value={{state, dispatch}}>
      {children}
    </StoreContext.Provider>
  )
}

export const useStore = () => useContext(StoreContext);