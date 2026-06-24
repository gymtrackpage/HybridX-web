'use client';

import React, { useEffect, useRef, useState } from 'react';

interface RiseProps {
  children: React.ReactNode;
  className?: string;
  /** Render as a different element (default div). */
  as?: 'div' | 'section' | 'li';
}

/**
 * Wraps content in a fade-and-rise-on-scroll reveal. Respects prefers-reduced-motion
 * via the CSS in globals.css. Reveals once, then disconnects.
 */
export default function Rise({ children, className = '', as = 'div' }: RiseProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const Tag = as as React.ElementType;
  return (
    <Tag ref={ref} className={`engine-rise ${visible ? 'is-visible' : ''} ${className}`}>
      {children}
    </Tag>
  );
}
