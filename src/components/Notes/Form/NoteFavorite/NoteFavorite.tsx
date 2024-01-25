import { CheckboxFavorite } from '@/components/Checkbox/CheckboxFavotite';
import { putFavorite } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from './styles.module.scss';

export function NoteFavorite({ noteId, value }: { noteId: number, value?: boolean }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    setLoading(true);

    await putFavorite(noteId, !value)
      .then(() => {
        setLoading(false);
        router.refresh();
      });

    setLoading(false)
  }

  return (
    <div className={styles.favorite} onClick={handleClick}>
      <CheckboxFavorite defaultChecked={value} disabled={loading} />
    </div>
  );
}