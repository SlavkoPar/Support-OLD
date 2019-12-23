import React from "react";
import { StudentProvider } from "./useStudent";
import { List } from "./components/List";

interface IProps {
	name: string;
}

export const StudentPage: React.FC<IProps> = (props: IProps) => {
  return (
    <StudentProvider>
      <List query="all" />
    </StudentProvider>
  );
}

