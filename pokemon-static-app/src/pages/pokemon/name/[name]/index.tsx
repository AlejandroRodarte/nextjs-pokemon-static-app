import { GetStaticProps, GetStaticPaths, GetStaticPathsResult } from 'next';

import { CustomNextPage } from '../../../../types/next/custom-next-page.type';
import { DefaultLayout } from '../../../../components/layouts';
import { env } from '../../../../config/env.config';
import { mapGetPokemonResponseToPokemonFullInfoData } from '../../../../helpers/object-mappers/map-get-pokemon-response-to-pokemon-full-info-data.helper';
import { PokemonDetails } from '../../../../components/pokemon';
import { PokemonFullInfoData } from '../../../../interfaces/props/pokemon-full-info-data.interface';
import { pokemonService } from '../../../../services/server/pokemon.service';
import { usePokemonPageCommonData } from '../../../../hooks/use-pokemon-page-common-data';

type PokemonNamePageUrlQuery = {
  name: string;
};

interface PokemonNamePageProps {
  pokemon: PokemonFullInfoData;
}

const PokemonNamePage: CustomNextPage<PokemonNamePageProps> = (props) => {
  const { pokemon } = props;
  const { favoriteMode, pokemonDetailsOnButtonClick } =
    usePokemonPageCommonData({
      pokemon: {
        id: pokemon.id,
        name: pokemon.name,
        img: pokemon.sprites.other.dream_world.front_default,
      },
    });

  return (
    <PokemonDetails
      pokemon={pokemon}
      onButtonClick={pokemonDetailsOnButtonClick}
      favoriteMode={favoriteMode}
    />
  );
};

PokemonNamePage.getLayout = (page) => (
  <DefaultLayout title={page.props.pokemon.name}>{page}</DefaultLayout>
);

export const getStaticPaths: GetStaticPaths<PokemonNamePageUrlQuery> = async (
  context
) => {
  const limit = env.server.isDev ? 10 : env.server.pokemon.limit;
  const [smallPokemons, error] = await pokemonService.getPokemons(limit);
  if (error || !smallPokemons) return { paths: [], fallback: false };

  const paths: GetStaticPathsResult<PokemonNamePageUrlQuery>['paths'] =
    smallPokemons.map((sp) => ({
      params: {
        name: sp.name,
      },
    }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<
  PokemonNamePageProps,
  PokemonNamePageUrlQuery
> = async (context) => {
  const { params } = context;
  if (!params) return { notFound: true };

  const { name } = params;
  const [response, error] = await pokemonService.getPokemonByIndex(name);
  if (error || !response) return { notFound: true };

  const pokemon = mapGetPokemonResponseToPokemonFullInfoData(response);

  return {
    props: { pokemon },
  };
};

export default PokemonNamePage;
