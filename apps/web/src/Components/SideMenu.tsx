import { useAuth } from '@/Auth';
import { HEADER_HEIGHT } from '@/Components/Header';
import { ROUTES } from '@/Consts';
import { Button, Drawer, Stack, styles } from '@pokedex/ui';
import { memo } from 'react';
import { Link } from 'react-router';

export const DRAWER_WIDTH = 180;

type SideMenuProps = {
  open: boolean;
  onClose: () => void;
};

const SideMenuComponent = (props: SideMenuProps) => {
  const { open, onClose } = props;
  const { session } = useAuth();

  return (
    <Drawer
      variant="persistent"
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          style: {
            width: DRAWER_WIDTH,
            top: HEADER_HEIGHT,
            height: `calc(100% - ${HEADER_HEIGHT}px)`,
          },
        },
      }}
    >
      <Stack component="nav" spacing={1} className={styles.padding(2)}>
        <Button component={Link} to={ROUTES.HOME} onClick={onClose}>
          ホーム
        </Button>
        <Button component={Link} to={ROUTES.LIST} onClick={onClose}>
          一覧
        </Button>
        {session && (
          <Button component={Link} to={ROUTES.FAVORITES} onClick={onClose}>
            お気に入り
          </Button>
        )}
      </Stack>
    </Drawer>
  );
};

const SideMenu = memo(SideMenuComponent);

export default SideMenu;
