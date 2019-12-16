import * as React from 'react';

// import { IAppState } from '../store/Store';

import { IQuestion, IQuestionGroup } from '../reducer';

import { IAnswer } from '../../Answers/reducer';

import { AutoSuggest } from '../../components/AutoSuggest';
import { QuestionForm } from './QuestionForm'

// import Answers from './Answers'

// Create the containers interface
interface IProps {
	questionGroups: IQuestionGroup[];
	question?: IQuestion;
	questionAnswers: IAnswer[];
	onSelectQuestion: (questionId: number) => IQuestion;
	answers: IAnswer[],
	canEdit: boolean
}

// class QuestionList extends React.Component<IProps> {
const QuestionList: React.FC<IProps> = (props: IProps) => {
    const { questionGroups, question, questionAnswers, onSelectQuestion, canEdit } = props;
    return (
      <div className="name-container">

			<div className="two-columns">
				<div className="a">
					<AutoSuggest questionGroups={questionGroups} onSelectQuestion={onSelectQuestion}/>
				</div>
				<div className="b">
					{questionGroups && question &&
						<div style={{border: '1px solid silver', borderRadius: '5px', padding: '10px'}}>
							<h4 style={{marginTop: 0}}>Question</h4>
							<QuestionForm question={question} questionAnswers={questionAnswers} canEdit={canEdit}/>
						</div>
					}
				</div>
			</div>
			
      </div>
    );
  }

export default QuestionList

