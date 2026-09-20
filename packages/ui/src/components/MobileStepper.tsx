import { styled } from '@mui/material/styles';
import MuiMobileStepper from '@mui/material/MobileStepper';
import type { ComponentProps } from 'react';

export const MobileStepper = styled(MuiMobileStepper)({}) as typeof MuiMobileStepper;

export type MobileStepperProps = ComponentProps<typeof MuiMobileStepper>;
