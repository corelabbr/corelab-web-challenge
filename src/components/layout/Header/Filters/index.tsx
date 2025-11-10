import { PickColor } from 'components/shared/PickColor'
import { useWindowDimensions } from 'hooks/useWindowResize'
import { Filter, X } from 'lucide-react'
import {
  ChangeEvent,
  useEffect,
  useRef,
  useState
} from 'react'
import styles from './Filters.module.scss'
import { useLayoutContext } from 'components/layout/context/LayoutContext'
import { Kind } from 'types/FilterKind'

export function Filters() {
  const filterRef = useRef<HTMLDivElement | null>(null)
  const boxFilterRef = useRef<HTMLDivElement | null>(null)
  const [pickingFilter, setPickingFilter] = useState(false)
  const { width: windowWidth } = useWindowDimensions()
  const { color, setColor, kind, setKind } = useLayoutContext()

  useEffect(() => {
    const handleCloseOnCllick = (e: any) => {
      const target = e.target as HTMLElement

      if (!filterRef.current?.contains(target)) {
        setPickingFilter(false)
      }
    }
    if (filterRef.current) {
      window.addEventListener('click', handleCloseOnCllick)
    }

    return () => {
      window.removeEventListener('click', handleCloseOnCllick)
    }
  }, [filterRef])

  const handleCheckKind = (
    selectedKind: Kind,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const checked = e.target.checked

    if (checked) {
      if (kind === Kind.all) {
        setKind(selectedKind)
        return
      }
      if (kind !== Kind.none) {
        setKind(Kind.all)
        return
      }

      setKind(selectedKind)
    } else {
      if (kind === Kind.all || kind === Kind.none) {
        setKind(selectedKind === Kind.favorite ? Kind.others : Kind.favorite)
        return
      }
      setKind(selectedKind)
    }
  }

  const getFillColor= () => {
    if (color?.length) return color
    if (kind !== Kind.none) return '#7acfee'

    return '#fff'
  }

  return (
    <div ref={filterRef} className={styles.Filters}>
      <button
        className={styles.btnIcon}
        onClick={() => setPickingFilter(state => !state)}
      >
        <Filter fill={getFillColor()} />
      </button>
      <div
        data-active={pickingFilter}
        ref={boxFilterRef}
        className={styles.filterBox}
      >
        <div className={styles.pickColor}>
          <PickColor
            forceOpened
            onChangeColor={setColor}
            windowWidth={windowWidth}
            currentColor="#fff"
          />
          {color && (
            <button onClick={() => setColor('')} className={styles.removeColor}>
              <X />
            </button>
          )}
        </div>
        <div className={styles.kindBox}>
          <label className={styles.checkbox}>
            <input
              onChange={e => handleCheckKind(Kind.favorite, e)}
              checked={kind === Kind.favorite || kind === Kind.all}
              type="checkbox"
            />
            <span>Favoritos</span>
          </label>
          <label className={styles.checkbox}>
            <input
              onChange={e => handleCheckKind(Kind.others, e)}
              checked={kind === Kind.others || kind === Kind.all}
              type="checkbox"
            />
            <span>Outros</span>
          </label>
        </div>
      </div>
    </div>
  )
}
