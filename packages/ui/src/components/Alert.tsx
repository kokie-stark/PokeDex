import { styled } from '@mui/material/styles';
import MuiAlert from '@mui/material/Alert';
import type { ComponentProps } from 'react';

export const Alert = styled(MuiAlert)({}) as typeof MuiAlert;

export type AlertProps = ComponentProps<typeof MuiAlert>;
