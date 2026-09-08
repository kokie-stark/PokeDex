import { styled } from '@mui/material/styles';
import MuiButton from '@mui/material/Button';
import type { ComponentProps } from 'react';

export const Button = styled(MuiButton)({});

export type ButtonProps = ComponentProps<typeof MuiButton>;
