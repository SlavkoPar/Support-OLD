import React from "react";
import { useStudent } from "../useStudent"
import { getAll, setLoading, add } from "../actions";
import { StudentRow } from "./StudentRow";


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
				{state.students.map(student =>
					<StudentRow dispatch={dispatch} student={student} key={student.entityId} />	
				)}
			</ul>		
			<button onClick={() => dispatch(add())}>Add new</button>			
		</div>
  )
}