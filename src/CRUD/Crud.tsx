import React from "react";
import { StoreProvider } from "./store";
import { ChildComponent } from "./childComponent";


interface IProps {
	name: string;
}

export const Crud: React.FC<IProps> = (props: IProps) => {
  return (
    <StoreProvider>
      <ChildComponent/>
    </StoreProvider>
  );
}

