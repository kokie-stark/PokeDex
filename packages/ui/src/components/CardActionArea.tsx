import { styled } from '@mui/material/styles';
import MuiCardActionArea from '@mui/material/CardActionArea';
import type { ComponentProps } from 'react';

export const CardActionArea = styled(MuiCardActionArea)({}) as typeof MuiCardActionArea;

export type CardActionAreaProps = ComponentProps<typeof MuiCardActionArea>;
