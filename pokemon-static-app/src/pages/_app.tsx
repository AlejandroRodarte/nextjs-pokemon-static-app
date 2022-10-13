import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { NextUIProvider } from '@nextui-org/react';

import { CustomNextPage } from '../types/next/custom-next-page.type';

type ExtraAppProps = {
  Component: CustomNextPage;
};

type CustomAppProps = AppProps & ExtraAppProps;

function MyApp({ Component, pageProps }: CustomAppProps) {
  return (
    <NextUIProvider>
      <Component {...pageProps} />
    </NextUIProvider>
  );
}

export default MyApp;
