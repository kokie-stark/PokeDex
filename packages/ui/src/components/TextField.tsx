import { styled } from '@mui/material/styles';
import MuiTextField from '@mui/material/TextField';
import type { ComponentProps } from 'react';

export const TextField = styled(MuiTextField)({}) as typeof MuiTextField;

export type TextFieldProps = ComponentProps<typeof MuiTextField>;
