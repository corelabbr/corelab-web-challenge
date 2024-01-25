import { NoteCard } from './Form/NoteCard/NoteCard';

import { NoteProps } from '@/types/Note';

import { getSearch } from '@/lib/api';
import styles from './styles.module.scss';

export async function NoteSearch({ param }: { param: { search: string } }) {
  const search: NoteProps[] = await getSearch(param.search);

  if (param.search && search.length > 0) {
    return (
      <div className={styles.list}>
        {search?.map((note) => (
          <NoteCard
            key={note.id}
            noteId={note.id}
            title={note.title}
            description={note.description}
            background={note.color}
            isFavorite={note.favorite}
          />
        ))}
      </div>
    );
  }
  return <span className={styles.info}>Encontre uma anotação</span>;
}