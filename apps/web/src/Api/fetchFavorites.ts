import type { PokemonSummary } from '@/Types';
import { API_URL } from './apiUrl';

type FavoritesApiResponse = {
  pokemon_id: number;
  created_at: string;
  pokemon: { id: number; name_ja: string; image_url: string | null };
}[];

const fetchFavorites = async (accessToken: string): Promise<PokemonSummary[]> => {
  const res = await fetch(`${API_URL}/favorites`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!res.ok) {
    throw new Error('failed to fetch');
  }

  const json: FavoritesApiResponse = await res.json();
  return json.map(f => ({
    id: f.pokemon.id,
    name: f.pokemon.name_ja,
    imageUrl: f.pokemon.image_url,
  }));
};

export default fetchFavorites;
