import { fetchPokemonDetail } from '@/Api';
import { ROUTES } from '@/Consts';
import { useFavorites } from '@/Hooks';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import {
  Box,
  Chip,
  IconButton,
  Stack,
  Typography,
  mergeCSS,
  styles,
} from '@pokedex/ui';
import { useSuspenseQuery } from '@tanstack/react-query';
import { memo, Suspense } from 'react';
import { Link, useParams } from 'react-router';

type DetailPageContentProps = {
  id: number;
};

const headerClassName = mergeCSS(styles.display('flex'), styles.alignItems('center'), styles.gap(3));

const DetailPageContentComponent = (props: DetailPageContentProps) => {
  const { id } = props;

  const { data } = useSuspenseQuery({
    queryFn: () => fetchPokemonDetail(id),
    queryKey: ['details', id],
  });

  const { isLoggedIn, isFavorite, toggleFavorite } = useFavorites();

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
          <Box className={mergeCSS(styles.display('flex'), styles.alignItems('center'), styles.gap(1))}>
            <Typography variant="h4">{data.name}</Typography>
            {isLoggedIn && (
              <IconButton onClick={() => toggleFavorite(id)} aria-label="お気に入り切り替え">
                {isFavorite(id) ? <StarIcon color="warning" /> : <StarBorderIcon />}
              </IconButton>
            )}
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

      <Link to={ROUTES.HOME}>ホームへ</Link>
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
    <Suspense fallback={<h1>loading..</h1>}>
      <DetailPageContent id={Number(id)} />
    </Suspense>
  );
};

const DetailPage = memo(DetailPageComponent);

export default DetailPage;
