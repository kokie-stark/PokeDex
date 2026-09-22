import type { PokemonSummary } from '@/Types';
import { mergeCSS, styles } from '@pokedex/ui';
import { motion } from 'motion/react';
import { memo } from 'react';
import PokemonCard from './PokemonCard';

type PokemonCardGridProps = {
  pokemons: PokemonSummary[];
};

const gridClassName = mergeCSS(styles.display('flex'), styles.flexWrap('wrap'), styles.gap(2));

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.04 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

const PokemonCardGridComponent = (props: PokemonCardGridProps) => {
  const { pokemons } = props;

  return (
    <motion.div className={gridClassName} variants={containerVariants} initial="hidden" animate="show">
      {pokemons.map(p => (
        <motion.div key={p.id} variants={itemVariants}>
          <PokemonCard id={p.id} name={p.name} imageUrl={p.imageUrl} />
        </motion.div>
      ))}
    </motion.div>
  );
};

const PokemonCardGrid = memo(PokemonCardGridComponent);

export default PokemonCardGrid;
