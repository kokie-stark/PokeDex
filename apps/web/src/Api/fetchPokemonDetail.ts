import type { Pokemon } from '@/Types';
import { API_URL } from './apiUrl';

type PokemonDetailApiResponse = {
  id: number;
  name_ja: string;
  height: number;
  weight: number;
  image_url: string | null;
  pokemon_types: { slot: number; types: { id: number; name_ja: string } }[];
  pokemon_abilities: {
    slot: number;
    is_hidden: boolean;
    abilities: { id: number; name_ja: string };
  }[];
  pokemon_stats: { base_stat: number; stats: { id: number; name_ja: string } }[];
};

const toPokemon = (res: PokemonDetailApiResponse): Pokemon => ({
  id: res.id,
  name: res.name_ja,
  imageUrl: res.image_url,
  height: res.height,
  weight: res.weight,
  types: [...res.pokemon_types].sort((a, b) => a.slot - b.slot).map(t => t.types.name_ja),
  abilities: res.pokemon_abilities.map(a => ({
    name: a.abilities.name_ja,
    isHidden: a.is_hidden,
  })),
  stats: res.pokemon_stats.map(s => ({ name: s.stats.name_ja, value: s.base_stat })),
});

const fetchPokemonDetail = async (id: number): Promise<Pokemon> => {
  const res = await fetch(`${API_URL}/pokemon/${id}`);

  if (!res.ok) {
    throw new Error('failed to fetch');
  }

  const json: PokemonDetailApiResponse = await res.json();
  return toPokemon(json);
};

export default fetchPokemonDetail;
