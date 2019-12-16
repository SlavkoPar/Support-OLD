// Import Reducer type
import { Reducer } from 'redux';
import {
  QuestionActions,
  QuestionActionTypes,
} from './actions';

// import { IAnswer } from './answerReducer'

// Define the Question type
export interface IQuestion {
	questionId: number,
	text: string,
	words?: string[],
	answers: number[]
}

export interface IQuestionGroup {
	title: string;
	questions: IQuestion[];
}

// Define the Question State
export interface IQuestionState {
  readonly questionGroups: IQuestionGroup[];
  readonly question: IQuestion | undefined;
  loading: boolean,
  adding: boolean
}

// Define the initial state
const initialQuestionState: IQuestionState = {
	questionGroups: [],
	question: undefined,
	loading: false,
	adding: false
};



export const questionReducer: Reducer<IQuestionState, QuestionActions> = (
  state = initialQuestionState,
  action
) => {
	switch (action.type) {
		case QuestionActionTypes.GET_ALL_QUESTIONS: {
			
			for (let section of action.questionGroups)
				for (let question of section.questions) 
					question.words = question.text.split(' ');

			return {
				...state,
				questionGroups: action.questionGroups,
			};
		}

		case QuestionActionTypes.GET_QUESTION: {
			return {
				...state,
				question: action.question,
			};
		}
			 
		default:
			return state;
	}
};