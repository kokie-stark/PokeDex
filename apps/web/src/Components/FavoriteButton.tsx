import { useFavorites } from '@/Hooks';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { IconButton } from '@pokedex/ui';
import { motion } from 'motion/react';
import { memo, type CSSProperties } from 'react';

type FavoriteButtonProps = {
  pokemonId: number;
  style?: CSSProperties;
};

const FavoriteButtonComponent = (props: FavoriteButtonProps) => {
  const { pokemonId, style } = props;
  const { isLoggedIn, isFavorite, toggleFavorite } = useFavorites();

  if (!isLoggedIn) {
    return null;
  }

  const favorite = isFavorite(pokemonId);

  return (
    <IconButton
      onClick={() => toggleFavorite(pokemonId)}
      style={style}
      aria-label="お気に入り切り替え"
    >
      <motion.span
        key={favorite ? 'favorite' : 'not-favorite'}
        initial={{ scale: 0.5 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 500, damping: 15 }}
        style={{ display: 'inline-flex' }}
      >
        {favorite ? <StarIcon color="warning" /> : <StarBorderIcon />}
      </motion.span>
    </IconButton>
  );
};

const FavoriteButton = memo(FavoriteButtonComponent);

export default FavoriteButton;
