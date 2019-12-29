
export interface IEntity {
	entityId: number; 
	name: string;
	url: string;
}



export interface IEntityState<T> {
	readonly entites: T[];
	readonly entity?: T;
	loading: boolean;
	formMode: string;
	canEdit: boolean;
}
