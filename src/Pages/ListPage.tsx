import { fetchPokemonList } from '@/Api';
import { ROUTES } from '@/Consts';
import { useSuspenseQuery } from '@tanstack/react-query';
import { memo, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Link } from 'react-router';

const ListPageContentComponent = () => {
  const { data } = useSuspenseQuery({
    queryKey: ['pokemonList'],
    queryFn: fetchPokemonList,
  });

  return (
    <div>
      <h1>ListPage</h1>
      <ul>
        {data.results.map(p => (
          <Link key={p.name} to={`/detail/${p.name}`}>
            <li>{p.name}</li>
          </Link>
        ))}
      </ul>
      <li>
        <ul>
          <Link to={ROUTES.HOME}>ホームへ</Link>
        </ul>
        <ul>
          <Link to={ROUTES.LIST}>リストへ</Link>
        </ul>
        <ul>
          <Link to={'/detail/1'}>詳細1</Link>
        </ul>
        <ul>
          <Link to={'/detail/2'}>詳細2</Link>
        </ul>
        <ul>
          <Link to={'/detail/3'}>詳細3</Link>
        </ul>
      </li>
    </div>
  );
};

const ListPageContent = memo(ListPageContentComponent);

const ListPageComponent = () => (
  <ErrorBoundary
    fallbackRender={({ error }) => (
      <div>Error: {error instanceof Error ? error.message : 'unknown error'}</div>
    )}
  >
    <Suspense fallback={<div>Loading...</div>}>
      <ListPageContent />
    </Suspense>
  </ErrorBoundary>
);

const ListPage = memo(ListPageComponent);

export default ListPage;
