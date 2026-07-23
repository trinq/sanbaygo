import React, { ReactNode } from 'react';
import styles from './ResultCard.module.css';

export type GlassTier = 1 | 2 | 3;

interface ResultCardProps {
  tier?: GlassTier;
  children: ReactNode;
  className?: string;
}

export function ResultCard({ tier = 1, children, className }: ResultCardProps) {
  const tierClass = styles[`tier${tier}`];
  return <div className={`${styles.card} ${tierClass} ${className ?? ''}`}>{children}</div>;
}
