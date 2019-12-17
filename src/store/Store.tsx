import { applyMiddleware, combineReducers, createStore, Store } from 'redux';
import thunk from 'redux-thunk';

import {
  questionReducer,
  IQuestionState,
} from '../Questions/reducer';

import {	answerReducer } from '../Answers/reducer';
import {	IAnswerState } from '../Answers/types';


export interface IAppState {
  questionState: IQuestionState;
  answerState: IAnswerState;
}

// Create the root reducer
const rootReducer = combineReducers<IAppState>({
  questionState: questionReducer,
  answerState: answerReducer
});

// Create a configure store function of type `IAppState`
export default function configureStore(): Store<IAppState, any> {
  const store = createStore(rootReducer, undefined, applyMiddleware(thunk));
  return store;
}