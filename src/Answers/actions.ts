// Import redux types
import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
// import axios from 'axios';

// Import Answer Typing
import { IAnswer, IAnswerState } from './reducer';

// Create Action Constants
export enum AnswerActionTypes {
  GET_ALL_ANSWERS = 'GET_ALL_ANSWERS',
  GET_ANSWER = 'GET_ANSWER',
  ADD_ANSWER = 'ADD_ANSWER',
  EDIT_ANSWER = 'EDIT_ANSWER',
  REMOVE_ANSWER = 'REMOVE_ANSWER',
  STORE_ANSWER = 'STORE_ANSWER',
  CANCEL_ANSWER = 'CANCEL_ANSWER',
}

// Interface for Get All Action Type
export interface IGetAll {
	type: AnswerActionTypes.GET_ALL_ANSWERS;
	answers: IAnswer[];
 }
 
export interface IGet {
	type: AnswerActionTypes.GET_ANSWER;
	answer: IAnswer;
}

export interface IAdd {
	type: AnswerActionTypes.ADD_ANSWER;
}

export interface IEdit {
	type: AnswerActionTypes.EDIT_ANSWER;
	answer: IAnswer;
}

export interface IRemove {
	type: AnswerActionTypes.REMOVE_ANSWER;
	answerId: number;
}

export interface IStore {
	type: AnswerActionTypes.STORE_ANSWER;
	answer: IAnswer;
}

export interface ICancel {
	type: AnswerActionTypes.CANCEL_ANSWER;
}


// Combine the action types with a union (we assume there are more)
export type AnswerActions = IGetAll | IGet | IAdd | IEdit | IRemove | IStore | ICancel;

// Get All Action <Promise<Return Type>, State Interface, Type of Param, Type of Action>
export const getAllAnswers: ActionCreator<
  ThunkAction<Promise<any>, IAnswerState, null, IGetAll>
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


export const addAnswer: ActionCreator<any> = () => {
  return (dispatch: Dispatch) => {
    try {
      dispatch({
        type: AnswerActionTypes.ADD_ANSWER
      });
    } catch (err) {
      console.error(err);
    }
  };
};

export const getAnswer: ActionCreator<
  ThunkAction<Promise<any>, IAnswerState, null, IGet>
> = (answerId: number) => {
  return async (dispatch: Dispatch) => {
    try {
		// const response = await axios.get('https://swapi.co/api/people/');
		const response = await getAnswersFromLocalStorage(); 
		const answers: IAnswer[] = response.data.results;

      dispatch({
        type: AnswerActionTypes.GET_ANSWER,
        answer: answers.find(a => a.answerId === answerId),
      });
    } catch (err) {
      console.error(err);
    }
  };
};

export const editAnswer: ActionCreator<
  ThunkAction<Promise<any>, IAnswerState, null, IEdit>
> = (answerId: number) => {
  return async (dispatch: Dispatch) => {
    try {
		// const response = await axios.get('https://swapi.co/api/people/');
		const response = await getAnswersFromLocalStorage(); 
		const answers: IAnswer[] = response.data.results;
		// warning: store answer, after upodate, to local storage
      dispatch({
        type: AnswerActionTypes.EDIT_ANSWER,
        answer: answers.find(a => a.answerId === answerId),
      });
    } catch (err) {
      console.error(err);
    }
  };
};

export const removeAnswer: ActionCreator<
  ThunkAction<Promise<any>, IAnswerState, null, IGetAll>
> = (answerId: number) => {
  return async (dispatch: Dispatch) => {
    try {
		// const response = await axios.get('https://swapi.co/api/people/');
		await removeAnswerFromLocalStorage(answerId); 
		// warning: store answer, after upodate, to local storage
      dispatch({
        type: AnswerActionTypes.REMOVE_ANSWER,
        answerId: answerId,
      });
    } catch (err) {
      console.error(err);
    }
  };
};


export const storeAnswer: ActionCreator<
  ThunkAction<Promise<any>, IAnswerState, null, IAdd>
> = (answer: IAnswer, formMode: string) => {
  return async (dispatch: Dispatch) => {
    try {
		 if (formMode === 'add') {
			// const response = await axios.get('https://swapi.co/api/people/');
			await addAnswerToLocalStorage(answer); 
			dispatch({
				type: AnswerActionTypes.STORE_ANSWER,
				answer: answer,
			});
		 }
		 else {
			// const response = await axios.get('https://swapi.co/api/people/');
			await updateAnswerFromLocalStorage(answer); 
			dispatch({
				type: AnswerActionTypes.STORE_ANSWER,
				answer
			});
		 }
    } catch (err) {
      console.error(err);
    }
  };
};

export const cancelAnswer: ActionCreator<any> = () => {
	return (dispatch: Dispatch) => {
	  try {
		 dispatch({
			type: AnswerActionTypes.CANCEL_ANSWER
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
  				'results': storageAnswers
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

const updateAnswerFromLocalStorage = (answer: IAnswer): Promise<any> => {
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


const removeAnswerFromLocalStorage = (answerId: number): Promise<any> => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve({
				'status': 200,
				'content-type': 'application/json',
				'data' : {
				'results': answerId
				}
			})
		}, 50)
	})
}

const storageAnswers: IAnswer[] = [
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


