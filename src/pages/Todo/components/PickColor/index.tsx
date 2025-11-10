import { PaintBucket } from 'lucide-react'
import { useEffect, useId, useRef, useState } from 'react'
import styles from './PickColor.module.scss'
import { COLORS } from 'constants/COLORS'

interface PickColorProps {
  onChangeColor: (color: string) => void
  currentColor: string
  windowWidth: number
}

export function PickColor({
  onChangeColor,
  currentColor,
  windowWidth
}: PickColorProps) {
  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const palleteBoxRef = useRef<HTMLDivElement | null>(null)
  const [pickingColor, setPickingColor] = useState(false)
  const defaultWidth = 490
  const [width, setWidth] = useState(defaultWidth)
  const id = useId()

  useEffect(
    function changePalleteBoxSize() {
      if (buttonRef.current) {
        const bounds = buttonRef.current.getBoundingClientRect()
        const spaceRight = window.innerWidth - bounds.x
        if (spaceRight - 20 < width) {
          setWidth(spaceRight - 50)
        } else if (spaceRight + 30 > defaultWidth) {
          setWidth(defaultWidth)
        }
      }
    },
    [buttonRef, windowWidth]
  )

  useEffect(() => {
    const handleCloseOnCllick = (e: any) => {
      const target = e.target as HTMLElement

      if (!palleteBoxRef.current?.contains(target) && !buttonRef.current?.contains(target)) {
        setPickingColor(false)
      }
    }
    if (palleteBoxRef.current) {
      window.addEventListener('click', handleCloseOnCllick)
    }

    return () => {
      window.removeEventListener('click', handleCloseOnCllick)
    }
  }, [palleteBoxRef])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (e.key === 'Enter') {
      setPickingColor(state => !state)
    }
  }

  return (
      <div className={styles.PickColor}>
        <button
          ref={buttonRef}
          onClick={() => setPickingColor(state => !state)}
          onKeyDown={handleKeyDown}
          className={styles.activeAction}
          style={{ background: pickingColor ? '#ffe3b3' : currentColor }}
          type="button"
          aria-label="Pressione enter para escolher uma cor"
          tabIndex={-1}
          data-testid="trigger"
        >
          <PaintBucket size={20} color="#51646E" />
        </button>
        <div
          className={styles.colorsPallete}
          style={{ width }}
          ref={palleteBoxRef}
          data-id={id}
          data-active={pickingColor}
          data-testid="pallete"
          aria-label="Palheta de cores"
        >
          {COLORS.map((color, i) => (
            <button
              key={color}
              onClick={() => onChangeColor(color)}
              className={styles.colorCircle}
              style={{ background: color }}
              type="button"
              aria-label={`Cor numero ${i + 1}`}
            ></button>
          ))}
        </div>
      </div>
  )
}
