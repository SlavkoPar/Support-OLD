import { IGrade } from "./types";
import { EntityActions, IEntityActions } from "../Generics/actions";
import { IEntity } from "../Generics/types";
import { ActionsUnion } from "../Generics/actionsAccepted";

export enum StudentActionTypes {
	STUDENT_ADD_GRADE = 'STUDENT_ADD_GRADE',
	STUDENT_REMOVE_GRADE = 'STUDENT_REMOVE_GRADE'
}



export interface IAddGrade {
	type: StudentActionTypes.STUDENT_ADD_GRADE;
	grade: IGrade
}

export interface IRemoveGrade {
	type: StudentActionTypes.STUDENT_REMOVE_GRADE;
	grade: IGrade
}

// export type ActionsExtended = Actions | IAddGrade | IRemoveGrade

export type IStudentActions = IEntityActions<IEntity> & {
 	addGrade: (grade: IGrade) => IAddGrade,
 	removeGrade: (grade: IGrade) => IRemoveGrade,
}



export const StudentActions: IStudentActions = {
	...EntityActions,
	addGrade: (grade: IGrade) : IAddGrade => { 
			return { 
				type: StudentActionTypes.STUDENT_ADD_GRADE,
				grade
			}
	},
	removeGrade: (grade: IGrade) : IRemoveGrade => { 
		return { 
			type: StudentActionTypes.STUDENT_REMOVE_GRADE,
			grade
		}
	}
}

export type StudentAcceptedActions = ActionsUnion<typeof StudentActions>;


