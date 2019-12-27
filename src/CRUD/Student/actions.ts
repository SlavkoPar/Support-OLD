import { IStudent } from "./types";
import jsonStudents from "./Students.json"

export enum ActionTypes {
	GET_ALL = 'GET_ALL',
	SET_LOADING = 'SET_LOADING',
	ADD = 'ADD',
	GET = 'GET',
	DISPLAY = 'DISPLAY',
	CLOSE = 'CLOSE',
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

export interface IDisplay {
	type: ActionTypes.DISPLAY;
	student: IStudent;
}

export interface IClose {
	type: ActionTypes.CLOSE;
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
					IDisplay | IClose | IAdd | IEdit | IRemove | 
					IStore | ICancel;


export const getAll = () : IGetAll => { 
	// create name column of needed
	// const list = localStorageStudents.map(s => { return {...s, name: s.firstName.trim() + ' ' + s.lastName.trim() } })
	return { 
		type: ActionTypes.GET_ALL,
		students: [...localStorageStudents]
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

export const display = (entityId: number) : IDisplay => { 
	return { 
		type: ActionTypes.DISPLAY,
		student: localStorageStudents.find(e => e.entityId === entityId)!
	}
}


export const close = () : IClose => { 
	return { 
		type: ActionTypes.CLOSE
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

/*

(function() {
	// const poks: IPokemon[] = pokemons;
	const x = localStorageStudents.map(p => { return { 
			entityId: p.entityId,
			//code: p.code,
			name: p.name,
			email: p.name.toLowerCase() + "@gmail.com",
			types: [...p.types],
			image: p.image,
			url: p.url
		}
	 })
	const z = JSON.stringify(x)

})()
*/

let localStorageStudents: IStudent[] = [ ...jsonStudents ]


export const localStorageSave = (sStudents: string) => {
	const students: IStudent[] = JSON.parse(sStudents);
	localStorageStudents = students
}

