import { styled } from '@mui/material/styles';
import MuiIconButton from '@mui/material/IconButton';
import type { ComponentProps } from 'react';

export const IconButton = styled(MuiIconButton)({}) as typeof MuiIconButton;

export type IconButtonProps = ComponentProps<typeof MuiIconButton>;
