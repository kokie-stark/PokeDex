import { styled } from '@mui/material/styles';
import MuiCardContent from '@mui/material/CardContent';
import type { ComponentProps } from 'react';

export const CardContent = styled(MuiCardContent)({}) as typeof MuiCardContent;

export type CardContentProps = ComponentProps<typeof MuiCardContent>;
