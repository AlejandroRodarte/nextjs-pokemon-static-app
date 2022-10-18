#!/bin/sh

FILE=$1

echo "Processing $FILE ..."
sed -i 's|APP_NEXT_PUBLIC_STAGE_VAR|'${NEXT_PUBLIC_STAGE}'|g' $FILE
sed -i 's|APP_NEXT_PUBLIC_POKEAPI_URL_VAR|'${NEXT_PUBLIC_POKEAPI_URL}'|g' $FILE
sed -i 's|APP_NEXT_PUBLIC_POKEMON_SPRITES_URL_VAR|'${NEXT_PUBLIC_POKEMON_SPRITES_URL}'|g' $FILE
sed -i 's|APP_NEXT_PUBLIC_POKEMON_SPRITE_LOGO_RELATIVE_PATH_VAR|'${NEXT_PUBLIC_POKEMON_SPRITE_LOGO_RELATIVE_PATH}'|g' $FILE
