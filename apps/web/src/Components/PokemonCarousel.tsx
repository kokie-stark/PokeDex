import { fetchPokemonDetail } from '@/Api';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Box, CardActionArea, Chip, IconButton, MobileStepper, Skeleton, Typography, styles } from '@pokedex/ui';
import { useSuspenseQuery } from '@tanstack/react-query';
import { memo, Suspense, useEffect, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Link } from 'react-router';

const SLIDE_INTERVAL_MS = 4000;
const stripClassName = styles.display('flex');

type PokemonCarouselProps = {
  ids: number[];
};

const PokemonCarouselContentComponent = (props: PokemonCarouselProps) => {
  const { ids } = props;

  const { data: pokemons } = useSuspenseQuery({
    queryKey: ['featuredPokemon', ids],
    queryFn: () => Promise.all(ids.map(fetchPokemonDetail)),
  });

  const [activeStep, setActiveStep] = useState(0);
  const [withTransition, setWithTransition] = useState(true);
  const maxSteps = pokemons.length;

  const goToStep = (nextStep: number) => {
    const isWrapping = nextStep < 0 || nextStep >= maxSteps;
    setWithTransition(!isWrapping);
    setActiveStep((nextStep + maxSteps) % maxSteps);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep(prev => {
        const next = prev + 1;
        setWithTransition(next < maxSteps);
        return next % maxSteps;
      });
    }, SLIDE_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [maxSteps]);

  const handleNext = () => goToStep(activeStep + 1);
  const handleBack = () => goToStep(activeStep - 1);

  return (
    <Box style={{ maxWidth: 480, margin: '0 auto' }}>
      <Box style={{ overflow: 'hidden', borderRadius: 8 }}>
        <Box
          className={stripClassName}
          style={{
            width: `${maxSteps * 100}%`,
            transform: `translateX(-${(activeStep * 100) / maxSteps}%)`,
            transition: withTransition ? 'transform 400ms ease' : 'none',
          }}
        >
          {pokemons.map(p => (
            <CardActionArea
              key={p.id}
              component={Link}
              to={`/detail/${p.id}`}
              style={{
                flex: `0 0 ${100 / maxSteps}%`,
                textAlign: 'center',
                padding: 16,
              }}
            >
              {p.imageUrl && <img src={p.imageUrl} alt={p.name} width={160} height={160} />}
              <Typography variant="h6">{p.name}</Typography>
              <Box style={{ marginTop: 4 }}>
                {p.types.map(type => (
                  <Chip key={type} label={type} size="small" style={{ marginRight: 4 }} />
                ))}
              </Box>
            </CardActionArea>
          ))}
        </Box>
      </Box>
      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <IconButton onClick={handleNext} aria-label="次のポケモン">
            <ArrowForwardIosIcon fontSize="small" />
          </IconButton>
        }
        backButton={
          <IconButton onClick={handleBack} aria-label="前のポケモン">
            <ArrowBackIosNewIcon fontSize="small" />
          </IconButton>
        }
      />
    </Box>
  );
};

const PokemonCarouselContent = memo(PokemonCarouselContentComponent);

const PokemonCarouselSkeleton = () => (
  <Box style={{ maxWidth: 480, margin: '0 auto', textAlign: 'center' }}>
    <Skeleton variant="rectangular" width={160} height={160} style={{ margin: '0 auto' }} />
    <Skeleton variant="text" width="40%" style={{ margin: '8px auto 0' }} />
  </Box>
);

const PokemonCarouselComponent = (props: PokemonCarouselProps) => (
  <ErrorBoundary
    fallbackRender={({ error }) => (
      <Typography color="error">
        Error: {error instanceof Error ? error.message : 'unknown error'}
      </Typography>
    )}
  >
    <Suspense fallback={<PokemonCarouselSkeleton />}>
      <PokemonCarouselContent {...props} />
    </Suspense>
  </ErrorBoundary>
);

const PokemonCarousel = memo(PokemonCarouselComponent);

export default PokemonCarousel;
