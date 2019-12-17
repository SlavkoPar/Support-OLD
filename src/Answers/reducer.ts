// Import Reducer type
import { Reducer } from 'redux';
import {
  AnswerActions,
  AnswerActionTypes,
} from './actions';

import {IAnswer, IAnswerState } from './types'

const initialAnswer: IAnswer = {
	answerId: 0,
	text: '',
	options: []
};

const initialAnswerState: IAnswerState = {
	answers: [],
	loading: false,
	formMode: 'display'
};


export const answerReducer: Reducer<IAnswerState, AnswerActions> = (
  state = initialAnswerState,
  action
) => {
  switch (action.type) {
   case AnswerActionTypes.GET_ALL_ANSWERS: {
      return {
        ...state,
        answers: action.answers,
      };
	} 
 	case AnswerActionTypes.GET_ANSWER: {
      return {
		  ...state,
        answer: action.answer
      };
	}    
	case AnswerActionTypes.ADD_ANSWER: {
      return {
		  	...state,
		  	formMode: 'add',
        	answer: { 
			  ...initialAnswer, 
			  answerId: state.answers.length === 0 ? 1 : Math.max(...state.answers.map(a => a.answerId)) + 1,
			}
      };
	}    	
   case AnswerActionTypes.EDIT_ANSWER: {
      return {
		  ...state,
		  formMode: 'edit',
        answer: action.answer
      };
	}    
	case AnswerActionTypes.STORE_ANSWER: {
		let answers = [];
		if (state.formMode === 'add') {
			answers = [...state.answers, action.answer]
		}
		else {
			answers = state.answers.map(a => a.answerId === action.answer.answerId ? action.answer : a)
		}
      return {
		  ...state,
		  formMode: 'edit',
        answers: answers
      };
	}    
	case AnswerActionTypes.CANCEL_ANSWER: {
      return {
        ...state,
		  formMode: 'display',
      };
	}

	case AnswerActionTypes.REMOVE_ANSWER: {
      return {
		  ...state,
		  formMode: 'display',
		  answers: state.answers.filter(a => a.answerId !== action.answerId)
      };
	}    
	default:
   	return state;
  }
};