
import React, { createContext, useContext, useReducer, Dispatch } from 'react';
import { IStudentState } from './types';
import { reducer } from './reducer';
import { Actions } from './actions';


const initialState: IStudentState = { 
	students: [],
	loading: false,
	formMode: 'display',
	canEdit: true
};


interface IStudentContext {
	state: IStudentState;
	dispatch: Dispatch<Actions>;
 }

// The standard way to create context. It takes an initial value object
let StudentContext: React.Context<IStudentContext>;

interface IProps {
	children: React.ReactNode
}

export const StudentProvider: React.FC<IProps> = ({ children }) => {

  const [state, dispatch] = useReducer<React.Reducer<IStudentState, Actions>>(reducer, initialState);
  
	if (StudentContext === undefined)
  		StudentContext = createContext<IStudentContext>({ state, dispatch })

  	return (
   	<StudentContext.Provider value={{ state, dispatch }}>
   		{children}
   	</StudentContext.Provider>
  	)
}

export const useStudent = () => useContext(StudentContext);