import React, { useCallback } from 'react';
import { Card, Grid, Row, Text } from '@nextui-org/react';

import { PokemonCardData } from '../../interfaces/props/pokemon-card-data.interface';

type OnCardClickHandler = () => void;

export interface PokemonCardProps {
  pokemon: PokemonCardData;
  onPokemonCardClick: (pokemonId: number) => void;
}

export const PokemonCard: React.FC<PokemonCardProps> = (props) => {
  const { pokemon, onPokemonCardClick } = props;
  const { id: pokemonId } = pokemon;

  const onCardClick = useCallback<OnCardClickHandler>(() => {
    onPokemonCardClick(pokemonId);
  }, [onPokemonCardClick]);

  return (
    <Grid key={pokemon.name} xs={6} sm={3} lg={2} xl={1}>
      <Card isHoverable isPressable onClick={onCardClick}>
        <Card.Body css={{ p: 1 }}>
          <Card.Image src={pokemon.img} width="100%" height={140} />
        </Card.Body>
        <Card.Footer>
          <Row justify="space-between">
            <Text transform="capitalize">{pokemon.name}</Text>
            <Text>#{pokemon.id}</Text>
          </Row>
        </Card.Footer>
      </Card>
    </Grid>
  );
};
