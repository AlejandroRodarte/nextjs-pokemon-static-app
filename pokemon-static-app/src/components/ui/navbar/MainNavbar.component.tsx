import React, { CSSProperties, useMemo } from 'react';
import Image from 'next/image';
import { Spacer, Text, useTheme } from '@nextui-org/react';

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

  return (
    <div style={containerStyles} className={classes.container}>
      <Image
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iv/platinum/132.png"
        alt="pokemon-icon"
        width={70}
        height={70}
      />
      <Text color="white" h2>
        P
      </Text>
      <Text color="white" h3>
        okémon
      </Text>
      <Spacer css={{ flex: 1 }} />
      <Text color="white" h3>
        Favoritos
      </Text>
    </div>
  );
};
