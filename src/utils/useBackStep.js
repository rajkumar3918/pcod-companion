import { useEffect, useRef } from "react";
import { pushBackStep, popBackStep } from "./backNav";

// While `active` is true, a physical/browser back press calls `onBack`
// instead of exiting the app or leaving the page. Toggle `active` off (or
// unmount) to close the step normally — that also cleans up the history
// entry so a later back press doesn't hit a stale one.
export function useBackStep(active, onBack) {
  const idRef = useRef(null);
  const onBackRef = useRef(onBack);
  onBackRef.current = onBack;

  useEffect(() => {
    if (!active) return undefined;
    idRef.current = pushBackStep(() => onBackRef.current());
    return () => {
      if (idRef.current != null) {
        popBackStep(idRef.current);
        idRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);
}
