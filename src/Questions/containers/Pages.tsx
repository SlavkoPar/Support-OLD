// import * as React from 'react';
import { connect } from 'react-redux';

import { IAppState } from '../../store/Store';
import { IQuestion, IQuestionGroup } from '../types'
import { IAnswer } from '../../Answers/types'

import { Dispatch } from 'redux';  // ActionCreatorsMapObject, 

import { QuestionActions,  
	getQuestion, 
	addQuestion, 
	editQuestion,
	removeQuestion,
	storeQuestion,
	cancelQuestion,
	addGroup,
	editGroup,
	removeGroup,
	storeGroup,
	removeQuestionAnswer
} from '../actions'

import QuestionsPage from '../components/QuestionsPage'
import PromoterPage from '../components/PromoterPage'


const joinAnswers = (question: IQuestion | undefined, answers: IAnswer[]) : IAnswer[]=> {
	if (question === undefined || question.answers.length === 0 || answers === undefined)
		return [];
	const answerIds = question.answers; 
	return answers.filter(answer => answerIds.includes(answer.answerId));
}

interface IProps {
	canEdit: boolean
}

// Grab the questions from the store and make them available on props
const mapStateToProps = (store: IAppState, ownProps: IProps ) => {
	return {
		questionGroups: store.questionState.questionGroups,
		question: store.questionState.question!,
		questionAnswers: joinAnswers(store.questionState.question, store.answerState.answers),
		answers: store.answerState.answers,
		formMode: store.questionState.formMode,
		groupIdEditing: store.questionState.groupIdEditing,
		canEdit: ownProps.canEdit,
	};
};

const mapDispatchToProps = (dispatch: Dispatch<QuestionActions>) => {
	return {
		onSelectQuestion: (questionId: number) => dispatch<any>(getQuestion(questionId)),
		add: (questionGroupId: number) => dispatch<any>(addQuestion(questionGroupId)),
		edit: (questionGroupId: number, questionId: number) => dispatch<any>(editQuestion(questionGroupId, questionId)),
		remove: (questionGroupId: number, questionId: number) => dispatch<any>(removeQuestion(questionGroupId, questionId)),
		saveForm: (question: IQuestion, formMode: string) => dispatch<any>(storeQuestion(question, formMode)),
		cancel: () => dispatch<any>(cancelQuestion()),

		// groups
		addGroup: () => dispatch<any>(addGroup()),
		editGroup: (groupId: number) =>  dispatch<any>(editGroup(groupId)),
		removeGroup: (groupId: number) => dispatch<any>(removeGroup(groupId)),
		storeGroup: (group: IQuestionGroup) => dispatch<any>(storeGroup(group)),

		// question answers
		removeQuestionAnswer: (groupId: number, questionId: number, answerId: number) => 
			dispatch<any>(removeQuestionAnswer(groupId, questionId, answerId))
	}
}

export default {
	questions: connect(mapStateToProps, mapDispatchToProps)(QuestionsPage),
	promoter: connect(mapStateToProps, mapDispatchToProps)(PromoterPage)
};