import { useLayoutEffect, useState } from 'react';

export function useResponsive(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useLayoutEffect(() => {
    const media = window.matchMedia(`(max-width:${breakpoint}px)`);

    setIsMobile(media.matches);

    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    media.addEventListener('change', handler);

    return () => media.removeEventListener('change', handler);
  }, [breakpoint]);

  return { isMobile };
}
