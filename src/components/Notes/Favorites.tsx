import { NoteCard } from '@/components/Notes/Form/NoteCard/NoteCard';

import { getFavorites } from '@/lib/api';
import { NoteProps } from '@/types/Note';

import styles from './styles.module.scss';

export async function Favorites() {
  const favorites: NoteProps[] = await getFavorites();

  return (
    <div className={styles.list}>
      {favorites.map((favorite) => (
        <NoteCard
          key={favorite.id}
          noteId={favorite.id}
          title={favorite.title}
          description={favorite.description}
          background={favorite.color}
          isFavorite={favorite.favorite}
        />
      ))}
    </div>
  );
}