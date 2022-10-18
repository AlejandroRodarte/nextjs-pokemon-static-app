import { GetStaticProps } from 'next';
import { Card, Grid, Row, Text } from '@nextui-org/react';

import { DefaultLayout } from '../components/layouts';
import { env } from '../config/env.config';
import { pokemonService } from '../services/server/pokemon.service';
import { CustomNextPage } from '../types/next/custom-next-page.type';

interface Pokemon {
  id: number;
  img: string;
  name: string;
  url: string;
}

interface HomePageProps {
  pokemons: Pokemon[];
}

const HomePage: CustomNextPage<HomePageProps> = (props) => {
  const { pokemons } = props;

  return (
    <Grid.Container gap={2} justify="flex-start">
      {pokemons.map((pokemon) => (
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
      ))}
    </Grid.Container>
  );
};

HomePage.getLayout = (page) => (
  <DefaultLayout title="Listado de Pokemons">{page}</DefaultLayout>
);

export const getStaticProps: GetStaticProps<HomePageProps> = async (
  context
) => {
  const [smallPokemons, error] = await pokemonService.getPokemons(
    env.server.isDev ? 10 : env.server.pokemon.limit
  );
  if (error || !smallPokemons) return { props: { pokemons: [] } };

  const pokemons: Pokemon[] = smallPokemons.map((sp) => {
    const name = sp.name;
    const url = sp.url;
    const urlSplit = url.split('/');
    const id = +urlSplit[urlSplit.length - 2];
    const img = `${env.server.pokemon.spritesUrl}/other/dream-world/${id}.svg`;
    return { id, img, name, url };
  });

  return { props: { pokemons } };
};

export default HomePage;
