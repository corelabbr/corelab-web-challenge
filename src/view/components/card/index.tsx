import type { Note } from '@/app/entities/note'
import clsx from 'clsx'
import { Palette, Star, Trash2 } from 'lucide-react'
import { Button } from '../button'
import { ColorList } from '../form-notes/color-list'
import { Input } from '../input'
import { TextArea } from '../text-area'
import styles from './styles.module.scss'
import { useCardController } from './use-card-controller'

type NoteCardProps = {
  data: Note
}

export function NoteCard({ data }: NoteCardProps) {
  const {
    color,
    description,
    title,
    isFavorite,
    handleSelectColor,
    handleSubmitUpdate,
    handleDelete,
    isColorListOpen,
    setDescription,
    setIsColorListOpen,
    isEditable,
    handleEditable,
    setTitle,
    setIsFavorite,
    handleFavoriteNote,
    handleCancel,
  } = useCardController({
    note: data,
  })

  return (
    <article
      className={styles.container}
      style={{ background: color }}
      onClick={() => handleEditable(true)}
    >
      <Button
        variants="ghost"
        type="button"
        className={styles.favorite}
        onClick={(e) => {
          e.stopPropagation()
          if (isEditable) {
            setIsFavorite((prev) => !prev)
          } else {
            handleFavoriteNote(data.id, !isFavorite)
          }
        }}
      >
        <Star
          size={16}
          data-is-favorite={isFavorite}
          className={styles['star-icon']}
        />
      </Button>

      {!isEditable && (
        <>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.description}>{description}</p>
        </>
      )}

      {isEditable && (
        <form onSubmit={handleSubmitUpdate} className={styles.form}>
          <div className={styles.wrapper}>
            <Input
              placeholder="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextArea
              placeholder="take a note..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <footer className={styles.footer}>
            <div>
              <div className={styles['container-pallet-action-button']}>
                <Button
                  variants="ghost"
                  type="button"
                  className={styles.icon}
                  onClick={() => setIsColorListOpen(true)}
                >
                  <Palette className={styles['palette-icon']} size={16} />
                </Button>

                <ColorList
                  onClose={() => setIsColorListOpen(false)}
                  isOpen={isColorListOpen}
                  currentColor={data.color}
                  onSelectColor={handleSelectColor}
                />
              </div>

              <Button
                variants="ghost"
                type="button"
                className={clsx(styles.icon, styles.delete)}
                onClick={() => handleDelete(data.id)}
              >
                <Trash2 size={16} className={styles['star-icon']} />
              </Button>
            </div>

            <div>
              <Button variants="ghost" type="button" onClick={handleCancel}>
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </div>
          </footer>
        </form>
      )}
    </article>
  )
}
