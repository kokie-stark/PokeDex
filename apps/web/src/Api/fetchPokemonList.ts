import type { PokemonList, PokemonSummary } from '@/Types';
import { API_URL } from './apiUrl';

type PokemonListApiResponse = {
  count: number;
  results: { id: number; name_ja: string; image_url: string | null }[];
};

const toPokemonSummary = (
  res: PokemonListApiResponse['results'][number],
): PokemonSummary => ({
  id: res.id,
  name: res.name_ja,
  imageUrl: res.image_url,
});

const fetchPokemonList = async (page: number, limit = 20): Promise<PokemonList> => {
  const res = await fetch(`${API_URL}/pokemon?page=${page}&limit=${limit}`);

  if (!res.ok) {
    throw new Error('failed to fetch');
  }

  const json: PokemonListApiResponse = await res.json();
  return { count: json.count, results: json.results.map(toPokemonSummary) };
};

export default fetchPokemonList;
