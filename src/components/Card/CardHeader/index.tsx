import { StarFillIcon, StarIcon } from '@/components/Icons'
import styles from './CardHeader.module.scss'
import { TodoRegisterType } from '@/types/Todo'

type CardHeaderProps = {
  title: string
  isEditing?: boolean
  favorite: boolean
  colorDefault: boolean
  handleTodoContent(value: boolean | string, key: keyof TodoRegisterType): void
  handleToggleFavorite(): Promise<void> | void
}

function CardHeader({
  title,
  isEditing,
  favorite,
  colorDefault,
  handleTodoContent,
  handleToggleFavorite,
}: CardHeaderProps) {
  return (
    <div className={styles.content_header}>
      {title && !isEditing ? (
        <h4>{title}</h4>
      ) : (
        <input
          type="text"
          name="title"
          placeholder="Título"
          value={title}
          onChange={(ev) => handleTodoContent(ev.target.value, 'title')}
        />
      )}
      {favorite ? (
        <StarFillIcon onClick={handleToggleFavorite} />
      ) : (
        <StarIcon onClick={handleToggleFavorite} />
      )}
      <div className={`${styles.line} ${colorDefault ? styles.default_line : ''}`} />
    </div>
  )
}

export default CardHeader
