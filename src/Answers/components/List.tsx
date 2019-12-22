import * as React from 'react';
import { useParams } from 'react-router-dom' // useRouteMatch

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWindowClose, faEdit } from '@fortawesome/free-solid-svg-icons'

import { IAnswer } from '../types';
import { AnswerForm } from './Form'

interface IProps {
	answers: IAnswer[],
	answer: IAnswer,
	usedAnswers: number[],

	formMode: string,
	add: () => void;
	edit: (answerId: number) => void;
	remove: (answerId: number) => void;
	cancel: () => void;
	saveForm: (answer: IAnswer, formMode: string) => void;
}

const Answers: React.FC<IProps> = (props: IProps) => {
	let { slug } = useParams();
	slug = ''
	const { answers, answer, formMode, add, edit, remove, cancel, saveForm } = props;
	return (
		<div className="name-container">
			{slug}
			{ answers.length === 0 && 
				<div>
					No answers at all
				</div>
			}
			{ answers.length > 0 && 

			<div className="two-columns">
				<div className="a">
					<table>
						<thead>
							<tr>
								<th>Id</th>
								<th>Answer</th>
								<th></th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{ answers.map(answer => 
								<tr key={answer.answerId} >
									<td className="name">
										{answer.answerId}
									</td>
									<td className="name">
										{answer.text}
									</td>
									<td>
										<button
											className="button-edit"
											title="Add a new Answer"
											onClick={() => edit(answer.answerId)}>
												<FontAwesomeIcon icon={faEdit} color='lightblue' />
										</button>
									</td>
									<td>
										<button 
											disabled={props.usedAnswers.includes(answer.answerId)}
											className="button-remove"
											title="Remove Answer"
											onClick={() => remove(answer.answerId)}>
												<FontAwesomeIcon icon={faWindowClose}  color='lightblue' />
										</button>
									</td>
								</tr>
							)}
						</tbody>
					</table>
					<button onClick={() => add()}>Add new</button>
				</div>
				<div className="b">
					{formMode === 'add' &&
						<div style={{border: '1px solid silver', borderRadius: '5px', padding: '10px'}}>
							<h4 style={{marginTop: 0}}>New Answer</h4>
							<AnswerForm answer={answer} formMode={formMode} cancel={cancel} saveForm={(answer: IAnswer) => saveForm(answer, formMode)} />
						</div>
					}
					{formMode === 'edit' &&
						<div style={{border: '1px solid silver', borderRadius: '5px', padding: '10px'}}>
							<h4 style={{marginTop: 0}}>Edit Answer</h4>
							<AnswerForm answer={answer} formMode={formMode} cancel={cancel} saveForm={(answer: IAnswer) => saveForm(answer, formMode)} />
						</div>
					}					
				</div>
			</div>
			
			}

		</div>
	);
  }

export default Answers

