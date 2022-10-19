import { ReactElement } from 'react';
import { NextPage } from 'next';

type CustomNextPageProps<P> = {
  getContexts?: (component: ReactElement<P>) => ReactElement;
  getLayout?: (page: ReactElement<P>) => ReactElement;
};

export type CustomNextPage<P = {}, IP = P> = NextPage<P, IP> &
  CustomNextPageProps<P>;
