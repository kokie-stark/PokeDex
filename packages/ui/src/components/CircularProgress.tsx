import { styled } from '@mui/material/styles';
import MuiCircularProgress from '@mui/material/CircularProgress';
import type { ComponentProps } from 'react';

export const CircularProgress = styled(MuiCircularProgress)({}) as typeof MuiCircularProgress;

export type CircularProgressProps = ComponentProps<typeof MuiCircularProgress>;
