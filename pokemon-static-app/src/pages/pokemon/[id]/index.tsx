import React from 'react';
import { GetStaticPaths, GetStaticPathsResult, GetStaticProps } from 'next';
import { Button, Card, Container, Grid, Text } from '@nextui-org/react';

import { DefaultLayout } from '../../../components/layouts';
import { env } from '../../../config/env.config';
import { CustomNextPage } from '../../../types/next/custom-next-page.type';
import { pokemonService } from '../../../services/server/pokemon.service';
import { PokemonFullInfoData } from '../../../interfaces/props/pokemon-full-info-data.interface';
import Image from 'next/image';

type PokemonPageUrlQuery = {
  id: string;
};

interface PokemonPageProps {
  pokemon: PokemonFullInfoData;
}

const PokemonPage: CustomNextPage<PokemonPageProps> = (props) => {
  const { pokemon } = props;
  return (
    <Grid.Container css={{ marginTop: '5px' }} gap={2}>
      <Grid xs={12} sm={4}>
        <Card isHoverable css={{ padding: '30px' }}>
          <Card.Body>
            <Card.Image
              src={
                pokemon.sprites.other.dream_world.front_default ||
                '/no-image.png'
              }
              alt={pokemon.name}
              width="100%"
              height={200}
            />
          </Card.Body>
        </Card>
      </Grid>
      <Grid xs={12} sm={8}>
        <Card>
          <Card.Header
            css={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <Text h1 transform="capitalize">
              {pokemon.name}
            </Text>
            <Button color="gradient" ghost>
              Guardar en Favoritos
            </Button>
          </Card.Header>
          <Card.Body>
            <Text size={30}>Sprites:</Text>
            <Container
              direction="row"
              display="flex"
              gap={0}
              justify="space-between"
            >
              <Image
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                width={100}
                height={100}
              />
              <Image
                src={pokemon.sprites.back_default}
                alt={pokemon.name}
                width={100}
                height={100}
              />
              <Image
                src={pokemon.sprites.front_shiny}
                alt={pokemon.name}
                width={100}
                height={100}
              />
              <Image
                src={pokemon.sprites.back_shiny}
                alt={pokemon.name}
                width={100}
                height={100}
              />
            </Container>
          </Card.Body>
        </Card>
      </Grid>
    </Grid.Container>
  );
};

PokemonPage.getLayout = (page) => (
  <DefaultLayout title="Algun pokemon">{page}</DefaultLayout>
);

export const getStaticPaths: GetStaticPaths<PokemonPageUrlQuery> = (
  context
) => {
  const amount = env.server.isDev ? 10 : env.server.pokemon.limit;

  const paths: GetStaticPathsResult<PokemonPageUrlQuery>['paths'] = [
    ...Array(amount),
  ].map((_, i) => ({
    params: {
      id: `${i + 1}`,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<
  PokemonPageProps,
  PokemonPageUrlQuery
> = async (context) => {
  const { params } = context;
  if (!params) return { notFound: true };

  const { id } = params;
  const [response, error] = await pokemonService.getPokemon(id);
  if (error || !response) return { notFound: true };

  const pokemon: PokemonFullInfoData = {
    name: response.name,
    sprites: {
      back_default: response.sprites.back_default,
      back_shiny: response.sprites.back_shiny,
      front_default: response.sprites.front_default,
      front_shiny: response.sprites.front_shiny,
      other: {
        dream_world: {
          front_default: response.sprites.other?.dream_world.front_default,
        },
      },
    },
  };

  return {
    props: { pokemon },
  };
};

export default PokemonPage;
