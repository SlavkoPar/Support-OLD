import { IEntityState, IEntity } from './types';

import { EntityActions, EntityActionTypes, localStorageSave } from './actions';

const initialEntity: IEntity = { 
	entityId: 0, 
	name: '',
	url: ''
};


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
				loading: action.loading
			}

		case EntityActionTypes.ENTITY_GET: {
			return {
				...state,
				entity: action.entity
			};
		}    

		case EntityActionTypes.ENTITY_ADD: {
			return {
				...state,
				formMode: 'add',
				entity: { 
					...initialEntity, 
					entityId: action.entityId
				}
			};
		}    	

		case EntityActionTypes.ENTITY_EDIT: 
			return {
				...state,
				formMode: 'edit',
				entity: { ...action.entity }				
			}
			
		case EntityActionTypes.ENTITY_REMOVE: {
			localStorageSave(JSON.stringify(state.entities.filter(e => e.entityId !== action.entityId)))
			return {
				...state,
				formMode: 'display',
				entity: undefined,
				entities: state.entities.filter(e => e.entityId !== action.entityId)
			}
		}
		
		case EntityActionTypes.ENTITY_STORE: {
			let entities: IEntity[] = [];
			if (state.formMode === 'add') {
				entities = [...state.entities, { ...action.entity }]
			}
			else {
				entities = state.entities.map(a => a.entityId === action.entity.entityId ? { ...action.entity } : a)
			}
			localStorageSave(JSON.stringify(entities))
			return {
				...state,
				formMode: 'edit',
				entity: { ...action.entity },
				entities: entities
			};
		}

		case EntityActionTypes.ENTITY_CANCEL: {
			return {
				...state,
				formMode: 'display',
			};
		}

		default:
			throw new Error(`Unhandled action type: ${action!.type}`);
	}
}