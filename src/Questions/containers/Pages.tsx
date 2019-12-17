// import * as React from 'react';
import { connect } from 'react-redux';

import { IAppState } from '../../store/Store';
import { IQuestion } from '../types'
import { IAnswer } from '../../Answers/reducer'

import { Dispatch } from 'redux';  // ActionCreatorsMapObject, 

import { QuestionActions,  
	getQuestion, 
	addQuestion, 
	editQuestion,
	removeQuestion,
	storeQuestion,
	cancelQuestion
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
 	}
}

export default {
	questions: connect(mapStateToProps, mapDispatchToProps)(QuestionsPage),
	promoter: connect(mapStateToProps, mapDispatchToProps)(PromoterPage)
};