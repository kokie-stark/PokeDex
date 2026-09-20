import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import type { ComponentProps } from 'react';

export const Drawer = styled(MuiDrawer)({}) as typeof MuiDrawer;

export type DrawerProps = ComponentProps<typeof MuiDrawer>;
