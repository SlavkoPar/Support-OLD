import { IEntity } from "./types";

export enum EntityActionTypes {
	ENTITY_GET_ALL = 'ENTITY_GET_ALL',
	ENTITY_SET_LOADING = 'ENTITY_SET_LOADING',
	ENTITY_ADD = 'ENTITY_ADD',
	ENTITY_GET = 'ENTITY_GET',
  	ENTITY_EDIT = 'ENTITY_EDIT',
	ENTITY_REMOVE = 'ENTITY_REMOVE',
  	ENTITY_STORE = 'ENTITY_STORE',
	ENTITY_CANCEL = 'ENTITY_CANCEL',
	ENTITY_STORE_TO_LOCAL_STORAGE = 'ENTITY_STORE_TO_LOCAL_STORAGE'
}

export interface IEntityGetAll {
	type: EntityActionTypes.ENTITY_GET_ALL;
	entities: IEntity[]
}

export interface ISetLoading {
	type: EntityActionTypes.ENTITY_SET_LOADING;
	loading: boolean
}

export interface IEntityGet {
	type: EntityActionTypes.ENTITY_GET;
	entity: IEntity
}

export interface IEntityAdd {
	type: EntityActionTypes.ENTITY_ADD;
	entityId: number;
}

export interface IEntityEdit {
	type: EntityActionTypes.ENTITY_EDIT;
	entity: IEntity;
}

export interface IEntityRemove {
	type: EntityActionTypes.ENTITY_REMOVE;
	entityId: number;
}

export interface IEntityStore {
	type: EntityActionTypes.ENTITY_STORE;
	entity: IEntity
}

export interface IEntityCancel {
	type: EntityActionTypes.ENTITY_CANCEL;
}


// Combine the action types with a union (we assume there are more)
export type EntityActions = IEntityGetAll | IEntityGet | ISetLoading | 
					IEntityAdd | IEntityEdit | IEntityRemove | 
					IEntityStore | IEntityCancel;


export const getAll = () : IEntityGetAll => { 
	return { 
		type: EntityActionTypes.ENTITY_GET_ALL,
		entities: [...localStorageEntities]
	}
}

export const get = (entityId: number) : IEntityGet => { 
	return { 
		type: EntityActionTypes.ENTITY_GET,
		entity: localStorageEntities.find(e => e.entityId === entityId)!
	}
}

export const add = () : IEntityAdd => { 
	return { 
		type: EntityActionTypes.ENTITY_ADD,
		entityId: localStorageEntities.length === 0 ? 
			1 : Math.max(...localStorageEntities.map(e => e.entityId)) + 1
	}
}


export const setLoading = (b: boolean) : ISetLoading => { 
	return { 
		type: EntityActionTypes.ENTITY_SET_LOADING,
		loading: b
	}
}

export const edit = (entityId: number) : IEntityEdit => { 
	return { 
		type: EntityActionTypes.ENTITY_EDIT,
		entity: localStorageEntities.find(e => e.entityId === entityId)!
	}
}

export const store = (entity: IEntity) : IEntityStore => { 
	return { 
		type: EntityActionTypes.ENTITY_STORE,
		entity
	}
}



export const remove = (entityId: number) : IEntityRemove => { 
	return { 
		type: EntityActionTypes.ENTITY_REMOVE,
		entityId
	}
}

export const cancel = () : IEntityCancel => { 
	return { 
		type: EntityActionTypes.ENTITY_CANCEL
	}
}


let localStorageEntities = [
	{ entityId: 101, name: 'piter', url: '/entity/'},
	{ entityId: 102, name: 'ana', url: '/entity/'},
	{ entityId: 103, name: 'jack', url: '/entity/'},
]


export const localStorageSave = (sEntities: string) => {
	const entities: IEntity[] = JSON.parse(sEntities);
	localStorageEntities = entities
}

