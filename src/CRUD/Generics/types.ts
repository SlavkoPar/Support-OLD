
export interface IEntity {
	entityId: number; 
	name: string;
	url: string;
}

export interface IEntityState {
	readonly entities: IEntity[];
	readonly entity?: IEntity;
	loading: boolean;
	formMode: string;
	canEdit: boolean;
}