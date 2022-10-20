import React from 'react';
import Image from 'next/image';
import { Container, Text } from '@nextui-org/react';

import { env } from '../../config/env.config';

interface NoFavoritePokemonsProps {}

export const NoFavoritePokemons: React.FC<NoFavoritePokemonsProps> = () => {
  return (
    <Container
      css={{
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100vh - 100px)',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
      }}
    >
      <Text h1>No hay favoritos</Text>
      <Image
        src={`${env.public.pokemon.spritesUrl}/${env.public.pokemon.noFavoritesLogoPath}`}
        alt="No hay pokemons"
        width={250}
        height={250}
        style={{ opacity: 0.1 }}
      />
    </Container>
  );
};
