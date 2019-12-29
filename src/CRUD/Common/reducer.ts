
import { Actions } from './actions';  // , localStorageSave
import { IEntityState, IEntity } from './types';
import { ActionTypes } from './actions';

interface IProps<T> {
	state: T, 
	action: Actions
}

// const middleElement: <T>(arr: Array<T>) => T = (arr) => {
// 	return arr[Math.floor(arr.length / 2)];
// };

// type Reducer<S, A> = (prevState: S, action: A) => S;

export const reducer: <
	TS extends IEntityState<IEntity>,
	T extends IEntity
>(initialEntity: T) => React.Reducer<TS, Actions> = (initialEntity) => {
	return (state, action) =>  {
		switch(action.type) {

			case ActionTypes.GET_ALL:
				return {
					...state,
					entites: action.entites,
				}
	
			case ActionTypes.SET_LOADING:
				return {
					...state,
					loading: action.loading
				}
	
			case ActionTypes.GET: {
				return {
					...state,
					entity: action.entity
				};
			}    
	
			case ActionTypes.ADD: {
				return {
					...state,
					formMode: 'add',
					entity: { 
						...initialEntity, 
						entityId: action.entityId
					}
				};
			}    	
	
			case ActionTypes.DISPLAY: 
				return {
					...state,
					formMode: 'display',
					entity: { ...action.entity }				
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
					entity: { ...action.entity }				
				}
				
			case ActionTypes.REMOVE: {
				// localStorageSave(JSON.stringify(state.entites.filter(e => e.entityId !== action.entityId)))
				return {
					...state,
					formMode: 'display',
					entity: undefined,
					entites: state.entites.filter(e => e.entityId !== action.entityId)
				}
			}
			
			case ActionTypes.STORE: {
				let entites: IEntity[] = [];
				if (state.formMode === 'add') {
					entites = [...state.entites, { ...action.entity }]
				}
				else {
					entites = state.entites.map(a => a.entityId === action.entity.entityId ? { ...action.entity } : a)
				}
				// localStorageSave(JSON.stringify(students))
				return {
					...state,
					formMode: 'edit',
					entity: { ...action.entity },
					entites: entites
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
}

/*
export const reducerWas: React.Reducer<IStudentState, Actions> = (state, action) =>  {
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
			// localStorageSave(JSON.stringify(state.entites.filter(e => e.entityId !== action.entityId)))
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
			// localStorageSave(JSON.stringify(students))
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
*/