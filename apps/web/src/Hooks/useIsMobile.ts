import { theme } from '@pokedex/ui';
import useMediaQuery from '@mui/material/useMediaQuery';

const useIsMobile = (): boolean => useMediaQuery(theme.breakpoints.down('sm'));

export default useIsMobile;
