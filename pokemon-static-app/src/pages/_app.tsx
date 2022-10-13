import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { NextUIProvider } from '@nextui-org/react';

import { CustomNextPage } from '../types/next/custom-next-page.type';
import { darkTheme } from '../themes';

type ExtraAppProps = {
  Component: CustomNextPage;
};

type CustomAppProps = AppProps & ExtraAppProps;

function MyApp({ Component, pageProps }: CustomAppProps) {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <NextUIProvider theme={darkTheme}>
      {getLayout(<Component {...pageProps} />)}
    </NextUIProvider>
  );
}

export default MyApp;
