export interface PokemonFullInfoData {
  name: string;
  sprites: {
    back_default: string;
    back_shiny: string;
    front_default: string;
    front_shiny: string;
    other: {
      dream_world: {
        front_default?: string;
      };
    };
  };
}
