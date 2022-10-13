import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { CustomNextPage } from '../types/next/custom-next-page.type';

type ExtraAppProps = {
  Component: CustomNextPage;
};

type CustomAppProps = AppProps & ExtraAppProps;

function MyApp({ Component, pageProps }: CustomAppProps) {
  const getLayout = Component.getLayout || ((page) => page);
  return getLayout(<Component {...pageProps} />);
}

export default MyApp;
