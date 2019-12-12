import { applyMiddleware, combineReducers, createStore, Store } from 'redux';
import thunk from 'redux-thunk';

import {
  questionReducer,
  IQuestionState,
} from '../reducers/questionReducer';

import {
	answerReducer,
	IAnswerState,
 } from '../reducers/answerReducer';
 
 


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