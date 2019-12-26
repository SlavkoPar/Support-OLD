
export interface IEntity {
	entityId: number; 
	name: string;
	url: string;
}

export interface IStudent extends IEntity {
	firstName: string;
	lastName: string;
	email: string;
}

export interface IStudentState {
	readonly entites: IStudent[];
	readonly entity?: IStudent;
	loading: boolean;
	formMode: string;
	canEdit: boolean;
}

