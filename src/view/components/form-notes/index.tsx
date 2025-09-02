import { Palette, Star } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { Button } from '../button'
import { Input } from '../input'
import { TextArea } from '../text-area'
import { ColorList } from './color-list'
import styles from './styles.module.scss'
import { useFormNotesController } from './use-create-notes-controller'

export function FormNotes() {
  const {
    description,
    handleSubmit,
    isFavorite,
    isOpen,
    setDescription,
    setIsFavorite,
    setIsOpen,
    setTitle,
    title,
    isColorListOpen,
    handleSelectColor,
    color,
    setIsColorListOpen,
    titleRef,
    handleCancel,
  } = useFormNotesController()

  return (
    <div className={styles.container}>
      <AnimatePresence
        initial={false}
        onExitComplete={() => {
          titleRef.current?.focus()
        }}
      >
        {!isOpen ? (
          <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{
              opacity: 0,
              height: 0,
            }}
            key="text-create-notes"
            className={styles['open-form']}
            onClick={() => setIsOpen(true)}
          >
            Take a note...
          </motion.div>
        ) : (
          <motion.form
            layout
            initial={{ opacity: 0, height: 0 }}
            animate={{
              opacity: 1,
              height: 170,
              position: 'relative',
              bottom: '100%',
            }}
            exit={{ opacity: 0, height: 0 }}
            className={styles.form}
            key="form-create-notes"
            onSubmit={handleSubmit}
          >
            <div className={styles.wrapper}>
              <Input
                placeholder="title"
                value={title}
                ref={titleRef}
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
                    name="select-color"
                    className={styles.icon}
                    style={{ backgroundColor: color }}
                    onClick={() => setIsColorListOpen((prev) => !prev)}
                  >
                    <Palette className={styles['palette-icon']} size={16} />
                  </Button>

                  <ColorList
                    onClose={() => setIsColorListOpen(false)}
                    isOpen={isColorListOpen}
                    currentColor={color}
                    onSelectColor={handleSelectColor}
                  />
                </div>

                <Button
                  variants="ghost"
                  type="button"
                  id="is-favorite"
                  className={styles.icon}
                  onClick={() => setIsFavorite((prev) => !prev)}
                >
                  <Star
                    size={16}
                    data-is-favorite={isFavorite}
                    className={styles['star-icon']}
                  />
                </Button>
              </div>

              <div>
                <Button variants="ghost" type="button" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button type="submit">Save</Button>
              </div>
            </footer>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}
