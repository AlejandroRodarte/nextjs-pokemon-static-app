import React, { CSSProperties, useMemo } from 'react';
import Image from 'next/image';
import { Spacer, Text, useTheme } from '@nextui-org/react';

import classes from './MainNavbar.module.css';
import Link from 'next/link';
import { env } from '../../../config/env.config';

interface MainNavbarProps {}

export const MainNavbar: React.FC<MainNavbarProps> = () => {
  const { theme } = useTheme();

  const containerStyles = useMemo<CSSProperties>(
    () => ({
      backgroundColor: theme?.colors.gray100.value,
    }),
    [theme?.colors.gray100.value]
  );

  const logoImg = env.server.pokemon.spritesUrl
    ? `${env.server.pokemon.spritesUrl}/versions/generation-iv/platinum/132.png`
    : `${env.public.pokemon.spritesUrl}/versions/generation-iv/platinum/132.png`;

  return (
    <div style={containerStyles} className={classes.container}>
      <Image src={logoImg} alt="pokemon-icon" width={70} height={70} />
      <Link href="/">
        <a style={{ display: 'flex' }}>
          <Text color="white" h2>
            P
          </Text>
          <Text color="white" h3>
            okémon
          </Text>
        </a>
      </Link>
      <Spacer css={{ flex: 1 }} />
      <Link href="/favorites">
        <a style={{ display: 'flex' }}>
          <Text color="white" h3>
            Favoritos
          </Text>
        </a>
      </Link>
    </div>
  );
};
