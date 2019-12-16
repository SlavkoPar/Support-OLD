// import * as React from 'react';
import { connect } from 'react-redux';

import { IAppState } from '../../store/Store';
import { IQuestion } from '../reducer'
import { IAnswer } from '../../Answers/reducer'

// import { IQuestion } from '../reducers/questionReducer';
import { Dispatch } from 'redux';  // ActionCreatorsMapObject, 

import { QuestionActions,  getQuestion} from '../actions'  // getAllQuestions, IGetQuestion

import QuestionList from '../components/QuestionList'


const joinAnswers = (question: IQuestion | undefined, answers: IAnswer[]) : IAnswer[]=> {
	if (question === undefined || question.answers.length === 0 || answers === undefined)
		return [];
	const answerIds = question.answers; 
	return answers.filter(answer => answerIds.includes(answer.answerId));
}

// Grab the questions from the store and make them available on props
const mapStateToProps = (store: IAppState) => {
  return {
	 questionGroups: store.questionState.questionGroups,
	 question: store.questionState.question,
	 questionAnswers: joinAnswers(store.questionState.question, store.answerState.answers),
	 answers: store.answerState.answers
  };
};

const mapDispatchToProps = (dispatch: Dispatch<QuestionActions>) => {
	return {
		onSelectQuestion: (questionId: number) => dispatch<any>(getQuestion(questionId))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionList);