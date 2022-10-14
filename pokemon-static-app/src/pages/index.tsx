import { GetStaticProps } from 'next';

import { DefaultLayout } from '../components/layouts';
import { env } from '../config/env.config';
import { pokemonService } from '../services/server/pokemon.service';
import { CustomNextPage } from '../types/next/custom-next-page.type';
import { GetPokemonsResponse } from '../interfaces/pokemon/get-pokemons-response.interface';

interface HomePageProps {
  pokemons: GetPokemonsResponse['results'];
}

const HomePage: CustomNextPage<HomePageProps> = (props) => {
  const { pokemons } = props;

  return (
    <ul>
      {pokemons.map((pokemon) => (
        <li key={pokemon.name}>
          {pokemon.name} - {pokemon.url}
        </li>
      ))}
    </ul>
  );
};

HomePage.getLayout = (page) => (
  <DefaultLayout title="Listado de Pokemons">{page}</DefaultLayout>
);

export const getStaticProps: GetStaticProps<HomePageProps> = async (
  context
) => {
  const [pokemons, error] = await pokemonService.getPokemons(
    env.server.isDev ? 10 : env.server.pokemon.limit
  );
  if (error || !pokemons) return { props: { pokemons: [] } };
  return { props: { pokemons } };
};

export default HomePage;
