import * as React from 'react';

import { useHover } from '../../common/useHover'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWindowClose, faEdit } from '@fortawesome/free-solid-svg-icons'

import { IQuestion } from '../types';


interface IQuestionRowProps {
	question: IQuestion;
	onSelectQuestion: (questionId: number) => IQuestion;
	edit: (groupId: number, questionId: number) => void;
	remove: (groupId: number, questionId: number) => void;
}

const QuestionRow: React.FC<IQuestionRowProps> = (props: IQuestionRowProps) => {

	const [hoverRef, hoverProps] = useHover();
	const { question, onSelectQuestion, edit, remove } = props;

   return (
		<div id={question.questionId.toString()} ref={hoverRef} key={question.questionId} className="name">
			<button
				className="question-button"
				onClick={() => onSelectQuestion(question.questionId)}>
				{question.text}
			</button>
			{hoverProps.isHovered && hoverProps.id === question.questionId &&
				<button className="button-edit" title="Add a new Answer" onClick={() => edit(question.groupId, question.questionId)}>
					<FontAwesomeIcon icon={faEdit} color='lightblue' />
				</button>
			}
			{hoverProps.isHovered && hoverProps.id === question.questionId &&
				<button className="button-remove" title="Remove Answer" onClick={() => remove(question.groupId, question.questionId)}>
					<FontAwesomeIcon icon={faWindowClose}  color='lightblue' />
				</button>
			}
		</div>
	)
}

export default QuestionRow

