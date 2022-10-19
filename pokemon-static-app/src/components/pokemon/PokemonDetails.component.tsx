import React, { useCallback } from 'react';
import { Card, Grid, Text } from '@nextui-org/react';

import { PokemonSpriteCard } from './PokemonSpriteCard.component';
import { PokemonFullInfoData } from '../../interfaces/props/pokemon-full-info-data.interface';
import {
  PokemonNameAndAction,
  PokemonNameAndActionProps,
} from './PokemonNameAndAction.component';
import { PokemonSpritesGallery } from './PokemonSpritesGallery.component';
import { FavoriteMode } from '../../types/pages/favorite-mode.type';

export interface PokemonDetailsProps {
  pokemon: PokemonFullInfoData;
  onButtonClick: () => void;
  favoriteMode?: FavoriteMode;
}

const favoriteModeToPokemonNameAndActionButtonTextMap: {
  [mode in FavoriteMode]: string;
} = {
  save: 'Guardar en Favoritos',
  delete: 'Remover de Favoritos',
};

export const PokemonDetails: React.FC<PokemonDetailsProps> = (props) => {
  const { pokemon, onButtonClick, favoriteMode = 'save' } = props;

  const pokemonNameAndActionOnButtonClick = useCallback<
    PokemonNameAndActionProps['onButtonClick']
  >(() => {
    onButtonClick();
  }, [onButtonClick]);

  return (
    <Grid.Container css={{ marginTop: '5px' }} gap={2}>
      <Grid xs={12} sm={4}>
        <PokemonSpriteCard
          name={pokemon.name}
          spriteUrl={pokemon.sprites.other.dream_world.front_default}
        />
      </Grid>
      <Grid xs={12} sm={8}>
        <Card>
          <Card.Header
            css={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <PokemonNameAndAction
              name={pokemon.name}
              buttonText={
                favoriteModeToPokemonNameAndActionButtonTextMap[favoriteMode]
              }
              onButtonClick={pokemonNameAndActionOnButtonClick}
            />
          </Card.Header>
          <Card.Body>
            <Text size={30}>Sprites:</Text>
            <PokemonSpritesGallery
              name={pokemon.name}
              spriteUrls={[
                pokemon.sprites.front_default,
                pokemon.sprites.back_default,
                pokemon.sprites.front_shiny,
                pokemon.sprites.back_shiny,
              ]}
            />
          </Card.Body>
        </Card>
      </Grid>
    </Grid.Container>
  );
};
