
import React, { createContext, useContext, useReducer, Dispatch } from 'react';
import { IStudent, IStudentState } from './types';
import { reducer } from './reducer';
import { Actions } from './actions';


export const initialStudent: IStudent = { 
	entityId: 0, 
	name: '',
	url: '',
	code: '',
	email: '',
	avatar: 'https://img.pokemondb.net/artwork/diglett.jpg',
	types: []
};

const initialState: IStudentState = { 
	entites: [],
	loading: false,
	formMode: 'display',
	canEdit: true
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

  const [state, dispatch] = useReducer<React.Reducer<IStudentState, Actions>>(reducer<IStudentState>(), initialState);
  
	if (StudentContext === undefined)
  		StudentContext = createContext<IStudentContext>({ state, dispatch })

  	return (
   	<StudentContext.Provider value={{ state, dispatch }}>
   		{children}
   	</StudentContext.Provider>
  	)
}

export const useStudent = () => useContext(StudentContext);