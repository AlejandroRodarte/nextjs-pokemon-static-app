import React, { ReactNode } from 'react';
import Head from 'next/head';

import { IS_SERVER } from '../../constants/common.constants';
import { MainNavbar } from '../ui/navbar/MainNavbar.component';

import classes from './DefaultLayout.module.css';

interface DefaultLayoutProps {
  children: ReactNode;
  title?: string;
}

const origin = IS_SERVER ? '' : window.origin;

export const DefaultLayout: React.FC<DefaultLayoutProps> = (props) => {
  const { children, title = 'Pokemon Static App' } = props;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="author" content="Alejandro Rodarte" />
        <meta name="description" content={`Informacion sobre ${title}`} />
        <meta name="keywords" content={`${title}, Pokemon, Pokedex`} />
        {/* Open Graph Meta Tags: https://ahrefs.com/blog/open-graph-meta-tags/ */}
        <meta property="og:title" content={title} />
        <meta
          property="og:description"
          content={`Informacion sobre ${title}`}
        />
        <meta property="og:image" content={`${origin}/img/banner.png`} />
      </Head>

      <MainNavbar />

      <main className={classes.main}>{children}</main>
    </>
  );
};
