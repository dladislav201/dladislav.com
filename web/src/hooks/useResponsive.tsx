import { useState, useEffect } from "react";

interface ResponsiveState {
  isMobile: boolean;
}

/**
 * Hook for determining screen size and corresponding modes (mobile/desktop)
 * @param breakpoint - Breakpoint for mobile mode in pixels (default 768px)
 * @returns Object with isMobile property that indicates if the current mode is mobile
 */

export const useResponsive = (breakpoint: number = 768): ResponsiveState => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    checkScreenSize();

    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, [breakpoint]);

  return { isMobile };
};
