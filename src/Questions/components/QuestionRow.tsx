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

	const [hoverRef, hoverProps] = useHover({ tip: document.createElement('div') });

	const { question, onSelectQuestion, edit, remove } = props;
	const { groupId, questionId } = question;

   return (
		<div id={questionId.toString()} ref={hoverRef} className="name">
			<button
				className="question-button"
				onClick={() => onSelectQuestion(questionId)}>
				{question.text}
			</button>
			{hoverProps.isHovered && hoverProps.id === questionId &&
				<button className="button-edit" title="Edit" onClick={() => edit(groupId, questionId)}>
					<FontAwesomeIcon icon={faEdit} color='lightblue' />
				</button>
			}
			{hoverProps.isHovered && hoverProps.id === questionId &&
				<button className="button-remove" title="Remove" onClick={() => remove(groupId, questionId)}>
					<FontAwesomeIcon icon={faWindowClose}  color='lightblue' />
				</button>
			}
		</div>
	)
}

export default QuestionRow

