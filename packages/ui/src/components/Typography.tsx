import { styled } from '@mui/material/styles';
import MuiTypography from '@mui/material/Typography';
import type { ComponentProps } from 'react';

// styled() drops MUI's OverridableComponent typing (the `component` prop for polymorphism),
// so cast back to the original type to keep e.g. `<Typography component={Link}>` working.
export const Typography = styled(MuiTypography)({}) as typeof MuiTypography;

export type TypographyProps = ComponentProps<typeof MuiTypography>;
