import { useAuth } from '@/Auth';
import { PokemonCarousel } from '@/Components';
import { ROUTES } from '@/Consts';
import { Box, Card, CardActionArea, Typography, mergeCSS, raw, styles } from '@pokedex/ui';
import { memo, useState } from 'react';
import { Link } from 'react-router';

const FEATURED_COUNT = 6;
const MAX_POKEMON_ID = 1025;

const getRandomIds = (count: number, max: number): number[] => {
  const ids = new Set<number>();
  while (ids.size < count) {
    ids.add(Math.floor(Math.random() * max) + 1);
  }
  return Array.from(ids);
};

const quickAccessGridClassName = mergeCSS(styles.display('flex'), styles.gap(2), styles.justifyContent('center'));

const hoverCardClassName = raw({
  transition: 'transform 200ms ease, box-shadow 200ms ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 16px rgba(0,0,0,0.15)',
  },
});

const HomePageComponent = () => {
  const { session } = useAuth();
  const [featuredIds] = useState(() => getRandomIds(FEATURED_COUNT, MAX_POKEMON_ID));

  return (
    <Box style={{ padding: 16 }}>
      <Typography variant="h4" style={{ marginBottom: 16, textAlign: 'center' }}>
        ポケモン図鑑へようこそ
      </Typography>

      <PokemonCarousel ids={featuredIds} />

      <Box className={quickAccessGridClassName} style={{ marginTop: 32 }}>
        <Card className={hoverCardClassName} style={{ width: 160 }}>
          <CardActionArea component={Link} to={ROUTES.LIST} style={{ padding: 24, textAlign: 'center' }}>
            <Typography variant="h6">一覧を見る</Typography>
          </CardActionArea>
        </Card>
        {session ? (
          <Card className={hoverCardClassName} style={{ width: 160 }}>
            <CardActionArea
              component={Link}
              to={ROUTES.FAVORITES}
              style={{ padding: 24, textAlign: 'center' }}
            >
              <Typography variant="h6">お気に入り</Typography>
            </CardActionArea>
          </Card>
        ) : (
          <Card className={hoverCardClassName} style={{ width: 160 }}>
            <CardActionArea
              component={Link}
              to={ROUTES.LOGIN}
              style={{ padding: 24, textAlign: 'center' }}
            >
              <Typography variant="h6">ログイン</Typography>
            </CardActionArea>
          </Card>
        )}
      </Box>
    </Box>
  );
};

const HomePage = memo(HomePageComponent);

export default HomePage;
