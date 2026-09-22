import { addFavorite, fetchFavorites, removeFavorite } from '@/Api';
import { useAuth } from '@/Auth';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const useFavorites = () => {
  const { session } = useAuth();
  const accessToken = session?.access_token;
  const queryClient = useQueryClient();

  const { data: favorites, isLoading } = useQuery({
    queryKey: ['favorites', accessToken],
    queryFn: () => fetchFavorites(accessToken as string),
    enabled: !!accessToken,
  });

  const invalidateFavorites = () => {
    queryClient.invalidateQueries({ queryKey: ['favorites', accessToken] });
  };

  const addMutation = useMutation({
    mutationFn: (pokemonId: number) => addFavorite({ pokemonId, accessToken: accessToken as string }),
    onSuccess: invalidateFavorites,
  });

  const removeMutation = useMutation({
    mutationFn: (pokemonId: number) =>
      removeFavorite({ pokemonId, accessToken: accessToken as string }),
    onSuccess: invalidateFavorites,
  });

  const isFavorite = (pokemonId: number): boolean =>
    favorites?.some(f => f.id === pokemonId) ?? false;

  const toggleFavorite = (pokemonId: number) => {
    if (isFavorite(pokemonId)) {
      removeMutation.mutate(pokemonId);
    } else {
      addMutation.mutate(pokemonId);
    }
  };

  return {
    isLoggedIn: !!accessToken,
    isLoading,
    favorites: favorites ?? [],
    isFavorite,
    toggleFavorite,
  };
};

export default useFavorites;
