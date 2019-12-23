import { IEntity } from "./types";

export enum EntityActionTypes {
	ENTITY_GET_ALL = 'ENTITY_GET_ALL',
	ENTITY_SET_LOADING = 'ENTITY_SET_LOADING',
  	ENTITY_EDIT = 'ENTITY_EDIT',
	ENTITY_REMOVE = 'ENTITY_REMOVE',
}

export interface IEntityGetAll {
	type: EntityActionTypes.ENTITY_GET_ALL;
	entities: IEntity[]
}

export interface ISetLoading {
	type: EntityActionTypes.ENTITY_SET_LOADING;
	b: boolean
}


export interface IEntityEdit {
	type: EntityActionTypes.ENTITY_EDIT;
	id: number;
}

export interface IEntityRemove {
	type: EntityActionTypes.ENTITY_REMOVE;
	id: number;
}

// Combine the action types with a union (we assume there are more)
export type EntityActions = IEntityGetAll | ISetLoading | IEntityEdit | IEntityRemove;


export const getAll = () : IEntityGetAll => { 
 
	return { 
		type: EntityActionTypes.ENTITY_GET_ALL,
		entities: [
			{ id: 101, name: 'piter', url: '/entity/'},
			{ id: 102, name: 'ana', url: '/entity/'},
			{ id: 103, name: 'jack', url: '/entity/'},
		]
	}
}

export const setLoading = (b: boolean) : ISetLoading => { 
	return { 
		type: EntityActionTypes.ENTITY_SET_LOADING,
		b
	}
}

export const edit = (id: number) : IEntityEdit => { 
	return { 
		type: EntityActionTypes.ENTITY_EDIT,
		id
	}
}

export const remove = (id: number) : IEntityRemove => { 
	return { 
		type: EntityActionTypes.ENTITY_REMOVE,
		id
	}
}



