import { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';

type CustomNextPageProps<P> = {
  getLayout?: (page: ReactElement<P>) => ReactNode;
};

export type CustomNextPage<P = {}, IP = P> = NextPage<P, IP> &
  CustomNextPageProps<P>;
