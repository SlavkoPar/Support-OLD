import * as React from 'react';

import { IAnswer } from '../reducers/answerReducer';

interface IProps {
	answers: IAnswer[]
}

const Answers: React.FC<IProps> = (props: IProps) => {
    const { answers } = props;
    return (
      <div className="name-container">
			{ answers.length === 0 && 
				<div>
					No answers at all
				</div>
			}
			{ answers.length > 0 && 
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
			}
      </div>
    );
  }

export default Answers

