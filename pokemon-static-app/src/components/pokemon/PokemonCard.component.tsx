import { Card, Grid, Row, Text } from '@nextui-org/react';
import React from 'react';
import { PokemonCardData } from '../../interfaces/props/pokemon-card-data.interface';

interface PokemonCardProps {
  pokemon: PokemonCardData;
}

export const PokemonCard: React.FC<PokemonCardProps> = (props) => {
  const { pokemon } = props;

  return (
    <Grid key={pokemon.name} xs={6} sm={3} lg={2} xl={1}>
      <Card isHoverable isPressable>
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
