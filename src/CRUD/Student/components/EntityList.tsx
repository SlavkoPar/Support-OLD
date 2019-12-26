import React from "react";
import { add, Actions } from "../actions";
import { EntityRow } from "./EntityRow";
import { IEntity } from "../types";


interface IProps<T extends IEntity> {
	entities: T[],
	dispatch: React.Dispatch<Actions>,
	renderColumns: (item: T) => JSX.Element[]
}

export const EntityList: <
	T extends IEntity
>(props: IProps<T>) => React.ReactElement<IProps<T>> = (props) => {

	return (
   	<div>
			<ul className="ul-row">
				{props.entities.map(entity =>
					<EntityRow
						key={entity.entityId}
						dispatch={props.dispatch}
						entity={entity}
						renderColumns={props.renderColumns}
					/>	
				)}
			</ul>		
			<button onClick={() => props.dispatch(add())}>Add new</button>			
		</div>
  )
}