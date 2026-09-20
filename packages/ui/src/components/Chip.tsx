import { styled } from '@mui/material/styles';
import MuiChip from '@mui/material/Chip';
import type { ComponentProps } from 'react';

export const Chip = styled(MuiChip)({}) as typeof MuiChip;

export type ChipProps = ComponentProps<typeof MuiChip>;
