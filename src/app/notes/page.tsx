import { Suspense } from 'react';

import { NoteForm } from '@/components/Notes/Form/NoteCreate/NoteForm';
import { Others } from '@/components/Notes/Others';

import { Favorites } from '@/components/Notes/Favorites';
import { NotesSkeleton } from '@/components/Notes/Skeleton';
import styles from './styles.module.scss';

export default function Notes() {
  return (
    <main className={styles.notes}>
      <NoteForm />

      <section>
        <h4>Favorites</h4>
        <Suspense fallback={<NotesSkeleton />}>
          <Favorites />
        </Suspense>

        <h4>Outras</h4>
        <Suspense fallback={<NotesSkeleton />}>
          <Others />
        </Suspense>
      </section>
    </main>
  );
}