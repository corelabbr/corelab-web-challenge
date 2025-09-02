import Image from 'next/image';
import s from './styles.module.scss';
import { JSX, useState } from 'react';
import InputComponent from '../Input';
import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import ColorPalette from './ColorPalette';
import Button from '../Button';

export interface INoteProps {
  id_note: string;
  note_title: string;
  note_text: string;
  note_color: string;
  starred: boolean;
  starNote?: (noteData: { note_id: string }) => void;
  changeColor?: (noteData: {
    note_id: string;
    note_color: 'red' | 'yellow' | 'blue' | 'green';
  }) => void;
  updateNote?: (noteData: { note_title: string; note_text: string }) => void;

  deleteNote?: (noteData: { note_id: string }) => void;
}

const noteEditionSchema = z.object({
  note_title: z.string().min(2, { message: 'Campo obrigatório.' }),
  note_text: z.string().min(2, { message: 'Campo obrigatório.' }),
});

type NoteEditionSchemaInterface = z.infer<typeof noteEditionSchema>;

const Note = ({
  id_note,
  note_title,
  note_text,
  note_color,
  starred,
  changeColor: handleColor,
  starNote: handleStar,
  updateNote: handleUpdate,
  deleteNote: handleDelete,
}: INoteProps): JSX.Element => {
  const [isInEdition, setIsInEdition] = useState(false);
  const [edittedNoteData, setEdittedNoteData] = useState({
    note_title,
    note_text,
  });
  const [isColorPickerOpen, setColorPickerOpen] = useState(false);

  const { register } = useForm<NoteEditionSchemaInterface>({
    resolver: zodResolver(noteEditionSchema),
    mode: 'all',
  });

  const star = () => {
    handleStar({ note_id: id_note });
  };

  const changeColor = (newColor: 'red' | 'yellow' | 'blue' | 'green') => {
    handleColor({ note_id: id_note, note_color: newColor });
  };

  const handlePickColor = (color: 'red' | 'yellow' | 'blue' | 'green') => {
    changeColor(color);
    setColorPickerOpen(false);
  };

  const update = () => {
    handleUpdate(edittedNoteData);
    setIsInEdition(false);
  };

  const deleteNote = () => {
    handleDelete({ note_id: id_note });
  };

  const toggleEditMode = () => {
    setEdittedNoteData({ note_title, note_text });
    setIsInEdition(!isInEdition);
  };

  const togglePicker = () => {
    setColorPickerOpen(!isColorPickerOpen);
  };

  return (
    <span className={`${s.note} ${s[note_color]}`} key={id_note}>
      {starred ? (
        <Image
          className={`${s.star} ${s.starred}`}
          onClick={star}
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
          onClick={star}
        />
      )}
      <div
        className={`${isInEdition ? s.editing : s.note_body}`}
        onClick={toggleEditMode}
      >
        <h3 className={`${s.title}`}>{note_title}</h3>
        <p className={`${s.content}`}>{note_text}</p>
      </div>

      {isInEdition ? (
        <div className={s.edit_mode}>
          <InputComponent
            value={edittedNoteData.note_title}
            onChange={(e) => {
              setEdittedNoteData({
                ...edittedNoteData,
                note_title: e.target.value,
              });
            }}
            register={register}
            name="note_title"
            forName="note_title"
            type="textarea"
            transparent
            text={note_title}
            style={{
              fontSize: '16px',
              fontFamily: 'sans-serif',
              resize: 'none',
            }}
          />
          <InputComponent
            value={edittedNoteData.note_text}
            onChange={(e) => {
              setEdittedNoteData({
                ...edittedNoteData,
                note_text: e.target.value,
              });
            }}
            register={register}
            name="note_text"
            forName="note_text"
            type="textarea"
            transparent
            text={note_text}
            style={{
              fontSize: '16px',
              fontFamily: 'sans-serif',
              resize: 'none',
            }}
          />
          <span className={s.actions}>
            <Image
              src="/color-picker.png"
              alt="Mudar cor"
              width={16}
              height={16}
              onClick={togglePicker}
            />
            {isColorPickerOpen && (
              <div className={s.color_picker}>
                <ColorPalette onColorSelect={handlePickColor} />
              </div>
            )}
            <Image
              src="/delete-icon.png"
              alt="Deletar"
              width={16}
              height={16}
              onClick={deleteNote}
            />
            <p className={s.cancel} onClick={toggleEditMode}>
              Cancel
            </p>
            <span className={s.save}>
              <Button text="Save" onClick={update} />
            </span>
          </span>
        </div>
      ) : (
        <></>
      )}
    </span>
  );
};

export default Note;
