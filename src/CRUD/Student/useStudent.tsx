
import React, { createContext, useContext, useReducer, Dispatch } from 'react';
import { IStudentState } from './types';
import { Actions } from '../Common/actions';
import { Reducer } from './studentReducer';

const initialState: IStudentState = { 
	entities: [],
	loading: false,
	formMode: 'display',
	canEdit: true,
	something: [1, 2, 3]
};

export interface IStudentContext {
	state: IStudentState;
	dispatch: Dispatch<Actions>;
}

let StudentContext: React.Context<IStudentContext>;

interface IProps {
	children: React.ReactNode
}

export const StudentProvider: React.FC<IProps> = ({ children }) => {
	const [state, dispatch] = useReducer(Reducer, initialState)

	if (StudentContext === undefined)
  		StudentContext = createContext<IStudentContext>({ state, dispatch })

  	return (
   	<StudentContext.Provider value={{ state, dispatch }}>
   		{children}
   	</StudentContext.Provider>
  	)
}

export const useStudent = () => useContext(StudentContext);