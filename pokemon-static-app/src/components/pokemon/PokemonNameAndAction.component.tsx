import { Button, Text } from '@nextui-org/react';
import React from 'react';

export interface PokemonNameAndActionProps {
  name: string;
  buttonText: string;
}

export const PokemonNameAndAction: React.FC<PokemonNameAndActionProps> = (
  props
) => {
  const { name, buttonText } = props;

  return (
    <>
      <Text h1 transform="capitalize">
        {name}
      </Text>
      <Button color="gradient" ghost>
        {buttonText}
      </Button>
    </>
  );
};
