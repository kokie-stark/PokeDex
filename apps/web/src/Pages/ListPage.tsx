import { fetchPokemonList } from '@/Api';
import { PokemonCardGrid, PokemonCardSkeleton } from '@/Components';
import type { SelectChangeEvent } from '@mui/material/Select';
import { Box, MenuItem, Pagination, Select, Typography, mergeCSS, styles } from '@pokedex/ui';
import { useSuspenseQuery } from '@tanstack/react-query';
import { memo, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useSearchParams } from 'react-router';

const gridClassName = mergeCSS(styles.display('flex'), styles.flexWrap('wrap'), styles.gap(2));

const controlsClassName = mergeCSS(styles.display('flex'), styles.alignItems('center'), styles.gap(2));

const ListPageContentComponent = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page') ?? '1');
  const limit = Number(searchParams.get('limit') ?? '20');

  const { data } = useSuspenseQuery({
    queryKey: ['pokemonList', page, limit],
    queryFn: () => fetchPokemonList(page, limit),
  });

  const totalPages = Math.max(1, Math.ceil(data.count / limit));

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    const next = new URLSearchParams(searchParams);
    next.set('page', String(value));
    setSearchParams(next);
  };

  const handleLimitChange = (event: SelectChangeEvent<number>) => {
    const next = new URLSearchParams(searchParams);
    next.set('limit', String(event.target.value));
    next.set('page', '1');
    setSearchParams(next);
  };

  return (
    <Box style={{ padding: 16 }}>
      <Typography variant="h4">ポケモン一覧</Typography>

      <Box className={controlsClassName} style={{ margin: '16px 0' }}>
        <Select value={limit} onChange={handleLimitChange} size="small">
          <MenuItem value={10}>10件</MenuItem>
          <MenuItem value={20}>20件</MenuItem>
          <MenuItem value={50}>50件</MenuItem>
        </Select>
        <Typography>
          {page} / {totalPages} ページ
        </Typography>
      </Box>

      <PokemonCardGrid pokemons={data.results} />

      <Box className={controlsClassName} style={{ margin: '16px 0', justifyContent: 'center' }}>
        <Pagination count={totalPages} page={page} onChange={handlePageChange} color="primary" />
      </Box>
    </Box>
  );
};

const ListPageContent = memo(ListPageContentComponent);

const ListPageSkeleton = () => {
  const [searchParams] = useSearchParams();
  const limit = Number(searchParams.get('limit') ?? '20');

  return (
    <Box style={{ padding: 16 }}>
      <Typography variant="h4">ポケモン一覧</Typography>
      <Box className={gridClassName} style={{ marginTop: 16 }}>
        {Array.from({ length: limit }).map((_, i) => (
          <PokemonCardSkeleton key={i} />
        ))}
      </Box>
    </Box>
  );
};

const ListPageComponent = () => (
  <ErrorBoundary
    fallbackRender={({ error }) => (
      <div>Error: {error instanceof Error ? error.message : 'unknown error'}</div>
    )}
  >
    <Suspense fallback={<ListPageSkeleton />}>
      <ListPageContent />
    </Suspense>
  </ErrorBoundary>
);

const ListPage = memo(ListPageComponent);

export default ListPage;
