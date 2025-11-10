import { useEffect, useRef, useState } from 'react'

export function useWindowDimensions() {
  const [width, setWidth] = useState(window.innerWidth)
  const setuped = useRef(false)

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth)
    }

    if (!setuped.current) {
      setuped.current = true
      window.addEventListener('resize', handleResize)
    }

    return () => {
      window.removeEventListener('resize', handleResize)
      setuped.current = false
    }
  }, [])

  return {
    width
  }
}
