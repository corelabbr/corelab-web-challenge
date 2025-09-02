import { useOutsideClick } from '@/app/hooks/use-outside-click'
import clsx from 'clsx'
import { useRef } from 'react'
import styles from './styles.module.scss'

export const COLORS = [
  '#efeff1',
  '#faafa8',
  '#f39f76',
  '#fff8b8',
  '#e2f6d3',
  '#b4ddd3',
  '#d4e4ed',
  '#aeccdc',
  '#d3bfdb',
  '#f6e2dd',
  '#e9e3d4',
]

type ColorListProps = {
  onSelectColor: (e: React.ChangeEvent<HTMLInputElement>) => void
  isOpen: boolean
  onClose: () => void
  currentColor?: string
}

export function ColorList({
  currentColor,
  isOpen,
  onClose,
  onSelectColor,
}: ColorListProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  useOutsideClick<HTMLDivElement | null>(containerRef, () => onClose())

  return (
    <div
      ref={containerRef}
      className={clsx(styles.container, isOpen && styles.isOpen)}
    >
      <ul>
        {COLORS.map((color) => (
          <li key={color} className={styles.wrapper}>
            <input
              id={`color_${color}`}
              name="color"
              type="radio"
              value={color}
              defaultChecked={currentColor === color}
              className={styles.radio}
              onChange={onSelectColor}
            />
            <label
              htmlFor={`color_${color}`}
              className={styles.label}
              style={{ background: color }}
            >
              <span className={styles['sr-only']}>{color}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  )
}
