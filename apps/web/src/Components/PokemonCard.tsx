import { FavoriteButton } from '@/Components';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@pokedex/ui';
import { memo } from 'react';
import { Link } from 'react-router';

type PokemonCardProps = {
  id: number;
  name: string;
  imageUrl: string | null;
};

const PokemonCardComponent = (props: PokemonCardProps) => {
  const { id, name, imageUrl } = props;

  return (
    <Card style={{ width: 160, position: 'relative' }}>
      <CardActionArea component={Link} to={`/detail/${id}`}>
        {imageUrl && (
          <CardMedia
            component="img"
            image={imageUrl}
            alt={name}
            style={{ height: 120, objectFit: 'contain', padding: 8 }}
          />
        )}
        <CardContent>
          <Typography variant="caption" color="text.secondary">
            #{String(id).padStart(3, '0')}
          </Typography>
          <Typography variant="body1">{name}</Typography>
        </CardContent>
      </CardActionArea>
      <FavoriteButton pokemonId={id} style={{ position: 'absolute', top: 4, right: 4 }} />
    </Card>
  );
};

const PokemonCard = memo(PokemonCardComponent);

export default PokemonCard;
