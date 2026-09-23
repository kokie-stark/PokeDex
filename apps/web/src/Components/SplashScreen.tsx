import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import { Typography, theme } from '@pokedex/ui';
import { AnimatePresence, motion } from 'motion/react';
import { memo, useEffect, useState, type ReactNode } from 'react';

const DISPLAY_DURATION = 1800;

type SplashScreenProps = {
  children: ReactNode;
};

const SplashScreenComponent = (props: SplashScreenProps) => {
  const { children } = props;
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), DISPLAY_DURATION);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 2000,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 16,
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <CatchingPokemonIcon style={{ fontSize: 96 }} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            >
              <Typography variant="h4" color="inherit">
                PokeDex
              </Typography>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const SplashScreen = memo(SplashScreenComponent);

export default SplashScreen;
