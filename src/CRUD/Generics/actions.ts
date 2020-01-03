import { IEntity } from "./types";
import { createAction, createActionPayload, ActionsUnion } from "./actionsAccepted";

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
	GO_TO_PAGE = 'GO_TO_PAGE'
}

/*
export interface IGetAll<T extends IEntity> {
	type: ActionTypes.GET_ALL;
	entities: T[];
	pageSize: number;
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
	saveStorage: (s: string) => void;
}

export interface IStore<T extends IEntity> {
	type: ActionTypes.STORE;
	entity: T;
	saveStorage: (s: string) => void;
}

export interface ICancel {
	type: ActionTypes.CANCEL;
}

export interface IGoToPage {
	type: ActionTypes.GO_TO_PAGE;
	page: number;
}


export type Actions = IGetAll<IEntity> | IGet<IEntity> | ISetLoading | 
					IDisplay<IEntity> | IClose | IAdd | IEdit<IEntity> | IRemove | 
					IStore<IEntity> | ICancel | IGoToPage;


export interface IEntityActions<T extends IEntity> {
	getAll: (entities: T[], pageSize: number) => IGetAll<T>,
	get: (entities: T[], entityId: number) => IGet<T>,
	add: (entities: T[]) => IAdd,
	setLoading: (b: boolean) => ISetLoading,
	display: (entities: T[], entityId: number) => IDisplay<T>,
	edit: (entities: T[], entityId: number) => IEdit<T>,
	close: () => IClose,
	store: (saveStorage: (s: string) => void, entity: T) => IStore<T>,
	remove: (saveStorage: (s: string) => void, entityId: number) => IRemove,
	cancel: () => ICancel,
	goToPage: (page: number) => IGoToPage,
}
*/
/*
export interface IEntityActions<T extends IEntity>  {
	close: ActionsWithoutPayload<ActionTypes.CLOSE>;
	cancel: ActionsWithoutPayload<ActionTypes.CLOSE>;
	setLoading: ActionsWithPayload<typeof ActionTypes.SET_LOADING, boolean>;
	getAll: ActionsWithPayload<typeof ActionTypes.GET_ALL, { entities: T[]; pageSize: number; }>;
	get: ActionsWithPayload<typeof ActionTypes.GET, { entities: T[]; entityId: number }>;
	add: ActionsWithPayload<typeof ActionTypes.ADD, T[]>;
	display: ActionsWithPayload<typeof ActionTypes.DISPLAY, { entities: T[]; entityId: number }>;
	edit: ActionsWithPayload<typeof ActionTypes.EDIT, { entities: T[]; entityId: number }>;
	store: ActionsWithPayload<typeof ActionTypes.STORE, { saveStorage: (s: string) => void, entity: IEntity }>;
	remove: ActionsWithPayload<typeof ActionTypes.REMOVE, { saveStorage: (s: string) => void, entityId: number }>;
	goToPage: ActionsWithPayload<typeof ActionTypes.GO_TO_PAGE, number>;
 };
 */

export const EntityActions = {
	close: createAction<typeof ActionTypes.CLOSE>(ActionTypes.CLOSE),
	cancel: createAction<typeof ActionTypes.CANCEL>(ActionTypes.CANCEL),
	setLoading: createActionPayload<typeof ActionTypes.SET_LOADING, boolean>(ActionTypes.SET_LOADING),
	getAll: createActionPayload<typeof ActionTypes.GET_ALL, { entities: IEntity[]; pageSize: number; }>(ActionTypes.GET_ALL),
	get: createActionPayload<typeof ActionTypes.GET, { entities: IEntity[]; entityId: number }>(ActionTypes.GET),
	add: createActionPayload<typeof ActionTypes.ADD, { entities: IEntity[] }>(ActionTypes.ADD),
	display: createActionPayload<typeof ActionTypes.DISPLAY, { entities: IEntity[]; entityId: number }>(ActionTypes.DISPLAY),
	edit: createActionPayload<typeof ActionTypes.EDIT, { entities: IEntity[]; entityId: number }>(ActionTypes.EDIT),
	store: createActionPayload<typeof ActionTypes.STORE, { saveStorage: (s: string) => void, entity: IEntity }>(ActionTypes.STORE),
	remove: createActionPayload<typeof ActionTypes.REMOVE, { saveStorage: (s: string) => void, entityId: number }>(ActionTypes.REMOVE),
	goToPage: createActionPayload<typeof ActionTypes.GO_TO_PAGE, number>(ActionTypes.GO_TO_PAGE),
 };

 export type AcceptedActions = ActionsUnion<typeof EntityActions>;


/*
export const EntityActions: IEntityActions<IEntity> = {

	getAll: (entities, pageSize) : IGetAll<IEntity> => { 
		return { 
			type: ActionTypes.GET_ALL,
			entities: [...entities],
			pageSize
		}
	},
	get: (entities: IEntity[], entityId: number) : IGet<IEntity> => { 
		return { 
			type: ActionTypes.GET,
			entity: entities.find(e => e.entityId === entityId)!
		}
	},
	add: (entities: IEntity[]) : IAdd => { 
		return { 
			type: ActionTypes.ADD,
			entityId: entities.length === 0 ? 
				1 : Math.max(...entities.map(e => e.entityId)) + 1
		}
	},
	setLoading: (b: boolean) : ISetLoading => { 
		return { 
			type: ActionTypes.SET_LOADING,
			loading: b
		}
	},
	edit: (entities: IEntity[], entityId: number) : IEdit<IEntity> => { 
		return { 
			type: ActionTypes.EDIT,
			entity: entities.find(e => e.entityId === entityId)!
		}
	},
	display: (entities: IEntity[], entityId: number) : IDisplay<IEntity> => { 
		return { 
			type: ActionTypes.DISPLAY,
			entity: entities.find(e => e.entityId === entityId)!
		}
	},
	close: () : IClose => { 
		return { 
			type: ActionTypes.CLOSE
		}
	},
	store: (saveStorage: (s: string) => void, entity: IEntity) : IStore<IEntity> => { 
		return { 
			type: ActionTypes.STORE,
			entity,
			saveStorage
		}
	},
	remove: (saveStorage: (s: string) => void, entityId: number) : IRemove => { 
		return { 
			type: ActionTypes.REMOVE,
			entityId,
			saveStorage
		}
	},
	cancel: () : ICancel => { 
		return { 
			type: ActionTypes.CANCEL
		}
	},
	goToPage: (page: number) : IGoToPage => { 
		return { 
			type: ActionTypes.GO_TO_PAGE,
			page
		}
	},	
}
*/


