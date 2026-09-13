import type { PokemonSummary } from './PokemonSummary';

export type Pokemon = PokemonSummary & {
  height: number;
  weight: number;
  types: string[];
  abilities: { name: string; isHidden: boolean }[];
  stats: { name: string; value: number }[];
};
