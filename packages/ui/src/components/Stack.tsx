import { styled } from '@mui/material/styles';
import MuiStack from '@mui/material/Stack';
import type { ComponentProps } from 'react';

// styled() drops MUI's OverridableComponent typing (the `component` prop for polymorphism),
// so cast back to the original type to keep e.g. `<Stack component="nav">` working.
export const Stack = styled(MuiStack)({}) as typeof MuiStack;

export type StackProps = ComponentProps<typeof MuiStack>;
