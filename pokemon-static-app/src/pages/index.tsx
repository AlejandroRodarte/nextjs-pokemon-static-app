import { Button } from '@nextui-org/react';
import { DefaultLayout } from '../components/layouts';

import { CustomNextPage } from '../types/next/custom-next-page.type';

interface HomePageProps {}

const HomePage: CustomNextPage<HomePageProps> = () => {
  return (
    <>
      <Button color="gradient">Hola Mundo</Button>
    </>
  );
};

HomePage.getLayout = (page) => (
  <DefaultLayout title="Listado de Pokemons">{page}</DefaultLayout>
);

export default HomePage;
