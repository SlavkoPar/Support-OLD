// Import redux types
import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
// import axios from 'axios';

// Import Question Typing
import { IQuestion, IQuestionGroup } from '../Questions/types';
import { IQuestionState } from '../Questions/reducer';

import { storageQuestionsByGroups } from '../Questions/actions'

// Create Action Constants
export enum GroupActionTypes {
	ADD_GROUP = 'ADD_GROUP',
	EDIT_GROUP = 'EDIT_GROUP',
	REMOVE_GROUP = 'REMOVE_GROUP',
	STORE_GROUP = 'STORE_GROUP',
	CANCEL_GROUP = 'CANCEL_GROUP',
}


export interface IAdd {
	type: GroupActionTypes.ADD_GROUP;
	groupId: number,
	questionId: number,
}

export interface IEdit {
	type: GroupActionTypes.EDIT_GROUP;
	question: IQuestion
}

export interface IRemove {
	type: GroupActionTypes.REMOVE_GROUP;
	groupId: number,
	questionId: number,
}

export interface IStore {
	type: GroupActionTypes.STORE_GROUP;
	question: IQuestion;
}

export interface ICancel {
	type: GroupActionTypes.CANCEL_GROUP;
}


// Combine the action types with a union (we assume there are more)
export type GroupActions = IAdd | IEdit | IRemove | IStore | ICancel;


export const addGroup: ActionCreator<
  ThunkAction<Promise<any>, IQuestionState, null, IAdd>
> = (groupId: number) => {
  return async (dispatch: Dispatch) => {
    try {
		// const response = await axios.get('https://swapi.co/api/people/');
		const response = await getQuestionGroupFromLocalStorage();
		const groups: IQuestionGroup[] = response.data.results;
		let questionIdMax = 0;
		for (let g of groups) {
			let max = Math.max(...g.questions.map(q => q.questionId))
			if (max > questionIdMax)
				questionIdMax = max;
		}

		// const answers: IQuestion[] = response.data.results;
		// warning: store answer, after upodate, to local storage
      dispatch({
		  type: GroupActionTypes.ADD_GROUP,
		  groupId: groupId, 
        questionId: questionIdMax + 1
      });
    } catch (err) {
      console.error(err);
    }
  };
};

export const editGroup: ActionCreator<
  ThunkAction<Promise<any>, IQuestionState, null, IEdit>
> = (groupId: number, questionId: number) => {
  return async (dispatch: Dispatch) => {
    try {
		// const response = await axios.get('https://swapi.co/api/people/');
		const response = await getQuestionFromLocalStorage(questionId); 
		// const answers: IQuestion[] = response.data.results;
		// warning: store answer, after upodate, to local storage
      dispatch({
        type: GroupActionTypes.EDIT_GROUP,
        question: response.data.results // answers.find(a => a.questionId === questionId),
      });
    } catch (err) {
      console.error(err);
    }
  };
};

export const removeGroup: ActionCreator<
  ThunkAction<Promise<any>, IQuestionState, null, IRemove>
> = (groupId: number, questionId: number) => {
  return async (dispatch: Dispatch) => {
    try {
		// const response = await axios.get('https://swapi.co/api/people/');
		await removeQuestionFromLocalStorage(questionId); 
		// warning: store answer, after upodate, to local storage
      dispatch({
        type: GroupActionTypes.REMOVE_GROUP,
        groupId: groupId,
        questionId: questionId,
      });
    } catch (err) {
      console.error(err);
    }
  };
};

export const storeGroup: ActionCreator<
  ThunkAction<Promise<any>, IQuestionState, null, IStore>
> = (question: IQuestion, formModeGroup: string) => {
  return async (dispatch: Dispatch) => {
    try {
		 if (formModeGroup === 'add') {
			// const response = await axios.get('https://swapi.co/api/people/');
			await addQuestionToLocalStorage(question); 
			dispatch({
				type: GroupActionTypes.STORE_GROUP,
				question: question,
			});
		 }
		 else {
			// const response = await axios.get('https://swapi.co/api/people/');
			await updateQuestionFromLocalStorage(question); 
			dispatch({
				type: GroupActionTypes.STORE_GROUP,
				question
			});
		 }
    } catch (err) {
      console.error(err);
    }
  };
};

const addGroupToLocalStorage = (question: IQuestion): Promise<any> => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve({
				'status': 200,
				'content-type': 'application/json',
				'data' : {
				'results': question
				}
			})
		}, 50)
	})
}

export const cancelGroup: ActionCreator<any> = () => {
	return (dispatch: Dispatch) => {
	  try {
		 dispatch({
			type: GroupActionTypes.CANCEL_GROUP
		 });
	  } catch (err) {
		 console.error(err);
	  }
	};
 };

const getQuestionGroupFromLocalStorage = (): Promise<any> => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
  		  resolve({
  			 'status': 200,
  			 'content-type': 'application/json',
  			 'data' : {
  				'results': storageQuestionsByGroups
  			 }
  		  })
  		}, 250)
  	 })
  
  }


 
  const updateGroupFromLocalStorage = (question: IQuestion): Promise<any> => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve({
				'status': 200,
				'content-type': 'application/json',
				'data' : {
				'results': question
				}
			})
		}, 50)
	})
}

const removeGroupFromLocalStorage = (questionId: number): Promise<any> => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve({
				'status': 200,
				'content-type': 'application/json',
				'data' : {
				'results': questionId
				}
			})
		}, 50)
	})
}


