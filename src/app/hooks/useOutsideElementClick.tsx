import { MutableRefObject, useEffect } from "react";

/**
 *
 * Detects if a click occurred outside the specified 
 * element and triggers the specified callback if so
 *
 */

export default function useOutsideElementClick(
  ref: MutableRefObject<HTMLElement | null>,
  callback: () => unknown
) {
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [callback, ref]);
}
