// Import redux types
import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
// import axios from 'axios';

// Import Answer Typing
import { IAnswer, IAnswerState } from '../reducers/answerReducer';

// Create Action Constants
export enum AnswerActionTypes {
  GET_ALL_ANSWERS = 'GET_ALL_ANSWERS',
  GET_ANSWER = 'GET_ANSWER',
  ADD_ANSWER = 'ADD_ANSWER',
  SET_ADDING = 'SET_ADDING'
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

 export interface ISetAdding {
	type: AnswerActionTypes.SET_ADDING;
	adding: boolean;
}

 export interface IAddAnswer {
	type: AnswerActionTypes.ADD_ANSWER;
	answer: IAnswer;
}

// Combine the action types with a union (we assume there are more)
export type AnswerActions = IAnswerGetAll | IGetAnswer | IAddAnswer | ISetAdding;

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


export const setAdding: ActionCreator<
  ThunkAction<any, IAnswerState, null, ISetAdding>
> = (adding: boolean) => {
  return (dispatch: Dispatch) => {
    try {
      dispatch({
        type: AnswerActionTypes.SET_ADDING,
        adding: adding
      });
    } catch (err) {
      console.error(err);
    }
  };
};

export const addAnswer: ActionCreator<
  ThunkAction<Promise<any>, IAnswerState, null, IAddAnswer>
> = (answer: IAnswer) => {
  return async (dispatch: Dispatch) => {
    try {
		// const response = await axios.get('https://swapi.co/api/people/');
		const response = await addAnswerToLocalStorage(answer); 
      dispatch({
        type: AnswerActionTypes.ADD_ANSWER,
        answer: response.data.results,
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

  const addAnswerToLocalStorage = (answer: IAnswer): Promise<any> => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
  		  resolve({
  			 'status': 200,
  			 'content-type': 'application/json',
  			 'data' : {
  				'results': answer
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


