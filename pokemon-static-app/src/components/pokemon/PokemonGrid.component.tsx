import React, { useCallback } from 'react';
import { Grid } from '@nextui-org/react';

import { PokemonCard, PokemonCardProps } from './PokemonCard.component';
import { PokemonCardData } from '../../interfaces/props/pokemon-card-data.interface';

export interface PokemonGridProps {
  pokemons: PokemonCardData[];
  onPokemonCardClick: (pokemonId: number) => void;
}

export const PokemonGrid: React.FC<PokemonGridProps> = (props) => {
  const { pokemons, onPokemonCardClick } = props;

  const pokemonCardOnPokemonCardClick = useCallback<
    PokemonCardProps['onPokemonCardClick']
  >(
    (pokemonId) => {
      onPokemonCardClick(pokemonId);
    },
    [onPokemonCardClick]
  );

  return (
    <Grid.Container gap={2} justify="flex-start">
      {pokemons.map((pokemon) => (
        <Grid key={pokemon.name} xs={6} sm={3} lg={2} xl={1}>
          <PokemonCard
            key={pokemon.id}
            pokemon={pokemon}
            onPokemonCardClick={pokemonCardOnPokemonCardClick}
          />
        </Grid>
      ))}
    </Grid.Container>
  );
};
