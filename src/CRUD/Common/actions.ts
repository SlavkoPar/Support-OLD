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
	entites: T[]
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


