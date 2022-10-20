import { useCallback } from 'react';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';

import { CustomNextPage } from '../types/next/custom-next-page.type';
import { DefaultLayout } from '../components/layouts';
import { env } from '../config/env.config';
import { FavoritesContextWrapper } from '../contexts/favorites/favorites.context';
import { PokemonCardData } from '../interfaces/props/pokemon-card-data.interface';
import { PokemonGrid, PokemonGridProps } from '../components/pokemon';
import { pokemonService } from '../services/server/pokemon.service';

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
    (pokemonName) => {
      push(`/pokemon/name/${pokemonName}`);
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
  <DefaultLayout title="todos los pokemons">{page}</DefaultLayout>
);

export const getStaticProps: GetStaticProps<HomePageProps> = async (
  context
) => {
  const limit = env.server.isDev ? 10 : env.server.pokemon.limit;
  const [smallPokemons, error] = await pokemonService.getPokemons(limit);
  if (error || !smallPokemons) return { props: { pokemons: [] } };

  const pokemons: PokemonCardData[] = smallPokemons.map((sp) => {
    const name = sp.name;
    const urlSplit = sp.url.split('/');
    const id = +urlSplit[urlSplit.length - 2];
    const img = `${env.server.pokemon.spritesUrl}/other/dream-world/${id}.svg`;
    return { id, img, name };
  });

  return { props: { pokemons } };
};

export default HomePage;
