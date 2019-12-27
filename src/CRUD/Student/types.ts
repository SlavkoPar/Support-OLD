import { IEntity } from "../Common/types";

export interface IStudent extends IEntity {
	code: string;
	email: string;
	types: string[];
	avatar: string;
}

export interface IStudentState {
	readonly entites: IStudent[];
	readonly entity?: IStudent;
	loading: boolean;
	formMode: string;
	canEdit: boolean;
}
