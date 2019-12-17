import * as React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWindowClose } from '@fortawesome/free-solid-svg-icons'


import { IQuestion } from '../types';
import { IAnswer } from '../../Answers/reducer';

interface IProps {
	question: IQuestion,
	questionAnswers: IAnswer[],
	canEdit: boolean
}

const QuestionAnswers: React.FC<IProps> = (props: IProps) => {
    const { questionAnswers, canEdit } = props;  // question, 
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
							<th>Answer</th>
							{ canEdit && <th></th> }
						</tr>
					</thead>
					<tbody>
						{ questionAnswers.map(answer => 
							<tr key={answer.answerId}>
								<td className="name">
									{answer.text}
								</td>
								{ canEdit &&
									<td>
										<button className="button-remove" title="Remove Answer" onClick={() => {}}>  {/* remove(answer.answerId) */}
											<FontAwesomeIcon icon={faWindowClose}  color='lightblue' />
										</button>
									</td>
								}
							</tr>
						)}
					</tbody>
				</table>
				{ canEdit && 
					<button className="assign-answer" onClick={() => {}}>Assign another Answer to Question</button>
				}
				</>
			}
      </div>
    );
  }

export default QuestionAnswers

