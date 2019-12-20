import * as React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWindowClose } from '@fortawesome/free-solid-svg-icons'


import { IQuestion } from '../types';
import { IAnswer } from '../../Answers/types';
// import { AutoSuggestAnswer } from '../../components/AutoSuggestAnswer';

interface IProps {
	question: IQuestion,
	questionAnswers: IAnswer[],
	canEdit: boolean,
	formMode: string,
	removeQuestionAnswer: (groupId: number, questionId: number, answerId: number) => void
}

const QuestionAnswers: React.FC<IProps> = (props: IProps) => {
    const { question, questionAnswers, canEdit, formMode, removeQuestionAnswer } = props;  // question, 
    return (
      <div className="name-container">
			{ questionAnswers.length === 0 && 
				<div>
					No answers yet
				</div>
			}
			{ questionAnswers.length > 0 && 
				<>
				<table>
					<thead>
						<tr>
							<th>Answers</th>
							{ canEdit && formMode !== 'display' && <th></th> }
						</tr>
					</thead>
					<tbody>
						{ questionAnswers.map(answer => 
							<tr key={answer.answerId}>
								<td className="name">
									{answer.text}
								</td>
								{ canEdit && formMode !== 'display' &&
									<td>
										<button className="button-remove" title="Remove Answer" 
											onClick={(e) => { 
												e.stopPropagation();
												e.preventDefault();
												removeQuestionAnswer(question.groupId, question.questionId, answer.answerId)
												}}>
											<FontAwesomeIcon icon={faWindowClose}  color='lightblue' />
										</button>
									</td>
								}
							</tr>
						)}
						{canEdit && <tr>
							<td>
								{/* <AutoSuggestAnswer /> */}
							</td>
							</tr>}
					</tbody>
				</table>
				{ canEdit && formMode !== 'display' &&
					<button className="assign-answer" onClick={() => {}}>Assign another Answer</button>
				}
				</>
			}
      </div>
    );
  }

export default QuestionAnswers

