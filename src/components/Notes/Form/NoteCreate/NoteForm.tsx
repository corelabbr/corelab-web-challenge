'use client'
import { Pin } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

import { CheckboxFavorite } from '@/components/Checkbox/CheckboxFavotite';
import { FadeInDiv } from '../../../Motion/FadeIn';

import { postNote } from '@/lib/api';
import { toast } from '@/utils/toast';
import styles from './styles.module.scss';

export function NoteForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    if (formData.get('description')) {
      await postNote({
        title: formData.get('title') ? formData.get('title') : "Título",
        favorite: (formData.get('favorite') === "on" ? true : false),
        description: formData.get('description')
      }).then(({data}) => {
        toast({ 
          status: 'success', 
          message: `${data.title} criado com sucesso`
        });
        setLoading(false);
        router.refresh();
      })
    }
    setLoading(false)
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <header>
        <input name="title" type="text" placeholder="Título" maxLength={245}/>
        <CheckboxFavorite />
      </header>
      <hr />
      <textarea
        name="description"
        placeholder="Criar nota..."
        onChange={(e: any) => setDescription(e.target.value)}
      />
      {description &&
        <FadeInDiv>
          <button className={styles.submit} type="submit" disabled={loading}>
            <Pin size={20} />
          </button>
        </FadeInDiv>
      }
    </form>
  );
}