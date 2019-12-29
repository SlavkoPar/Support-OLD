import React from "react";
import { Actions, EntityActions } from "../Common/actions";
import { EntityRow } from "./EntityRow";
import { IEntity } from "../Common/types";


interface IProps<T extends IEntity> {
	entities: T[],
	dispatch: React.Dispatch<Actions>,
	renderColumns: (item: T) => JSX.Element[]
}

export const EntityList: <T extends IEntity>
					(props: IProps<T>) => React.ReactElement<IProps<T>> = (props) => {
	return (
   	<div style={{border: '1px solid lightblue'}}>
			<ul className="entity-list">
				{props.entities.map(entity => (
					<li key={entity.entityId}>
						<EntityRow
							entity={entity}
							dispatch={props.dispatch}
							renderColumns={props.renderColumns}
						/>	
					</li>
				))}
			</ul>		
			<button onClick={() => props.dispatch(EntityActions.add())}>Add new</button>			
		</div>
  )
}