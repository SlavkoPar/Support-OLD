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
	entityId: number;
}

export interface IStudentEdit {
	type: StudentActionTypes.STUDENT_EDIT;
	student: IStudent;
}

export interface IStudentRemove {
	type: StudentActionTypes.STUDENT_REMOVE;
	entityId: number;
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
	const list = localStorageStudents.map(s => { return {...s, name: s.firstName.trim() + ' ' + s.lastName.trim() } })
	return { 
		type: StudentActionTypes.STUDENT_GET_ALL,
		students: [...list]
	}
}

export const get = (entityId: number) : IStudentGet => { 
	return { 
		type: StudentActionTypes.STUDENT_GET,
		student: localStorageStudents.find(e => e.entityId === entityId)!
	}
}

export const add = () : IStudentAdd => { 
	return { 
		type: StudentActionTypes.STUDENT_ADD,
		entityId: localStorageStudents.length === 0 ? 
			1 : Math.max(...localStorageStudents.map(e => e.entityId)) + 1
	}
}


export const setLoading = (b: boolean) : ISetLoading => { 
	return { 
		type: StudentActionTypes.STUDENT_SET_LOADING,
		loading: b
	}
}

export const edit = (entityId: number) : IStudentEdit => { 
	return { 
		type: StudentActionTypes.STUDENT_EDIT,
		student: localStorageStudents.find(e => e.entityId === entityId)!
	}
}

export const store = (student: IStudent) : IStudentStore => { 
	return { 
		type: StudentActionTypes.STUDENT_STORE,
		student
	}
}

export const remove = (entityId: number) : IStudentRemove => { 
	return { 
		type: StudentActionTypes.STUDENT_REMOVE,
		entityId
	}
}

export const cancel = () : IStudentCancel => { 
	return { 
		type: StudentActionTypes.STUDENT_CANCEL
	}
}

let localStorageStudents: IStudent[] = [
	{ entityId: 101, name: '', firstName: 'Piter', lastName: 'Fonda',  email: 'piter@gmail.com', url: '/student/'},
	{ entityId: 102, name: '', firstName: 'Ana', lastName: 'Karenjina', email: 'ana@gmail.com', url: '/student/'},
	{ entityId: 103, name: '', firstName: 'Jack', lastName: 'Daniels', email: 'jack@gmail.com', url: '/student/'},
	{ entityId: 104, name: '', firstName: 'Robert', lastName:'De Niro', email: 'robi@gmail.com', url: '/student/'},
]

export const localStorageSave = (sStudents: string) => {
	const students: IStudent[] = JSON.parse(sStudents);
	localStorageStudents = students
}



