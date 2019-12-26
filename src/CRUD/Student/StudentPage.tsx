import React from "react";
import { StudentProvider } from "./useStudent";
import { Page } from "./Page";


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

