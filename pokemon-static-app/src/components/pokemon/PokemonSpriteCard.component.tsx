import React from 'react';
import { Card } from '@nextui-org/react';

interface PokemonSpriteCardProps {
  name: string;
  spriteUrl?: string;
}

export const PokemonSpriteCard: React.FC<PokemonSpriteCardProps> = (props) => {
  const { spriteUrl, name } = props;

  return (
    <Card isHoverable css={{ padding: '30px' }}>
      <Card.Body>
        <Card.Image
          src={spriteUrl || '/no-image.png'}
          alt={name}
          width="100%"
          height={200}
        />
      </Card.Body>
    </Card>
  );
};
