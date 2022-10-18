import React, { useCallback } from 'react';
import { Grid } from '@nextui-org/react';

import { PokemonCardData } from '../../interfaces/props/pokemon-card-data.interface';
import { PokemonCard, PokemonCardProps } from './PokemonCard.component';

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
        <PokemonCard
          key={pokemon.id}
          pokemon={pokemon}
          onPokemonCardClick={pokemonCardOnPokemonCardClick}
        />
      ))}
    </Grid.Container>
  );
};
