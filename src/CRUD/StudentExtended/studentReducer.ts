import { IStudentState, IStudent } from "./types";
import { Actions, ActionTypes } from "../Generics/actions";
import { IEntityState, IEntity } from "../Generics/types";
import { entityReducer } from "../Generics/entityReducer";
import { ActionsExtended, StudentActionTypes } from "./actions";


export const initialStudent: IStudent = { 
	entityId: 0, 
	name: '',
	url: '',
	code: '',
	email: '',
	avatar: 'https://img.pokemondb.net/artwork/diglett.jpg',
	types: []
};


export const combineReducers: (reducers: React.Reducer<IStudentState, Actions>[]) => React.Reducer<IStudentState, Actions> = (reducers) => {
	return (prevState, action) => {
		return reducers.reduce((newState, reducer) => {
		  return reducer(newState, action);
		}, prevState);
	 };	
}

export const studentReducer: <
	TS extends IEntityState<IEntity>,
	T extends IEntity
>(initialEntity: T) => React.Reducer<TS, ActionsExtended> = (initialEntity) => {
	return (state, action) =>  {
		switch(action.type) {

			case ActionTypes.GET_ALL:
				return {
					...state,
					entities: action.entities,
					pageCount: Math.ceil(action.entities.length / action.pageSize)
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

export const Reducer = combineReducers([entityReducer(initialStudent), studentReducer(initialStudent)]);


