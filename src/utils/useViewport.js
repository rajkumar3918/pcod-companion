import { useState, useEffect } from "react";

const DESKTOP_BREAKPOINT = 900;

export function useViewport() {
  const [width, setWidth] = useState(typeof window !== "undefined" ? window.innerWidth : DESKTOP_BREAKPOINT);

  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return { width, isDesktop: width >= DESKTOP_BREAKPOINT };
}
