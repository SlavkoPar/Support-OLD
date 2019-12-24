import React from "react";
import { StudentProvider } from "./useStudent";
import { StudentList } from "./components/StudentList";
import { StudentForm } from "./components/StudentForm";

interface IProps {
}

export const StudentPage: React.FC<IProps> = (props: IProps) => {
  return (
    <StudentProvider>
		<div className="two-columns">
			<div className="a">
				<StudentList query="all" />
			</div>
			<div className="b">
				<StudentForm />
			</div>
		</div>    		
    </StudentProvider>
  );
}

