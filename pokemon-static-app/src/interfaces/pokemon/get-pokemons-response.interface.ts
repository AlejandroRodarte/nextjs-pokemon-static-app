export interface GetPokemonsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: SmallPokemon[];
}

interface SmallPokemon {
  name: string;
  url: string;
}
