import { API_URL } from './apiUrl';

type RemoveFavoriteParams = {
  pokemonId: number;
  accessToken: string;
};

const removeFavorite = async (props: RemoveFavoriteParams): Promise<void> => {
  const { pokemonId, accessToken } = props;

  const res = await fetch(`${API_URL}/favorites/${pokemonId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!res.ok) {
    throw new Error('failed to remove favorite');
  }
};

export default removeFavorite;
