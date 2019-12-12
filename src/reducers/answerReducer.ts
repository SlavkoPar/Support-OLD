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
	loading: boolean
}

 // Define the initial state
const initialAnswerState: IAnswerState = {
	answers: [],
	loading: false
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
	default:
   	return state;
  }
};