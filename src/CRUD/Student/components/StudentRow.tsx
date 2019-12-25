import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWindowClose, faEdit } from '@fortawesome/free-solid-svg-icons'

import { edit, remove, StudentActions } from "../actions";
import { IStudent } from "../types";

import { useHoverUL } from "../../../common/useHoverUL";

interface IRowProps {
	student: IStudent,
	dispatch: React.Dispatch<StudentActions>
}

export const StudentRow = (props: IRowProps) => {
	const { entityId, name, url, email } = props.student;
	const [hoverRef, hoverProps] = useHoverUL();

	return (
		<li key={entityId}>
			<ul className="ul-line" ref={hoverRef}>
				<li>{entityId}</li>
				<li><a href={url}>{name}</a></li>
				<li>{email}</li>

				<li>
				{hoverProps.isHovered &&
					<button className="button-edit" title="Edit" onClick={() => props.dispatch(edit(entityId))}>
						<FontAwesomeIcon icon={faEdit} color='lightblue' />
					</button>
				}
				{hoverProps.isHovered &&
					<button className="button-remove" title="Remove" onClick={() => { 
						props.dispatch(remove(entityId));
					}}>
						<FontAwesomeIcon icon={faWindowClose}  color='lightblue' />
					</button>
				}
				</li>

			</ul>
		</li>		
	)
}


