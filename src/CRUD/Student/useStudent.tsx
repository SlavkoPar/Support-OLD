
import React, { createContext, useContext, useReducer, Dispatch } from 'react';
import { IStudentState } from './types';
import { reducer } from './reducer';
import { StudentActions } from './actions';


const initialState: IStudentState = { 
	students: [],
	loading: false,
};


interface IContext {
	state: IStudentState;
	dispatch: Dispatch<StudentActions>;
 }

// The standard way to create context. It takes an initial value object
let StudentContext: React.Context<IContext>;

interface IProps {
	children: React.ReactNode
}

export const StudentProvider: React.FC<IProps> = ({ children }) => {

  const [state, dispatch] = useReducer<React.Reducer<IStudentState, StudentActions>>(reducer, initialState);
  StudentContext = createContext<IContext>( { state, dispatch })

  	return (
   	<StudentContext.Provider value={{ state, dispatch }}>
   		{children}
   	</StudentContext.Provider>
  	)
}

export const useStudent = () => useContext(StudentContext);