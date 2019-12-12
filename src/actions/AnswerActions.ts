// Import redux types
import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
// import axios from 'axios';

// Import Answer Typing
import { IAnswer, IAnswerState } from '../reducers/answerReducer';

// Create Action Constants
export enum AnswerActionTypes {
  GET_ALL_ANSWERS = 'GET_ALL_ANSWERS',
  GET_ANSWER = 'GET_ANSWER'
}

// Interface for Get All Action Type
export interface IAnswerGetAll {
	type: AnswerActionTypes.GET_ALL_ANSWERS;
	answers: IAnswer[];
 }
 
 export interface IGetAnswer {
	 type: AnswerActionTypes.GET_ANSWER;
	 answer: IAnswer;
 }


// Combine the action types with a union (we assume there are more)
export type AnswerActions = IAnswerGetAll | IGetAnswer;

// Get All Action <Promise<Return Type>, State Interface, Type of Param, Type of Action>
export const getAllAnswers: ActionCreator<
  ThunkAction<Promise<any>, IAnswerState, null, IAnswerGetAll>
> = () => {
  return async (dispatch: Dispatch) => {
    try {
		// const response = await axios.get('https://swapi.co/api/people/');
		const response = await getAnswersFromLocalStorage(); 
      dispatch({
        type: AnswerActionTypes.GET_ALL_ANSWERS,
        answers: response.data.results,
      });
    } catch (err) {
      console.error(err);
    }
  };
};

const getAnswersFromLocalStorage = (): Promise<any> => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
  		  resolve({
  			 'status': 200,
  			 'content-type': 'application/json',
  			 'data' : {
  				'results': answers
  			 }
  		  })
  		}, 50)
  	 })
  
  }

  const answers: IAnswer[] = [
	{
		answerId: 111,
		text: 'You should do the following',
		options : []
	}, {
		answerId: 112,
		text: 'Also do the rest of important',
		options : []
	},	{
		answerId: 113,
		text: 'Try something else',
		options : []
	}, {
		answerId: 114,
		text: 'Contact our support',
		options : []
	}
];