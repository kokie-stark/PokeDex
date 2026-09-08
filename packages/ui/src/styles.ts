import { css } from '@emotion/css';
import type { CSSProperties } from 'react';
import { theme } from './theme';

function styleFn<K extends keyof CSSProperties>(property: K) {
  return (value: CSSProperties[K]) => css({ [property]: value });
}

function spacingFn(property: 'gap' | 'margin' | 'padding') {
  return (value: number | string) => css({ [property]: theme.spacing(value) });
}

export const styles = {
  // spacing
  gap: spacingFn('gap'),
  margin: spacingFn('margin'),
  padding: spacingFn('padding'),
  // flexbox
  display: styleFn('display'),
  flexDirection: styleFn('flexDirection'),
  flexWrap: styleFn('flexWrap'),
  justifyContent: styleFn('justifyContent'),
  alignItems: styleFn('alignItems'),
  alignSelf: styleFn('alignSelf'),
  flex: styleFn('flex'),
  // box
  width: styleFn('width'),
  height: styleFn('height'),
  position: styleFn('position'),
  overflow: styleFn('overflow'),
  textAlign: styleFn('textAlign'),
  // 必要なら他のショートハンドもここに追加
} as const;
