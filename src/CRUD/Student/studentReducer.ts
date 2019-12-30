import { IStudentState, IStudent } from "./types";
import { Actions, ActionTypes } from "../Common/actions";
import { IEntityState, IEntity } from "../Common/types";
import { entityReducer } from "../Common/entityReducer";


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
>(initialEntity: T) => React.Reducer<TS, Actions> = (initialEntity) => {
	return (state, action) =>  {
		switch(action.type) {

			case ActionTypes.GET_ALL:
				return {
					...state,
					entities: action.entities,
					pageCount: Math.ceil(action.entities.length / action.pageSize)
				}
	
			default:
			//	throw new Error(`Unhandled action type: ${action!.type}`);
			// when combine reducers 
			return state
		}		
	}
}

export const Reducer = combineReducers([entityReducer(initialStudent), studentReducer(initialStudent)]);


