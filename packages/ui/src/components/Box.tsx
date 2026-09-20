import { styled } from '@mui/material/styles';
import MuiBox from '@mui/material/Box';
import type { ComponentProps } from 'react';

// styled() drops MUI's OverridableComponent typing (the `component` prop for polymorphism),
// so cast back to the original type to keep e.g. `<Box component="header">` working.
export const Box = styled(MuiBox)({}) as typeof MuiBox;

export type BoxProps = ComponentProps<typeof MuiBox>;
