import { GetStaticProps } from 'next';
import { Card, Grid, Row, Text } from '@nextui-org/react';

import { DefaultLayout } from '../components/layouts';
import { env } from '../config/env.config';
import { pokemonService } from '../services/server/pokemon.service';
import { CustomNextPage } from '../types/next/custom-next-page.type';
import { PokemonCardData } from '../interfaces/props/pokemon-card-data.interface';
import { PokemonGrid } from '../components/pokemon';

interface HomePageProps {
  pokemons: PokemonCardData[];
}

const HomePage: CustomNextPage<HomePageProps> = (props) => {
  const { pokemons } = props;
  return <PokemonGrid pokemons={pokemons} />;
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

  const pokemons: PokemonCardData[] = smallPokemons.map((sp) => {
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
