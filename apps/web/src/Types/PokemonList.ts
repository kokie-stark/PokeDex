import type { PokemonSummary } from './PokemonSummary';

export type PokemonList = {
  count: number;
  results: PokemonSummary[];
};
