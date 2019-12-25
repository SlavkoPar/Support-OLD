import { IStudentState, IStudent } from './types';

import { StudentActions, StudentActionTypes, localStorageSave } from './actions';

const initialStudent: IStudent = { 
	entityId: 0, 
	name: '',
	firstName: '',
	lastName: '',
	email: '',
	url: ''
};


export const reducer: React.Reducer<IStudentState, StudentActions> = (state, action) =>  {
	switch(action.type) {

		case StudentActionTypes.STUDENT_GET_ALL:
			return {
				...state,
				students: action.students,
			}

		case StudentActionTypes.STUDENT_SET_LOADING:
			return {
				...state,
				loading: action.loading
			}

		case StudentActionTypes.STUDENT_GET: {
			return {
				...state,
				student: action.student
			};
		}    

		case StudentActionTypes.STUDENT_ADD: {
			return {
				...state,
				formMode: 'add',
				student: { 
					...initialStudent, 
					entityId: action.entityId
				}
			};
		}    	

		case StudentActionTypes.STUDENT_EDIT: 
			return {
				...state,
				formMode: 'edit',
				student: { ...action.student }				
			}
			
		case StudentActionTypes.STUDENT_REMOVE: {
			localStorageSave(JSON.stringify(state.students.filter(e => e.entityId !== action.entityId)))
			return {
				...state,
				formMode: 'display',
				student: undefined,
				students: state.students.filter(e => e.entityId !== action.entityId)
			}
		}
		
		case StudentActionTypes.STUDENT_STORE: {
			let students: IStudent[] = [];
			if (state.formMode === 'add') {
				students = [...state.students, { ...action.student }]
			}
			else {
				students = state.students.map(a => a.entityId === action.student.entityId ? { ...action.student } : a)
			}
			localStorageSave(JSON.stringify(students))
			return {
				...state,
				formMode: 'edit',
				student: { ...action.student },
				students: students
			};
		}

		case StudentActionTypes.STUDENT_CANCEL: {
			return {
				...state,
				formMode: 'display',
			};
		}

		default:
			throw new Error(`Unhandled action type: ${action!.type}`);
	}
}