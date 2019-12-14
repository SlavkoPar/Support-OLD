// import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { IAppState } from '../store/Store';

import { AnswerActions,  setAdding, addAnswer } from '../actions/AnswerActions' // , IAddAnswer

import { IAnswer } from '../reducers/answerReducer'

import Answers from '../components/Answers'

const mapStateToProps = (store: IAppState) => {
  return {
	 answers: store.answerState.answers,
	 answer: store.answerState.answer!,
	 adding: store.answerState.adding
  };
};

const mapDispatchToProps = (dispatch: Dispatch<AnswerActions>) => {
	return {
		setAdding: (adding: boolean) => dispatch<any>(setAdding(adding)),
		cancel: () => dispatch<any>(setAdding(false)),
		add: (answer: IAnswer) => dispatch<any>(addAnswer(answer))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Answers);