import api, { IAPIError } from '../../api';

export interface IFindNoteByIdResponse {
  id_note: string;
  note_title: string;
  note_text: string;
  note_color: 'red' | 'yellow' | 'blue' | 'green';
  starred: boolean;
  user_id: string;
  created_at: string;
  updated_at: string;
}

const findNoteById = async (
  id_note: string,
  token: string,
): Promise<IFindNoteByIdResponse | IAPIError> => {
  const response = await api
    .get(`/notes/find/${id_note}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch((err) => {
      return err.response;
    });

  return response.data;
};

export default findNoteById;
