import { GetStaticProps } from 'next';
import { DefaultLayout } from '../components/layouts';
import { env } from '../config/env.config';

import { CustomNextPage } from '../types/next/custom-next-page.type';

interface HomePageProps {}

const HomePage: CustomNextPage<HomePageProps> = () => {
  return (
    <ul>
      <li>Pokemon</li>
      <li>Pokemon</li>
      <li>Pokemon</li>
      <li>Pokemon</li>
      <li>Pokemon</li>
      <li>Pokemon</li>
      <li>Pokemon</li>
      <li>Pokemon</li>
    </ul>
  );
};

HomePage.getLayout = (page) => (
  <DefaultLayout title="Listado de Pokemons">{page}</DefaultLayout>
);

export const getStaticProps: GetStaticProps<HomePageProps> = async (
  context
) => {
  console.log(env);
  return { props: {} };
};

export default HomePage;
