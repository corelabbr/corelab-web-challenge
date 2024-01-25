import { NoteCard } from '@/components/Notes/Form/NoteCard/NoteCard';

import { getOthers } from '@/lib/api';
import { NoteProps } from '@/types/Note';

import styles from './styles.module.scss';

export async function Others() {
  const others: NoteProps[] = await getOthers();

  return (
    <div className={styles.list}>
      {others.map((other) => (
        <NoteCard
          key={other.id}
          noteId={other.id}
          title={other.title}
          description={other.description}
          background={other.color}
          isFavorite={other.favorite}
        />
      ))}
    </div>
  );
}