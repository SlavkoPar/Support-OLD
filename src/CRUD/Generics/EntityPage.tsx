import React from "react";
import { EntityProvider } from "./useEntity";
import { List } from "./components/List";

interface IProps {
	name: string;
}

export const EntityPage: React.FC<IProps> = (props: IProps) => {
  return (
    <EntityProvider>
      <List query='all'/>
    </EntityProvider>
  );
}

