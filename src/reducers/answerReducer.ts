// Import Reducer type
import { Reducer } from 'redux';
import {
  AnswerActions,
  AnswerActionTypes,
} from '../actions/AnswerActions';


// Define the Answer State
export interface IAnswer {
	answerId: number, 
	text: string;
	options?: string[]
}

export interface IAnswerState {
	readonly answers: IAnswer[];
	readonly answer?: IAnswer;
	loading: boolean;
	adding: boolean;
}

 // Define the initial state
const initialAnswerState: IAnswerState = {
	answers: [],
	loading: false,
	adding: false,
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
   case AnswerActionTypes.SET_ADDING: {
      return {
		  ...state,
		  adding: action.adding,
        answer: { answerId: Math.max(...state.answers.map(a => a.answerId)) + 1, text:  ''}
      };
	}    
	case AnswerActionTypes.ADD_ANSWER: {
      return {
        ...state,
        answers: [...state.answers, action.answer]
      };
	}    
	default:
   	return state;
  }
};