import { useCallback } from 'react';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';

import { DefaultLayout } from '../components/layouts';
import { env } from '../config/env.config';
import { pokemonService } from '../services/server/pokemon.service';
import { CustomNextPage } from '../types/next/custom-next-page.type';
import { PokemonCardData } from '../interfaces/props/pokemon-card-data.interface';
import { PokemonGrid, PokemonGridProps } from '../components/pokemon';
import { FavoritesContextWrapper } from '../contexts/favorites/favorites.context';

interface HomePageProps {
  pokemons: PokemonCardData[];
}

const HomePage: CustomNextPage<HomePageProps> = (props) => {
  const { pokemons } = props;

  const router = useRouter();
  const { push } = router;

  const pokemonGridOnPokemonCardClick = useCallback<
    PokemonGridProps['onPokemonCardClick']
  >(
    (pokemonId) => {
      push(`/pokemon/${pokemonId}`);
    },
    [push]
  );

  return (
    <PokemonGrid
      pokemons={pokemons}
      onPokemonCardClick={pokemonGridOnPokemonCardClick}
    />
  );
};

HomePage.getContexts = (page) => (
  <FavoritesContextWrapper>{page}</FavoritesContextWrapper>
);

HomePage.getLayout = (page) => (
  <DefaultLayout title="Listado de Pokemons">{page}</DefaultLayout>
);

export const getStaticProps: GetStaticProps<HomePageProps> = async (
  context
) => {
  const limit = env.server.isDev ? 10 : env.server.pokemon.limit;
  const [smallPokemons, error] = await pokemonService.getPokemons(limit);
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
