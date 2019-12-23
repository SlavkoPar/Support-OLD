import { IStudentState } from './types';

import { StudentActions, StudentActionTypes } from './actions';

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
				loading: action.b
			}

		case StudentActionTypes.STUDENT_EDIT:
			return {
				...state
			}
			
		case StudentActionTypes.STUDENT_REMOVE:
			return {
				...state
			}

		default:
			throw new Error(`Unhandled action type: ${action!.type}`);
	}
}