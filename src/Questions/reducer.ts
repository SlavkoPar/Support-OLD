// Import Reducer type
import { Reducer } from 'redux';
import {
  QuestionActions,
  QuestionActionTypes,
} from './actions';

import { IQuestion, IQuestionGroup } from './types'

export const initialQuestion: IQuestion = {
	groupId: 0,
	questionId: 0,
	text: '',
	words: [],
	answers: []
 };

// Define the Question State
export interface IQuestionState {
  readonly questionGroups: IQuestionGroup[];
  readonly question: IQuestion | undefined;
  loading: boolean,
  formMode: string;
  formModeGroup: string;
}


// Define the initial state
const initialQuestionState: IQuestionState = {
	questionGroups: [],
	question: undefined,
	loading: false,
	formMode: 'display',
	formModeGroup: 'display'
};


/*
const getQuestion = (
			questionGroups: IQuestionGroup[], 
			groupId: number, 
			questionId: number) : IQuestion|undefined => {
	const group = questionGroups.find(g => g.groupId === groupId)
	if (!group)
		return undefined;

	const question = group
							.questions
							.find(q => q.questionId === questionId);
	return question;
}
*/


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

		case QuestionActionTypes.ADD_QUESTION: {
			// const group =  state.questionGroups.find(g => g.groupId === action.groupId);
			return {
				...state,
				formMode: 'add',
				question: {...initialQuestion, groupId: action.groupId, questionId: action.questionId }
			};
		} 

		case QuestionActionTypes.EDIT_QUESTION: {
			return {
			  ...state,
			  formMode: 'edit',
			  question: {...action.question}
			};
		}

		case QuestionActionTypes.STORE_QUESTION: {
			// const group = state.questionGroups.find(g => g.groupId === action.question.groupId);
			if (state.formMode === 'add') {
				return {
					...state,
					formMode: 'edit',
					questionGroups: state.questionGroups.map(g => g.groupId !== action.question.groupId ? 
						{ ...g, questions: [...g.questions] } 
						: 
						{ ...g, questions: [...g.questions, { ...action.question }]	}
					)
				};
			}
			else {
				return {
					...state,
					formMode: 'edit',
					questionGroups: state.questionGroups.map(g => g.groupId !== action.question.groupId ? 
						{ ...g, questions: [...g.questions] } 
						: 
						{ ...g, questions: g.questions
										.map(q => q.questionId !== action.question.questionId ? 
											q : { ...action.question }
										)
						}
					)};
			}
		}    

		case QuestionActionTypes.CANCEL_QUESTION: {
			return {
			  ...state,
			  formMode: 'display',
			};
		}
	
		case QuestionActionTypes.REMOVE_QUESTION: {
			return {
			  ...state,
			  formMode: 'display',
			  questionGroups: state.questionGroups.map(g => g.groupId !== action.groupId ? 
					{ ...g, questions: [...g.questions] } 
					: 
					{ ...g, questions: g.questions.filter(q => q.questionId !== action.questionId)	}
				)
			};
		}   

			 
		default:
			return state;
	}
};

