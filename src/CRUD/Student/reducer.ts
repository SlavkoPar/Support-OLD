import { IStudentState, IStudent } from './types';

import { Actions, ActionTypes, localStorageSave } from './actions';
import { initialStudent } from './useStudent';

export const reducer: React.Reducer<IStudentState, Actions> = (state, action) =>  {
	switch(action.type) {

		case ActionTypes.GET_ALL:
			return {
				...state,
				entites: action.students,
			}

		case ActionTypes.SET_LOADING:
			return {
				...state,
				loading: action.loading
			}

		case ActionTypes.GET: {
			return {
				...state,
				entity: action.student
			};
		}    

		case ActionTypes.ADD: {
			return {
				...state,
				formMode: 'add',
				entity: { 
					...initialStudent, 
					entityId: action.entityId
				}
			};
		}    	

		case ActionTypes.DISPLAY: 
			return {
				...state,
				formMode: 'display',
				entity: { ...action.student }				
			}

		case ActionTypes.CLOSE: 
			return {
				...state,
				formMode: 'none',
				entity: undefined			
			}

		case ActionTypes.EDIT: 
			return {
				...state,
				formMode: 'edit',
				entity: { ...action.student }				
			}
			
		case ActionTypes.REMOVE: {
			localStorageSave(JSON.stringify(state.entites.filter(e => e.entityId !== action.entityId)))
			return {
				...state,
				formMode: 'display',
				entity: undefined,
				entites: state.entites.filter(e => e.entityId !== action.entityId)
			}
		}
		
		case ActionTypes.STORE: {
			let students: IStudent[] = [];
			if (state.formMode === 'add') {
				students = [...state.entites, { ...action.student }]
			}
			else {
				students = state.entites.map(a => a.entityId === action.student.entityId ? { ...action.student } : a)
			}
			localStorageSave(JSON.stringify(students))
			return {
				...state,
				formMode: 'edit',
				entity: { ...action.student },
				entites: students
			};
		}

		case ActionTypes.CANCEL: {
			return {
				...state,
				formMode: 'display',
			};
		}

		default:
			throw new Error(`Unhandled action type: ${action!.type}`);
	}
}