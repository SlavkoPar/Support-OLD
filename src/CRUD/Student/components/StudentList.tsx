import React from "react";
import { useStudent } from "../useStudent"
import { edit, remove, getAll, setLoading, add } from "../actions";

interface IProps {
	query: string
}

export const StudentList = (props: IProps) => {
	const { state, dispatch } = useStudent();

	React.useEffect(() => {
		dispatch(setLoading(true))
		dispatch(getAll())
		dispatch(setLoading(false))
	}, [dispatch, props.query]);

	return (
   	<div>
			<h3>Students</h3>
			<ul className="ul-row">
				{state.students.map(({ entityId, name, url, email }) => (
					<li key={entityId}>
						<ul className="ul-line">
							<li>{entityId}</li>
							<li><a href={url}>{name}</a></li>
							<li>{email}</li>
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