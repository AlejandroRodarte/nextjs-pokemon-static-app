import React from 'react';
import Image from 'next/image';
import { Container } from '@nextui-org/react';

interface PokemonSpritesGalleryProps {
  name: string;
  spriteUrls: string[];
}

export const PokemonSpritesGallery: React.FC<PokemonSpritesGalleryProps> = (
  props
) => {
  const { name, spriteUrls } = props;

  return (
    <Container direction="row" display="flex" gap={0} justify="space-between">
      {spriteUrls.map((spriteUrl) => (
        <Image
          key={spriteUrl}
          src={spriteUrl}
          alt={name}
          width={100}
          height={100}
        />
      ))}
    </Container>
  );
};
