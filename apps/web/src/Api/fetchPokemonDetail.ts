import { API_URL } from './apiUrl';

export type PokemonDetailResponse = {
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

const fetchPokemonDetail = async (id: number): Promise<PokemonDetailResponse> => {
  const res = await fetch(`${API_URL}/pokemon/${id}`);

  if (!res.ok) {
    throw new Error('failed to fetch');
  }

  return res.json();
};

export default fetchPokemonDetail;
