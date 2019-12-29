import React from "react";

import { StudentProvider } from "./useStudent";
import { useStudent } from "./useStudent";

import { EntityList } from "../Common/EntityList";
// import { StudentForm } from "./components/StudentForm";

import { IStudent } from "./types";
import { getAll, setLoading } from "./actions";
import { Generics } from "./Generics";

interface IPageProps {
	query: string;
}

export const Page: React.FC<IPageProps> = (props: IProps) => {
	const { state, dispatch } = useStudent();

	React.useEffect(() => {
		dispatch(setLoading(true))
		dispatch(getAll())
		dispatch(setLoading(false))
	}, [dispatch, props.query]);

  	return (
		<div className="two-columns">
			<div className="a">
				<div>
					<h5>Generics</h5>
					<Generics query="all" />
				</div>

				<h3>Students</h3>
				<EntityList 
					entities={state.entites}
					dispatch={dispatch}
					renderColumns = {(entity: IStudent) => [
						<li style={{minWidth: '60%'}}>{entity.types.join(', ')}</li>,
						<li><img src={entity.avatar} style={{height: '30px'}} alt="Slika"></img></li>
					]}
				 />
			</div>
			<div className="b">
				{/* <StudentForm /> */}
			</div>
		</div>    		
  );
}


interface IProps {
	query: string
}

export const StudentPage: React.FC<IProps> = (props: IProps) => {
  return (
    <StudentProvider>
		 <Page query={props.query} />
    </StudentProvider>
  );
}

