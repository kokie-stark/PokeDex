import { API_URL } from './apiUrl';

export type PokemonListResponse = {
  count: number;
  results: { id: number; name_ja: string; image_url: string | null }[];
};

const fetchPokemonList = async (page: number, limit = 20): Promise<PokemonListResponse> => {
  const res = await fetch(`${API_URL}/pokemon?page=${page}&limit=${limit}`);

  if (!res.ok) {
    throw new Error('failed to fetch');
  }

  return res.json();
};

export default fetchPokemonList;
