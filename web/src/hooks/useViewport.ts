import { useEffect, useState } from 'react';
import { tokens } from '@design-system';

export type Viewport = 'mobile' | 'tablet' | 'desktop';

function readViewport(width: number): Viewport {
  if (width < tokens.breakpoint.tablet) return 'mobile';
  if (width < tokens.breakpoint.desktop) return 'tablet';
  return 'desktop';
}

export function useViewport(): Viewport {
  const [viewport, setViewport] = useState<Viewport>(() =>
    typeof window === 'undefined' ? 'mobile' : readViewport(window.innerWidth),
  );

  useEffect(() => {
    const onResize = () => setViewport(readViewport(window.innerWidth));
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return viewport;
}
