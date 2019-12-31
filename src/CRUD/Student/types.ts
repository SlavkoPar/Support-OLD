import { IEntity, IEntityState } from "../Common/types";

export interface IStudent extends IEntity {
	code: string;
	email: string;
	types: string[];
	avatar: string;
}

export interface IStudentState extends IEntityState<IStudent> {
	something: number[]
}

export interface  IGrade {
	studentId: number,
	gradeId: number,
	grade: number
}