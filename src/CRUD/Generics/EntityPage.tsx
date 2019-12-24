import React from "react";
import { EntityProvider } from "./useEntity";
import { EntityList } from "./components/EntityList";
import { EntityForm } from "./components/EntityForm";

interface IProps {
}

export const EntityPage: React.FC<IProps> = (props: IProps) => {
	return (
		<EntityProvider>
			<div className="two-columns">
				<div className="a">
					<EntityList query="all" />
				</div>
				<div className="b">
					<EntityForm	/>
				</div>
			</div>    
		</EntityProvider>
  );
}

