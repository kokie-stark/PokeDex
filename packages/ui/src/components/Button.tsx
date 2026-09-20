import { styled } from '@mui/material/styles';
import MuiButton from '@mui/material/Button';
import type { ComponentProps } from 'react';

// styled() drops MUI's OverridableComponent typing (the `component` prop for polymorphism),
// so cast back to the original type to keep e.g. `<Button component={Link} to="...">` working.
export const Button = styled(MuiButton)({}) as typeof MuiButton;

export type ButtonProps = ComponentProps<typeof MuiButton>;
