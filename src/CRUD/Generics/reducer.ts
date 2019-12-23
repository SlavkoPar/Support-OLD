import { IEntityState } from './types';

import { EntityActions, EntityActionTypes } from './actions';

export const reducer: React.Reducer<IEntityState, EntityActions> = (state, action) =>  {
	switch(action.type) {

		case EntityActionTypes.ENTITY_GET_ALL:
			return {
				...state,
				entities: action.entities,
			}

		case EntityActionTypes.ENTITY_SET_LOADING:
			return {
				...state,
				loading: action.b
			}

		case EntityActionTypes.ENTITY_EDIT:
			return {
				...state
			}
			
		case EntityActionTypes.ENTITY_REMOVE:
			return {
				...state
			}

		default:
			throw new Error(`Unhandled action type: ${action!.type}`);
	}
}