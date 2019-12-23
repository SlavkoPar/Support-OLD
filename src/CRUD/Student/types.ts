
export interface IStudent {
	studentId: number; 
	firstName: string;
	lastName: string;
	email: string;
	url: string;
}

export interface IStudentState {
	students: IStudent[];
	student?: IStudent;
	loading: boolean;

	// readonly entities: IEntity[];
	// readonly entity?: IEntity;
	// loading: boolean;
	// formMode: string;
}