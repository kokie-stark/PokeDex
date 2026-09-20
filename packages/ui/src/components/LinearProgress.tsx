import { styled } from '@mui/material/styles';
import MuiLinearProgress from '@mui/material/LinearProgress';
import type { ComponentProps } from 'react';

export const LinearProgress = styled(MuiLinearProgress)({}) as typeof MuiLinearProgress;

export type LinearProgressProps = ComponentProps<typeof MuiLinearProgress>;
