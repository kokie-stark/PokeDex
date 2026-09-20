import { styled } from '@mui/material/styles';
import MuiPagination from '@mui/material/Pagination';
import type { ComponentProps } from 'react';

export const Pagination = styled(MuiPagination)({}) as typeof MuiPagination;

export type PaginationProps = ComponentProps<typeof MuiPagination>;
