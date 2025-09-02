import api, { IAPIError } from '../../api';

export interface IEditNoteRequest {
  note_title: string;
  note_text: string;
}

export interface IEditNoteResponse {
  id_note: string;
  note_title: string;
  note_text: string;
  note_color: 'red' | 'yellow' | 'blue' | 'green';
  starred: boolean;
  user_id: string;
  created_at: string;
  updated_at: string;
}

const editNote = async (
  id_note: string,
  data: IEditNoteRequest,
  token: string,
): Promise<IEditNoteResponse | IAPIError> => {
  const response = await api
    .patch(`/notes/edit/${id_note}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch((err) => {
      return err.response;
    });

  return response.data;
};

export default editNote;
