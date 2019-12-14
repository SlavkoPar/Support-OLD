import * as React from 'react';
import { useParams } from 'react-router-dom' // useRouteMatch

import { IAnswer } from '../reducers/answerReducer';
import { AnswerForm } from './AnswerForm'

interface IProps {
	answers: IAnswer[],
	answer: IAnswer, 
	adding: boolean,
	setAdding: (adding: boolean) => void,
	cancel: () => void;
	add: (answer: IAnswer) => void;
}

const Answers: React.FC<IProps> = (props: IProps) => {
	// let { slug } = useParams();
	const { answers, answer, adding, setAdding, cancel, add } = props;
	return (
		<div className="name-container">
			{/* slug: {slug} */}
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
							<th>Id</th>
							<th>Answer</th>
							<th></th>
							<th></th>
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
									<td>edit</td>
									<td>remove</td>
								</tr>
							)}
						</tbody>
					</table>
					<button onClick={() => setAdding(true)}>Add new</button>
				</div>
				<div className="b">
					{adding &&
						<div style={{border: '1px solid silver', borderRadius: '5px', padding: '10px'}}>
							<h4 style={{marginTop: 0}}>New Answer</h4>
							<AnswerForm answer={answer} adding={adding} cancel={cancel} add={add} />
						</div>
					}
				</div>
			</div>
			
			}

		</div>
	);
  }

export default Answers

