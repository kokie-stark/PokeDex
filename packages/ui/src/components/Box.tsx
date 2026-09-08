import { styled } from '@mui/material/styles';
import MuiBox from '@mui/material/Box';
import type { ComponentProps } from 'react';

export const Box = styled(MuiBox)({});

export type BoxProps = ComponentProps<typeof MuiBox>;
