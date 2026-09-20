import { styled } from '@mui/material/styles';
import MuiSelect from '@mui/material/Select';
import type { ComponentProps } from 'react';

export const Select = styled(MuiSelect)({}) as unknown as typeof MuiSelect;

export type SelectProps = ComponentProps<typeof MuiSelect>;
