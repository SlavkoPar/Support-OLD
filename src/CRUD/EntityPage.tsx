import React from "react";
import { StoreProvider } from "./store";
import { ChildComponent } from "./components/childComponent";


interface IProps {
	name: string;
}

export const EntityPage: React.FC<IProps> = (props: IProps) => {
  return (
    <StoreProvider>
      <ChildComponent />
    </StoreProvider>
  );
}

