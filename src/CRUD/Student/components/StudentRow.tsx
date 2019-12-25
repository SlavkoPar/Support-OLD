import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWindowClose, faEdit } from '@fortawesome/free-solid-svg-icons'

import { edit, remove, StudentActions } from "../actions";
import { IStudent } from "../types";

import { useHover } from '../../../common/useHover'

interface IRowProps {
	student: IStudent,
	dispatch: React.Dispatch<StudentActions>
}

export const StudentRow = (props: IRowProps) => {
	const { entityId, name, url, email } = props.student;
	const [hoverRef, hoverProps] = useHover( { tip: document.createElement('ul') });

	return (
		<li key={entityId}>
			<ul className="ul-line" id={entityId.toString()} ref={hoverRef}>
				<li>{entityId}</li>
				<li><a href={url}>{name}</a></li>
				<li>{email}</li>

				{hoverProps.isHovered && hoverProps.id === entityId &&
					<button className="button-edit" title="Edit" onClick={() => props.dispatch(edit(entityId))}>
						<FontAwesomeIcon icon={faEdit} color='lightblue' />
					</button>
				}
				{hoverProps.isHovered && hoverProps.id === entityId &&
					<button className="button-remove" title="Remove" onClick={() => props.dispatch(remove(entityId))}>
						<FontAwesomeIcon icon={faWindowClose}  color='lightblue' />
					</button>
				}

				{/* <li><button onClick={() => props.dispatch(edit(entityId))}>edit</button></li>
				<li><button onClick={() => props.dispatch(remove(entityId))}>remove</button></li> */}
			</ul>
		</li>		
	)
}


