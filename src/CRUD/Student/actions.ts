import { IGrade, IStudent } from "./types";
import { Actions, IEntityActions, EntityActions } from "../Common/actions";

export enum StudentActionTypes {
	STUDENT_ADD_GRADE = 'STUDENT_ADD_GRADE',
	STUDENT_REMOVE_GRADE = 'STUDENT_REMOVE_GRADE'
}

export interface IAddGrade {
	type: StudentActionTypes.STUDENT_ADD_GRADE;
	grade: IGrade
}

export interface IRemoveGrade {
	type: StudentActionTypes.STUDENT_ADD_GRADE;
	grade: IGrade
}

export type StudentActions = Actions | IAddGrade | IRemoveGrade

export interface IStudentActions extends IEntityActions<IStudent> {
	addGrade: (grade: IGrade) => IAddGrade,
	removeGrade: (grade: IGrade) => IRemoveGrade,
}
/*
export const AllStudentActions: IStudentActions = Object.assign({}, EntityActions: IEntityActions<IStudent>, {
		addGrade: (grade: IGrade) : IAddGrade => { 
			return { 
				type: StudentActionTypes.STUDENT_ADD_GRADE,
				grade
			}
		},
		removeGrade: (grade: IGrade) : IRemoveGrade => { 
			return { 
				type: StudentActionTypes.STUDENT_ADD_GRADE,
				grade
			}
		}
	})
*/

