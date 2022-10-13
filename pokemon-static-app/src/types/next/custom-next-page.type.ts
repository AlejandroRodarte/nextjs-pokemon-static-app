import { ReactElement, ReactNode } from 'react';
import { NextPage } from 'next';

type CustomNextPageProps<P> = {
  getLayout?: (page: ReactElement<P>) => ReactNode;
};

export type CustomNextPage<P = {}, IP = P> = NextPage<P, IP> &
  CustomNextPageProps<P>;
