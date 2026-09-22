import { useFavorites } from '@/Hooks';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { Card, CardActionArea, CardContent, CardMedia, IconButton, Typography } from '@pokedex/ui';
import { memo } from 'react';
import { Link } from 'react-router';

type PokemonCardProps = {
  id: number;
  name: string;
  imageUrl: string | null;
};

const PokemonCardComponent = (props: PokemonCardProps) => {
  const { id, name, imageUrl } = props;
  const { isLoggedIn, isFavorite, toggleFavorite } = useFavorites();

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
      {isLoggedIn && (
        <IconButton
          onClick={() => toggleFavorite(id)}
          style={{ position: 'absolute', top: 4, right: 4 }}
          aria-label="お気に入り切り替え"
        >
          {isFavorite(id) ? <StarIcon color="warning" /> : <StarBorderIcon />}
        </IconButton>
      )}
    </Card>
  );
};

const PokemonCard = memo(PokemonCardComponent);

export default PokemonCard;
