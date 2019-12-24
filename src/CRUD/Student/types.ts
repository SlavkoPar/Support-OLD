
export interface IStudent {
	studentId: number; 
	firstName: string;
	lastName: string;
	email: string;
	url: string;
}

export interface IStudentState {
	readonly students: IStudent[];
	readonly student?: IStudent;
	loading: boolean;
	formMode: string;
	canEdit: boolean;
}