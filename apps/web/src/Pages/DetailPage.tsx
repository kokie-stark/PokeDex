import { fetchPokemonDetail } from '@/Api';
import { FavoriteButton, StatBar } from '@/Components';
import { ROUTES } from '@/Consts';
import { useIsMobile } from '@/Hooks';
import { Box, Chip, CircularProgress, Stack, Typography, mergeCSS, styles } from '@pokedex/ui';
import { useSuspenseQuery } from '@tanstack/react-query';
import { memo, Suspense } from 'react';
import { Link, useParams } from 'react-router';

type DetailPageContentProps = {
  id: number;
};

// 種族値の理論上の最大値。バーの長さの基準に使う。
const MAX_BASE_STAT = 255;

const rowClassName = mergeCSS(styles.display('flex'), styles.alignItems('center'), styles.gap(1));

const DetailPageContentComponent = (props: DetailPageContentProps) => {
  const { id } = props;

  const { data } = useSuspenseQuery({
    queryFn: () => fetchPokemonDetail(id),
    queryKey: ['details', id],
  });

  const isMobile = useIsMobile();
  const headerClassName = mergeCSS(
    styles.display('flex'),
    styles.flexDirection(isMobile ? 'column' : 'row'),
    styles.alignItems(isMobile ? 'flex-start' : 'center'),
    styles.gap(3),
  );

  return (
    <Box style={{ padding: 16 }}>
      <Box className={headerClassName}>
        {data.imageUrl && (
          <img src={data.imageUrl} alt={data.name} width={160} height={160} />
        )}
        <Box>
          <Typography variant="caption" color="text.secondary">
            #{String(data.id).padStart(3, '0')}
          </Typography>
          <Box className={rowClassName}>
            <Typography variant="h4">{data.name}</Typography>
            <FavoriteButton pokemonId={id} />
          </Box>
          <Stack direction="row" spacing={1} style={{ marginTop: 8 }}>
            {data.types.map(type => (
              <Chip key={type} label={type} color="primary" variant="outlined" />
            ))}
          </Stack>
          <Typography style={{ marginTop: 8 }}>
            {(data.height / 10).toFixed(1)} m / {(data.weight / 10).toFixed(1)} kg
          </Typography>
        </Box>
      </Box>

      <Box style={{ marginTop: 24 }}>
        <Typography variant="h6">特性</Typography>
        <Stack direction="row" spacing={1} style={{ marginTop: 8 }}>
          {data.abilities.map(ability => (
            <Chip
              key={ability.name}
              label={ability.isHidden ? `${ability.name}（隠れ特性）` : ability.name}
              variant={ability.isHidden ? 'outlined' : 'filled'}
            />
          ))}
        </Stack>
      </Box>

      <Box style={{ marginTop: 24, maxWidth: 400 }}>
        <Typography variant="h6">種族値</Typography>
        <Stack spacing={1} style={{ marginTop: 8 }}>
          {data.stats.map(stat => (
            <StatBar key={stat.name} name={stat.name} value={stat.value} max={MAX_BASE_STAT} />
          ))}
        </Stack>
      </Box>

      <Link to={ROUTES.HOME} style={{ display: 'block', marginTop: 24 }}>
        ホームへ
      </Link>
    </Box>
  );
};

const DetailPageContent = memo(DetailPageContentComponent);

const DetailPageComponent = () => {
  const { id } = useParams();

  if (!id || Number.isNaN(Number(id))) {
    return <div>不正なURLです</div>;
  }

  return (
    <Suspense
      fallback={
        <Box
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '50vh',
          }}
        >
          <CircularProgress />
        </Box>
      }
    >
      <DetailPageContent id={Number(id)} />
    </Suspense>
  );
};

const DetailPage = memo(DetailPageComponent);

export default DetailPage;
