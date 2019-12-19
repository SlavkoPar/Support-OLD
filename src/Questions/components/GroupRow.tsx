import * as React from 'react';

import { useHover } from '../../common/useHover'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWindowClose, faEdit } from '@fortawesome/free-solid-svg-icons'

import { IQuestionGroup } from '../types';


interface IQuestionRowProps {
	questionGroup: IQuestionGroup;
	editGroup: (groupId: number) => void;
	removeGroup: (groupId: number) => void;
}

const GroupRow: React.FC<IQuestionRowProps> = (props: IQuestionRowProps) => {

	const [hoverRef, hoverProps] = useHover();
	const { questionGroup, editGroup, removeGroup } = props;

   return (
		<div id={questionGroup.groupId.toString()} ref={hoverRef} key={questionGroup.groupId} className="name">
			{questionGroup.title}
			{hoverProps.isHovered && hoverProps.id === questionGroup.groupId&&
				<button className="button-edit" title="Edit Section" onClick={() => editGroup(questionGroup.groupId)}>
					<FontAwesomeIcon icon={faEdit} color='lightblue' />
				</button>
			}			
			{hoverProps.isHovered && hoverProps.id === questionGroup.groupId && questionGroup.questions.length === 0 &&
				<button className="button-remove" title="Remove Section" onClick={() => removeGroup(questionGroup.groupId)}>
					<FontAwesomeIcon icon={faWindowClose}  color='lightblue' />
				</button>
			}
		</div>
	)
}

export default GroupRow

