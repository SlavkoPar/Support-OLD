import React from "react";
import { add, Actions } from "../actions";
import { EntityRow } from "./EntityRow";
import { IEntity } from "../types";


interface IProps<T extends IEntity> {
	items: T[],
	dispatch: React.Dispatch<Actions>,
	renderItem: (item: T) => JSX.Element[]
}

// export const EntityList = (props: IProps) => {

export const EntityList: <
	T extends IEntity
>(props: IProps<T>) => React.ReactElement<IProps<T>> = (props) => {

	return (
   	<div>
			<ul className="ul-row">
				{props.items.map(item =>
					<EntityRow
						key={item.entityId}
						dispatch={props.dispatch}
						entity={item}
						renderItem={props.renderItem}
					/>	
				)}
			</ul>		
			<button onClick={() => props.dispatch(add())}>Add new</button>			
		</div>
  )
}