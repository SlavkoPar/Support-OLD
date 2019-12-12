import * as React from 'react';

// import { IAppState } from '../store/Store';

import { IQuestion, IQuestionGroup } from '../reducers/questionReducer';
import { IAnswer } from '../reducers/answerReducer';

import { AutoSuggest } from './AutoSuggest';
import { QuestionForm } from './QuestionForm'

// Create the containers interface
interface IProps {
	questionGroups: IQuestionGroup[];
	question?: IQuestion;
	questionAnswers: IAnswer[];
	onSelectQuestion: (questionId: number) => IQuestion;
}

// class QuestionList extends React.Component<IProps> {
const QuestionList: React.FC<IProps> = (props: IProps) => {
    const { questionGroups, question, questionAnswers, onSelectQuestion } = props;
    return (
      <div className="name-container">

			<AutoSuggest questionGroups={questionGroups} onSelectQuestion={onSelectQuestion}/>

			<hr />

			<div className="two-columns">
				<div className="a">
					<h3>Questions</h3>
					{questionGroups &&
						questionGroups.map(questionGroup => {
							return (
								<div key={questionGroup.title}>
									<div>{questionGroup.title}</div>
									<div>
										{questionGroup.questions.map(question => 
											<div key={question.questionId} className="name">
												<button 
													className="question-button"
													onClick={() => onSelectQuestion(question.questionId)}>
													{question.text}
												</button>
											</div>
										)}
									</div>
								</div>
							);
					})}
				</div>
				<div className="b">
					{questionGroups && question &&
						<div>
							<h3>Question</h3>
							<QuestionForm question={question} questionAnswers={questionAnswers} />
						</div>
					}
				</div>
			</div>
      </div>
    );
  }

export default QuestionList

