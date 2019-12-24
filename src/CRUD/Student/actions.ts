import { IStudent } from "./types";

export enum StudentActionTypes {
	STUDENT_GET_ALL = 'STUDENT_GET_ALL',
	STUDENT_SET_LOADING = 'STUDENT_SET_LOADING',
	STUDENT_ADD = 'STUDENT_ADD',
	STUDENT_GET = 'STUDENT_GET',
  	STUDENT_EDIT = 'STUDENT_EDIT',
	STUDENT_REMOVE = 'STUDENT_REMOVE',
  	STUDENT_STORE = 'STUDENT_STORE',
	STUDENT_CANCEL = 'STUDENT_CANCEL',
}

export interface IStudentGetAll {
	type: StudentActionTypes.STUDENT_GET_ALL;
	students: IStudent[]
}

export interface ISetLoading {
	type: StudentActionTypes.STUDENT_SET_LOADING;
	loading: boolean
}

export interface IStudentGet {
	type: StudentActionTypes.STUDENT_GET;
	student: IStudent
}

export interface IStudentAdd {
	type: StudentActionTypes.STUDENT_ADD;
	studentId: number;
}

export interface IStudentEdit {
	type: StudentActionTypes.STUDENT_EDIT;
	student: IStudent;
}

export interface IStudentRemove {
	type: StudentActionTypes.STUDENT_REMOVE;
	studentId: number;
}

export interface IStudentStore {
	type: StudentActionTypes.STUDENT_STORE;
	student: IStudent
}

export interface IStudentCancel {
	type: StudentActionTypes.STUDENT_CANCEL;
}


// Combine the action types with a union (we assume there are more)
export type StudentActions = IStudentGetAll | IStudentGet | ISetLoading | 
					IStudentAdd | IStudentEdit | IStudentRemove | 
					IStudentStore | IStudentCancel;


export const getAll = () : IStudentGetAll => { 
	return { 
		type: StudentActionTypes.STUDENT_GET_ALL,
		students: [...localStorageStudents]
	}
}

export const get = (studentId: number) : IStudentGet => { 
	return { 
		type: StudentActionTypes.STUDENT_GET,
		student: localStorageStudents.find(e => e.studentId === studentId)!
	}
}

export const add = () : IStudentAdd => { 
	return { 
		type: StudentActionTypes.STUDENT_ADD,
		studentId: localStorageStudents.length === 0 ? 
			1 : Math.max(...localStorageStudents.map(e => e.studentId)) + 1
	}
}


export const setLoading = (b: boolean) : ISetLoading => { 
	return { 
		type: StudentActionTypes.STUDENT_SET_LOADING,
		loading: b
	}
}

export const edit = (studentId: number) : IStudentEdit => { 
	return { 
		type: StudentActionTypes.STUDENT_EDIT,
		student: localStorageStudents.find(e => e.studentId === studentId)!
	}
}

export const store = (student: IStudent) : IStudentStore => { 
	return { 
		type: StudentActionTypes.STUDENT_STORE,
		student
	}
}

export const remove = (studentId: number) : IStudentRemove => { 
	return { 
		type: StudentActionTypes.STUDENT_REMOVE,
		studentId
	}
}

export const cancel = () : IStudentCancel => { 
	return { 
		type: StudentActionTypes.STUDENT_CANCEL
	}
}

let localStorageStudents = [
	{ studentId: 101, firstName: 'Piter', lastName: 'Fonda', email: '', url: '/student/'},
	{ studentId: 102, firstName: 'Ana', lastName: 'Karenjina', email: '', url: '/student/'},
	{ studentId: 103, firstName: 'jack', lastName: 'Daniels', email: '', url: '/student/'},
	{ studentId: 104, firstName: 'Robert', lastName:'De Niro', email: '', url: '/student/'},
]

export const localStorageSave = (sStudents: string) => {
	const students: IStudent[] = JSON.parse(sStudents);
	localStorageStudents = students
}



