import React from "react";
import { useEntity } from "../useEntity"
import { edit, remove, getAll, setLoading } from "../actions";

interface IProps {
	query: string
}

export const List = (props: IProps) => {
	const { state, dispatch } = useEntity();
	
	React.useEffect(() => {
		dispatch(setLoading(true))
		dispatch(getAll())
		dispatch(setLoading(false))
	}, [dispatch, props.query]);

	return (
   	<div>
			<ul>
				{state.entities.map(({ id, name, url }) => (
					<li key={id}>
						<ul className="ul-line">
							<li>{id}</li>
							<li><a href={url}>{name}</a></li>
							<li><button onClick={() => dispatch(edit(id))}>edit</button></li>
							<li><button onClick={() => dispatch(remove(id))}>remove</button></li>
						</ul>
					</li>
				))}
			</ul>			
		</div>
  )
}
