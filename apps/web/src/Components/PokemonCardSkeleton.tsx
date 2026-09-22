import { Card, CardContent, Skeleton } from '@pokedex/ui';
import { memo } from 'react';

const PokemonCardSkeletonComponent = () => (
  <Card style={{ width: 160 }}>
    <Skeleton variant="rectangular" height={120} />
    <CardContent>
      <Skeleton variant="text" width="40%" />
      <Skeleton variant="text" width="80%" />
    </CardContent>
  </Card>
);

const PokemonCardSkeleton = memo(PokemonCardSkeletonComponent);

export default PokemonCardSkeleton;
