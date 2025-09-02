import s from './styles.module.scss';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import ColorPalette from '../Note/ColorPalette';
import InputComponent from '../Input';
import Image from 'next/image';
import Button from '../Button';
import createNote from '../../../api/endpoints/notes/create-note.request';
import { useModal } from '../../hooks/useModal';
import Modal from '../Modal';

export interface ICreateNoteProps {
  onNoteCreated: () => void;
}

const noteCreationSchema = z.object({
  note_title: z.string().min(2, { message: 'Campo obrigatório.' }),
  note_text: z.string().min(2, { message: 'Campo obrigatório.' }),
  note_color: z.enum(['red', 'yellow', 'blue', 'green']),
  starred: z.boolean(),
});

type NoteCreationSchemaInterface = z.infer<typeof noteCreationSchema>;

const NoteCreator = ({ onNoteCreated }: ICreateNoteProps) => {
  const { modal, setModal, openCloseModal } = useModal();

  const [isToggled, setToggled] = useState<boolean>(false);

  const [isColorPickerOpen, setColorPickerOpen] = useState(false);

  const [noteData, setNoteData] = useState<NoteCreationSchemaInterface | null>(
    null,
  );

  const [errorMessage, setErrorMessage] = useState('');

  const { register } = useForm<NoteCreationSchemaInterface>({
    resolver: zodResolver(noteCreationSchema),
    mode: 'all',
  });

  const togglePicker = () => {
    setColorPickerOpen(!isColorPickerOpen);
  };

  function setError(message: string) {
    setErrorMessage(message);
  }

  const save = async () => {
    if (noteData) {
      const token = sessionStorage.getItem('session');
      try {
        if (!noteData.note_color) noteData.note_color = 'yellow';
        if (!noteData.starred) noteData.starred = false;
        const data = await createNote(noteData, token);
        if ('statusCode' in data) {
          setError(data.message);
          if (errorMessage.includes('Validation failed'))
            setError('Favor, inserir dados válidos para criar a nota.');
          setModal({ message: errorMessage, type: 'error' });
        } else {
          setToggled(false);
          setNoteData(null);
          setModal({ message: 'Nota criada com sucesso!', type: 'success' });
          onNoteCreated();
        }
      } catch (error: unknown) {
        setError((error as Error).message);
      }
    } else {
      setError('Por favor, preencha todos os campos para criar uma nota.');
      setModal({ message: errorMessage, type: 'error' });
    }
  };

  return (
    <>
      {isToggled ? (
        <div
          className={`${s.note_creator} ${s.note_creator_toggled} ${s[noteData?.note_color]}`}
        >
          <InputComponent
            value={noteData && noteData.note_title}
            onChange={(e) => {
              setNoteData({
                ...noteData,
                note_title: e.target.value,
              });
            }}
            register={register}
            placeholder="Title"
            name="note_title"
            forName="note_title"
            type="textarea"
            text={''}
            style={{
              fontSize: '16px',
              fontFamily: 'sans-serif',
              resize: 'none',
              height: '42px',
              width: '100%',
            }}
          />
          <InputComponent
            value={noteData && noteData.note_text}
            onChange={(e) => {
              setNoteData({
                ...noteData,
                note_text: e.target.value,
              });
            }}
            register={register}
            name="note_text"
            forName="note_text"
            type="textarea"
            placeholder="Take a note..."
            text={''}
            style={{
              fontSize: '16px',
              fontFamily: 'sans-serif',
              resize: 'none',
              width: '100%',
              height: '180px',
            }}
          />
          <span className={s.actions}>
            <span className={s.actions_section}>
              <Image
                src="/color-picker.png"
                alt="Mudar cor"
                width={16}
                height={16}
                onClick={togglePicker}
              />
              {isColorPickerOpen && (
                <div className={s.color_picker}>
                  <ColorPalette
                    onColorSelect={(color) => {
                      setNoteData({ ...noteData, note_color: color });
                      togglePicker();
                    }}
                  />
                </div>
              )}
              {noteData?.starred ? (
                <Image
                  className={`${s.star} ${s.starred}`}
                  onClick={() => {
                    setNoteData({ ...noteData, starred: false });
                  }}
                  src="/star-fill.png"
                  alt="Starred"
                  width={16}
                  height={16}
                />
              ) : (
                <Image
                  src="/star-traced.png"
                  alt="Unstarred"
                  width={16}
                  height={16}
                  className={`${s.star} ${s.unstarred}`}
                  onClick={() => {
                    setNoteData({ ...noteData, starred: true });
                  }}
                />
              )}
            </span>
            <span className={s.actions_section}>
              <p
                className={s.cancel}
                onClick={() => {
                  setToggled(false);
                }}
              >
                Cancel
              </p>
              <span className={s.save}>
                <Button text="Save" onClick={save} />
              </span>
            </span>
          </span>
        </div>
      ) : (
        <div
          className={`${s.note_creator} ${s.note_creator_untoggled}`}
          onClick={() => setToggled(true)}
        >
          <p>Take a note...</p>
        </div>
      )}
      {modal?.message !== '' && (
        <Modal
          modal={modal}
          openCloseModal={openCloseModal}
          key={modal.message}
        />
      )}
    </>
  );
};

export default NoteCreator;
