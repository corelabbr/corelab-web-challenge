import { type RefObject, useEffect } from 'react'

type Handler = (event?: Event) => void

function useOutsideClick<T extends HTMLElement | null = HTMLElement>(
  ref: RefObject<T>,
  handler: Handler,
): void {
  useEffect(() => {
    const listener = (event: Event) => {
      if (!ref?.current || ref.current.contains(event?.target as Node)) {
        return
      }
      handler(event)
    }

    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)

    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [ref, handler])
}

export { useOutsideClick }
