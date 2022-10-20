import { FavoritesAction } from '../../types/contexts/favorites-action.type';
import { FavoritesState } from '../../interfaces/contexts/favorites-state.interface';
import { TEST_ACTION } from './favorites.action-types';

export const reducer = (
  state: FavoritesState,
  action: FavoritesAction
): FavoritesState => {
  switch (action.type) {
    case TEST_ACTION:
      return {
        ...state,
        flag: action.payload.flag,
      };
    default:
      return state;
  }
};
