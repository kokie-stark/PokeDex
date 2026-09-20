import { styled } from '@mui/material/styles';
import MuiMenuItem from '@mui/material/MenuItem';
import type { ComponentProps } from 'react';

export const MenuItem = styled(MuiMenuItem)({}) as typeof MuiMenuItem;

export type MenuItemProps = ComponentProps<typeof MuiMenuItem>;
