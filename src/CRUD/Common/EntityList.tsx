import React, { useEffect } from "react";
import ReactPaginate from 'react-paginate';

import { Actions, EntityActions } from "../Common/actions";
import { EntityRow } from "./EntityRow";
import { IEntity } from "../Common/types";


interface IProps<T extends IEntity> {
	entities: T[],
	dispatch: React.Dispatch<Actions>,
	renderColumns: (item: T) => JSX.Element[],
	currentPage: number,
	pageCount: number,
	pageRangeDisplayed: number;
	marginPagesDisplayed: number;
}

export const EntityList: <T extends IEntity>
					(props: IProps<T>) => React.ReactElement<IProps<T>> = (props) => {
	const { 
		entities, dispatch, renderColumns, 
		pageCount, pageRangeDisplayed, marginPagesDisplayed 
	} = props;
	
	return (
   	<div style={{border: '1px solid lightblue'}} id="react-paginate">
			<ul className="entity-list">
				{entities.map(entity => (
					<li key={entity.entityId}>
						<EntityRow
							entity={entity}
							dispatch={dispatch}
							renderColumns={renderColumns}
						/>	
					</li>
				))}
			</ul>		
			<ReactPaginate
				previousLabel={"← Previous"}
				nextLabel={"Next →"}
				breakLabel={<span className="gap">...</span>}
				pageCount={pageCount}
				onPageChange={(selectedItem: { selected: number }) => dispatch(EntityActions.goToPage(selectedItem.selected))}
				// forcePage={currentPage}
				containerClassName={"pagination"}
				previousLinkClassName={"previous_page"}
				nextLinkClassName={"next_page"}
				disabledClassName={"disabled"}
				activeClassName={"active"}
				pageRangeDisplayed={pageRangeDisplayed}
				marginPagesDisplayed={marginPagesDisplayed}
			/>
			<button onClick={() => dispatch(EntityActions.add())}>Add new</button>			
		</div>
  )
}