import { Header, SideMenu } from '@/Components';
import { HEADER_HEIGHT } from '@/Components/Header';
import { DRAWER_WIDTH } from '@/Components/SideMenu';
import { useIsMobile } from '@/Hooks';
import { Box } from '@pokedex/ui';
import { memo, useState } from 'react';
import { Outlet } from 'react-router';

const shiftStyle = (shouldShift: boolean) => ({
  marginLeft: shouldShift ? DRAWER_WIDTH : 0,
  paddingTop: HEADER_HEIGHT,
  transition: 'margin-left 225ms cubic-bezier(0, 0, 0.2, 1)',
});

const DefaultLayoutComponent = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  return (
    <Box>
      <Header onMenuClick={() => setIsMenuOpen(prev => !prev)} />
      <SideMenu open={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      {/* temporaryのDrawer(モバイル)はオーバーレイ表示なので本文をずらす必要はない */}
      <Box component="main" style={shiftStyle(isMenuOpen && !isMobile)}>
        <Outlet />
      </Box>
    </Box>
  );
};

const DefaultLayout = memo(DefaultLayoutComponent);

export default DefaultLayout;
