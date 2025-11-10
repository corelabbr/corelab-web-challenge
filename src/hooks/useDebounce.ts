import { useRef } from "react";

interface UseDebounce {
  fn: (args: any[]) => void | Promise<void>,
  delay: number
}
export function useDebounce({ fn, delay}: UseDebounce) {
  const timeout = useRef<any>()

  const handler = () => {
    window.clearTimeout(timeout.current)
    timeout.current = setTimeout(fn, delay)
  }

  return handler
}
