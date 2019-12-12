import * as React from 'react';


import { IQuestion } from '../reducers/questionReducer';
import { IAnswer } from '../reducers/answerReducer';

interface IProps {
	question: IQuestion,
	questionAnswers: IAnswer[]
}

const QuestionAnswers: React.FC<IProps> = (props: IProps) => {
    const { question, questionAnswers } = props;
    return (
      <div className="name-container">
			{ questionAnswers.length === 0 && 
				<div>
					No answers yet
				</div>
			}
			{ questionAnswers.length >0 && 
				<table>
					<thead>
						<th>Answer</th>
						<th></th>
						<th></th>
					</thead>
					<tbody>
						{ questionAnswers.map(answer => 
							<tr>
								<td key={answer.answerId} className="name">
									{answer.text}
								</td>
								<td>edit</td>
								<td>remove</td>
							</tr>
						)}
					</tbody>
				</table>
			}
      </div>
    );
  }

export default QuestionAnswers

