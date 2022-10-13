import React, { ReactNode } from 'react';
import Head from 'next/head';

interface DefaultLayoutProps {
  children: ReactNode;
  title?: string;
}

export const DefaultLayout: React.FC<DefaultLayoutProps> = (props) => {
  const { children, title = 'Pokemon Static App' } = props;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="author" content="Alejandro Rodarte" />
        <meta name="description" content="Informacion sobre pokemon X" />
        <meta name="keywords" content="X, pokemon, pokedex" />
      </Head>

      {/* Navbar */}

      <main>{children}</main>
    </>
  );
};
