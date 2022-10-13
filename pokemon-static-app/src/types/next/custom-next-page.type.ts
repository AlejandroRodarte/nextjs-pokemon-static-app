import { NextPage } from 'next';

type CustomNextPageProps<P> = {};

export type CustomNextPage<P = {}, IP = P> = NextPage<P, IP> &
  CustomNextPageProps<P>;
