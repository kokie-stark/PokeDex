import { supabase } from '@/Api';
import { useAuth } from '@/Auth';
import { ROUTES } from '@/Consts';
import MenuIcon from '@mui/icons-material/Menu';
import { Box, Button, IconButton, Typography, mergeCSS, styles, theme } from '@pokedex/ui';
import { memo } from 'react';
import { Link } from 'react-router';

export const HEADER_HEIGHT = 64;

const titleGroupClassName = mergeCSS(styles.display('flex'), styles.alignItems('center'));

type HeaderProps = {
  onMenuClick: () => void;
};

const HeaderComponent = (props: HeaderProps) => {
  const { onMenuClick } = props;
  const { session } = useAuth();

  return (
    <Box
      component="header"
      className={mergeCSS(
        styles.display('flex'),
        styles.justifyContent('space-between'),
        styles.alignItems('center'),
        styles.padding('0 16px'),
        styles.height(`${HEADER_HEIGHT}px`),
        styles.backgroundColor(theme.palette.primary.main),
      )}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1100,
        color: theme.palette.primary.contrastText,
      }}
    >
      <Box className={titleGroupClassName}>
        <IconButton onClick={onMenuClick} aria-label="メニューの開閉" color="inherit">
          <MenuIcon />
        </IconButton>
        <Typography
          variant="h6"
          component={Link}
          to={ROUTES.HOME}
          color="inherit"
          style={{ color: 'inherit', textDecoration: 'none' }}
        >
          PokeDex
        </Typography>
      </Box>
      {session ? (
        <Button onClick={() => supabase.auth.signOut()} color="inherit">
          ログアウト
        </Button>
      ) : (
        <Button component={Link} to={ROUTES.LOGIN} color="inherit">
          ログイン
        </Button>
      )}
    </Box>
  );
};

const Header = memo(HeaderComponent);

export default Header;
