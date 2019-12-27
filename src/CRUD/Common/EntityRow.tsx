import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWindowClose, faEdit } from '@fortawesome/free-solid-svg-icons'

import { display, edit, remove, Actions } from "../Student/actions";

import { useHoverUL } from "./useHoverUL";
import { IEntity } from "../Common/types";

interface IRowProps<T> {
	entity: T,
	dispatch: React.Dispatch<Actions>,
	renderColumns: (item: T) => JSX.Element[]
}

export const EntityRow: <T extends IEntity> 
					(props: IRowProps<T>) => React.ReactElement<IRowProps<T>> = (props) => {
	const { entity, dispatch, renderColumns } = props;
	const { entityId, name } = entity; // , url 
	const [hoverRef, hoverProps] = useHoverUL();

	return (
		<ul className="entity-columns" ref={hoverRef}>
			{/* <li>{entityId}</li> */}
			<li>
				<a href="#/" onClick={(e) => { e.preventDefault(); dispatch(display(entityId)) }}>
					{name}
				</a>
			</li>

			{ renderColumns(entity) }

			<li>
			{hoverProps.isHovered &&
				<button className="button-edit" title="Edit" onClick={() => dispatch(edit(entityId))}>
					<FontAwesomeIcon icon={faEdit} color='lightblue' />
				</button>
			}
			{hoverProps.isHovered &&
				<button className="button-remove" title="Remove" onClick={() => { 
						dispatch(remove(entityId));
					}}
				>
					<FontAwesomeIcon icon={faWindowClose}  color='lightblue' />
				</button>
			}
			</li>
		</ul>
	)
};
