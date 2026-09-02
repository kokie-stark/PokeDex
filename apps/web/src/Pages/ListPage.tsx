import { fetchPokemonList } from '@/Api';
import { ROUTES } from '@/Consts';
import { useSuspenseQuery } from '@tanstack/react-query';
import { memo, Suspense, useCallback, useMemo, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Link, useSearchParams } from 'react-router';

const ListPageContentComponent = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = useMemo(() => Number(searchParams.get('page') ?? '1'), []);
  const [limit, setLimit] = useState(20);

  const movePage = useCallback(
    (direction: 'prev' | 'next') => {
      const delta = direction === 'next' ? 1 : -1;
      const nextPage = page + delta || 1;

      setSearchParams({ page: String(nextPage) });
    },
    [page, setSearchParams],
  );

  const { data } = useSuspenseQuery({
    queryKey: ['pokemonList', page, limit],
    queryFn: () => fetchPokemonList(page, limit),
  });

  const totalPages = useMemo(() => Math.ceil(data.count / limit), [data.count, limit]);

  return (
    <div>
      <h1>ListPage</h1>
      <select value={limit} onChange={e => setLimit(Number(e.target.value))}>
        <option value={10}>10件</option>
        <option value={20}>20件</option>
        <option value={50}>50件</option>
      </select>
      <p>
        {page} / {totalPages} ページ
      </p>
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
      </li>
      <button onClick={() => movePage('prev')}>前へ</button>
      <button onClick={() => movePage('next')}>次へ</button>
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
