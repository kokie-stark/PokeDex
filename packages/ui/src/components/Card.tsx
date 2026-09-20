import { styled } from '@mui/material/styles';
import MuiCard from '@mui/material/Card';
import type { ComponentProps } from 'react';

export const Card = styled(MuiCard)({}) as typeof MuiCard;

export type CardProps = ComponentProps<typeof MuiCard>;
