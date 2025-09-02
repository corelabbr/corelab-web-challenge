import api, { IAPIError } from '../../api';

export interface ICreateNoteAttributes {
  note_title: string;
  note_text: string;
  note_color: 'red' | 'yellow' | 'blue' | 'green';
  starred: boolean;
}

export interface ICreateNoteResponse {
  id_note: string;
  note_title: string;
  note_text: string;
  note_color: 'red' | 'yellow' | 'blue' | 'green';
  starred: boolean;
  user_id: string;
  created_at: string;
  updated_at: string;
}

const createNote = async (
  data: ICreateNoteAttributes,
  token: string,
): Promise<ICreateNoteResponse | IAPIError> => {
  const response = await api
    .post(`/notes/create`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch((err) => {
      return err.response;
    });

  return response.data;
};

export default createNote;
