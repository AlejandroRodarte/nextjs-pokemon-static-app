import { Grid } from '@nextui-org/react';
import React from 'react';

import { PokemonCardData } from '../../interfaces/props/pokemon-card-data.interface';
import { PokemonCard } from './PokemonCard.component';

interface PokemonGridProps {
  pokemons: PokemonCardData[];
}

export const PokemonGrid: React.FC<PokemonGridProps> = (props) => {
  const { pokemons } = props;

  return (
    <Grid.Container gap={2} justify="flex-start">
      {pokemons.map((pokemon) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      ))}
    </Grid.Container>
  );
};
