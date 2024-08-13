import { BucketPencilIcon, PencilIcon, XIcon } from '@/components/Icons'
import Colors from '../Colors'
import { MouseEventHandler } from 'react'

import styles from './CardFooter.module.scss'

type CardFooterProps = {
  pencilOnClick: MouseEventHandler<SVGSVGElement>
  bucketOnClick: MouseEventHandler<SVGSVGElement>
  deleteOnClick: MouseEventHandler<SVGSVGElement>
  updateTodoColor(color: string): Promise<void>
  isEditing: boolean
  isOpen: boolean
}

function CardFooter({
  pencilOnClick,
  bucketOnClick,
  deleteOnClick,
  updateTodoColor,
  isEditing,
  isOpen,
}: CardFooterProps) {
  return (
    <div className={styles.content_footer}>
      <div className={styles.content_footer_edit}>
        <div className={`${isEditing ? styles.content_footer_edit_colors_open : ''}`}>
          <PencilIcon onClick={pencilOnClick} />
        </div>
        <div
          className={`${styles.content_footer_edit_colors} ${isOpen ? styles.content_footer_edit_colors_open : ''}`}
        >
          <BucketPencilIcon onClick={bucketOnClick} />
          {isOpen && <Colors updateTodoColor={updateTodoColor} />}
        </div>
      </div>
      <div className={styles.content_footer_delete}>
        <XIcon onClick={deleteOnClick} />
      </div>
    </div>
  )
}

export default CardFooter
