import { IEntity } from "../Common/types";

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


export interface IGetAll<T extends IEntity> {
	type: ActionTypes.GET_ALL;
	entities: T[]
}

export interface ISetLoading {
	type: ActionTypes.SET_LOADING;
	loading: boolean
}

export interface IGet<T extends IEntity> {
	type: ActionTypes.GET;
	entity: T
}

export interface IAdd {
	type: ActionTypes.ADD;
	entityId: number;
}

export interface IDisplay<T extends IEntity> {
	type: ActionTypes.DISPLAY;
	entity: T;
}

export interface IClose {
	type: ActionTypes.CLOSE;
}

export interface IEdit<T extends IEntity> {
	type: ActionTypes.EDIT;
	entity: T;
}

export interface IRemove {
	type: ActionTypes.REMOVE;
	entityId: number;
}

export interface IStore<T extends IEntity> {
	type: ActionTypes.STORE;
	entity: T
}

export interface ICancel {
	type: ActionTypes.CANCEL;
}

export type Actions = IGetAll<IEntity> | IGet<IEntity> | ISetLoading | 
					IDisplay<IEntity> | IClose | IAdd | IEdit<IEntity> | IRemove | 
					IStore<IEntity> | ICancel;


export interface IEntityActions<T extends IEntity> {
	localStorageEntities: T[],
	getAll: (entities: T[]) => IGetAll<T>,
	get: (entityId: number) => IGet<T>,
	add: () => IAdd,
	setLoading: (b: boolean) => ISetLoading,
	edit: (entityId: number) => IEdit<T>,
	display: (entityId: number) => IDisplay<T>,
	close: () => IClose,
	store: (entity: T) => IStore<T>,
	remove: (entityId: number) => IRemove,
	cancel: () => ICancel,
}

export const EntityActions: IEntityActions<IEntity> = {
	localStorageEntities: [],
	getAll: (entities) : IGetAll<IEntity> => { 
		return { 
			type: ActionTypes.GET_ALL,
			entities: [...entities]
		}
	},
	get: (entityId: number) : IGet<IEntity> => { 
		return { 
			type: ActionTypes.GET,
			entity: localStorageEntities.find(e => e.entityId === entityId)!
		}
	},
	add: () : IAdd => { 
		return { 
			type: ActionTypes.ADD,
			entityId: localStorageEntities.length === 0 ? 
				1 : Math.max(...localStorageEntities.map(e => e.entityId)) + 1
		}
	},
	setLoading: (b: boolean) : ISetLoading => { 
		return { 
			type: ActionTypes.SET_LOADING,
			loading: b
		}
	},
	edit: (entityId: number) : IEdit<IEntity> => { 
		return { 
			type: ActionTypes.EDIT,
			entity: localStorageEntities.find(e => e.entityId === entityId)!
		}
	},
	display: (entityId: number) : IDisplay<IEntity> => { 
		return { 
			type: ActionTypes.DISPLAY,
			entity: localStorageEntities.find(e => e.entityId === entityId)!
		}
	},
	close: () : IClose => { 
		return { 
			type: ActionTypes.CLOSE
		}
	},
	store: (entity: IEntity) : IStore<IEntity> => { 
		return { 
			type: ActionTypes.STORE,
			entity
		}
	},
	remove: (entityId: number) : IRemove => { 
		return { 
			type: ActionTypes.REMOVE,
			entityId
		}
	},
	cancel: () : ICancel => { 
		return { 
			type: ActionTypes.CANCEL
		}
	}	
}

export let localStorageEntities: IEntity[] = []

