import React from 'react';

interface EngineLogoProps {
  className?: string;
  /** Colour of the X mark. */
  color?: string;
  /** Show the HYBRIDX wordmark beside the X. */
  withWordmark?: boolean;
  /** Colour of the "HYBRID" portion of the wordmark. */
  wordColor?: string;
  /** Colour of the trailing "X" letter in the wordmark. */
  accentColor?: string;
}

/**
 * The HybridX "X" mark, reproduced as crisp inline SVG so it can be recoloured
 * for the funnel's cream / crimson palette. Two angular chevron strokes forming an X.
 */
export function EngineX({ className = '', color = '#FBF5EF' }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" aria-hidden="true" className={className}>
      <path
        d="M12 8 H34 L62 44 L50 60 Z"
        fill={color}
      />
      <path
        d="M88 8 H66 L12 80 L12 92 H34 L88 20 Z"
        fill={color}
      />
      <path
        d="M88 92 H66 L50 70 L62 54 Z"
        fill={color}
      />
    </svg>
  );
}

/**
 * Logo lockup: the X mark, optionally followed by the HYBRIDX wordmark.
 */
export default function EngineLogo({
  className = '',
  color = '#FBF5EF',
  withWordmark = true,
  wordColor = '#FBF5EF',
  accentColor = '#E63946',
}: EngineLogoProps) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <EngineX className="h-7 w-7" color={color} />
      {withWordmark && (
        <span
          className="font-archivo font-extrabold tracking-tight text-xl leading-none"
          style={{ color: wordColor }}
        >
          HYBRID<span style={{ color: accentColor }}>X</span>
        </span>
      )}
    </div>
  );
}
