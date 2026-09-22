import { styled } from '@mui/material/styles';
import MuiSkeleton from '@mui/material/Skeleton';
import type { ComponentProps } from 'react';

export const Skeleton = styled(MuiSkeleton)({}) as typeof MuiSkeleton;

export type SkeletonProps = ComponentProps<typeof MuiSkeleton>;
