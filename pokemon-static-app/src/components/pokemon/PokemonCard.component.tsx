import React, { useCallback } from 'react';
import { Card, Row, Text } from '@nextui-org/react';

import { PokemonCardData } from '../../interfaces/props/pokemon-card-data.interface';

type OnCardClickHandler = () => void;

export interface PokemonCardProps {
  pokemon: PokemonCardData;
  onPokemonCardClick: (pokemonName: string) => void;
}

export const PokemonCard: React.FC<PokemonCardProps> = (props) => {
  const { pokemon, onPokemonCardClick } = props;
  const { name: pokemonName } = pokemon;

  const onCardClick = useCallback<OnCardClickHandler>(() => {
    onPokemonCardClick(pokemonName);
  }, [onPokemonCardClick, pokemonName]);

  return (
    <Card isHoverable isPressable onPress={onCardClick}>
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
  );
};
