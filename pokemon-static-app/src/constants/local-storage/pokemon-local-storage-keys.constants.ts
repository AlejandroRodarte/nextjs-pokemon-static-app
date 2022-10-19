const NAMESPACE = 'pokemon';

const FAVORITES_KEY = 'favorites';

export const pokemonLocalStorageKeys = {
  FAVORITES: `${NAMESPACE}/${FAVORITES_KEY}`,
} as const;
