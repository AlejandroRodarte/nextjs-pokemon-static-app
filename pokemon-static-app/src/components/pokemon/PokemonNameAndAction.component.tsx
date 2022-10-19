import React, { useCallback } from 'react';
import { Button, Text } from '@nextui-org/react';

export interface PokemonNameAndActionProps {
  name: string;
  buttonText: string;
  onButtonClick: () => void;
}

export const PokemonNameAndAction: React.FC<PokemonNameAndActionProps> = (
  props
) => {
  const { name, buttonText, onButtonClick } = props;

  const onClick = useCallback(() => {
    onButtonClick();
  }, [onButtonClick]);

  return (
    <>
      <Text h1 transform="capitalize">
        {name}
      </Text>
      <Button color="gradient" ghost onPress={onClick}>
        {buttonText}
      </Button>
    </>
  );
};
