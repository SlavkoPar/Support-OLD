import { IStudent } from "./types";

export enum ActionTypes {
	GET_ALL = 'GET_ALL',
	SET_LOADING = 'SET_LOADING',
	ADD = 'ADD',
	GET = 'GET',
  	EDIT = 'EDIT',
	REMOVE = 'REMOVE',
  	STORE = 'STORE',
	CANCEL = 'CANCEL',
}

export interface IGetAll {
	type: ActionTypes.GET_ALL;
	students: IStudent[]
}

export interface ISetLoading {
	type: ActionTypes.SET_LOADING;
	loading: boolean
}

export interface IGet {
	type: ActionTypes.GET;
	student: IStudent
}

export interface IAdd {
	type: ActionTypes.ADD;
	entityId: number;
}

export interface IEdit {
	type: ActionTypes.EDIT;
	student: IStudent;
}

export interface IRemove {
	type: ActionTypes.REMOVE;
	entityId: number;
}

export interface IStore {
	type: ActionTypes.STORE;
	student: IStudent
}

export interface ICancel {
	type: ActionTypes.CANCEL;
}


// Combine the action types with a union (we assume there are more)
export type Actions = IGetAll | IGet | ISetLoading | 
					IAdd | IEdit | IRemove | 
					IStore | ICancel;


export const getAll = () : IGetAll => { 
	const list = localStorageStudents.map(s => { return {...s, name: s.firstName.trim() + ' ' + s.lastName.trim() } })
	return { 
		type: ActionTypes.GET_ALL,
		students: [...list]
	}
}

export const get = (entityId: number) : IGet => { 
	return { 
		type: ActionTypes.GET,
		student: localStorageStudents.find(e => e.entityId === entityId)!
	}
}

export const add = () : IAdd => { 
	return { 
		type: ActionTypes.ADD,
		entityId: localStorageStudents.length === 0 ? 
			1 : Math.max(...localStorageStudents.map(e => e.entityId)) + 1
	}
}


export const setLoading = (b: boolean) : ISetLoading => { 
	return { 
		type: ActionTypes.SET_LOADING,
		loading: b
	}
}

export const edit = (entityId: number) : IEdit => { 
	return { 
		type: ActionTypes.EDIT,
		student: localStorageStudents.find(e => e.entityId === entityId)!
	}
}

export const store = (student: IStudent) : IStore => { 
	return { 
		type: ActionTypes.STORE,
		student
	}
}

export const remove = (entityId: number) : IRemove => { 
	return { 
		type: ActionTypes.REMOVE,
		entityId
	}
}

export const cancel = () : ICancel => { 
	return { 
		type: ActionTypes.CANCEL
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



