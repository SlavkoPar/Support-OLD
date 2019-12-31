import React, { useEffect, useState } from "react";
import jsonStudents from "./Students.json"

import { StudentProvider } from "./useStudent";
import { useStudent } from "./useStudent";

import { EntityList } from "../Common/EntityList";
import { StudentForm } from "./components/StudentForm";

import { IStudent } from "./types";
import { EntityActions } from "../Common/actions";

interface IPageProps {
	query: string;
}

export const Page: React.FC<IPageProps> = (props: IProps) => {
	const { state, dispatch } = useStudent();
	const { entities, currentPage, pageCount } = state;

	const [currentData, setCurrentData] = useState<IStudent[]>([]);
	const pageSize = 9;
	
	useEffect(() => {
		dispatch(EntityActions.setLoading(true))
		let allStudents: IStudent[] = [...jsonStudents]
		dispatch(EntityActions.getAll(allStudents, pageSize))
		dispatch(EntityActions.setLoading(false))
	}, [dispatch, props.query]);
	
	useEffect(() => {
		const offset = currentPage * pageSize
		setCurrentData(entities.slice(offset, offset + pageSize));
	 }, [entities, currentPage]);


  	return (
		<div className="two-columns">
			<div className="a">
				<h3>Students</h3>
				<EntityList 
					entities={currentData}
					dispatch={dispatch}
					currentPage={currentPage}
					pageCount={pageCount}
					marginPagesDisplayed={2}
					pageRangeDisplayed={5}
					renderColumns = {(entity: IStudent) => [
						<li key="types" style={{minWidth: '60%'}}>{entity.types.join(', ')}</li>,
						<li key="img"><img src={entity.avatar} style={{height: '30px'}} alt="Slika"></img></li>
					]}
				 />
			</div>
			<div className="b">
				<StudentForm />
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

