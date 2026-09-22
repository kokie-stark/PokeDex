import { useAuth } from '@/Auth';
import { PokemonCard, PokemonCardSkeleton } from '@/Components';
import { ROUTES } from '@/Consts';
import { useFavorites } from '@/Hooks';
import { Box, Button, Typography, mergeCSS, styles } from '@pokedex/ui';
import { memo } from 'react';
import { Link, Navigate } from 'react-router';

const gridClassName = mergeCSS(styles.display('flex'), styles.flexWrap('wrap'), styles.gap(2));

const FavoritesPageComponent = () => {
  const { session, isLoading: isAuthLoading } = useAuth();
  const { favorites, isLoading: isFavoritesLoading } = useFavorites();

  if (!isAuthLoading && !session) {
    return <Navigate to={ROUTES.LOGIN} />;
  }

  return (
    <Box style={{ padding: 16 }}>
      <Typography variant="h4">お気に入り</Typography>

      {isFavoritesLoading ? (
        <Box className={gridClassName} style={{ marginTop: 16 }}>
          {Array.from({ length: 4 }).map((_, i) => (
            <PokemonCardSkeleton key={i} />
          ))}
        </Box>
      ) : favorites.length === 0 ? (
        <Box style={{ marginTop: 24, textAlign: 'center' }}>
          <Typography color="text.secondary" style={{ marginBottom: 16 }}>
            お気に入りはまだありません
          </Typography>
          <Button component={Link} to={ROUTES.LIST} variant="contained">
            一覧を見る
          </Button>
        </Box>
      ) : (
        <Box className={gridClassName} style={{ marginTop: 16 }}>
          {favorites.map(p => (
            <PokemonCard key={p.id} id={p.id} name={p.name} imageUrl={p.imageUrl} />
          ))}
        </Box>
      )}
    </Box>
  );
};

const FavoritesPage = memo(FavoritesPageComponent);

export default FavoritesPage;
