import { Box, LinearProgress, Typography, mergeCSS, raw, styles } from '@pokedex/ui';
import { animate, useMotionValue, useMotionValueEvent } from 'motion/react';
import { memo, useEffect, useState } from 'react';

type StatBarProps = {
  name: string;
  value: number;
  max: number;
};

const progressClassName = raw({
  '& .MuiLinearProgress-bar1': {
    transition: 'none',
  },
});

const StatBarComponent = (props: StatBarProps) => {
  const { name, value, max } = props;
  const motionValue = useMotionValue(0);
  const [displayValue, setDisplayValue] = useState(0);

  useMotionValueEvent(motionValue, 'change', latest => setDisplayValue(Math.round(latest)));

  useEffect(() => {
    const controls = animate(motionValue, value, { duration: 0.8, ease: 'easeOut' });
    return () => controls.stop();
  }, [motionValue, value]);

  return (
    <Box>
      <Box className={mergeCSS(styles.display('flex'), styles.justifyContent('space-between'))}>
        <Typography variant="body2">{name}</Typography>
        <Typography variant="body2">{displayValue}</Typography>
      </Box>
      <LinearProgress
        className={progressClassName}
        variant="determinate"
        value={Math.min(100, (displayValue / max) * 100)}
      />
    </Box>
  );
};

const StatBar = memo(StatBarComponent);

export default StatBar;
