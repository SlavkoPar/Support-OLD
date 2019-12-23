import React from "react";
import { useStudent } from "../useStudent"
import { edit, remove, getAll, setLoading } from "../actions";
import { RowComponent } from "../../RowComponent";

interface IProps {
	query: string
}

export const List = (props: IProps) => {
	const { state, dispatch } = useStudent();

	React.useEffect(() => {
		dispatch(setLoading(true))
		dispatch(getAll())
		dispatch(setLoading(false))
	}, [dispatch, props.query]);

	return (
   	<div>
			<h3>Students</h3>
			<ul>
				{state.students.map(({ studentId, firstName, lastName, url }) => (
					<li key={studentId}>
						<ul className="ul-line">
							<li>{studentId}</li>
							<li><a href={url}>{firstName} {lastName}</a></li>
							<li><button onClick={() => dispatch(edit(studentId))}>edit</button></li>
							<li><button onClick={() => dispatch(remove(studentId))}>remove</button></li>
						</ul>
					</li>
				))}
			</ul>			

			<div>Row Component</div>
			<RowComponent
				input={{ a: 1 }}
				otherInput={{ b: 2 }}
				render={({ a, b, c }) => (
					<div>
						{a} {b} {c}
					</div>
				)}
			/>
		</div>
  )
}