import React from 'react';

interface HeartbeatProps {
  /** Stroke colour. Defaults to the lively heart accent. */
  color?: string;
  className?: string;
  /** Animate a one-time draw on mount (respects prefers-reduced-motion via CSS). */
  animate?: boolean;
}

/**
 * The ECG / heartbeat line used across the "Build a Bigger Engine" guide and carousel.
 * Used as a divider and accent under headlines.
 */
export default function Heartbeat({ color = '#E63946', className = '', animate = false }: HeartbeatProps) {
  return (
    <svg
      viewBox="0 0 520 40"
      fill="none"
      role="presentation"
      aria-hidden="true"
      className={className}
      preserveAspectRatio="xMidYMid meet"
    >
      <path
        d="M0 20 H185 l11 -10 l9 20 l11 -13 H280 l13 -18 l13 34 l11 -16 H410 l10 -7 l10 13 l9 -6 H520"
        stroke={color}
        strokeWidth={3.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={animate ? 'engine-ecg-draw' : ''}
      />
    </svg>
  );
}
