import { storageQuestionsByGroups } from './../Questions/actions';
// Import Reducer type
import { Reducer } from 'redux';
import {
  GroupActions,
  GroupActionTypes,
} from './actions';

import { IQuestionState } from '../Questions/reducer'

import { IQuestion, IQuestionGroup } from '../Questions/types'


export const groupReducer: Reducer<IQuestionState, GroupActions> = (
  state,
  action
) => {
	switch (action.type) {

		case GroupActionTypes.ADD_GROUP: {
			// const group =  state.questionGroups.find(g => g.groupId === action.groupId);
			return {
				...state,
				formModeGroup: 'add'
			};
		} 

		case GroupActionTypes.EDIT_GROUP: {
			return {
			  ...state,
			  formModeGroup: 'edit',
			  question: {...action.question}
			};
		}

		case GroupActionTypes.STORE_GROUP: {
			// const group = state.questionGroups.find(g => g.groupId === action.question.groupId);
			if (state.formModeGroup === 'add') {
				return {
					...state,
					formModeGroup: 'display',
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
					formModeGroup: 'edit',
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

		case GroupActionTypes.CANCEL_GROUP: {
			return {
			  ...state,
			  formModeGroup: 'display',
			};
		}
	
		case GroupActionTypes.REMOVE_GROUP: {
			return {
			  ...state,
			  formModeGroup: 'display',
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