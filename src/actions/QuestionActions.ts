// Import redux types
import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
// import axios from 'axios';

// Import Question Typing
import { IQuestion, IQuestionGroup, IQuestionState } from '../reducers/questionReducer';


// Create Action Constants
export enum QuestionActionTypes {
	GET_ALL_QUESTIONS = 'GET_ALL_QUESTIONS',
  GET_QUESTION = 'GET_QUESTION',
  GET_ANSWERS = 'GET_ANSWERS'
}

// Interface for Get All Action Type
export interface IQuestionGetAllAction {
  type: QuestionActionTypes.GET_ALL_QUESTIONS;
  questionGroups: IQuestionGroup[];
}

export interface IGetQuestion {
	type: QuestionActionTypes.GET_QUESTION;
	question: IQuestion;
}


// Combine the action types with a union (we assume there are more)
export type QuestionActions = IQuestionGetAllAction | IGetQuestion;

// Get All Action <Promise<Return Type>, State Interface, Type of Param, Type of Action>
export const getAllQuestions: ActionCreator<
  ThunkAction<Promise<any>, IQuestionState, null, IQuestionGetAllAction>
> = () => {
  return async (dispatch: Dispatch) => {
    try {
		// const response = await axios.get('https://swapi.co/api/people/');
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
  ThunkAction<Promise<any>, IQuestionState, string, IGetQuestion>
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

const getQuestionGroupFromLocalStorage = (): Promise<any> => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
  		  resolve({
  			 'status': 200,
  			 'content-type': 'application/json',
  			 'data' : {
  				'results': questionGroups
  			 }
  		  })
  		}, 250)
  	 })
  
  }


  const getQuestionFromLocalStorage = (questionId: number): Promise<any> => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			let question = undefined;
			for (let section of questionGroups) {
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

  const questionGroups: IQuestionGroup[] = [
	{
		 title: 'General settings',
		 questions: [
			  {
					questionId: 11,
					text: 'Why promocode hasn\'t been applied?',
					words : [],
					answers: [111, 112, 114]
			  }
		 ]
	}, {
		 title: 'Taxes',
		 questions: [
			  {
					questionId: 21,
					text: 'Which promocode do we apply?',
					words : [],
					answers: []
			  }, {
					questionId: 22,
					text: 'Which promocode for client do we apply?',
					words : [],
					answers: [111]
			  }
		 ]
	}, {
		 title: 'Client settings',
		 questions: [
			{
				questionId: 31,
				text: 'Does client has promocode?',
				words : [],
				answers: [222]
			}, {
				questionId: 32,
				text: 'What promocode do we use?',
				words : [],
				answers: [114]
			}, {
				questionId: 33,
				text: 'Why taxes are less than 5%?',
				words : [],
				answers: [111, 114]
			}, {
				questionId: 34,
				text: 'When do we do something?',
				words : [],
				answers: [113]
			}
		 ]
	}
];