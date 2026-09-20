import { Header, SideMenu } from '@/Components';
import { HEADER_HEIGHT } from '@/Components/Header';
import { DRAWER_WIDTH } from '@/Components/SideMenu';
import { Box } from '@pokedex/ui';
import { memo, useState } from 'react';
import { Outlet } from 'react-router';

const shiftStyle = (isMenuOpen: boolean) => ({
  marginLeft: isMenuOpen ? DRAWER_WIDTH : 0,
  paddingTop: HEADER_HEIGHT,
  transition: 'margin-left 225ms cubic-bezier(0, 0, 0.2, 1)',
});

const DefaultLayoutComponent = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Box>
      <Header onMenuClick={() => setIsMenuOpen(prev => !prev)} />
      <SideMenu open={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <Box component="main" style={shiftStyle(isMenuOpen)}>
        <Outlet />
      </Box>
    </Box>
  );
};

const DefaultLayout = memo(DefaultLayoutComponent);

export default DefaultLayout;
