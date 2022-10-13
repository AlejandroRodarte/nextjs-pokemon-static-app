import { Button } from '@nextui-org/react';

import { CustomNextPage } from '../types/next/custom-next-page.type';

interface HomePageProps {}

const HomePage: CustomNextPage<HomePageProps> = () => {
  return (
    <>
      <Button color="gradient">Hola Mundo</Button>
    </>
  );
};

export default HomePage;
