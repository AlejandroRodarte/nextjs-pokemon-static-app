import React, {
  createContext,
  ReactElement,
  useContext,
  useReducer,
} from 'react';

import { FavoritesAction } from '../../types/contexts/favorites-action.type';
import { FavoritesState } from '../../interfaces/contexts/favorites-state.interface';
import { reducer } from './favorites.reducer';
import { state } from './favorites.state';
import { StoreLikeContext } from '../../interfaces/contexts/store-like-context.interface';

interface FavoritesContext
  extends StoreLikeContext<FavoritesState, FavoritesAction> {}

interface FavoritesContextWrapperProps {
  children: ReactElement;
}

const FavoritesContext = createContext<FavoritesContext>({
  store: {
    state,
    dispatch: (action) => reducer(state, action),
  },
});

export const FavoritesContextWrapper: React.FC<FavoritesContextWrapperProps> = (
  props
) => {
  const { children } = props;
  const [favoritesState, dispatch] = useReducer(reducer, state);

  return (
    <FavoritesContext.Provider
      value={{ store: { state: favoritesState, dispatch } }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export function useFavoritesContext() {
  return useContext(FavoritesContext);
}
