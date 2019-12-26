import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWindowClose, faEdit } from '@fortawesome/free-solid-svg-icons'

import { edit, remove, Actions } from "../actions";

import { useHoverUL } from "../../../common/useHoverUL";
import { IEntity } from "../types";

interface IRowProps<T extends IEntity> {
	entity: T,
	dispatch: React.Dispatch<Actions>,
	renderItem: (item: T) => JSX.Element[]
}


export const EntityRow: <
	T extends IEntity
>(props: IRowProps<T>) => React.ReactElement<IRowProps<T>> = (props) => {
	const { entityId, name, url } = props.entity; 
	const [hoverRef, hoverProps] = useHoverUL();

	return (
		<li key={entityId}>
			<ul className="ul-line" ref={hoverRef}>
				<li>{entityId}</li>
				<li><a href={url}>{name}</a></li>

				props.renderItem(item)

				<li>
				{hoverProps.isHovered &&
					<button className="button-edit" title="Edit" onClick={() => props.dispatch(edit(entityId))}>
						<FontAwesomeIcon icon={faEdit} color='lightblue' />
					</button>
				}
				{hoverProps.isHovered &&
					<button className="button-remove" title="Remove" onClick={() => { 
							props.dispatch(remove(entityId));	
						}}
					>
						<FontAwesomeIcon icon={faWindowClose}  color='lightblue' />
					</button>
				}
				</li>

			</ul>
		</li>		
	)
};

/*
export const EntityRow<
	T extends IEntity
> (props: IRowProps<T extends IEntity>) : JSX.Element => {
	const { entityId, name, url } = props.entity; 
	const [hoverRef, hoverProps] = useHoverUL();

	return (
		<li key={entityId}>
			<ul className="ul-line" ref={hoverRef}>
				<li>{entityId}</li>
				<li><a href={url}>{name}</a></li>

				<li>
				{hoverProps.isHovered &&
					<button className="button-edit" title="Edit" onClick={() => props.dispatch(edit(entityId))}>
						<FontAwesomeIcon icon={faEdit} color='lightblue' />
					</button>
				}
				{hoverProps.isHovered &&
					<button className="button-remove" title="Remove" onClick={() => { 
							props.dispatch(remove(entityId));	
						}}
					>
						<FontAwesomeIcon icon={faWindowClose}  color='lightblue' />
					</button>
				}
				</li>

			</ul>
		</li>		
	)
}
*/

