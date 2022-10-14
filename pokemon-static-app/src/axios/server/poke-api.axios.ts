import axios from 'axios';

import { env } from '../../config/env.config';

export const pokeApiAxios = axios.create({
  baseURL: env.server.pokemon.api,
});
