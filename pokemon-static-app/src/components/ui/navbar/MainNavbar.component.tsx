import React, { CSSProperties, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Spacer, Text, useTheme } from '@nextui-org/react';

import { env } from '../../../config/env.config';
import { IS_SERVER } from '../../../constants/common.constants';

import classes from './MainNavbar.module.css';

interface MainNavbarProps {}

export const MainNavbar: React.FC<MainNavbarProps> = () => {
  const { theme } = useTheme();

  const containerStyles = useMemo<CSSProperties>(
    () => ({
      backgroundColor: theme?.colors.gray100.value,
    }),
    [theme?.colors.gray100.value]
  );

  const logoImg = IS_SERVER
    ? `${env.server.pokemon.spritesUrl}/${env.server.pokemon.logoPath}`
    : `${env.public.pokemon.spritesUrl}/${env.public.pokemon.logoPath}`;

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
