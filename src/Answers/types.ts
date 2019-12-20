// Define the Answer State
export interface IAnswer {
	answerId: number, 
	text: string;
	words?: string[],
	options?: string[]
}

export interface IAnswerState {
	readonly answers: IAnswer[];
	readonly answer?: IAnswer;
	loading: boolean;
	formMode: string;
}