import { IGrade } from "./types";
import { Actions, EntityActions } from "../Common/actions";

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

export type ActionsExtended = Actions | IAddGrade | IRemoveGrade

// export interface IStudentActions extends IEntityActions<IStudent> {
// 	addGrade: (grade: IGrade) => IAddGrade,
// 	removeGrade: (grade: IGrade) => IRemoveGrade,
// }


export const StudentActions = Object.assign({}, EntityActions, {
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
})

/*
export const StudentActions: IEntityActions<IEntity> = Object.assign({}, EntityActions, {
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

