'use client'
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { deleteNote } from '@/lib/api';
import { toast } from '@/utils/toast';
import styles from './styles.module.scss';

export function NoteDelete({ noteId }: { noteId: number }) {
  const router = useRouter();

  async function handleClick() {
    await deleteNote(noteId)
      .then(({data}) => {
        toast(data);
        router.refresh();
      });
  }

  return (
    <Image
      className={styles.delete}
      src="/icons/x.svg"
      alt="deletar"
      width={16} height={16}
      onClick={handleClick}
    />
  );
}