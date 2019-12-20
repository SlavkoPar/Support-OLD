import { IAnswer } from '../Answers/types'

// Define the Question type
export interface IQuestion {
	groupId: number,
	questionId: number,
	text: string,
	words?: string[],
	answers: number[]
}

export interface IQuestionGroup {
	groupId: number,
	title: string;
	questions: IQuestion[];
}


export const initialQuestion: IQuestion = {
	groupId: 0,
	questionId: 0,
	text: '',
	words: [],
	answers: []
 };

 export interface IComponentProps {
	questionGroups: IQuestionGroup[];
	question?: IQuestion;
	questionAnswers: IAnswer[];
	answers: IAnswer[],
	formMode: string,
	groupIdEditing: number,
	canEdit: boolean,
	onSelectQuestion: (questionId: number) => IQuestion;
	add: (groupId: number) => void;
	edit: (groupId: number, questionId: number) => void;
	remove: (groupId: number, questionId: number) => void;
	saveForm: (question: IQuestion, formMode: string) => void;
	cancel: () => void;
	// groups
	addGroup: () => void;
	editGroup: (groupId: number) => void;
	removeGroup: (groupId: number) => void;
	storeGroup: (group: IQuestionGroup) => void;
	// question answer
	//onSelectAnswer: (answerId: number) => IAnswer;
	removeQuestionAnswer: (groupId: number, questionId: number, answerId: number) => void;
}
