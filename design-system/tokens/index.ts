import tokens from './tokens.json';

export const ds = {
  color: tokens.color,
  glass: tokens.glass,
  gradient: tokens.gradient,
  shadow: tokens.shadow,
  radius: tokens.radius,
  space: tokens.space,
  font: tokens.font,
  fontSize: tokens.fontSize,
  semantic: tokens.semantic,
} as const;

export type DesignTokens = typeof ds;
