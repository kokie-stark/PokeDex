import { styled } from '@mui/material/styles';
import MuiTypography from '@mui/material/Typography';
import type { ComponentProps } from 'react';

export const Typography = styled(MuiTypography)({});

export type TypographyProps = ComponentProps<typeof MuiTypography>;
