import { IStudent } from "./types";

export enum StudentActionTypes {
	STUDENT_GET_ALL = 'STUDENT_GET_ALL',
	STUDENT_SET_LOADING = 'STUDENT_SET_LOADING',
  	STUDENT_EDIT = 'STUDENT_EDIT',
	STUDENT_REMOVE = 'STUDENT_REMOVE',
}

export interface IStudentGetAll {
	type: StudentActionTypes.STUDENT_GET_ALL;
	students: IStudent[]
}

export interface ISetLoading {
	type: StudentActionTypes.STUDENT_SET_LOADING;
	b: boolean
}


export interface IStudentEdit {
	type: StudentActionTypes.STUDENT_EDIT;
	id: number;
}

export interface IStudentRemove {
	type: StudentActionTypes.STUDENT_REMOVE;
	id: number;
}

// Combine the action types with a union (we assume there are more)
export type StudentActions = IStudentGetAll | ISetLoading | IStudentEdit | IStudentRemove;


export const getAll = () : IStudentGetAll => { 

	return { 
		type: StudentActionTypes.STUDENT_GET_ALL,
		students: [
			{ studentId: 101, firstName: 'Piter', lastName: 'Fonda', email: '', url: '/student/'},
			{ studentId: 102, firstName: 'Ana', lastName: 'Karenjina', email: '', url: '/student/'},
			{ studentId: 103, firstName: 'jack', lastName: 'Daniels', email: '', url: '/student/'},
			{ studentId: 104, firstName: 'Robert', lastName:'De Niro', email: '', url: '/student/'},
		]
	}
}

export const setLoading = (b: boolean) : ISetLoading => { 
	return { 
		type: StudentActionTypes.STUDENT_SET_LOADING,
		b
	}
}

export const edit = (id: number) : IStudentEdit => { 
	return { 
		type: StudentActionTypes.STUDENT_EDIT,
		id
	}
}

export const remove = (id: number) : IStudentRemove => { 
	return { 
		type: StudentActionTypes.STUDENT_REMOVE,
		id
	}
}



