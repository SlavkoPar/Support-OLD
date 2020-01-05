import { AcceptedActions } from '../Generics/actions';
import { IStudentState, IStudent } from "./types";
import { ActionTypes } from "../Generics/actions";
import { IEntityState, IEntity } from "../Generics/types";
import { entityReducer } from "../Generics/entityReducer";
import { StudentActionTypes, StudentAcceptedActions } from "./actions";


export const initialStudent: IStudent = { 
	entityId: 0, 
	name: '',
	url: '',
	code: '',
	email: '',
	avatar: 'https://img.pokemondb.net/artwork/diglett.jpg',
	types: []
};


export const combineReducersWAS: (reducers: React.Reducer<IStudentState,StudentAcceptedActions>[])
					=> React.Reducer<IStudentState, StudentAcceptedActions> = (reducers) => {
	return (prevState, action) => {
		return reducers.reduce((newState, reducer) => {
		  return reducer(newState, action);
		}, prevState);
	 };	
}


// type acceptedActions = Omit<StudentAcceptedActions, "IAddGrade"|"IRemoveGrade">;

export const combineReducers: (
		ent: React.Reducer<IStudentState, AcceptedActions>, 
		stud: React.Reducer<IStudentState, StudentAcceptedActions>) => 
					React.Reducer<IStudentState, StudentAcceptedActions> = (ent, stud) => {
	return (prevState, action) => {
		// PROBLEM !!!
		//const state = ent(prevState, action);
		return stud(prevState, action)
	 };	
}


export const studentReducer: <
	TS extends IEntityState<IEntity>,
	T extends IEntity
>(initialEntity: T) => React.Reducer<TS, StudentAcceptedActions> = (initialEntity) => {
	return (state, action) =>  {
		switch(action.type) {

			case ActionTypes.GET_ALL:
				return {
					...state,
					entities: action.payload.entities,
					pageCount: Math.ceil(action.payload.entities.length / action.payload.pageSize)
				}

			case StudentActionTypes.STUDENT_ADD_GRADE:
				return {...state}
				
			case StudentActionTypes.STUDENT_REMOVE_GRADE:
				return {...state}
		
			default:
				//	throw new Error(`Unhandled action type: ${action!.type}`);
				// when combine reducers 
				return state
		}		
	}
}

// export const Reducer = combineReducers([entityReducer(initialStudent), studentReducer(initialStudent)]);
export const Reducer = combineReducers(entityReducer(initialStudent), studentReducer(initialStudent));


