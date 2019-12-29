import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWindowClose, faEdit } from '@fortawesome/free-solid-svg-icons'

import { Actions, EntityActions } from "../Common/actions";

import { useHover } from "./useHover";
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
	const [hoverRef, hoverProps] = useHover();

	return (
		<ul className="entity-columns" ref={hoverRef}>
			{/* <li>{entityId}</li> */}
			<li>
				<a href="#/" onClick={(e) => { e.preventDefault(); dispatch(EntityActions.display(entityId)) }}>
					{name}
				</a>
			</li>

			{ renderColumns(entity) }

			<li>
			{hoverProps.isHovered &&
				<button className="button-edit" title="Edit" onClick={() => dispatch(EntityActions.edit(entityId))}>
					<FontAwesomeIcon icon={faEdit} color='lightblue' />
				</button>
			}
			{hoverProps.isHovered &&
				<button className="button-remove" title="Remove" onClick={() => { 
						dispatch(EntityActions.remove(entityId));
					}}
				>
					<FontAwesomeIcon icon={faWindowClose}  color='lightblue' />
				</button>
			}
			</li>
		</ul>
	)
};
