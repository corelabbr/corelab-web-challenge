'use client'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

import { FadeInDiv } from '@/components/Motion/FadeIn';
import { NoteDelete } from '../NoteDelete/NoteDelete';

import { putNote } from '@/lib/api';
import { NoteCardProps } from '@/types/NoteCard';
import { toast } from '@/utils/toast';
import { NoteColor } from '../NoteColor/NoteColor';
import { NoteFavorite } from '../NoteFavorite/NoteFavorite';
import styles from './styles.module.scss';

export function NoteCard(props: NoteCardProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState(props.title);
  const [description, setDescription] = useState(props.description);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    setLoading(true);
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    if (formData.get('description')) {
      await putNote(props.noteId, {
        title: formData.get('title') ? formData.get('title') : "Título",
        description: formData.get('description')
      }).then(({data}) => {
        toast({
          status: 'success',
          message: `${data.title} alterado`
        })
        router.refresh();
        setLoading(false);
      })
    }
    setLoading(false);
  };

  return (
    <form
      className={styles.card}
      style={{ background: props.background }}
      onSubmit={handleSubmit}
    >
      <FadeInDiv>
        <header>
          <input
            type="text"
            name="title"
            value={title}
            maxLength={245}
            disabled={props.disabled}
            onChange={(e) => setTitle(e.target.value)}
          />
          <NoteFavorite noteId={props.noteId} value={props.isFavorite} />
        </header>
        <hr />
        <section className={styles.content}>
          <textarea
            name="description"
            value={description}
            disabled={props.disabled}
            onChange={(e) => setDescription(e.target.value)}
          />
        </section>
        <footer>
          <div className={styles.edit}>
            {(!description || !title) ||
              (description !== (props.description) || title !== (props.title)) &&
              <FadeInDiv>
                <button type="submit" className={styles.submit} disabled={loading}>
                  <Image
                    src="/icons/pencil.svg"
                    alt="editar cor"
                    width={24} height={24}
                  />
                  {loading ? <span>Carregando...</span> : <span>Salvar</span>}
                </button>
              </FadeInDiv>
            }
            <NoteColor
              noteId={props.noteId}
              color={props.background}
            />
          </div>
          <NoteDelete noteId={props.noteId} />
        </footer>
      </FadeInDiv>
    </form>
  )
}