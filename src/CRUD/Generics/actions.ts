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
