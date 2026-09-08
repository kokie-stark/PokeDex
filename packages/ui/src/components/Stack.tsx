import { styled } from '@mui/material/styles';
import MuiStack from '@mui/material/Stack';
import type { ComponentProps } from 'react';

export const Stack = styled(MuiStack)({});

export type StackProps = ComponentProps<typeof MuiStack>;
