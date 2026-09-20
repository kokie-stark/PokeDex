import { styled } from '@mui/material/styles';
import MuiCardMedia from '@mui/material/CardMedia';
import type { ComponentProps } from 'react';

export const CardMedia = styled(MuiCardMedia)({}) as typeof MuiCardMedia;

export type CardMediaProps = ComponentProps<typeof MuiCardMedia>;
