import { NoteSearch } from '@/components/Notes/Search';
import { NotesSkeleton } from '@/components/Notes/Skeleton';
import { Suspense } from 'react';
import styles from './styles.module.scss';

export default function Search(
  { searchParams }: { [key: string]: { search: string } }
) {

  return (
    <main className={styles.search}>
      <Suspense fallback={<NotesSkeleton />}>
        <NoteSearch param={searchParams} />
      </Suspense>
    </main>
  )
}