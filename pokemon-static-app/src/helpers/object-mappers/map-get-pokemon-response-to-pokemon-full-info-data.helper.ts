import { GetPokemonResponse } from '../../interfaces/pokemon/get-pokemon-response.interface';
import { PokemonFullInfoData } from '../../interfaces/props/pokemon-full-info-data.interface';

export const mapGetPokemonResponseToPokemonFullInfoData = (
  gpr: GetPokemonResponse
): PokemonFullInfoData => ({
  id: gpr.id,
  name: gpr.name,
  sprites: {
    back_default: gpr.sprites.back_default,
    back_shiny: gpr.sprites.back_shiny,
    front_default: gpr.sprites.front_default,
    front_shiny: gpr.sprites.front_shiny,
    other: {
      dream_world: {
        front_default: gpr.sprites.other?.dream_world.front_default,
      },
    },
  },
});
