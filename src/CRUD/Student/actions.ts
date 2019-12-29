import { IStudent } from "./types";
import jsonStudents from "./Students.json"

import { ActionTypes,
	IGetAll, IGet, IAdd, IEdit, IRemove, 
	ISetLoading, IDisplay, IClose, 
	IStore, ICancel
} from "../Common/actions";


// Combine the action types with a union (we assume there are more)
export type Actions = IGetAll<IStudent> | IGet<IStudent> | ISetLoading | 
					IDisplay<IStudent> | IClose | IAdd | IEdit<IStudent> | IRemove | 
					IStore<IStudent> | ICancel;

/*
export interface IEntityActions<T extends IEntity> {
	localStorageEntites: T[],
	getAll: () => IGetAll<T>,
	// get: (entityId: number) => IGet<T>,
	// add: () => IAdd,
	// setLoading: (b: boolean) => ISetLoading,
	// edit: (entityId: number) => IEdit<T>,
	// display: (entityId: number) => IDisplay<T>,
	// close: () => IClose,
	// store: (entity: T) => IStore<T>,
	// remove: (entityId: number) => IRemove,
	// cancel: () => ICancel,
}

export const EntityActions: IEntityActions<IStudent> = {
	localStorageEntites: [],
	getAll: () : IGetAll<IStudent> => { 
		return { 
			type: ActionTypes.GET_ALL,
			entites: [...EntityActions.localStorageEntites]
		}
	}
}
*/

export const getAll = () : IGetAll<IStudent> => { 
	// create name column of needed
	// const list = localStorageStudents.map(s => { return {...s, name: s.firstName.trim() + ' ' + s.lastName.trim() } })
	return { 
		type: ActionTypes.GET_ALL,
		entites: [...localStorageStudents]
	}
}

export const get = (entityId: number) : IGet<IStudent> => { 
	return { 
		type: ActionTypes.GET,
		entity: localStorageStudents.find(e => e.entityId === entityId)!
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

export const edit = (entityId: number) : IEdit<IStudent> => { 
	return { 
		type: ActionTypes.EDIT,
		entity: localStorageStudents.find(e => e.entityId === entityId)!
	}
}

export const display = (entityId: number) : IDisplay<IStudent> => { 
	return { 
		type: ActionTypes.DISPLAY,
		entity: localStorageStudents.find(e => e.entityId === entityId)!
	}
}


export const close = () : IClose => { 
	return { 
		type: ActionTypes.CLOSE
	}
}


export const store = (entity: IStudent) : IStore<IStudent> => { 
	return { 
		type: ActionTypes.STORE,
		entity
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

let localStorageStudents: IStudent[] = [jsonStudents[0], jsonStudents[1], jsonStudents[2]] // [ ...jsonStudents ]


export const localStorageSave = (sStudents: string) => {
	const students: IStudent[] = JSON.parse(sStudents);
	localStorageStudents = students
}

