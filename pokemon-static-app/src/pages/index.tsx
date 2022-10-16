import { GetStaticProps } from 'next';
import Image from 'next/image';

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
    <ul>
      {pokemons.map((pokemon) => (
        <li key={pokemon.name}>
          {pokemon.name} - {pokemon.id}
          <Image src={pokemon.img} width={70} height={70} />
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
