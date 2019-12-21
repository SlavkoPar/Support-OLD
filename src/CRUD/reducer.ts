import { IEntityState } from './types';

import { EntityActions, EntityActionTypes } from './actions';


export const reducer: React.Reducer<IEntityState, EntityActions> = (state, action) =>  {
  switch(action.type) {
    case EntityActionTypes.INCREMENT:
      return {
        count: state.count + 1,
        message: action.message
      }
    case EntityActionTypes.DECREMENT:
      return {
        count: state.count - 1,
        message: action.message
		}
		
      case EntityActionTypes.RESET:
        return {
          count: 0,
          message: action.message
        }
    default:
      throw new Error(`Unhandled action type: `);  // ${action.type}
  }
}