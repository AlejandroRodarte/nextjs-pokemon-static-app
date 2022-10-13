import { CustomNextPage } from '../types/next/custom-next-page.type';

interface HomePageProps {}

const HomePage: CustomNextPage<HomePageProps> = () => {
  return (
    <>
      <h1>Hola Mundo</h1>
    </>
  );
};

export default HomePage;
