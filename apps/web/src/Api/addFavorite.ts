import { API_URL } from './apiUrl';

type AddFavoriteParams = {
  pokemonId: number;
  accessToken: string;
};

const addFavorite = async (props: AddFavoriteParams): Promise<void> => {
  const { pokemonId, accessToken } = props;

  const res = await fetch(`${API_URL}/favorites`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ pokemon_id: pokemonId }),
  });

  if (!res.ok) {
    throw new Error('failed to add favorite');
  }
};

export default addFavorite;
