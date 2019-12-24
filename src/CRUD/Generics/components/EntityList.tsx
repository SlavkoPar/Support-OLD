import React from "react";
import { useEntity } from "../useEntity"
import { getAll, add, edit, remove, setLoading } from "../actions";

interface IProps {
	query: string,
}

export const EntityList = (props: IProps) => {
	const { state, dispatch } = useEntity();
	
	React.useEffect(() => {
		dispatch(setLoading(true))
		dispatch(getAll())
		dispatch(setLoading(false))
	}, [dispatch, props.query]);

	return (
   	<div>
			<ul>
				{state.entities.map(({ entityId, name, url }) => (
					<li key={entityId}>
						<ul className="ul-line">
							<li>{entityId}</li>
							<li><a href={url}>{name}</a></li>
							<li><button onClick={() => dispatch(edit(entityId))}>edit</button></li>
							<li><button onClick={() => dispatch(remove(entityId))}>remove</button></li>
						</ul>
					</li>
				))}
			</ul>
			<button onClick={() => dispatch(add())}>Add new</button>			
		</div>
  )
}
