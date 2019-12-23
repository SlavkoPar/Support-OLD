
export interface IEntity {
	id: number; 
	name: string;
	url: string;
}

export interface IEntityState {
	entities: IEntity[];
	entity?: IEntity;
	loading: boolean;
	// readonly entities: IEntity[];
	// readonly entity?: IEntity;
	// loading: boolean;
	// formMode: string;
}