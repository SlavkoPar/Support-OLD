import { IEntity } from "../Generics/types";

export interface IStudent extends IEntity {
	firstName: string;
	lastName: string;
	email: string;
}

export interface IStudentState {
	readonly students: IStudent[];
	readonly student?: IStudent;
	loading: boolean;
	formMode: string;
	canEdit: boolean;
}