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
					entites={state.entites}
					dispatch={dispatch}
					renderItem = {(item: IStudent) => [
						<li>{item.email}</li>,
						<li>{item.firstName}</li>,
						<li>{item.lastName}</li>
					]}
				 />
			</div>
			<div className="b">
				<StudentForm />
			</div>
		</div>    		
  );
}

