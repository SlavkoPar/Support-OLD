// Import redux types
import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
// import axios from 'axios';

// Import Question Typing
import { IQuestion, IQuestionGroup } from './types';
import { IQuestionState } from './reducer';


// Create Action Constants
export enum QuestionActionTypes {
	GET_ALL_QUESTIONS = 'GET_ALL_QUESTIONS',
	GET_QUESTION = 'GET_QUESTION',
	ADD_QUESTION = 'ADD_QUESTION',
	EDIT_QUESTION = 'EDIT_QUESTION',
	REMOVE_QUESTION = 'REMOVE_QUESTION',
	STORE_QUESTION = 'STORE_QUESTION',
	CANCEL_QUESTION = 'CANCEL_QUESTION',
	// groups
	ADD_GROUP = 'ADD_GROUP',
	EDIT_GROUP = 'EDIT_GROUP',
	REMOVE_GROUP = 'REMOVE_GROUP',
	STORE_GROUP = 'STORE_GROUP',	
}

// Interface for Get All Action Type
export interface IGetAll {
  type: QuestionActionTypes.GET_ALL_QUESTIONS;
  questionGroups: IQuestionGroup[];
}

export interface IGet {
	type: QuestionActionTypes.GET_QUESTION;
	question: IQuestion;
}

export interface IAdd {
	type: QuestionActionTypes.ADD_QUESTION;
	groupId: number,
	questionId: number,
}

export interface IEdit {
	type: QuestionActionTypes.EDIT_QUESTION;
	question: IQuestion
}

export interface IRemove {
	type: QuestionActionTypes.REMOVE_QUESTION;
	groupId: number,
	questionId: number,
}

export interface IStore {
	type: QuestionActionTypes.STORE_QUESTION;
	question: IQuestion;
}

export interface ICancel {
	type: QuestionActionTypes.CANCEL_QUESTION;
}

// group
export interface IAddGroup {
	type: QuestionActionTypes.ADD_GROUP;
	groupId: number
}

export interface IEditGroup {
	type: QuestionActionTypes.EDIT_GROUP;
	group: IQuestionGroup
}

export interface IRemoveGroup {
	type: QuestionActionTypes.REMOVE_GROUP;
	groupId: number
}

export interface IStoreGroup {
	type: QuestionActionTypes.STORE_GROUP;
	group: IQuestionGroup;
}


// Combine the action types with a union (we assume there are more)
export type QuestionActions = IGetAll | IGet | IAdd | IEdit | IRemove | IStore | ICancel |
					IAddGroup | IEditGroup | IRemoveGroup | IStoreGroup;

function isWebStorageSupported() {
	return 'localStorage' in window
}

// Get All Action <Promise<Return Type>, State Interface, Type of Param, Type of Action>
export const getAllQuestions: ActionCreator<
  ThunkAction<Promise<any>, IQuestionState, null, IGetAll>
> = () => {
  return async (dispatch: Dispatch) => {
    try {
		// const response = await axios.get('https://swapi.co/api/people/');
		if (isWebStorageSupported()) {
			const sQuestions = localStorage.getItem(SUPPORT_QUESTIONS);
			if (sQuestions !== null) {
				console.log('localStorage:', sQuestions);
				const questionGroups: IQuestionGroup[] = JSON.parse(sQuestions);
				questionGroups.map(g => storageQuestionsByGroups.push(g))
			}
			else {
				storageQuestionsByGroupsDemo.map(g => storageQuestionsByGroups.push(g))	
			}
		}
		else {
			storageQuestionsByGroupsDemo.map(g => storageQuestionsByGroups.push(g))
		}

		const response = await getQuestionGroupFromLocalStorage(); 
      dispatch({
        type: QuestionActionTypes.GET_ALL_QUESTIONS,
        questionGroups: response.data.results,
      });
    } catch (err) {
      console.error(err);
    }
  };
};

// Get Question <Promise<Return Type>, State Interface, Type of Param, Type of Action> 
export const getQuestion: ActionCreator<
  ThunkAction<Promise<any>, IQuestionState, string, IGet>
> = (questionId: number) => {
  return async (dispatch: Dispatch) => {
    try {
		// const response = await axios.get('https://swapi.co/api/people');
		const response = await getQuestionFromLocalStorage(questionId);
      dispatch({
			type: QuestionActionTypes.GET_QUESTION,
			question: response.data.results,
      });
    } catch (err) {
      console.error(err);
    }
  };
};



export const addQuestion: ActionCreator<
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
		  type: QuestionActionTypes.ADD_QUESTION,
		  groupId: groupId, 
        questionId: questionIdMax + 1
      });
    } catch (err) {
      console.error(err);
    }
  };
};

export const editQuestion: ActionCreator<
  ThunkAction<Promise<any>, IQuestionState, null, IEdit>
> = (groupId: number, questionId: number) => {
  return async (dispatch: Dispatch) => {
    try {
		// const response = await axios.get('https://swapi.co/api/people/');
		const response = await getQuestionFromLocalStorage(questionId); 
		// const answers: IQuestion[] = response.data.results;
		// warning: store answer, after upodate, to local storage
      dispatch({
        type: QuestionActionTypes.EDIT_QUESTION,
        question: response.data.results // answers.find(a => a.questionId === questionId),
      });
    } catch (err) {
      console.error(err);
    }
  };
};

export const removeQuestion: ActionCreator<
  ThunkAction<Promise<any>, IQuestionState, null, IRemove>
> = (groupId: number, questionId: number) => {
  return async (dispatch: Dispatch) => {
    try {
		// const response = await axios.get('https://swapi.co/api/people/');
		await removeQuestionFromLocalStorage(questionId); 
		// warning: store answer, after upodate, to local storage
      dispatch({
        type: QuestionActionTypes.REMOVE_QUESTION,
        groupId: groupId,
        questionId: questionId,
      });
    } catch (err) {
      console.error(err);
    }
  };
};

export const storeQuestion: ActionCreator<
  ThunkAction<Promise<any>, IQuestionState, null, IStore>
> = (question: IQuestion, formMode: string) => {
  return async (dispatch: Dispatch) => {
    try {
		 if (formMode === 'add') {
			// const response = await axios.get('https://swapi.co/api/people/');
			await addQuestionToLocalStorage(question); 
			dispatch({
				type: QuestionActionTypes.STORE_QUESTION,
				question: question,
			});
		 }
		 else {
			// const response = await axios.get('https://swapi.co/api/people/');
			await updateQuestionFromLocalStorage(question); 
			dispatch({
				type: QuestionActionTypes.STORE_QUESTION,
				question
			});
		 }
    } catch (err) {
      console.error(err);
    }
  };
};

const addQuestionToLocalStorage = (question: IQuestion): Promise<any> => {
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

export const cancelQuestion: ActionCreator<any> = () => {
	return (dispatch: Dispatch) => {
	  try {
		 dispatch({
			type: QuestionActionTypes.CANCEL_QUESTION
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
  		}, 100)
  	 })
  
  }


  const getQuestionFromLocalStorage = (questionId: number): Promise<any> => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			let question = undefined;
			for (let section of storageQuestionsByGroups) {
				question = section
								.questions
								.find(question => question.questionId === questionId);
				if (question !== undefined)
					break;
			}
			// assert q !== undefined

  		  resolve({
  			 'status': 200,
  			 'content-type': 'application/json',
  			 'data' : {
  				'results': question
  			 }
  		  })
  		}, 250)
  	 })
  }  

  const updateQuestionFromLocalStorage = (question: IQuestion): Promise<any> => {
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

const removeQuestionFromLocalStorage = (questionId: number): Promise<any> => {
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



export const addGroup: ActionCreator<
  ThunkAction<Promise<any>, IQuestionState, null, IAddGroup>
> = () => {
  return async (dispatch: Dispatch) => {
    try {
		// const response = await axios.get('https://swapi.co/api/people/');
		const response = await getQuestionGroupsFromLocalStorage();
		const groups: IQuestionGroup[] = response.data.results;
		let max = Math.max(...groups.map(g => g.groupId))
      dispatch({
		  type: QuestionActionTypes.ADD_GROUP,
		  groupId: max + 1, 
      });
    } catch (err) {
      console.error(err);
    }
  };
};

export const editGroup: ActionCreator<
  ThunkAction<Promise<any>, IQuestionState, null, IEditGroup>
> = (groupId: number) => {
  return async (dispatch: Dispatch) => {
    try {
		const response = await getQuestionGroupsFromLocalStorage();
		const groups: IQuestionGroup[] = response.data.results;
      dispatch({
        type: QuestionActionTypes.EDIT_GROUP,
        group: groups.find(g => g.groupId === groupId)
      });
    } catch (err) {
      console.error(err);
    }
  };
};

export const removeGroup: ActionCreator<
  ThunkAction<Promise<any>, IQuestionState, null, IRemoveGroup>
> = (groupId: number) => {
  return async (dispatch: Dispatch) => {
    try {
		// const response = await axios.get('https://swapi.co/api/people/');
		await removeGroupFromLocalStorage(groupId); 
		// warning: store answer, after update, to local storage
      dispatch({
        type: QuestionActionTypes.REMOVE_GROUP,
        groupId: groupId
      });
    } catch (err) {
      console.error(err);
    }
  };
};

export const storeGroup: ActionCreator<
  ThunkAction<Promise<any>, IQuestionState, null, IStoreGroup>
> = (group: IQuestionGroup) => {
  return async (dispatch: Dispatch) => {
    try {
		// const response = await axios.get('https://swapi.co/api/people/');
		await updateGroupFromLocalStorage(group); 
		dispatch({
			type: QuestionActionTypes.STORE_GROUP,
			group
		});
    } catch (err) {
      console.error(err);
    }
  };
};

const getQuestionGroupsFromLocalStorage = (): Promise<any> => {
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

const removeGroupFromLocalStorage = (groupId: number): Promise<any> => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve({
				'status': 200,
				'content-type': 'application/json',
				'data' : {
				'results': groupId
				}
			})
		}, 50)
	})
}

const addGroupToLocalStorage = (group: IQuestionGroup): Promise<any> => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve({
				'status': 200,
				'content-type': 'application/json',
				'data' : {
				'results': group
				}
			})
		}, 50)
	})
}

const updateGroupFromLocalStorage = (group: IQuestionGroup): Promise<any> => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve({
				'status': 200,
				'content-type': 'application/json',
				'data' : {
				'results': group
				}
			})
		}, 50)
	})
}


///////////////////////////////////////////////////
// localStorage
 
const SUPPORT_QUESTIONS = 'SUPPORT_QUESTIONS' 
 
export const storeQuestionsToLocalStorage = () => {
	localStorage.setItem(SUPPORT_QUESTIONS, JSON.stringify(storageQuestionsByGroups));
};
 
// localStorage.removeItem(SUPPORT_QUESTIONS);
  
export const storageQuestionsByGroups: IQuestionGroup[] = [
]

export const storageQuestionsByGroupsDemo: IQuestionGroup[] = [
	{
		groupId: 11,
		title: 'General settings',
		questions: [
			{
				groupId: 11,
				questionId: 101,
				text: 'Why promocode hasn\'t been applied?',
				words : [],
				answers: [111, 112, 114]
			}
		 ]
		}, {
			groupId: 22,
			title: 'Taxes',
			questions: [
				{
					groupId: 22,
					questionId: 201,
					text: 'Which promocode do we apply?',
					words : [],
					answers: []
				}, {
					groupId: 22,
					questionId: 202,
					text: 'Which promocode for client do we apply?',
					words : [],
					answers: [111]
				}
			]
		}, {
			groupId: 33,
			title: 'Client settings',
			questions: [
			{
				groupId: 33,
				questionId: 301,
				text: 'Does client has promocode?',
				words : [],
				answers: [222]
			}, {
				groupId: 33,
				questionId: 302,
				text: 'What promocode do we use?',
				words : [],
				answers: [114]
			}, {
				groupId: 33,
				questionId: 303,
				text: 'Why taxes are less than 5%?',
				words : [],
				answers: [111, 114]
			}, {
				groupId: 33,
				questionId: 304,
				text: 'When do we do something?',
				words : [],
				answers: [113]
			}
			]
	}
];