import { Header, SideMenu } from '@/Components';
import { HEADER_HEIGHT } from '@/Components/Header';
import { DRAWER_WIDTH } from '@/Components/SideMenu';
import { useIsMobile } from '@/Hooks';
import { Box } from '@pokedex/ui';
import { AnimatePresence, motion } from 'motion/react';
import { memo, useState } from 'react';
import { useLocation, useOutlet } from 'react-router';

const shiftStyle = (shouldShift: boolean) => ({
  marginLeft: shouldShift ? DRAWER_WIDTH : 0,
  paddingTop: HEADER_HEIGHT,
  transition: 'margin-left 225ms cubic-bezier(0, 0, 0.2, 1)',
});

const DefaultLayoutComponent = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();
  const outlet = useOutlet();

  return (
    <Box>
      <Header onMenuClick={() => setIsMenuOpen(prev => !prev)} />
      <SideMenu open={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      {/* temporaryのDrawer(モバイル)はオーバーレイ表示なので本文をずらす必要はない */}
      <Box component="main" style={shiftStyle(isMenuOpen && !isMobile)}>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            {outlet}
          </motion.div>
        </AnimatePresence>
      </Box>
    </Box>
  );
};

const DefaultLayout = memo(DefaultLayoutComponent);

export default DefaultLayout;
