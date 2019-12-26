import React from "react";
import { useStudent } from "./useStudent";
import { EntityList } from "./components/EntityList";
import { StudentForm } from "./components/StudentForm";
import { IStudent } from "./types";
import { getAll, setLoading } from "./actions";

interface IProps {
	query: string;
}

export const Page: React.FC<IProps> = (props: IProps) => {

	const { state, dispatch } = useStudent();

	React.useEffect(() => {
		dispatch(setLoading(true))
		dispatch(getAll())
		dispatch(setLoading(false))
	}, [dispatch, props.query]);

  	return (
		<div className="two-columns">
			<div className="a">
				<h3>Students</h3>
				<EntityList 
					entities={state.entites}
					dispatch={dispatch}
					renderColumns = {(entity: IStudent) => [
						<li>{entity.email}</li>,
						<li>{entity.firstName}</li>,
						<li>{entity.lastName}</li>
					]}
				 />
			</div>
			<div className="b">
				<StudentForm />
			</div>
		</div>    		
  );
}

