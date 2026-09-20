import { useAuth } from '@/Auth';
import { ROUTES } from '@/Consts';
import { useFavorites } from '@/Hooks';
import { memo } from 'react';
import { Link, Navigate } from 'react-router';

const FavoritesPageComponent = () => {
  const { session, isLoading } = useAuth();
  const { favorites, toggleFavorite } = useFavorites();

  if (!isLoading && !session) {
    return <Navigate to={ROUTES.LOGIN} />;
  }

  return (
    <div>
      <h1>お気に入り</h1>
      <ul>
        {favorites.map(p => (
          <li key={p.id}>
            <Link to={`/detail/${p.id}`}>{p.name}</Link>
            <button type="button" onClick={() => toggleFavorite(p.id)}>
              解除
            </button>
          </li>
        ))}
      </ul>
      {favorites.length === 0 && <p>お気に入りはまだありません</p>}
      <Link to={ROUTES.HOME}>ホームへ</Link>
    </div>
  );
};

const FavoritesPage = memo(FavoritesPageComponent);

export default FavoritesPage;
